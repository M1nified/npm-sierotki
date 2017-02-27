var assert = require('assert');
var Sierotki = require('../Sierotki.js').Sierotki;

let string_1 = 'Zwykla sierota a sd :D sd<p ds> <a href="dsa dasd  s s">Zwykla sierota a sd :D sd</a><p>S sd</p><p>s sd</p>koniec ';

describe('Sierotki', () => {

  describe('orphansFixSimple', () => {

    it('should fix orphans at the begening of the string', () => {
      assert.equal(Sierotki.orphansFixSimple('A word.'), 'A&nbsp;word.');
      assert.equal(Sierotki.orphansFixSimple('Ż słowo.'), 'Ż&nbsp;słowo.');
      assert.equal(Sierotki.orphansFixSimple('a word.'), 'a&nbsp;word.');
      assert.equal(Sierotki.orphansFixSimple('ż słowo.'), 'ż&nbsp;słowo.');
    });

    it('should fix singe/dual orphans', () => {
      assert.equal(Sierotki.orphansFixSimple('I am eating a cake.'),'I&nbsp;am&nbsp;eating a&nbsp;cake.');
      assert.equal(Sierotki.orphansFixSimple('Że co, tu się dzieje?'),'Że&nbsp;co, tu&nbsp;się dzieje?');
    })

    it('should NOT duplicate present `&nbsp;`', () => {
      assert.equal(Sierotki.orphansFixSimple('I&nbsp;am eating a cake.'),'I&nbsp;am&nbsp;eating a&nbsp;cake.');
    });

    it('should change code inside HTML tags', () => {
      assert.equal(Sierotki.orphansFixSimple('Word one<span class="a class">Some text</span>a text after.'),'Word one<span class="a&nbsp;class">Some text</span>a&nbsp;text after.');
    });
      
  });

  describe('orphansFix', () => {
    
    it('should NOT change code inside HTML tags', () => {
      assert.equal(Sierotki.orphansFix('Word one<span class="a class">Some text</span>a text after.'),'Word one<span class="a class">Some text</span>a&nbsp;text after.');
    });
    
    it('should fix first letter of an element', () => {
      assert.equal(Sierotki.orphansFix('<p>An awesome day is going to an end.</p>'),'<p>An&nbsp;awesome day is&nbsp;going to&nbsp;an&nbsp;end.</p>');
    });
    
    it('should fix text before and after an element', () => {
      assert.equal(Sierotki.orphansFix('This text is before the p<p>'),'This text is&nbsp;before the p<p>');
      assert.equal(Sierotki.orphansFix('</p>This is after the p.'),'</p>This is&nbsp;after the p.');
      assert.equal(Sierotki.orphansFix('This text is before the p<p>This is inside a p</p>This is after the p.'),'This text is&nbsp;before the p<p>This is&nbsp;inside a&nbsp;p</p>This is&nbsp;after the p.');
    });
      
  });

});
