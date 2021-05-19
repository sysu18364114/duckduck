// pages/post/post.js
var util = require('../../utils/util.js');
var Bomb = require('../../utils/Bmob-2.2.5.min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    add_style:"bolder",
    disc_pic: "/images/灰发现.png",
    add_pic: "/images/绿加号.png",
    mesg_pic: "/images/灰消息.png",
    mine_pic: "/images/灰我的.png",
    tabList:[
      {name:"树洞", isSelect:false},
      {name:"招募", isSelect:false},
      {name:"课程评价", isSelect:false},
      {name:"资料分享", isSelect:false},
      {name:"闲置", isSelect:false},
      {name:"失物招领", isSelect:false}
    ],
    label:"",
    title:"",
    content:"",
    img_url:[]
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
    wx.hideHomeButton()
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

  },

  input: function(e){
    this.setData({
      content: e.detail.value
    })
  },

  bindfocus:function(){
    util.clearError(this);
  },

  bindinput: function(e) {
    this.setData({content:e.detail.value});
  },

  //选择标签
  bindChangeTab(e) {
    console.log(e.currentTarget.dataset.index)
    var tab = this.data.tabList
    for (var i = 0; i < tab.length; i++) {
      tab[i].isSelect = false
    }
    tab[e.currentTarget.dataset.index].isSelect = true
    this.setData({
      tabList: tab,
      tabIndex: e.currentTarget.dataset.index
    })
    this.label = tab[e.currentTarget.dataset.index].name
  },

  //选择图片
  chooseimage: function(){
    var me = this;
    wx.chooseImage({
      count: 9, // 默认最多上传9张
      sizeType: ['original', 'compressed'],
      courceType: ['album', 'camera'],
      success: function(res){
        if (res.tempFilePaths.length > 0) {
          //把每次选择的图push进数组
          let img_url = me.data.img_url;
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            img_url.push(res.tempFilePaths[i])
          }
          me.setData({
            img_url: img_url
          })
          //当图片数量大雨9张，隐藏添加图片的按钮
          if (res.tempFilePaths.length >= 8){
            me.setData({
              hideAdd: 1
            })
          }
          else{
            me.setData({
              hideAdd: 0
            })
          }
        }
      }
    })
  },

  //预览图片
  previewImg:function(e){
    var me = this;
    var img_url = me.data.img_url;
    var index = e.target.dataset.index;
    wx.previewImage({
      urls: img_url,
      current : img_url[index],
      success:function(res){
          console.log(res);
      }
    })
  },

  //删除图片
  deleteImg: function (e){
    wx.showModal({
      title: '要删除这张图片吗？',
      content: '',
      cancelColor: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.img_url.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            img_url: this.data.img_url
          })
        }
      }
    })
  },

  //发布动态
  /*
    objectId, userPtr, labels, likes, img1, img2, ...,
    userID, PostText, PostTitle, username, createdAt, updatedAt, ACL
  */
  submit: function(){
    var that = this;
    //var user_id = wx.getStorageSync('userid')
    wx.showLoading({
      title: '正在发布',
    })
    //that.img_upload()

    let current = Bmob.User.current();
    console.log(current)
    that.setData({
      userID: current.objectId,
      username: current.username
    })

    const query = Bmob.Query('Post');
    query.set('userID', that.userID)
    query.set('username', that.username)
    //query.set('labels')
  },

  //上传图片
  img_upload: function (){
    let that = this;
    let img_url = that.data.img_url;
    let img_url_ok = [];
    for (let i=0; i<img_url.length; i++){
      wx.uploadFile({
        filePath: img_url[i],
        name: 'file',
        url: 'http://wechat.homedoctor.com/Moments/upload_do',
        formData: {
          'user': 'test'
        },
        succes: function(res) {
          console.log('上传成功');
          img_url_ok.push(res.data)
          if (img_url_ok.length == img_url.length) {
            var userid = wx.getStorageSync('userid');
            var content = that.data.content;
            wx.request({
              url: 'http://wechat.homedoctor.com/Moments/adds',
              data: {
                user_id: userid,
                images: img_url_ok,
                content: content,
              },
              success: function(res) {
                if (res.data.status == 1){
                  wx.hideLoading()
                  wx.showModal({
                    title: '提交成功',
                    showCancel: false,
                    success: function(res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: '/pages/main/main',
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        },
        fail: function(res){
          console.log('上传失败')
        }
      })
    }
  },

  //页面跳转
  disc_select: function(){
    wx.redirectTo({
      url: '../main/main',
    })
  },

  add_select: function(){
    /*wx.redirectTo({
      url: '/pages/post/post',
    })*/
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
  }
})