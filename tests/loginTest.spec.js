
const Driver = require('../drivers/DriverManager');

const { WebDriver } = require('selenium-webdriver');
const LoginPage=require('../pages/LoginPage')
const HomePage=require('../pages/HomePage')
const assert=require('assert')
const Helper = require('../lib/Helper');
const fs=require('fs')

const addContext=require('mochawesome/addContext')
const CSVReader = require('../lib/CSVReader'); 
const logger = require('../lib/loggers');
const path = require('path');
describe('Login Suite', function () {

    /**  @type {WebDriver} */
    let driver;

    /** @type {LoginPage} */
    let loginPage;

    /** @type {HomePage} */
    let homePage;

     /** @type {Helper} */
    let helper;
    this.timeout(500000)

    let testData;
    let csvReader;
   
    
    beforeEach(async function () {
      driver = await Driver.initialize();
      loginPage = new LoginPage(driver);
      helper=new Helper(driver);
      csvReader = new CSVReader(path.resolve(__dirname, 'loginData.csv'));
      testData = await csvReader.readAllData();

      homePage=new HomePage(driver);
      // for(let data of testData){
      //   logger.info(data.username)
      //   logger.info(data.password)
      //   logger.info(data.expected_result)
      // }
      
      });
    
    

    it('Successfull Login',async function(){
    

        logger.info('reading first row')
       // const csvReader = new CSVReader(path.resolve(__dirname, 'testData.csv'));
        testData = await csvReader.readRow(1)
        await loginPage.login(testData.username,testData.password)
        await helper.sleep(5000)
        const successFullLoginDisplayed=await driver.findElement(HomePage.successFullLogin).isDisplayed()
        assert.strictEqual(successFullLoginDisplayed,true)
        await homePage.logoff()
        await helper.sleep(2000)
        
   

    })
   
    it('Loked user Login',async function(){

      testData = await csvReader.readRow(2)
      await loginPage.login(testData.username,testData.password)
      await helper.sleep(5000)
      const lockedUserDisplayed=await driver.findElement(LoginPage.lockedUserDisplayed).isDisplayed()
      assert.strictEqual(lockedUserDisplayed,true)
      
 

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
