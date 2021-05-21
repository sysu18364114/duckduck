// 检查传入的参数是否为 String 类型

let checkIsString = function (x) {
    if (typeof (x) != "string") {
        console.error('checkIsString: 传入了一个非字符串的值');
        console.error(x, 'type:', log(typeof (x)));
        return false;
    }
    return true
}

// 检查传入的参数是否为空
let checkIsEmpty = function (a) {
    if (a === "") return true; //检验空字符串
    if (a === "null") return true; //检验字符串类型的null
    if (a === "undefined") return true; //检验字符串类型的 undefined
    if (!a && a !== 0 && a !== "") return true; //检验 undefined 和 null           
    if (Array.prototype.isPrototypeOf(a) && a.length === 0) return true; //检验空数组
    if (Object.prototype.isPrototypeOf(a) && Object.keys(a).length === 0) return true; //检验空对象
    return false;
}

let checkPhoneNum = function (phoneNum) {
    if (!this.checkIsString(phoneNum))
        return false;

    // 检查手机号码长度
    if (phoneNum.length == 11) // 长度无误则检测号码正确性
    {
        var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (!reg.test(phoneNum)) {
            wx.showToast({
                title: '号码有误',
                icon: 'error',
                duration: 1500
            })
            return false;
        }
    } else if (0 <= phoneNum.length && phoneNum.length < 11) {
        wx.showToast({
            title: '号码长度过短',
            icon: 'error',
            duration: 1500
        })
        return false;
    } else if (phoneNum.length > 11) {
        wx.showToast({
            title: '号码长度过长',
            icon: 'error',
            duration: 1500
        })
        return false;
    }

    return true;
}

let checkUserName = function (userName) {
    if (userName.length == 0) {
        return false;
    }
}

let checkPasswdString = function(passwd)
{
    // 控制密码由大小写字母或者数字组成，长度在 6-20 位
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    if (reg.test(passwd)) {
        return true;
    } else {
        wx.showToast({
            title: '密码不符合要求，请检查',
            icon: 'error',
            duration: 1500
        });
        return false;
    }
}

let checkPasswdRegister = function (passwdFirst, passwdSecond) {
    if (this.checkIsEmpty(passwdFirst) || this.checkIsEmpty(passwdSecond)) {
        wx.showToast({
            title: '密码为空',
            icon: 'error',
            duration: 1500
        })
        return false;
    }
    if (passwdFirst !== passwdSecond) {
        console.error('checkPasswdRegister: 两次输入的密码不一致，请检查');
        wx.showToast({
            title: '两次输入的密码不一致，请检查',
            icon: 'error',
            duration: 1500
        });
        return false;
    }

    return checkPasswdString(passwdFirst);
}

let checkPasswdLogin = function (passwd){
    if (this.checkIsEmpty(passwd)) {
        wx.showToast({
            title: '密码为空',
            icon: 'error',
            duration: 1500
        })
        return false;
    }

    return checkPasswdString(passwd);
}

let requestSmsCode = function (phoneNum) {
    var Bmob = require('../../utils/Bmob-2.2.5.min.js'); // 配置数据库信息

    if (this.checkPhoneNum(phoneNum)) // 检查用户填写的手机号码是否正确
    {
        console.log('Phone number correct: ', phoneNum)
        // 请求服务器发送验证码
        Bmob.requestSmsCode({
            mobilePhoneNumber: phoneNum // string
        }).then(function (res) {
            // 回传信息为 {'smsId': xxxxxxx} ，这里作为返回值返回
            return res;
        }, function (err) {
            console.log(err);
            return -1;
        });
    } else {
        return -2;
    }
}

module.exports = {
    checkIsString,
    checkIsEmpty,
    checkPhoneNum,
    checkUserName,
    checkPasswdRegister,
    checkPasswdLogin,
    requestSmsCode,
}