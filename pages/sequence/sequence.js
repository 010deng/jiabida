const app = getApp()
Page({
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
    swiperIndex: 0,
    swiperIndex_bottom: 1,
    allNum: 1312,
    // 判断哪些选项被选中 -- 初始全都未选中
    selectIndex: [{
      sureid: false
    },
    {
      sureid: false
    },
    {
      sureid: false
    },
    {
      sureid: false
    },
    ],
  },


  // 无论是否正确弹出解析,底部正确错误计数
  radioChange(e) {
    var that = this
    console.log(e)
    console.log(e.detail.value)
    if (e.detail.value == e.currentTarget.dataset.answer) {
      wx.request({
        url: `${app.globalData.http}api/v1/answer/over/${e.currentTarget.dataset.id}/${that.data.swiperIndex_bottom}/Y`,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",

          'token': app.globalData.Token
        },
      })
      let r_number = that.data.r_number + 1
      that.setData({
        r_number: r_number
      })
    } else {
      wx.request({
        url: `${app.globalData.http}api/v1/answer/wrong/${app.globalData.testFlag}/${e.currentTarget.dataset.id}`,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",

          'token': app.globalData.Token
        },
      })
      wx.request({
        url: `${app.globalData.http}api/v1/answer/over/${e.currentTarget.dataset.id}/${that.data.swiperIndex_bottom}/N`,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",

          'token': app.globalData.Token
        },
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
    })


  },

  // 判断题
  block_r(e) {
    console.log(e)
    var that = this
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

  // 多选题
  CheckBoxChange: function (e) {
    console.log(e)
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let arr = e.detail.value
    this.setData({
      checkArr: arr
    })
  },
  // 确定哪些被选择
  sureSelect(e) {
    var index1 = e.currentTarget.dataset.index - 1; //当前点击元素的自定义数据，这个很关键
    var selectIndex = this.data.selectIndex; //取到data里的selectIndex
    selectIndex[index1].sureid = !selectIndex[index1].sureid; //点击就赋相反的值
    this.setData({
      selectIndex: selectIndex //将已改变属性的json数组更新
    })
  },
  sendAnswer() {
    let answer = this.data.answer
    let checkArr = this.data.checkArr
    let len = checkArr.length
    var str = ''
    for (let i = 0; i < len; i++) {
      str += checkArr[i]
    }
    // console.log(str)
    var that = this
    if (str == answer) {
      wx.request({
        url: `${app.globalData.http}api/v1/answer/over/${that.data.id}/${that.data.swiperIndex_bottom}/Y`,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",

          'token': app.globalData.Token
        },
      })
      let r_number = that.data.r_number + 1
      that.setData({
        r_number: r_number
      })
    } else {
      wx.request({
        url: `${app.globalData.http}api/v1/answer/wrong/${app.globalData.testFlag}/${that.data.id}`,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",

          'token': app.globalData.Token
        },
      })
      wx.request({
        url: `${app.globalData.http}api/v1/answer/over/${that.data.id}/${that.data.swiperIndex_bottom}/N`,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",

          'token': app.globalData.Token
        },
      })
      let w_number = that.data.w_number + 1
      that.setData({
        w_number: w_number
      })
    }
    let checkA = answer.indexOf("A")
    let checkB = answer.indexOf("B")
    let checkC = answer.indexOf("C")
    let checkD = answer.indexOf("D")
    let selectIndex = this.data.selectIndex
    if (selectIndex[0].sureid == true) {
      this.setData({
        hidden_a: 'visible'
      })
    }
    if (selectIndex[1].sureid == true) {
      this.setData({
        hidden_b: 'visible'
      })
    }
    if (selectIndex[2].sureid == true) {
      this.setData({
        hidden_c: 'visible'
      })
    }
    if (selectIndex[3].sureid == true) {
      this.setData({
        hidden_d: 'visible'
      })
    }
    this.setData({
      checkA: checkA,
      checkB: checkB,
      checkC: checkC,
      checkD: checkD,
      bottom: 'bottom',
      blockContain: 'block',
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
      url: `${app.globalData.http}api/v1/answer/collection/${app.globalData.testFlag}/${that.data.id}`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

        'token': app.globalData.Token
      },
      success(res) {
        console.log(res)
      }
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

  getTiku() {
    var that = this;
    wx.request({
      url: `${app.globalData.http}api/v1/answer/tiku_one/${app.globalData.testFlag}/${that.data.swiperIndex_bottom}`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

        'token': app.globalData.Token
      },
      success(res) {
        console.log(res)
        that.setData({
          answer: res.data.answer,
          collection_flag: res.data.collection_flag,
          explain: res.data.explain,
          id: res.data.id,
          over_flag: res.data.over_flag,
          pic: res.data.pic,
          question: res.data.question,
          topic_types: res.data.topic_types,
          topic_status: res.data.topic_status,
          option1: res.data.option1,
          option2: res.data.option2,
          option3: res.data.option3,
          option4: res.data.option4,
        })
        if (that.data.collection_flag == 1) {
          that.setData({
            s_now: `${that.data.star_s}`
          })
        }
        if (that.data.over_flag == 1) {
          that.setData({
            bottom: 'bottom',
            blockContain: 'block'
          })
        }
      }
    })

  },

  swiperChange(e) {
    var that = this
    console.log(e)
    let selectIndex = that.data.selectIndex
    selectIndex.forEach(item => {
      item.sureid = false
    });
    that.setData({
      selectIndex: selectIndex,
      checked: false
    })
    const lastIndex = that.data.swiperIndex,
      currentIndex = e.detail.current
    let flag = false;
    if (lastIndex > currentIndex) {
      console.log(lastIndex, currentIndex)
      lastIndex === 3 && currentIndex === 0 ?
        flag = true :
        null
    } else {
      lastIndex === 0 && currentIndex === 3 ?
        null :
        flag = true
    }
    if (flag && that.data.swiperIndex_bottom >= 1) {
      let swiperIndex_bottom = Number(that.data.swiperIndex_bottom) + 1
      that.setData({
        swiperIndex_bottom: swiperIndex_bottom
      })
    } else if (!flag && that.data.swiperIndex_bottom >= 2) {
      let swiperIndex_bottom = Number(that.data.swiperIndex_bottom) - 1
      that.setData({
        swiperIndex_bottom: swiperIndex_bottom
      })
    } else if (!flag && that.data.swiperIndex_bottom === 1) {
      wx.showToast({
        title: '已经是第一题了',
        icon: 'none',
        duration: 1000
      })
    }
    that.setData({
      swiperIndex: currentIndex,
    })
    that.setData({
      s_now: that.data.star,
      result: null,
      hidden_r: 'hidden',
      hidden_w: 'hidden',
      hidden_a: 'hidden',
      hidden_b: 'hidden',
      hidden_c: 'hidden',
      hidden_d: 'hidden',
    })
    if (that.data.model == 'test') {
      that.setData({
        bottom: 'bottom_none',
        blockContain: 'none'
      })
    }
    that.getTiku();
  },

  getTikuNum() {
    var that = this
    wx.request({
      url: `${app.globalData.http}api/v1/answer/count/${app.globalData.testFlag}`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

        'token': app.globalData.Token
      },
      success(res) {
        console.log(res)
        that.setData({
          nowIndex: res.data.number
        })
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      swiperIndex_bottom: app.globalData.skipNum
    })
    // 检测手机的高度
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - 120 - 30
    })

    this.getTiku()
    // console.log(app.globalData.testFlag)
    if (app.globalData.testFlag == 4) {
      this.setData({
        allNum: 1121
      })
    }
    // this.getTikuNum()

    wx.request({
      url: `${app.globalData.http}api/v1/answer/over_status`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

        'token': app.globalData.Token
      },
      success(res) {
        console.log(res)
      }
    })
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
    // 题目做完时的操作
    var that = this
    wx.request({
      url: `${app.globalData.http}api/v1/answer/stop/${app.globalData.testFlag}/${that.data.swiperIndex_bottom}/${that.data.id}`,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

        'token': app.globalData.Token
      },
    })
  },

})