const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: ['上午', '下午']
  },

  sendDate(e) {
    if (e.detail.value.future_date == '' || e.detail.value.picked == '') {
      wx.showToast({
        title: '请将预约信息填写完整',
        icon: 'none'
      })
    }
    else {
      wx.showLoading({
        title: '上传中',
      })
      console.log(e)
      wx.request({
        url: `${app.globalData.http}` + '/api/v1/practice' + '/' + e.detail.value.future_date + '/' + e.detail.value.picked,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",

          'token': app.globalData.Token
        },
      })
      setTimeout(function () {
        wx.hideLoading()
        wx.navigateBack({
          delta: 1
        })
      }, 500)

    }



  },

  bindDateChange(e) {
    this.setData({
      check: e.detail.value
    })

  },

  timeChange(e) {
    this.setData({
      picked: e.detail.value
    })
  },

  formatMonth(month) {
    let monthStr = ''
    if (month > 12 || month < 1) {
      monthStr = Math.abs(month - 12) + ''
    } else {
      monthStr = month + ''
    }
    monthStr = `${monthStr.length > 1 ? '' : '0'}${monthStr}`
    return monthStr
  },

  formatDay(day) {
    return `${(day + '').length > 1 ? '' : '0'}${day}`
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const date = new Date(),
      month = this.formatMonth(date.getMonth() + 1),
      year = date.getFullYear(),
      day = this.formatDay(date.getDate()),
      end = this.formatDay(date.getDate() + 7),
      today = `${year}-${month}-${day}`,
      endDay = `${year}-${month}-${end}`
    this.setData({
      today: today,
      endDay: endDay
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




})