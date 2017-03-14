'use strict';
var assert = require('assert');
var Sierotki = require('../index.js').Sierotki;

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
      assert.equal(Sierotki.orphansFixSimple('I am eating a cake.'), 'I&nbsp;am&nbsp;eating a&nbsp;cake.');
      assert.equal(Sierotki.orphansFixSimple('Że co, tu się dzieje?'), 'Że&nbsp;co, tu&nbsp;się dzieje?');
    })

    it('should NOT duplicate present `&nbsp;`', () => {
      assert.equal(Sierotki.orphansFixSimple('I&nbsp;am eating a cake.'), 'I&nbsp;am&nbsp;eating a&nbsp;cake.');
    });

    it('should change code inside HTML tags', () => {
      assert.equal(Sierotki.orphansFixSimple('Word one<span class="a class">Some text</span>a text after.'), 'Word one<span class="a&nbsp;class">Some text</span>a&nbsp;text after.');
    });

  });

  describe('orphansFix', () => {

    it('should leave an empty string empty', () => {
      assert.equal(Sierotki.orphansFix(''),'')
    });

    it('should NOT change code inside HTML tags', () => {
      assert.equal(Sierotki.orphansFix('Word one<span class="a class">Some text</span>a text after.'), 'Word one<span class="a class">Some text</span>a&nbsp;text after.');
    });

    it('should fix first letter of an element', () => {
      assert.equal(Sierotki.orphansFix('<p>An awesome day is going to an end.</p>'), '<p>An&nbsp;awesome day is&nbsp;going to&nbsp;an&nbsp;end.</p>');
    });

    it('should fix text before and after an element', () => {
      assert.equal(Sierotki.orphansFix('This text is before the p<p>'), 'This text is&nbsp;before the p<p>');
      assert.equal(Sierotki.orphansFix('</p>This is after the p.'), '</p>This is&nbsp;after the p.');
      assert.equal(Sierotki.orphansFix('This text is before the p<p>This is inside a p</p>This is after the p.'), 'This text is&nbsp;before the p<p>This is&nbsp;inside a&nbsp;p</p>This is&nbsp;after the p.');
    });

    it('should NOT change code between <style> tags', () => {
      assert.equal(Sierotki.orphansFix('This is a style.<style>div > a { border: solid 1px #000; } </style>And this is after style.'), 'This is&nbsp;a&nbsp;style.<style>div > a { border: solid 1px #000; } </style>And this is&nbsp;after style.');
    });

    it('should NOT change code between <script> tags', () => {
      assert.equal(Sierotki.orphansFix('This is a script.<script>let a = document.querySelector(" a > h3 ");</script>And this is after script.'), 'This is&nbsp;a&nbsp;script.<script>let a = document.querySelector(" a > h3 ");</script>And this is&nbsp;after script.');
    });

    it('should NOT change code between <script> tags even if <\/script> is contained in a string between', () => {
      assert.equal(Sierotki.orphansFix('<script> let a = "</script>"; </script>'),'<script> let a = "</script>"; </script>');
      assert.equal(Sierotki.orphansFix('<script>let a = "</script>";</script>'),'<script>let a = "</script>";</script>');
      assert.equal(Sierotki.orphansFix('This is before script.\
      <script>\
        let a = 1;\
        let b1 = "</script>"\
        let b2 = \'</script>\'\
        let c = "This is a string."\
      </script>\
      This is after script.\
      '),
      'This is&nbsp;before script.\
      <script>\
        let a = 1;\
        let b1 = "</script>"\
        let b2 = \'</script>\'\
        let c = "This is a string."\
      </script>\
      This is&nbsp;after script.\
      ');
    });

    it('should work if style tag is contained by script tags', () => {
      assert.equal(Sierotki.orphansFix('<script> let a = "<style> h1 { display: block; }; </style>"; </script>'),'<script> let a = "<style> h1 { display: block; }; </style>"; </script>')
    });

  });

});
