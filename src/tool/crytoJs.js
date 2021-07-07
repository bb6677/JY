import cryptoJs from 'crypto-js';
var keyOne = randomStr(16);

function randomStr(len) {
  var str = '';
  var dict = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (var i = 0; i < len; i++) {
    var index = Math.floor(Math.random() * dict.length);
    str += dict[index];
  }
  return str;
}

export default {
  keyOne,
  // 加密函数   aes
  jiami(word) {
    // console.log("要加密数据:"+word);
    var key = cryptoJs.enc.Utf8.parse(keyOne);
    var srcs = cryptoJs.enc.Utf8.parse(word);
    var encrypted = cryptoJs.AES.encrypt(srcs, key, { mode: cryptoJs.mode.ECB, padding: cryptoJs.pad.Pkcs7 });
    return encrypted.toString();
  },
  // 解密函数
  jiemi(resutKey,word) {
    // console.log('传入的密文：', word);
    var key = cryptoJs.enc.Utf8.parse(resutKey);
    var decrypt = cryptoJs.AES.decrypt(word, key, { mode: cryptoJs.mode.ECB, padding: cryptoJs.pad.Pkcs7 });
    // console.log("解密结果:"+cryptoJs.enc.Utf8.stringify(decrypt).toString());
    return cryptoJs.enc.Utf8.stringify(decrypt).toString();
  }
}