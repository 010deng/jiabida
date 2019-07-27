const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: 0
  },


  navigTo() {
    wx.request({
      url: `${app.globalData.http}api/v1/enroll_status`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

        'token': app.globalData.Token
      },
      success(res) {
        console.log(res)
        if (res.data.flag == 1) {
          // 已报名
          wx.showModal({
            title: '提示',
            content: '检测到您已经绑定教练，点击确定将为您跳转到预约练车界面',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../appointment/appointment'
                })
              }
            }
          })
        } else {
          wx.navigateTo({
            url: '../sign/sign'
          })
        }
      }
    })
  },

  toProtect() {
    wx.request({
      url: `${app.globalData.http}api/v1/enroll_status`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

        'token': app.globalData.Token
      },
      success(res) {
        console.log(res)
        if (res.data.flag == 1) {
          wx.navigateTo({
            url: '../protect/protect'
          })
        } else {
          wx.showToast({
            title: '请先绑定教练',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  toAppointment() {
    wx.request({
      url: `${app.globalData.http}api/v1/enroll_status`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

        'token': app.globalData.Token
      },
      success(res) {
        console.log(res)
        if (res.data.flag == 1) {
          // 已报名
          wx.navigateTo({
            url: '../appointment/appointment'
          })
        } else {
          wx.showToast({
            title: '请先绑定教练',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })


  },

  getUserInfo() {
    var that = this
    wx.getUserInfo({
      success(res) {
        const userInfo = res.userInfo
        const nickName = userInfo.nickName
        const avatarUrl = userInfo.avatarUrl
        that.setData({
          userInfo: userInfo,
          nickName: nickName,
          avatarUrl: avatarUrl
        })

      }
    })
  },

  getSchedule() {
    var that = this
    wx.request({
      url: `${app.globalData.http}api/v1/schedule`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'token': app.globalData.Token
      },
      success(res) {
        console.log(res)
        that.setData({
          select:res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
    this.getSchedule();
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