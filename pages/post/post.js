// pages/post/post.js
var util = require('../../utils/util.js');
var Bmob = require('../../utils/Bmob-2.2.5.min.js');

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
    img_num:0,
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

  


  //输入标题
  bindinputTitle: function(e) {
    this.title = e.detail.value;
  },

  //输入内容
  bindinput: function(e) {
    this.content = e.detail.value;
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
        var img_num = 0;
        if (res.tempFilePaths.length > 0) {
          //把每次选择的图push进数组
          let img_url = me.data.img_url;
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            img_url.push(res.tempFilePaths[i])
          }
          me.setData({
            img_url: img_url
          })
          me.img_url = img_url
          img_num = img_num + 1;
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
        me.setData({
          img_num: img_num
        })
        me.img_num = img_num
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
          var img_num = this.img_num - 1;
          this.data.img_url.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            img_url: this.data.img_url,
            img_num: img_num
          })
          this.img_num = img_num
        }
      }
    })
  },

  //发布动态
  submit: function(){
    var that = this;
    wx.showLoading({
      title: '正在发布',
    })
    
    let current = Bmob.User.current();
    that.setData({
      /*
      userID: current.objectId,
      username: current.username
      */
    })

    const pointer = Bmob.Pointer('_User')
    const poiID = pointer.set("c20197249b")
    
    const query = Bmob.Query('Post');
    query.set('userPtr', poiID)
    query.set('labels', that.label);
    query.set('PostTitle', that.title);
    query.set('PostText', that.content);
    query.set('likes', 0);
    query.set('comment', 0);
  
    //上传帖子内容至云数据库
    query.save().then(res => {
      console.log(res)
      //上传图片
      var img_num = that.img_num
      console.log("length")
      console.log(img_num)
      console.log(typeof img_num)
      if (img_num > 0){
        var file;
        var imgname = "img";
        var img_url = that.img_url
        var n = 1;
        var ID = res.objectId;            //获取帖子ID
        for(let item of img_url){         //将图片上传到Bmob云端中
          file = Bmob.File(imgname.concat(n.toString()).concat(".jpg"), item);
          n = n + 1;
        }
        n = 1;
        file.save().then(res1 => {        //上传图片到同一条帖子
          query.set('id', ID);            //根据帖子ID修改某条记录
          query.set(imgname.concat(n.toString()), res1[n-1].url);
          n = n + 1;
          query.save().then(res2 => {
            console.log(res2)
          }).catch(err2 => {
            console.log(err2)
          })
        })
      }
      wx.hideLoading({
        success: (res) => {},
      })
      setTimeout(() => {
        wx.showToast({
          title: "发布成功",
          icon: "success",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000)
      }, 0);
      wx.redirectTo({
        url: '../main/main',
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading({
        success: (res) => {
        },
      })
      setTimeout(() => {
        wx.showToast({
          title: "发布失败",
          icon: "error",
        });
        setTimeout(() => {
          wx.hideToast();
        }, 1000)
      }, 0);
    })



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