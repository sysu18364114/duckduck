// pages/user_info/user_info.js

const util = require('../libs/util.js');
const defaultStr='待输入';
const defaultGender=0;
const defaultImagePath='/images/鸭子 duck.png';

// TODO: 整理函数；构造打包数据；撰写注释
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,

    newAvatarUrl: undefined,

    genderShow: false,
    show: false,

    genderColumns: ['男', '女', '其他'],

    currentDate: new Date().getTime(),
    minDate: new Date(1900, 1, 1).getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },

    nickName: "待获取",
    avatarUrl: "待获取",
    gender: "待获取",
    province: "待获取",
    city: "待获取",
    country: "待获取",

    birthday: "待输入",
    sentence: "待输入",
    constellation: "待输入",
    modifyStatus: false,
  },

  selectNewAvatar() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          newAvatarUrl: tempFilePaths
        });
      },
      failed(res) {
        console.log('照片选取失败：', res);
      }
    });
  },

  showPopupGender() {
    this.setData({
      genderShow: true
    })
  },
  onCloseGender() {
    this.setData({
      genderShow: false
    });
  },

  confirmGender(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    console.log(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      gender: value,
      genderShow: false
    });
  },
  cancelGender() {
    this.setData({
      genderShow: false
    });
  },

  // 时间-当点击对应Cell组件时，显示弹出框
  showPopup() {
    this.setData({
      show: true
    });
  },

  // 时间-当点击弹出框外部区域时，关闭弹出框
  onClose() {
    this.setData({
      show: false
    });
  },

  // 时间-当值变化时触发的事件
  onInput(event) {
    var newTime = new Date(event.detail);
    if (this.data.show == 0) {
      newTime = null;
    } else {
      console.log(event.detail);
      newTime = util.formatTime(newTime);
    }
    this.setData({
      currentDate: event.detail,
      start_date: newTime,
    });
  },

  // 时间-确定按钮
  confirmBirthday(event) {
    var newTime = new Date(event.detail);
    newTime = util.formatTime(newTime, 'YYYY-MM-DD');
    console.log(event.detail);
    this.setData({
      birthday: newTime,
      show: false
    });

  },

  // 时间-取消按钮
  cancelBirthday() {
    this.setData({
      show: false
    });
  },

  // 页面-修改/确认修改个人信息
  statusSwitch: function () {
    var that = this;
    that.setData({
      modifyStatus: !that.data.modifyStatus,
    });
  },

  onChangeNickName: function (event) {
    this.setData({
      nickName: event.detail
    });
  },

  onChangeGender(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    console.log(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      gender: value
    });
  },

  onChangeCountry: function (event) {
    this.setData({
      country: event.detail
    });
  },

  onChangeCity: function (event) {
    this.setData({
      city: event.detail
    });
  },

  onChangeSentence: function (event) {
    this.setData({
      sentence: event.detail
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = getApp().globalData.userInfo;
    console.log(userInfo);

    var nickName = userInfo.nickName;
    var avatarUrl = userInfo.avatarUrl ? userInfo.avatarUrl : defaultImagePath;
    var gender = userInfo.gender ? userInfo.gender : defaultGender; // 性别 0：未知, 1：男, 2：女
    var province = userInfo.province ? userInfo.province : defaultStr;
    var city = userInfo.city ? userInfo.city : defaultStr;
    var country = userInfo.country ? userInfo.country : defaultStr;
    if (gender == 1) {
      gender = '男';
    } else if (gender == 2) {
      gender = '女';
    } else {
      gender = '未知';
    }

    that.setData({
      nickName: nickName,
      avatarUrl: avatarUrl,
      gender: gender,
      country: country,
      province: province,
      city: city,
    });
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