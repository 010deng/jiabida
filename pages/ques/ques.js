const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testFlag: '1'
  },

  timeRank() {
    setTimeout(
      function () {
        wx.showToast({
          title: '切换到科目一',
          icon: 'success',
          duration: 500
        })
      }, 500)

    // this.getRankList();
    this.setData({
      t_rank: 'choice',
      d_rank: 'unchoice',
      testFlag: '1'
    })
  },

  dakaRank() {
    setTimeout(
      function () {
        wx.showToast({
          title: '切换到科目四',
          icon: 'success',
          duration: 500
        })
      }, 500)
    this.setData({
      d_rank: 'choice',
      t_rank: 'unchoice',
      testFlag: '4'
    })
  },

  toSequence() {
    var that = this
    wx.request({
      url: `${app.globalData.http}api/v1/answer/sign/${that.data.testFlag}`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'token': app.globalData.Token
      },
      success(res) {
        console.log(res.data)
        let skipNum = res.data.number
        wx.showModal({
          title: '提示',
          content: `检测到您已经做到第${res.data.number}题，点击确定继续练习`,
          success(res) {
            if (res.confirm) {
              // 跳转到当前题
              app.globalData.skipNum = skipNum
              wx.navigateTo({
                url: '../sequence/sequence'
              })
            } else if (res.cancel) {
              app.globalData.skipNum = 1
              wx.navigateTo({
                url: '../sequence/sequence'
              })
            }
          }
        })
      }
    })
    app.globalData.testFlag = that.data.testFlag
  },

  toMywrong() {
    wx.navigateTo({
      url: '../mywrong/mywrong'
    })
    app.globalData.testFlag = this.data.testFlag
  },

  toMycollection() {
    wx.navigateTo({
      url: '../mycollection/mycollection'
    })
    app.globalData.testFlag = this.data.testFlag
  },

  toSimulation() {
    wx.navigateTo({
      url: '../Simulation/Simulation'
    })
    app.globalData.testFlag = this.data.testFlag
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