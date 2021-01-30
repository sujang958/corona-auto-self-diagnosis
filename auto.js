var puppeteer = require('puppeteer');
var indexNum = require('./indexNum');

module.exports = {
    /**
     * 
     * @param {String} dosi 자신이 사는 지역 이름
     * @param {String} classname 예시1: 고등학교, 예시2: 초등학교
     * @param {String} schoolname  학교이름, 예시: 샌즈 (두글자 이상)
     * @param {String} name 실명
     * @param {String} birthday 생일, 예시: 051021
     * @param {String} pw  숫자 비번 4자리
     */
    async self(dosi, classname, schoolname, name, birthday, pw) {
        const browser = await puppeteer.launch({
            handleSIGINT: false,
            headless: false,
            args: ['--start-maximized' ],
        });
        const page = await browser.newPage()
        await page.setViewport({
            width: 1920,
            height: 1080,
        })
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')
    
    
        await page.goto('https://hcs.eduro.go.kr/#/loginHome')
        await page.click('#btnConfirm2')
        await page.click('#WriteInfoForm > table > tbody > tr:nth-child(1) > td > button')
        await page.select('select#sidolabel', indexNum.도시인덱스[dosi])
        await page.select('#crseScCode', indexNum.학교인덱스[classname])
        await page.focus('#orgname')
        page.keyboard.type(schoolname)
        page.on('dialog', async dialog => {
            var dialogMsg = dialog.message()
            // console.log(dialogMsg);
            if (dialogMsg == '검색결과가 없습니다') {
                process.exit()
            } else if (dialogMsg.includes(`입력하신 정보로 참여자를 찾을 수 없습니다`)) {
                process.exit()
            }
            await dialog.dismiss();
        });
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
        await page.waitForTimeout(1000)
        await page.click('#container > div > section.memberWrap > div:nth-child(2) > ul > li > a')
        await page.waitForTimeout(700)
    
        console.log(page.url());
        if (page.url() != 'https://hcs.eduro.go.kr/#/survey') {
            console.log('이미했습니다');
            process.exit()
        }
    
        await page.click('#survey_q1a1')
        await page.click('#survey_q2a1')
        await page.click('#survey_q3a1')
        await page.waitForTimeout(500)
        await page.click('#btnConfirm')
    
        console.log('성공적으로 마쳤습니다');
    }
}

// (async (dosi, class, schoolname) => {
//     const browser = await puppeteer.launch({
//         handleSIGINT: false,
//         headless: false,
//         args: ['--start-maximized' ],
//     });
//     const page = await browser.newPage()
//     await page.setViewport({
//         width: 1920,
//         height: 1080,
//     })
//     await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')


//     await page.goto('https://hcs.eduro.go.kr/#/loginHome')
//     await page.click('#btnConfirm2')
//     await page.click('#WriteInfoForm > table > tbody > tr:nth-child(1) > td > button')
//     await page.select('select#sidolabel', indexNum.도시인덱스['시도이름'])
//     await page.select('#crseScCode', indexNum.학교인덱스['학급'])
//     await page.focus('#orgname')
//     page.keyboard.type(schoolname)
//     page.on('dialog', async dialog => {
//         var dialogMsg = dialog.message()
//         // console.log(dialogMsg);
//         if (dialogMsg == '검색결과가 없습니다') {
//             process.exit()
//         } else if (dialogMsg.includes(`입력하신 정보로 참여자를 찾을 수 없습니다`)) {
//             process.exit()
//         }
//         await dialog.dismiss();
//     });
//     await page.click('#softBoardListLayer > div.layerContentsWrap > div.layerSchoolSelectWrap > table > tbody > tr:nth-child(3) > td:nth-child(3) > button')
//     await page.waitForSelector('#softBoardListLayer > div.layerContentsWrap > div.layerSchoolSelectWrap > ul > li:nth-child(1)')
//     await page.click('#softBoardListLayer > div.layerContentsWrap > div.layerSchoolSelectWrap > ul > li:nth-child(1)')
//     await page.click('#softBoardListLayer > div.layerContentsWrap > div.layerBtnWrap > input')
//     await page.focus('#user_name_input')
//     page.keyboard.type('name')
//     await page.waitForTimeout(100)
//     await page.focus('#birthday_input')
//     page.keyboard.type('birthday')
//     await page.waitForTimeout(1000)
//     await page.click('#btnConfirm')
//     await page.waitForTimeout(1000)
//     await page.focus('#WriteInfoForm > table > tbody > tr > td > input')
//     page.keyboard.type('number password length 4')
//     await page.waitForTimeout(1000)
//     await page.click('#btnConfirm')
//     await page.waitForTimeout(1000)
//     await page.click('#container > div > section.memberWrap > div:nth-child(2) > ul > li > a')
//     await page.waitForTimeout(700)

//     console.log(page.url());
//     if (page.url() != 'https://hcs.eduro.go.kr/#/survey') {
//         console.log('이미했습니다');
//         process.exit()
//     }

//     await page.click('#survey_q1a1')
//     await page.click('#survey_q2a1')
//     await page.click('#survey_q3a1')
//     await page.waitForTimeout(500)
//     await page.click('#btnConfirm')

//     console.log('성공적으로 맞췄습니다');
// })()

// const 학교인덱스 = {
//     유등: '1',
//     초등: '2',
//     중등: '3',
//     고등: '4',
//     특수: '5'
// }
// const 도시인덱스 = {
//     서울: '01',
//     부산: '02',
//     대구: '03',
//     인천: '04',
//     광주: '05',
//     대전: '06',
//     울산: '07',
//     세종: '08',
//     경기도: '10',
//     강원도: '11',
//     충청북도: '12',
//     충청남도: '13',
//     전라북도: '14',
//     전라남도: '15',
//     경상북도: '16',
//     경상남도: '17',
//     제주: '18',
// }