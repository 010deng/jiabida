const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tikuList: [],
    bottom: 'bottom_none',
    star: '../../imgs/star.png',
    star_s: '../../imgs/star_s.png',
    s_now: '../../imgs/star.png',
    analysis: '../../imgs/analysis.png',
    analysis_s: '../../imgs/analysis_s.png',
    a_now: '../../imgs/analysis.png',
    right: '../../imgs/right.png',
    wrong: '../../imgs/wrong.png',
    result: null,
    hidden_r: 'hidden',
    hidden_w: 'hidden',
    hidden_a: 'hidden',
    hidden_b: 'hidden',
    hidden_c: 'hidden',
    hidden_d: 'hidden',
    blockContain: 'none',
    r_number: 0,
    w_number: 0,
    model: 'test',
    // 要在原来的基础上加一
    swiperIndex: 1
    // disabled:false
  },

  getCollection() {
    var that = this;
    wx.request({
      url: `${app.globalData.http}api/v1/answer/getcollection/${app.globalData.testFlag}`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

        'token': app.globalData.Token
      },
      success(res) {
        let len = res.data.length
        that.setData({
          tikuList: res.data,
          allNum: len
        })
      }
    })
  },

  // 无论是否正确弹出解析,底部正确错误计数
  radioChange(e) {
    var that = this
    console.log(e)
    console.log(e.detail.value)
    if (e.detail.value == e.currentTarget.dataset.answer) {
      let r_number = that.data.r_number + 1
      that.setData({
        r_number: r_number
      })
    } else {
      wx.request({
        url: `${app.globalData.http}api/v1/answer/wrong/${e.currentTarget.dataset.id}`,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",

          'token': app.globalData.Token
        },
        // success() {
        //   console.log("成功")
        // }
      })
      let w_number = that.data.w_number + 1
      that.setData({
        w_number: w_number
      })
    }
    that.setData({
      bottom: 'bottom',
      result: e.detail.value,
      blockContain: 'block',
      testId: e.currentTarget.dataset.id
      // disabled:true
    })


  },

  // 判断题
  block_r(e) {
    console.log(e)
    var that = this
    // console.log(that.data.result)
    that.setData({
      hidden_r: 'visible',
      hidden_w: 'hidden'
    })
  },
  block_w() {
    this.setData({
      hidden_w: 'visible',
      hidden_r: 'hidden'
    })
  },
  // 选择题
  block_a() {
    this.setData({
      hidden_a: 'visible',
      hidden_b: 'hidden',
      hidden_c: 'hidden',
      hidden_d: 'hidden'
    })
  },
  block_b() {
    this.setData({
      hidden_b: 'visible',
      hidden_a: 'hidden',
      hidden_c: 'hidden',
      hidden_d: 'hidden'
    })
  },
  block_c() {
    this.setData({
      hidden_c: 'visible',
      hidden_a: 'hidden',
      hidden_b: 'hidden',
      hidden_d: 'hidden'
    })
  },
  block_d() {
    this.setData({
      hidden_d: 'visible',
      hidden_a: 'hidden',
      hidden_b: 'hidden',
      hidden_c: 'hidden'
    })
  },

  // 收藏 --在翻页的时候收藏消失，然后要通过后台判断该题是否收藏，在页面改变的时候做出判断
  changeC() {
    let s_now = this.data.s_now;
    let setNow = (s_now == this.data.star ? this.data.star_s : this.data.star);
    this.setData({
      s_now: setNow
    })
    var that = this
    wx.request({
      url: `${app.globalData.http}api/v1/answer/collection/${that.data.testId}`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

        'token': app.globalData.Token
      },
    })
  },

  //切换到背题模式 
  changeA() {
    let a_now = this.data.a_now;
    let setNow = (a_now == this.data.analysis ? this.data.analysis_s : this.data.analysis);
    wx.showToast({
      title: '切换中',
      icon: 'loading',
      duration: 500
    })
    this.setData({
      a_now: setNow
    })
    console.log(setNow)
    if (setNow == this.data.analysis) {
      this.setData({
        bottom: 'bottom_none',
        // 答题模式
        model: 'test',
        blockContain: 'none'
      })
    } else {
      this.setData({
        bottom: 'bottom',
        // 背题模式
        model: 'analysis',
        blockContain: 'block'
      })
    }
  },

  swiperChange(e) {
    console.log(e)
    let swiperIndex = e.detail.current + 1
    this.setData({
      s_now: this.data.star,
      result: null,
      hidden_r: 'hidden',
      hidden_w: 'hidden',
      hidden_a: 'hidden',
      hidden_b: 'hidden',
      hidden_c: 'hidden',
      hidden_d: 'hidden',
      swiperIndex: swiperIndex
    })
    if (this.data.model == 'test') {
      this.setData({
        bottom: 'bottom_none',
        blockContain: 'none'
      })
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 检测手机的高度
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - 120 - 30
    })
    this.getCollection()
    // this.getTikuNum()
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