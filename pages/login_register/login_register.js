// pages/login_register/login_register.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    // 根据用户的点击完成页面的跳转
    smsCodeButtonClick: function () {
        wx.navigateTo({
            url: '/pages/code_login/code_login',
        })
    },
    passwdButtonClick: function () {
        wx.navigateTo({
            url: '/pages/passwd_login/passwd_login',
        })
    },
    registerButtonClick: function () {
        wx.navigateTo({
            url: '/pages/register/register',
        })
    }
})