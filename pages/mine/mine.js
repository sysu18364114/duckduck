// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mine_style:"bolder",
    disc_pic: "/images/灰发现.png",
    add_pic: "/images/灰加号.png",
    mesg_pic: "/images/灰消息.png",
    mine_pic: "/images/绿我的.png",
    loginStatus: false,
    testName:"玉树临风",
    userInfo: getApp().globalData.userInfo,
  },

  display:function(){
    this.userInfo=wx.getStorageSync('userInfo');
  },

  //页面跳转
  disc_select: function(){
    wx.redirectTo({
      url: '../main/main',
    })
  },

  registerSelect: function() {
    var that=this;
    // that.setData({loginStatus:true});
    wx.navigateTo({
      url: '/pages/login_register/login_register'
    })
  },

  add_select: function(){
    wx.redirectTo({
      url: '/pages/post/post',
    })
  },

  mesg_select: function(){
    wx.redirectTo({
      url: '../message/message',
    })
  },

  mine_select: function(){
    /*wx.redirectTo({
      url: '../mine/mine',
    })*/
  },
})