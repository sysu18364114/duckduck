// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disc_style:"bolder",
    //顶部轮播图
    imgUrls: [
      '/images/picture1.jpg',
      '/images/picture2.jpg'
    ],
    //第一组功能
    contentImgUrls1:[
      {
        title: '树洞',
        url: '/images/treehole2.png',
        page: '/pages/square/square'
      },{
        title: '招募',
        url: '/images/recruit1.png',
        page: '/pages/recruit/recruit'
      },{
        title: '课程评价',
        url: '/images/小鸭子.png',
        page: '/pages/evaluation/evaluation'
      }
    ],

    //第二组功能
    contentImgUrls2:[
      {
        title: '资料分享',
        url: '/images/internship.png',
        page: '/pages/share/share'
      },{
        title: '闲置',
        url: '/images/available.png',
        page: '/pages/idle/idle'
      },{
        title: '失物招领',
        url: '/images/lostandfound.png',
        page: '/pages/lost_found/lost_found'
      }
    ],

    //用户浏览部分
    
    indicatorDots: true, //显示面板显示点
    autoplay: true,  //自动切换
    interval: 5000, //切换时间
    duration: 1000, //动画时长
    
  },
  
  //页面跳转
  disc_select: function(){

  },

  add_select: function(){
    wx.navigateTo({
      url: '../post/post',
    })
  },

  mesg_select: function(){
    wx.redirectTo({
      url: '../message/message',
    })
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