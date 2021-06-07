// pages/user_info/user_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  statusSwitch: function () {
    var that=this;
    that.setData({
      modifyStatus:!that.data.modifyStatus,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var userInfo = getApp().globalData.userInfo;
    console.log(userInfo);
    var nickName = userInfo.nickName
    var avatarUrl = userInfo.avatarUrl
    var gender = userInfo.gender // 性别 0：未知, 1：男, 2：女
    var province = userInfo.province
    var city = userInfo.city
    var country = userInfo.country
    if (gender == 1) {
      gender = '男'
    } else if (gender == 2) {
      gender = '女'
    } else {
      gender = '未知'
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