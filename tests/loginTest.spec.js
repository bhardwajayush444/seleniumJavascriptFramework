
const Driver = require('../drivers/DriverManager');

const { WebDriver } = require('selenium-webdriver');
const LoginPage=require('../pages/LoginPage')
const assert=require('assert')
const Helper = require('../lib/Helper');
const fs=require('fs')

const addContext=require('mochawesome/addContext')
const CSVReader = require('../lib/CSVReader'); 
const logger = require('../lib/loggers');
const path = require('path');
describe('Example Test Suite', function () {

    /**  @type {WebDriver} */
    let driver;

    /** @type {LoginPage} */
    let loginPage;

     /** @type {Helper} */
    let helper;
    this.timeout(500000)
   

    beforeEach(async function () {
      driver = await Driver.initialize();
      loginPage = new LoginPage(driver);
      helper=new Helper(driver);
      const csvReader = new CSVReader(path.resolve(__dirname, 'testData.csv'));
      const testData = await csvReader.readAllData();
      // for(let data of testData){
      //   logger.info(data.username)
      //   logger.info(data.password)
      //   logger.info(data.expected_result)
      // }
      
      });
    
    

    it('Successfull Login',async function(){
    
        logger.info('reading first row')
        const csvReader = new CSVReader(path.resolve(__dirname, 'testData.csv'));
        const testData = await csvReader.readRow(1)
        logger.info(testData.username)
        await loginPage.login('student','Password123')
        await helper.sleep(5000)
        const successFullLoginDisplayed=await driver.findElement(LoginPage.successFullLogin).isDisplayed()
        assert.strictEqual(successFullLoginDisplayed,true)
        
   

    })
   
    it('Unsuccessfull Login',async function(){
    
      await loginPage.login('student','Password123')
      await helper.sleep(5000)
      const successFullLoginDisplayed=await driver.findElement(LoginPage.successFullLogin).isDisplayed()
      assert.strictEqual(successFullLoginDisplayed,false)
      
 

  })
 

    afterEach(async function(){
      
      if(this.currentTest.state == 'failed'){
          let imageFileName = this.currentTest.title + '.jpeg';
          
          driver.takeScreenshot().then(
              function(image){
                  require('fs').writeFileSync('./screenshots/' + imageFileName, image, 'base64')
              }
          )
          addContext(this,'Following comes the failed test image')
          addContext(this, '../screenshots/' + imageFileName)
      }
      await Driver.quit(driver);
     
  })
})  