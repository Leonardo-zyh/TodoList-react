
import AV from 'leancloud-storage'
var APP_ID = '1tQJosYf47DrGlSBzUF0hkRm-gzGzoHsz';
var APP_KEY = '5zJnoxUAoJD4DV1K28et83WV';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  //words: 'Hello World!'
}).then(function(object) {
  //alert('LeanCloud Rocks!');
})