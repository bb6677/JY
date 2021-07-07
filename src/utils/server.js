//全局接口地址 
//http://115.159.121.62:7111/jifenhui-busi/hxyh/send_verification_code.do
//var host = 'https://apijf.mylvzuan.com';
//var host = "http://115.159.121.62:7111/jifenhui-busi";
 var host = "https://apijf.mylvzuan.com";
var url = {
    send_verification_code: host + "/hxyh/send_verification_code.do", // 发送验证码
    user_login: host + "/jyhd/user_login.do", // 登录
    // get_user_balance: host + "/index/token/get_user_balance.do", //获取个人积分     /jifenhui-busi/index/get_user_balance.do
    get_user_balance: host + "/jifenhui-busi/index/get_user_balance.do",
    get_mobile_mobilenum: host + "/hxyh/token/get_mobile_mobilenum.do", // 查询归属地
    get_product_list: host + "/hxyh/token/get_product_list.do", //获取话费,商品列表
    commit_order_info: host + "/hxyh/token/commit_order_info.do", //提交订单
    pay_order_info: host + "/hxyh/token/pay_order_info.do", // 支付
    get_dir_list: host + "/hxyh/token/get_dir_list.do", //获取商品列表
    request_pay_code: host + "/jyhd/request_pay_code.do", //获取支付码
    get_pay_order_result_info: host + "/jyhd/get_pay_order_result_info.do", //查询支付结果
    get_product_info: host + "/hxyh/token/get_product_info.do", //获取商品详情
    get_user_record: host + "/hxyh/token/get_user_record.do", //新的获取账单列表
    get_user_score_record: host + "/hxyh/token/get_user_score_record.do",
    LookSgScore: host + "/hxyh/LookSgScore.do", //获取权益积分
    sgActivit: host + "/hxyh/sgActivit.do", //兑换权益积分
}
//读取缓存
function getLocal(key) {
    return localStorage.getItem(key);
}
//设置缓存
function setLocal(key, value) {
    localStorage.setItem(key, value);
}
//删除缓存
function delLocal(key) {
    localStorage.removeItem(key);
}
// 清除所有缓存
function clearLocal() {
    localStorage.clear();
}
//去字符串所有空格
function stringTrim(Str) {
    return Str.replace(/(^\s+)|(\s+$)/g, '');
}
//数组去重
function arrayUnique(arr) {
    var newArr = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        for (var j = i + 1; j < len; j++) {
            if (arr[i] === arr[j]) {
                //获取没重复的最右一值放入新数组
                ++i
            }
        }
        newArr.push(arr[i]);
    }
    return newArr
}
//判断是pc端还是移动
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = [
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod'
    ];
    var flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

//判断是否是手机号
function isMobilePhone(phone) {
    var reg = /^1\d{10}$/;
    return reg.test(phone)
}
//json 转对象
function parse(key) {
    return JSON.parse(key);
}
//时间
function time() {
    var date = new Date();
    var n = date.getFullYear();
    var y = date.getMonth() + 1;
    var r = date.getDate();
    var s = date.getHours();
    var f = date.getMinutes();
    var m = date.getSeconds();
    var time = n + "-" + y + "-" + r + " " + s + ":" + f + ":" + m;
    return {
        time: time,
        n: n,
        y: y,
        r: r,
        f: f,
        m: m
    };
}
//禁止特殊字符
function unSpecial(v) {
    return v.replace(/[^u4e00-u9fa5w]/g, '');
}
// 用来判断对象是否为空
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}
// 判断网络状态
function netWork() {
    if (navigator.onLine) {
        return true;
    } else {
        return false;
    }
}
//判断手机系统
function ifPhone() {
    var type = window.navigator.userAgent;
    if (type.indexOf("iPhone") > -1 || type.indexOf("iOS") > -1) {
        return "ios";
    }
    return "android";
}
export default {
    host: host,
    url: url,
    getLocal: getLocal,
    setLocal: setLocal,
    delLocal: delLocal,
    stringTrim: stringTrim,
    arrayUnique: arrayUnique,
    IsPC: IsPC,
    isMobilePhone: isMobilePhone,
    parse: parse,
    time: time,
    unSpecial: unSpecial,
    isEmptyObject: isEmptyObject,
    netWork: netWork,
    clearLocal: clearLocal,
    ifPhone: ifPhone
}