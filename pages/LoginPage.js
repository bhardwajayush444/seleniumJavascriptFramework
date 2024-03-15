const { By,WebDriver } = require('selenium-webdriver');
const r=require('selenium-webdriver')
const Helper = require('../lib/Helper');
class LoginPage{
   
  
    static get userName(){return By.id('user-name')}
    static get password(){return By.id('password')}
    static get submit(){return By.id('login-button')}
    static get lockedUserDisplayed(){return By.xpath("//h3[text()='Epic sadface: Sorry, this user has been locked out.']")}
   
    constructor(driver){
        /** @type {WebDriver} */
        this.driver=driver

         /** @type {Helper} */
        this.helper=new Helper(driver)
    }

    async login(username,password){

       await this.helper.sendKeys(LoginPage.userName,username)
       await this.helper.scrollToElement(LoginPage.password)
       await this.helper.sendKeys(LoginPage.password,password)
       await this.helper.scrollToElement(LoginPage.submit)
       await this.helper.click(LoginPage.submit)
       
    }
    
}
module.exports=LoginPage