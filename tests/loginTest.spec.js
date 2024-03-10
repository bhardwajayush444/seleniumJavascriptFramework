
const Driver = require('../drivers/DriverManager');

const { WebDriver } = require('selenium-webdriver');
const LoginPage=require('../pages/LoginPage')

const Helper = require('../lib/Helper');

describe('Example Test Suite', function () {

    /**  @type {WebDriver} */
    let driver;

    /** @type {LoginPage} */
    let loginPage;

     /** @type {Helper} */
    let helper;
    this.timeout(500000)

    before(async function () {
      driver = await Driver.initialize();
      loginPage = new LoginPage(driver);
      helper=new Helper(driver);
      });
    
      after(async function () {
        await Driver.quit(driver);
      });
    

    it('Run test',async function(){
    
        await loginPage.login('student','Password123')
        await helper.sleep(8000)
   

    })
  
})  