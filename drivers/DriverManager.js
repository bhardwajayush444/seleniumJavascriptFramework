const {Builder}=require('selenium-webdriver')
const fs=require('fs')
const logger=require('../lib/loggers')

class Driver{
    static async initialize(){
        const config=JSON.parse(fs.readFileSync('./config.json'))
        const allowedBrowsers=['chrome', 'firefox','safari']
        let browserName=config.browserName || 'chrome'

        if(!allowedBrowsers.includes(browserName)){
           
            logger.warn('Invalid browser name passed defaulting to chrome')
            browserName='chrome'
        }
        logger.info(`Initializing driver for ${browserName} browser...`);
        const driver= await new Builder().forBrowser(browserName).build();
        await driver.manage().window().maximize()
        await driver.get(config.url)
        logger.info(`Driver initialized successfully for ${browserName} browser.`);
        return driver


    }
    static async quit(driver){
        logger.info('Quitting driver...');
        await driver.quit()

    }
}

module.exports=Driver;