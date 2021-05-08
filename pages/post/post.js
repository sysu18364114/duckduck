// pages/post/post.js
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    add_style:"bolder",
    img_url:[],
    content:""
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
          me.setData({img_url: img_url})
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

  //上传图片
  img_upload: function (goodsId){
    var me = this;
    var imgFilePaths = me.data.img_url;
    var count = me.data.count;
    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: '上传图片中--',
    })
    wx.uploadFile({
      url: serverUrl + '/goods/uploadGoodsImg', 
      filePath: imgFilePaths[count],
      name: 'file',
      formData: {
        goodsId: goodsId      },
      success: function (res) {
          //可统计成功上传图片数
      },
      fail: function (res) {
          //可统计上传失败图片数
      },
      complete: function (res) {
        count++;
        me.setData({
          count: count        })
        if (count >= imgFilePaths.length) {
          var data = JSON.parse(res.data);
          console.log(data);
          wx.hideLoading();
          if (data.status == 200) {
            wx.hideLoading();
            wx.showToast({
              title: '上传成功!~~',
              icon: 'success'
            });
            me.setData({
              count: 0
            })
          } else if (data.status == 500) {
            wx.showToast({
              title: data.msg,
            });
          }
        } else {
          //图片未上传完，递归调用本方法。
          me.uploadGoodsImg(goodsId);
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
    var me = this;
    var img_url = me.data.img_url;
    var index = e.target.dataset.index;
    img_url.splice(index, 1); 
    me.setData({
      img_url: img_url,
      //若当前图片超过9张，则隐藏添加图标；少于9张则显示添加图标。
      hideAdd: me.data.img_url.length <9 ? false : true
    })
  },

  //发布动态
  submit: function(){
    var that = this;
    var user_id = wx.getStorageSync('userid')
    wx.showLoading({
      title: '正在发布',
    })
    that.img_upload()
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