const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discounts: [],
    drivers: [],
    disId: [],
    driId: []
  },

  getActAndSchool() {
    var that = this;
    wx.request({
      url: `${app.globalData.http}` + 'api/v1/signlist',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

        'token': app.globalData.Token
      },
      success(res) {
        console.log(res);
        let disarr = res.data.discount.map(item => item.title);
        let disId = res.data.discount.map(item => item.id);
        let driId = res.data.coach.map(item => item.id);
        let driarr = res.data.coach.map(item => item.name)
        that.setData({
          discounts: disarr,
          drivers: driarr,
          disId: disId,
          driId: driId
        })

      }
    })
  },

  bindDriverChange(e) {
    this.setData({
      drValue: this.data.drivers[e.detail.value],
      coach_id: this.data.driId[e.detail.value]
    })
  },

  bindDisChange(e) {
    this.setData({
      disValue: this.data.discounts[e.detail.value],
      dis_id: this.data.disId[e.detail.value]
    })
  },

  sendMessage(e) {
    var that = this;
    let truename = e.detail.value.truename
    // console.log(truename)
    let number = e.detail.value.number
    // console.log(number)
    let address = e.detail.value.address
    // console.log(address)
    if (truename == '' || number == '' || address == '') {
      wx.showToast({
        title: '请至少填满必选项',
        icon: 'none',
        duration: 1000
      })
      return
    }
    if (!(/^1[3456789]\d{9}$/.test(number))) {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 1000
      })
      return
    }
    if (!(/[\u4e00-\u9fa5]{2,}/.test(truename))) {
      wx.showToast({
        title: '请正确输入您的名字',
        icon: 'none',
        duration: 1000
      })
      return
    }
    wx.showLoading({
      title: '上传中',
    })
    wx.request({
      url: `${app.globalData.http}` + 'api/v1/sign',
      method: "post",
      data: {
        truename: e.detail.value.truename,
        number: e.detail.value.number,
        address: e.detail.value.address,
        coach_id: that.data.coach_id,
        discount_id: that.data.dis_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

        'token': app.globalData.Token
      },
    })
    setTimeout(function () {
      wx.hideLoading()
      that.setData({
        none: 'none',
        daka_t: '',
        // disabled: true
      })
      wx.navigateBack({
        delta: 1
      })
    }, 500)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getActAndSchool()
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