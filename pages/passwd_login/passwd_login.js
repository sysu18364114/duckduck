// pages/enroll/enroll.js

// 获取应用实例
const app = getApp();
var Bmob = require('../../utils/Bmob-2.2.5.min.js'); // 配置数据库信息

let api_func = require('../libs/register_login.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: '',
    passwd: '',
    loginStatus: false,
  },

  // 获取输入账号 
  phoneNumInput: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },

  // 获取输入密码 
  passwdInput: function (e) {
    this.setData({
      passwd: e.detail.value
    })
  },

  // 登录处理
  passwdLogin: function () {
    var phoneNum = this.data.phoneNum,
      passwd = this.data.passwd;

    // 检查手机号和密码的基本正确性
    if (!api_func.checkPhoneNum(phoneNum) || !api_func.checkPasswdLogin(passwd)) {
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
    }).catch(err => {
      console('loginWithPasswd:', err);
    });
  },
})