const { By,WebDriver,until } = require('selenium-webdriver');
const r=require('selenium-webdriver')
const fs=require('fs')
const logger=require('../lib/loggers')
class Helper{

    constructor(driver){
      /** @type {WebDriver} */
        this.driver=driver;
    }

    async implicitlyWait(miliseconds){
        logger.info(`Setting implicit wait to ${milliseconds} milliseconds...`);
        await this.driver.manage().setTimeouts({implicit : miliseconds})
    }

    //explicitwait
    async waitToBeLocated(locator, timeout){
        try{
            logger.info(`Waiting for element located by: ${locator}`);
            await this.driver.wait(until.elementLocated(locator),timeout)
            logger.info('Element found.');                 
        }   
        catch(error){
            logger.error(`Error waiting for element ${locator}: ${error.message}`);
            throw error;
        }
    }


    async waitToBeClickable(locator, timeout){
      try{
          logger.info(`Waiting for element located by: ${locator}`);
          await this.driver.wait(until.elementIsEnabled(locator),timeout)
          logger.info('Element found.');                 
      }   
      catch(error){
          logger.error(`Error waiting for element ${locator}: ${error.message}`);
          throw error;
      }
  }

    async sleep(milliseconds) {
        logger.info(`Sleeping for ${milliseconds} milliseconds...`);
        await new Promise(resolve => setTimeout(resolve, milliseconds));
        logger.info('Sleep finished.');
    }

     async sendKeys( locator, keys) {
        try {
          logger.info(`Sending keys "${keys}" to element located by: ${locator}`);
          await this.driver.findElement(locator).sendKeys(keys)
         
          logger.info('Keys sent successfully.');
        } catch (error) {
          logger.error(`Error sending keys ${locator}: ${error.message}`);
          throw error;
        }
      }
    
       async click( locator) {
        try {
          logger.info(`Clicking on element located by: ${locator}`);
          await this.driver.findElement(locator).click();
          logger.info('Click successful.');
        } catch (error) {
          logger.error(`Error clicking element ${locator}: ${error.message}`);
          throw error;
        }
      }
      async scrollToElement(locator) {
        logger.info(`Scrolling on element located by: ${locator}`);
        const element = await this.driver.findElement(locator);
        await this.driver.executeScript('arguments[0].scrollIntoView({ behavior: "smooth", block: "center" });', element);
        logger.info('Scroll successfull');
      }

      async  captureScreenshot( testName) {
        try {
         
          const screenshot = await this.driver.takeScreenshot();
          logger.info("Capturing screenshot")
          const screenshotPath = `screenshots/${testName}.png`;
          fs.writeFileSync(screenshotPath, screenshot, 'base64');
          return screenshotPath;
        } catch (error) {
          console.error('Error capturing screenshot:', error);
          return null;
        }
      }
    
    }

    module.exports=Helper
    
