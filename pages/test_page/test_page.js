// pages/projectadd/add.js
let App = getApp();
// import { Base } from '../../utils/base.js'
// const util = require('../../utils/util.js')
// var base = new Base();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catename:'',
    cateid:'',
    openid:null,
    display: false,
    show: false,
    show1: false,
    currentDate: new Date().getTime(),//初始日期//时间戳补3位
    currentDate1: new Date().getTime(),//初始日期//时间戳补3位
    minDate: App.globalData.minDate,//最小时间
    maxDate: App.globalData.maxDate,//最大时间
    //时间-显示赋值
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      }
      return value;
    }
  },
  //时间-当值变化时触发的事件start
  onInput(event) {
    var newTime = new Date(event.detail);
    if(this.data.show==0){
      newTime =null;
    }else{
      //console.log(event.detail);
      newTime = util.formatTime(newTime);
    }
    this.setData({
      currentDate: event.detail,
      start_date: newTime,
    });
  },
  //时间-当值变化时触发的事件end
  onInput1(event) {
    var etime = event.detail+(86400-1)*1000;
    var newTime = new Date(etime);
    if (this.data.show1 == false) {
      newTime = null;
    } else {
      //console.log(event.detail);
      newTime = util.formatTime(newTime);
    }

    //console.log(newTime);
    this.setData({
      currentDate1: event.detail,
      end_date: newTime,
     // key1:1,
    });
  },
  //时间-弹出框
  showPopup() {
    this.setData({ key: 1 });
    this.setData({ show: true });
   
  },
  //时间-弹出框
  showPopup1() {
    this.setData({ key1: 1 });
    this.setData({ show1: true });
  
  },
  //时间-弹出框关闭
  onClose() {
    this.setData({ show: false });
    this.setData({ show1: false });
  },
  // 时间-确定按钮
  confirmFn(e) {
    var newTime = new Date(e.detail);
    newTime = util.formatTime(newTime);
    this.setData({ start_date: newTime });
   //console.log(e.detail);
    this.setData({ show: false });
  
  },
  // 时间-确定按钮
  confirmFn1(e) { 
    var newTime = new Date(e.detail);
    newTime = util.formatTime(newTime);
    this.setData({ end_date: newTime });
    this.setData({ show1: false });
  },
  // 时间-取消按钮
  cancelFn() { 
    this.setData({ show: false });
    this.setData({ show1: false });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let _this = this;
    let openid = App.hasOpenid()
    _this.setData({
      catename : options.catename,
      cateid : options.cateid,
      openid: openid
    });

  },

  /**
   * 表单提交
   */
  saveData: function (e) {
    let _this = this;
    let values = e.detail.value;
    //console.log(values);
   
    // 表单验证
    if (!_this.validation(values)) {
      App.showError(_this.data.error);
      return false;
    }
   // return false;
    // 按钮禁用
    _this.setData({
      disabled: true
    });

    // 提交到后端
    App._post('index/project/add_project', values, function (result) {
      App.showSuccess(result.msg, function () {
          //wx.navigateBack();
          // 跳转授权页面
          wx.switchTab({
            url: "/pages/projectadd/projectadd"
          });
      });
    }, false, function () {
      // 解除禁用
      _this.setData({
        disabled: false
      });
    });
  },

  /**
   * 表单验证
   */
  validation: function (values) {

    if (values.title.length < 1) {
      this.data.error = '项目标题不能为空';
      return false;
    }
    if (values.start_date.length < 1) {
      this.data.error = '项目起始时间不能为空';
      return false;
    }
    if (values.end_date.length < 1) {
      this.data.error = '项目起始时间不能为空';
      return false;
    }
    /* reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!reg.test(values.phone)) {
      this.data.error = '手机号不符合要求';
      return false;
    }*/

    return true;
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