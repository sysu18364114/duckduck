// pages/code_login/code_login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phoneNum : '',
        smsId : '',
        smsCode : ''
    },

    userPhoneNumberInput: function (e) {
        this.setData({
            phoneNum: e.detail.value
        });
    },
    userSmsCodeInput: function (e) {
        this.setData({
            smsCode: e.detail.value
        })
    },
    smsCodeGetButtonClick: function () {
        
    },
    loginButtonClick: function () {

    },
})