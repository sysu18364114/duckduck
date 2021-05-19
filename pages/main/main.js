// pages/main/main.js
var Bmob = require('../../utils/Bmob-2.2.5.min.js');
var preList = [];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    disc_style:"bolder",
    /* 底部导航栏颜色设置 */
    disc_pic: "/images/绿发现.png",
    add_pic: "/images/灰加号.png",
    mesg_pic: "/images/灰消息.png",
    mine_pic: "/images/灰我的.png",
    //顶部轮播图
    imgUrls: [
      '/images/picture2.jpg',
      '/images/picture3.jpg',
      '/images/picture4.jpg'
    ],
    //第一组功能
    contentImgUrls1:[
      {
        title: '树洞',
        url: '/images/树洞.png',
        page: '/pages/treehole/treehole'
      },{
        title: '招募',
        url: '/images/招募.png',
        page: '/pages/recruit/recruit'
      },{
        title: '课程评价',
        url: '/images/课程评价.png',
        page: '/pages/evaluation/evaluation'
      }
    ],

    //第二组功能
    contentImgUrls2:[
      {
        title: '资料分享',
        url: '/images/资料分享.png',
        page: '/pages/share/share'
      },{
        title: '闲置',
        url: '/images/闲置.png',
        page: '/pages/idle/idle'
      },{
        title: '失物招领',
        url: '/images/失物招领.png',
        page: '/pages/lost_found/lost_found'
      }
    ],

    /* 实时动态部分*/
    list:[],

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
    /* 加载帖子 */
    const link = Bmob.Query("Post");
    link.include('userPtr');
    link.limit(10);
    link.order("-updatedAt");
    link.find().then(res1=>{
      //console.log(res1[0].userPtr.icon);
      var id = new Array(); //用于存储objectId
      var j = 0;

      while(j < 10){
        var avatar = res1[j].userPtr.icon;
        preList.splice(j, 0, 
          { face_url: avatar,
            username: res1[j].username,
            send_timestamp:res1[j].updatedAt,
            title:res1[j].PostTitle,
            content:res1[j].PostText,
            total_likes:res1[j].likes,
            //这里需要添加根据图片的来添加图片url，以及根据数量来调整布局的功能
            img_list:[
              {img_url: "/post_imgs/img1.jpg",},
              {img_url:"/post_imgs/img2.jpg"}
            ],
          });
        j = j + 1;
      }
      this.setData({
        list:preList
      })

    }).catch(err =>{
      console.log(err);
    })
    

    
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