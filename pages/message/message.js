// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mesg_style:"bolder",
    disc_pic: "/images/灰发现.png",
    add_pic: "/images/灰加号.png",
    mesg_pic: "/images/绿消息.png",
    mine_pic: "/images/灰我的.png",
  },

  disc_select: function(){
    wx.redirectTo({
      url: '../main/main',
    })
  },

  add_select: function(){
    wx.redirectTo({
      url: '/pages/post/post',
    })
  },

  mesg_select: function(){
    /*wx.redirectTo({
      url: '../message/message',
    })*/
  },

  mine_select: function(){
    wx.redirectTo({
      url: '../mine/mine',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.hideHomeButton();  //隐藏home返回主页按钮
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})