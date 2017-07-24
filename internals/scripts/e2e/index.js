require('chromedriver');
const chai = require('chai');
const webdriver = require('selenium-webdriver');
const expect = chai.expect;
const By = require('selenium-webdriver').By;
const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

describe('Check if music player', () => {
    
    before(function(done) {
        this.timeout(10000);
        // e2e tests are too slow for default Mocha timeout
        driver.navigate().to('http://localhost:3000/')
        .then(() => done())

    });
  
    it('loads songs', function(done) {
        this.timeout(10000);
        driver.sleep(5000).then(function(){
          driver.findElements(By.css('.openItem')).then(function(els){
          expect(els).to.not.have.lengthOf(0)
          done();
          });
        })
        
    });
  
    it('plays a song on click', function(done) {
        var listItem = driver.findElement(By.css('.openItem:first-child'));
        listItem.click();
        driver.findElements(By.css('.info')).then(function(el){
          expect(el).to.not.have.lengthOf(0)
          done();
        });
    });

    it('pauses the song', function(done) {
        driver.findElement(By.css('.pause')).click()
        driver.findElements(By.css('.play')).then(function(el){
          expect(el).to.not.have.lengthOf(0)
          done();
        });
    });
  
    it('can skip the song', function(done) {
        var infoText; 
        var textHolder = driver.findElement(By.css('.info p:nth-child(2)'));
      
        driver.findElement(By.css('.info p:nth-child(2)')).getAttribute('innerHTML').then(function(text){
          infoText = text
        });
        
        driver.findElement(By.css('.forward')).click()
        driver.findElement(By.css('.info p:nth-child(2)')).getAttribute('innerHTML').then(function(text){
          expect(infoText).to.not.equal(text)
          done();
        });
    });
  
    it('filters songs', function(done) {
        
        var listItemsLength; 
        driver.findElements(By.css('.openItem')).then(function(els){
          listItemsLength = els.length
        });
        driver.findElement(By.css('.title')).getAttribute('innerHTML').then(function(text){
          driver.findElement(By.css('input[name="title"]')).sendKeys(text);
          driver.findElement(By.css('input[type="submit"]')).click();
        }).then(function(){
          driver.findElements(By.css('.openItem')).then(function(els){
            expect(els).to.not.have.lengthOf(listItemsLength)
            driver.findElement(By.css('input[name="title"]')).clear();
            driver.findElement(By.css('input[type="submit"]')).click();
            done();
          });
        });
    }); 
  
    after(function(done) {
        driver.quit()
        .then(() => done())
    });
});