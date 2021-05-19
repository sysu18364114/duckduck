// app.js

var Bmob = require('utils/Bmob-2.2.5.min.js'); 
Bmob.initialize("8f5bb033f6066ba1", "000518");

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  globalData: {
    user: {}, //后台返回用户全部信息
    userInfo: {}, //微信获取用户信息
  }
  
})
