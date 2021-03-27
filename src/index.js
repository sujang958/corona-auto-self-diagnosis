const puppeteer = require('puppeteer')
const sort = require('./sort')
const fs = require('fs')
const path = require('path')

module.exports = {
    /** 
    * 자가진단 함수
    * @return {String} 잘 실행되었는지 상태 메시지
    * @param {String} dosi 시/도 이름
    * @param {String|"초등학교"|"중학교"|"고등학교"|"대학교"} school 
    * @param {String} schoolname 학교이름
    * @param {String} name 이름
    * @param {String} birthday 생일
    * @param {String} pw 비밀번호
    */
    async self(dosi, school, schoolname, name, birthday, pw) {
        const browser = await puppeteer.launch({
            handleSIGINT: false,
            headless: false,
            args: ['--start-maximized',  '--no-sandbox',
            '--disable-setuid-sandbox',],
        })
        const page = await browser.newPage()
        await page.setViewport({
            width: 1920,
            height: 1080,
        })
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')
    
        page.on('dialog', async dialog => {
            const dialogMsg = dialog.message()
            console.log(dialogMsg)

            if (dialogMsg == '검색결과가 없습니다') {
                console.log('검색결과가 없습니다')
                browser.close()
                return '검색결과가 없습니다'
            } else if (dialogMsg.includes(`입력하신 정보로 참여자를 찾을 수 없습니다`)) {
                console.log('참여자를 찾을수 없습니다')
                browser.close()
                return '참여자를 찾을수 없습니다'
            } else if (dialogMsg.includes(`2자리 이상`)){
                console.log('학교 검색어를 2자리 이상으로 해주세요')
                browser.close()
                return '학교 검색어를 2자리 이상으로 해주세요'
            } else if (dialogMsg.includes('비밀번호가 맞지 않습니다')) {
                console.log('비밀번호가 맞지 않습니다')
                browser.close()
                return '비밀번호가 맞지 않습니다'
            } else if (dialogMsg.includes('올바른 생년월일을 입력하세요')) {
                console.log('올바른 생년월일을 입력하세요, 올바른 생년월일의 예: 050929 (YYMMDD)')
                browser.close()
                return '올바른 생년월일을 입력하세요'
            } 

            await dialog.dismiss()
        })

        await page.goto('https://hcs.eduro.go.kr/#/loginHome')
        await page.click('#btnConfirm2')
        await page.click('#WriteInfoForm > table > tbody > tr:nth-child(1) > td > button')
        await page.select('select#sidolabel', sort.sortCity(dosi))
        await page.select('#crseScCode', sort.sortSchoolClass(school))
        await page.focus('#orgname')
        page.keyboard.type(schoolname)

        await page.click('#softBoardListLayer > div.layerContentsWrap > div.layerSchoolSelectWrap > table > tbody > tr:nth-child(3) > td:nth-child(3) > button')
        await page.waitForSelector('#softBoardListLayer > div.layerContentsWrap > div.layerSchoolSelectWrap > ul > li:nth-child(1)')
        await page.click('#softBoardListLayer > div.layerContentsWrap > div.layerSchoolSelectWrap > ul > li:nth-child(1)')
        await page.click('#softBoardListLayer > div.layerContentsWrap > div.layerBtnWrap > input')
        await page.focus('#user_name_input')
        page.keyboard.type(name)
        await page.waitForTimeout(100)
        await page.focus('#birthday_input')
        page.keyboard.type(birthday)
        await page.waitForTimeout(1000)
        await page.click('#btnConfirm')
        await page.waitForTimeout(1000)
        await page.focus('#WriteInfoForm > table > tbody > tr > td > input')
        page.keyboard.type(pw)
        await page.waitForTimeout(1000)
        await page.click('#btnConfirm')
        await page.waitForSelector('#container > div > section.memberWrap > div:nth-child(2) > ul > li:nth-child(1) > a')
        await page.waitForTimeout(2000)
        await page.click('#container > div > section.memberWrap > div:nth-child(2) > ul > li:nth-child(1) > a')
        await page.waitForTimeout(700)
    
        console.log(page.url())
        if (page.url() != 'https://hcs.eduro.go.kr/#/survey') {
            console.log('이미 했습니다')
            return '이미 했습니다'
        }
    
        await page.click('#survey_q1a1')
        await page.click('#survey_q2a1')
        await page.click('#survey_q3a1')
        await page.waitForTimeout(500)
        await page.click('#btnConfirm')

        let dir = fs.readdirSync(path.join(__dirname, "../img/")).filter(file => file.endsWith('.jpg'))
        await page.screenshot({path: path.join(__dirname, `../img/${dir.length + 1}.png`)})
        await browser.close()
        
        console.log(`자가진단을 완료했습니다`)
    },
}