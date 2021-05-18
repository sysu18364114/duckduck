// pages/treehole/treehole.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disc_style:"bolder",
    disc_pic: "/images/绿发现.png",
    add_pic: "/images/灰加号.png",
    mesg_pic: "/images/灰消息.png",
    mine_pic: "/images/灰我的.png",
   //如果需要修改不同图片数量时图片展示的大小可以修改这里 photoWidth: wx.getSystemInfoSync().windowWidth / 5,
    list:[
      {
        face_url:"/images/绿我的.png",
        username:"哆啦A梦",
        send_timestamp:"2021-4-24 15:00",
        title:"实验室招募",
        content:"哆啦A梦实验室招新啦！有意者请联系大雄~",
        img_list:[
          {img_url:"/post_imgs/img4.jpg"}
        ],
        total_likes:1000,
      },
      {
        face_url:"/images/绿发现.png",
        username:"BonnieBear",
        send_timestamp:"2021-4-25 14:42",
        title:"闲聊",
        content:"bibidibobidiboo",
        img_list:[
          {img_url:"/post_imgs/img1.jpg"},
          {img_url:"/post_imgs/img2.jpg"}
        ],
        total_likes:99,
      },
      {
        face_url:"/images/绿消息.png",
        username:"皮卡丘",
        send_timestamp:"2021-4-25 01:35",
        title:"闲聊",
        content:"皮卡皮卡",
        img_list:[
          {img_url:"/post_imgs/img7.jpg"},
          {img_url:"/post_imgs/img8.jpg"},
          {img_url:"/post_imgs/img9.jpg"},
          {img_url:"/post_imgs/img10.jpg"}
        ],
        total_likes:50,
      },
      {
        face_url:"/images/绿点赞.png",
        username:"毛利小五郎",
        send_timestamp:"2021-4-20 01:35",
        title:"公告",
        content:"最近发生了一起入室盗窃案，希望大家向我们提供线索",
        img_list:[
          {img_url:"/post_imgs/img3.jpg"},
          {img_url:"/post_imgs/img5.jpg"},
          {img_url:"/post_imgs/img6.jpg"}
        ],
        total_likes:50,
      },
    ]
  },
  
  //页面跳转
  disc_select: function(){
    wx.redirectTo({
      url: '../main/main',
    })
  },

  add_select: function(){
    wx.redirectTo({
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
  onShow: function () {

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