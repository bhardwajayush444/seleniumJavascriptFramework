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
describe('Shopping cart tests', function () {

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
      });
    
    

    it('Shopping cart tests',async function(){
    
      
        logger.info('reading first row')
       // const csvReader = new CSVReader(path.resolve(__dirname, 'testData.csv'));
        testData = await csvReader.readRow(1)
        await loginPage.login(testData.username,testData.password)
        await helper.sleep(5000)
        const successFullLoginDisplayed=await driver.findElement(HomePage.successFullLogin).isDisplayed()
        assert.strictEqual(successFullLoginDisplayed,true)

        await homePage.addProductToCart('Sauce Labs Backpack')
        await homePage.addProductToCart('Sauce Labs Bike Light')
        await helper.sleep(3000)
        await homePage.shop('Haritha','HIII','201010')
        await helper.sleep(2000)
        await homePage.logoff()
        await helper.sleep(2000) 

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