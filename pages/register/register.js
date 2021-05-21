var app = getApp(); // 获取 app 实例

var Bmob = require('../../utils/Bmob-2.2.5.min.js'); // 配置数据库信息

let api_func = require('../libs/register_login.js');

// 调用参数要用 this.data.参数
// 设置参数值，要使用 this.setData({}) 方法
Page({
  data: {
    infoText: '',

    phoneNum: '',
    smsId: '',
    smsCode: '',

    userName: 'test',
    userEmail: 'default@duck.com',

    passwdFirst: '',
    passwdSecond: '',

    registerStatus: false,

    success: false
  },

  // 用户输入手机号事件
  userPhoneNumberInput: function (e) {
    this.setData({
      phoneNum: e.detail.value
    });
  },
  // 这两个模块暂定调整到用户个人信息页面
  // // 用户输入用户名事件
  // userNameInput: function (event) {
  //   this.setData({
  //     userName: event.detail.value
  //   })
  // },
  // // 用户输入邮箱事件
  // userEmailInput: function (event) {
  //   this.setData({
  //     userEmail: event.detail.value
  //   })
  // },
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
    var res = api_func.requestSmsCode(this.data.phoneNum);
    if (res == -1) {
      console.error('smsCodeGetButtonClick: 验证码发送失败', err);
    } else if (res == -2) {
      console.error('smsCodeGetButtonClick: 手机号输入错误，错误的手机号为', phoneNum);
    } else {
      console.log(res);
      // console.log('smsId:', res.smsId);
      // this.setData({
      //   smsId: res.smsId
      // })
    }
  },

  // 注册按钮点击事件
  registerButtonClick: function () {
    // 此函数不需要检测手机号正确性，因为在发送验证码时已经进行了检测
    // 检查密码正确性
    if (!api_func.checkPasswdRegister(this.data.passwdFirst, this.data.passwdSecond)) {
      return false;
    }

    // // 如果用户没有填写用户名，则默认将手机号设置为用户名
    // if (api_func.checkIsEmpty(this.data.userName)) {
    //   this.setData({
    //     userName: this.data.phoneNum
    //   })
    // }
    // // 如果用户没有填写邮箱，则默认分配一个字符串作为邮箱
    // if (api_func.checkIsEmpty(this.data.userEmail)) {
    //   this.setData({
    //     userEmail: 'default@duck.com'
    //   })
    // }

    // 验证码核查，目的是确认用户的手机号有效可用
    let smsCodeInput = this.data.smsCode
    let phoneNumInput = {
      mobilePhoneNumber: this.data.phoneNum
    }
    // verifySmsCode 方法返回值，成功时返回 {"msg": "ok"}
    Bmob.verifySmsCode(smsCodeInput, phoneNumInput).then(function (res) {
      console.log(res); // 这里显示 {msg: "ok"}
      console.log('test');
      // 往后就log不出来了？
      let userparams = {
        username: this.data.userName,
        password: this.data.passwdFirst,
        email: this.data.userEmail,
        phone: this.data.phoneNum,
      };
      console.log('test2');
      console.log(userparams);
      Bmob.User.register(userparams).then(res => { // 将用户信息提交注册
        wx.showToast({
          title: '恭喜，注册成功',
          icon: 'success',
          duration: 1500
        });
        console.log('注册成功', res);
        this.setData({
          registerStatus: true,
        });
      }).catch(err => {
        console.error(err)
      });

    }, function(err) {
      wx.showToast({
        title: '抱歉，验证码错误',
        icon: 'error',
        duration: 1500
      });
      console.error(err);
    });

    // 一系列检查通过，说明用户所填写的信息无误，注册可以完成
    if (this.registerStatus == true) {
      wx.setStorageSync('userRegisterInfo', this.data); // 将用户信息存到本地缓存
      wx.navigateTo({
        url: '/pages/login_register/login_register'
      }) // 跳转到下一个页面（登陆页面）
    }
  },

  // // 用户选择使用密码登陆
  // passwdLogin: function () {
  //   wx.navigateTo({
  //     url: '/pages/enroll/enroll'
  //   })
  // },
  // // 用户选择使用手机验证码登陆
  // smsCodeLogin: function () {
  //   wx.navigateTo({
  //     url: '/pages/smscodelogin/smscodelogin',
  //   })
  // },
})