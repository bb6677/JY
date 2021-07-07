//全局接口地址
var host = 'https://apijf.mylvzuan.com';
// var host = "http://192.168.0.130:8080/jifenhui-busi";
var url = {
    //接口拼接
    send_verification_code: host + "/hxyh/send_verification_code.do", // 发送验证码
    user_login: host + "/hxyh/user_login.do", // 登录
    get_user_balance: host + "/index/token/get_user_balance.do", //获取个人积分
    get_mobile_mobilenum: host + "/hxyh/token/get_mobile_mobilenum.do", // 查询归属地
    get_product_list: host + "/hxyh/token/get_product_list.do", //获取话费,商品列表
    commit_order_info: host + "/hxyh/token/commit_order_info.do", //提交订单
    pay_order_info: host + "/hxyh/token/pay_order_info.do",// 支付
    get_dir_list: host + "/hxyh/token/get_dir_list.do", //获取商品列表
    request_pay_code: host + "/hxyh/token/request_pay_code.do", //获取支付码
    get_pay_order_result_info: host + "/hxyh/token/get_pay_order_result_info.do", //查询支付结果
    // get_user_token: host + "/index/get_user_token.do", //获取用户信息
    // commit_user_score_give: host + "/index/commit_user_score_give.do", //赠送
    // user_score_give: host + "/index/user_score_give.do", // 积分赠送
    get_product_info: host + "/hxyh/token/get_product_info.do",//获取商品详情
    // get_order_info: host + "/index/get_order_info.do", //获取订单详情
    get_user_record: host + "/hxyh/token/get_user_record.do", //新的获取账单列表
    get_user_score_record: host + "/hxyh/token/get_user_score_record.do"
}
// url 参数截取
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
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
    localStorage.clear()
}
//转字符串
function string(data) {
    return String(data);
}
//转数字
function number(data) {
    return Number(data);
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
    ]
    var flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break
        }
    }
    return flag
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
// vue 修改每个组建的title
function updateTitle(title) {
    document.title = title;
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
    GetQueryString: GetQueryString,
    getLocal: getLocal,
    setLocal: setLocal,
    delLocal: delLocal,
    string: string,
    number: number,
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
    updateTitle: updateTitle,
    ifPhone: ifPhone
}

// 禁止鼠标右键
// document.oncontextmenu = function () {
//     alert("禁止鼠标右键");
//     window.location.replace("https://www.baidu.com/");
//     return false;
// }
// //监听F12  禁止打开控制台
// document.onkeydown = function (e) {
    
//     if (e.ctrlKey && (e.keyCode === 65 || e.keyCode === 67 || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 80 || e.keyCode === 83 || e.keyCode === 85 || e.keyCode === 86 || e.keyCode === 117)) {
//         alert("禁止打开控制台");
//         window.location.replace("https://www.baidu.com/");
//         return false;
//     }
//     if (e.keyCode == 18 || e.keyCode == 123) {
//         alert("禁止打开控制台");
//         window.location.replace("https://www.baidu.com/");
//         return false;
//     }
// }