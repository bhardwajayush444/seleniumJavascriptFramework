const { By,WebDriver } = require('selenium-webdriver');
const r=require('selenium-webdriver')
const Helper = require('../lib/Helper');
const LoginPage=require('../pages/LoginPage')
const assert=require('assert');
const logger = require('../lib/loggers');

class HomePage{
    static get successFullLogin(){return By.xpath("//span[text()='Products']")}
    static get menuButton(){return By.id("react-burger-menu-btn")}
    static get logoffButton(){return By.id("logout_sidebar_link")}
    static get cartLink(){return By.css('a[class="shopping_cart_link"]')}
    static get checkout(){return By.id('checkout')}
    static get firstName(){return By.id('first-name')}
    static get lastName(){return By.id('last-name')}
    static get zipCode(){return By.id('postal-code')}
    static get continueBtn(){return By.id('continue')}
    static get finishBtn(){return By.css("button[id='finish']")}
    static get orderConfirmation(){return By.xpath("//h2[text()='Thank you for your order!']")}
    constructor(driver){
        /** @type {WebDriver} */
        this.driver=driver

         /** @type {Helper} */
        this.helper=new Helper(driver)
    }

    async logoff(){
        await this.helper.click(HomePage.menuButton)
        await this.helper.sleep(3000)
        await this.helper.click(HomePage.logoffButton)
        const successFullLogoff=await this.driver.findElement(LoginPage.userName).isDisplayed()
        assert.strictEqual(successFullLogoff,true)
        
  
    }

    async addProductToCart(productName){
        const locator="//*[text()='"+productName+"']//following::button[1]"
        logger.info(locator)
        this.helper.click(By.xpath(locator))
    }
    async shop(firstName,lastName,zipCode){
        await this.helper.click(HomePage.cartLink)
        await this.helper.click(HomePage.checkout)
        await this.helper.sendKeys(HomePage.firstName,firstName)
        await this.helper.sendKeys(HomePage.lastName,lastName)
        await this.helper.sendKeys(HomePage.zipCode,zipCode)
        await this.helper.click(HomePage.continueBtn)
        await this.helper.scrollToElement(HomePage.finishBtn)
        await this.helper.click(HomePage.finishBtn)
        const shopSuccess=await this.driver.findElement(HomePage.orderConfirmation).isDisplayed()
        assert.strictEqual(shopSuccess,true)
        
    }
}
module.exports=HomePage