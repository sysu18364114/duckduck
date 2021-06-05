// pages/login_register/login_register.js

const app = getApp(); // 获取应用实例
var Bmob = require('../../utils/Bmob-2.2.5.min.js'); // 配置数据库信息
let libAPI = require('../libs/register_login.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // Sms code login 变量
        status: 0,
        phoneNum: '',
        smsId: '',
        smsCode: '',

        // password login 变量
        phoneNum: '',
        passwd: '',
        loginStatus: false,

        // register 变量
        infoText: '',

        phoneNum: '',
        smsId: '',
        smsCode: '',

        userName: 'zch123',
        userEmail: 'default123@duck.com',

        passwdFirst: '',
        passwdSecond: '',

        registerStatus: false,

        success: false
    },


    // 根据用户的点击完成页面的跳转
    smsCodeLoginBlock: function () {
        var that = this;
        that.setData({
            status: 1
        })
    },
    passwdLoginBlock: function () {
        var that = this;
        that.setData({
            status: 2
        })
    },
    registerBlock: function () {
        var that = this;
        that.setData({
            status: 3
        })
    },
    getBack: function () {
        var that = this;
        that.setData({
            status: 0
        })
    },

    // 验证码登陆

    loginButtonClick: function () {
        var phoneNum=Number(this.data.phoneNum);
        var smsCode=Number(this.data.smsCode);
        
        console.log(phoneNum);
        console.log(smsCode);

        Bmob.User.signOrLoginByMobilePhone(phoneNum, smsCode).then(res => {
            console.log(res);
            console.log('登陆成功');
        }, res => {
            console.log(res);
            console.log('登陆失败');
        }).catch(err => {
            console.log(err);
        });
    },

    // 密码登陆

    phoneNumInput: function (e) { // 获取输入手机号
        this.setData({
            phoneNum: e.detail.value
        })
    },


    passwdInput: function (e) { // 获取输入密码 
        this.setData({
            passwd: e.detail.value
        })
    },


    passwdLogin: function () { // 登录处理
        var phoneNum = this.data.phoneNum,
            passwd = this.data.passwd;

        // 检查手机号和密码的基本正确性
        if (!libAPI.checkPhoneNum(phoneNum) || !libAPI.checkPasswdLogin(passwd)) {
            return false;
        }

        Bmob.User.login(phoneNum, passwd).then(res => {
            console.log(res);
            wx.showToast({
                title: '登陆成功',
                icon: 'success',
                duration: 1500
            });
            this.setData({
                loginStatus: true
            })
            wx.navigateTo({
                url: '/pages/mine/mine',
            });
        }, res => {
            console.log(res);
            console.log('Error');
        }).catch(err => {
            console('loginWithPasswd:', err);
        });
    },

    // 用户注册
    // 用户输入手机号事件
    userPhoneNumberInput: function (e) {
        this.setData({
            phoneNum: e.detail.value
        });
    },

    // 用户输入密码事件
    userPasswdFirstInput: function (event) {
        this.setData({
            passwdFirst: event.detail.value
        })
    },

    // 用户重复输入密码事件
    userPasswdSecondInput: function (event) {
        this.setData({
            passwdSecond: event.detail.value
        })
    },

    // 用户输入验证码事件
    userSmsCodeInput: function (event) {
        this.setData({
            smsCode: event.detail.value
        })
    },

    // 发送验证码到用户输入的手机
    smsCodeGetButtonClick: function () {
        var res = libAPI.requestSmsCode(this.data.phoneNum);
        if (res == -1) {
            console.error('smsCodeGetButtonClick: 验证码发送失败', err);
        } else if (res == -2) {
            console.error('smsCodeGetButtonClick: 手机号输入错误，错误的手机号为', phoneNum);
        } else {
            console.log(res);
        }
    },

    // 注册按钮点击事件
    registerButtonClick: function () {
        // 此函数不需要检测手机号正确性，因为在发送验证码时已经进行了检测
        // 检查密码正确性
        if (!libAPI.checkPasswdRegister(this.data.passwdFirst, this.data.passwdSecond)) {
            return false;
        }

        // 安全性检查通过，可以构造用户参数，以完成注册
        var that = this;
        let userparams = {
            username: that.data.userName,
            password: that.data.passwdFirst,
            //email: that.data.userEmail,
            phone: that.data.phoneNum,
        };

        // 验证码验证函数调用成功的回调函数
        let verifySmsCodeSuccess = function (res) {
            // 调用注册函数，传入用户参数进行注册
            return Bmob.User.register(userparams); // 将该函数的返回值作为返回值返回
        };
        // 验证码验证函数调用失败的回调函数
        let verifySmsCodeFailed = function (err) {
            wx.showToast({
                title: '抱歉，验证码错误',
                icon: 'error',
                duration: 1500
            });
            console.log(userparams);
            console.error(err);
        };

        // 注册函数调用成功的回调函数
        let registerSuccess = function (res) {
            // 根据返回值 res 来判定本次用户注册是否成功
            if (res !== undefined) {
                wx.showToast({
                    title: '恭喜，注册成功',
                    icon: 'success',
                    duration: 1500
                });
                console.log(userparams);
                that.setData({
                    registerStatus: true,
                });
            } else {
                wx.showToast({
                    title: '注册失败',
                    icon: 'error',
                    duration: 1500
                });
                console.log('注册失败');
            }
        };
        // 注册函数调用失败的回调函数
        let registerFailed = function (err) {
            console.log(err);
            console.log('调用注册函数不成功');
        };

        // 按照格式构造传入函数 Bmob.verifySmsCode 的参数
        let smsCodeInput = this.data.smsCode
        let phoneNumInput = {
            mobilePhoneNumber: this.data.phoneNum
        };
        // 验证码核查，确认用户的手机号可用
        Bmob.verifySmsCode(smsCodeInput, phoneNumInput).then(verifySmsCodeSuccess, verifySmsCodeFailed).then(registerSuccess, registerFailed).catch(err => {
            console.error(err);
        });

        // 一系列检查通过，说明用户所填写的信息无误，可以完成注册
        if (this.registerStatus == true) {
            wx.setStorageSync('userRegisterInfo', this.data); // 将用户信息存到本地缓存
            wx.navigateTo({
                url: '/pages/login_register/login_register'
            }) // 跳转到登录页面
        }
    },
})