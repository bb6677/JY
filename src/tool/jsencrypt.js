import JSEncrypt from "jsencrypt"

//公钥
var PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCaNwwk82wprAv3Kg2hKY5rsTVxEoMEkJfsWRDgSuHp54AxihUuEsjaFKSl5ti1WAFV0eyrAEl9HN/826W69IstYMvMp1NFF9bn0Uo8ECIKGKQ+1Rvzw9Dbas5Y6EOJMR+IZoCkR7WT6Dz6H4a4+FLI/6CJEm802IGo0vHQnPXoSQIDAQAB'//私钥
var PRIVATE_KEY = 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAINkuJE9BZyx9Ml8dwsRe4hgGrGCxDbc4GwctKAJPPocZWvYxdMfiNwJSUlcU2Dm/vTCKuSs0qhXKQWZHenytzwL39/dbJR5uDR970bgJkMkhqL2X364ZS2AljpOXvNI6EDPHci1/OjIXOv2JXWSH5SjRsk/2S3lriLfP1ld+lDLAgMBAAECgYATp15AQ1tyi9/sv5Ri8HOE+7MieEf3WOSs50JRafBYDSVSk3NL2Dy1hSIUOh4ysXrTi7O0zvEXwyncr4Gc+/RSbO0zjvK1tfh8vYEJ5qVwi8lF2FCVOsps+oSRrOO3fxAFvELJEpe16lvY/ttNarpBppr7y68hHKIjzkpfxdHwqQJBAMlOySe8URhNNHFm57o6sELAkX0EJGGCP+ueMO1bAq57t+K8HSFbrSKq5+kcLpUZLltArZ9afgz1XDLiOE6H3WUCQQCnF03pagzjVQuk3TT7RDOBi/J1+hakFvrtiOoiVJjqqP6+kCve+7uAdlx0wUx4vNnyJJlgcCV/lim21LtQN+pvAkEAh1ZsbkZwzsG47DSevdkO/xGvvji2rMeAacukYS66ksuiSNDnVLHpqFD2MQY9Wwfe3oKRN30DGXsrTRpBeKpm8QJAFYlEaoRXuulYQdydGpG0zcq66ofcaTPpDbqq6tfaicxUYT112hy6ExmuWwIbGCjHMpWTC0IJI0O4hq8uoW1DkwJBALN5oGYsE43OYVvgThturdhhLjUjNSEVCHo4I3cSh97Y+hNNhnHtol3Jhk2+w6rZ/w/gtBGkrwSPKLLC27Q2pT0=';
//使用公钥加密
var encryptor = new JSEncrypt();

function jiami(text) {
    // console.log("公钥加密数据:" + text);
    encryptor.setPublicKey('-----BEGIN PUBLIC KEY-----' + PUBLIC_KEY + '-----END PUBLIC KEY-----');
    return encryptor.encrypt(JSON.stringify(text));
}

function jiemi(text) {
    // console.log("要解密数据:" + text);
    encryptor.setPrivateKey('-----BEGIN RSA PRIVATE KEY-----' + PRIVATE_KEY + '-----END RSA PRIVATE KEY-----');
    return encryptor.decrypt(text);
}

export default {
    jiami, jiemi
}