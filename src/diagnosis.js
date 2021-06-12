const puppeteer = require('puppeteer')
const sort = require('./sort')

module.exports = async option => {
    const browser = await puppeteer.launch({
        handleSIGINT: false,
        headless: false,
        args: ['--start-maximized',  '--no-sandbox',
        '--disable-setuid-sandbox',],
    })
    const page = await browser.newPage()
    await page.setViewport({width: 1280, height: 720})
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')

    page.on('dialog', async dialog => {
        await dialog.dismiss()
        console.log(dialog.message())
        throw new Error(dialog.message())
    })

    await page.goto('https://hcs.eduro.go.kr/#/loginHome')
    await page.click('#btnConfirm2')

    // Select School
    await page.click('#WriteInfoForm > table > tbody > tr:nth-child(1) > td > button')
    await page.select('#sidolabel', sort.sortCity(option.city))
    await page.select('#crseScCode', sort.sortSchoolClass(option.class))
    await page.type('#orgname', option.school)
    await page.click('#softBoardListLayer > div.layerContentsWrap > div.layerSchoolSelectWrap > table > tbody > tr:nth-child(3) > td:nth-child(3) > button')
    await page.waitForSelector('#softBoardListLayer > div.layerContentsWrap > div.layerSchoolSelectWrap > ul > li > a > p > a:nth-child(1)')
    await page.click('#softBoardListLayer > div.layerContentsWrap > div.layerSchoolSelectWrap > ul > li > a > p > a:nth-child(1)')
    await page.click('#softBoardListLayer > div.layerContentsWrap > div.layerBtnWrap > input')

    // Input user info
    await page.type('#user_name_input', option.name)
    await page.type('#birthday_input', option.birthday)
    await page.$eval('#btnConfirm', el => el.click())

    // Input password
    await page.waitForTimeout(750)
    await page.type('#WriteInfoForm > table > tbody > tr > td > input', option.pw)
    await page.$eval('#btnConfirm', el => el.click())

    // Select user
    await page.waitForSelector('#container > div > section.memberWrap > div:nth-child(2) > ul > li:nth-child(1) > a')
    await page.$eval('#container > div > section.memberWrap > div:nth-child(2) > ul > li:nth-child(1) > a', el => el.click())

    // Response to Question
    await page.waitForTimeout(750)
    await page.click('#survey_q1a1')
    await page.click('#survey_q2a1')
    await page.click('#survey_q3a1')
    await page.$eval('#btnConfirm', el => el.click())
    await page.waitForTimeout(750)
    await page.screenshot({path: 'wa.jpg'})

    console.log('Success')
}