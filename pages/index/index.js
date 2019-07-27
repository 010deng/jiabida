const app = getApp()

Page({
  data: {
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    schoolList: [],
    swiperList: [],
    t_school: 'active',
    activityList: [],
    title: 0,
    content: [],
    selected: [false, false, false, ...false], // 这里表示列表项是否展开，默认初始时此数组的元素全为fasle，表示都没展开
    active: null
  },



  show(e) {
    let index = e.currentTarget.dataset.index;
    let active = this.data.active;

    this.setData({
      [`selected[${index}]`]: !this.data.selected[`${index}`],
      active: index
    });

    // 如果点击的不是当前展开的项，则关闭当前展开的项
    // 这里就实现了点击一项，隐藏另一项
    if (active !== null && active !== index) {
      this.setData({ [`selected[${active}]`]: false });
    }
  },


  getschoolList() {
    var that = this
    wx.request({
      url: `${app.globalData.http}` + 'api/v1/index',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

        'token': app.globalData.Token
      },
      success(res) {
        let label=  res.data.coachs.map(item => item.label)
        console.log(res);
        that.setData({
          schoolList: res.data.coachs,
          swiperList: res.data.images,
          title: 0,
          numbers: res.data.number,
          label:label
        })
      }

    })
  },

  getActivity() {
    var that = this;
    wx.request({
      url: `${app.globalData.http}` + 'api/v1/discount',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",

        'token': app.globalData.Token
      },
      success(res) {
        console.log(res)
        that.setData({
          activityList: res.data,
          title: 1
        })
        that.breakWord()
      }
    })
  },
  // 换行
  breakWord() {
    let activityList = this.data.activityList;
    let len = activityList.length;
    let arr = [];
    // console.log(len)
    for (let i = 0; i < len; i++) {
      let str = activityList[i].content;
      str = str.replace(/\r\n/g, "\n");
      arr.push(str)
    }
    this.setData({
      content: arr
    })
  },

  activeschool() {
    wx.showToast({
      title: '切换中',
      icon: 'loading',
      duration: 500
    })
    this.setData({
      t_school: 'active',
      t_act: ''
    })
    this.getschoolList();
  },

  activity() {
    wx.showToast({
      title: '切换中',
      icon: 'loading',
      duration: 500
    })
    this.setData({
      t_act: 'active',
      t_school: ''
    })
    this.getActivity();

  },

  toDetail(e) {
    // console.log(e.currentTarget.dataset.id)
    app.globalData.index_dri_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail'
    })
  },

  toAdv(e) {
    app.globalData.index_swi_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../adv/adv'
    })
  },

  toSign() {
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
            content: '检测到您已经报名，点击确定将为您跳转到预约练车界面',
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

  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success(res) {
              that.setData({
                userInfo: res.rawData
              })
              wx.login({
                success(res) {
                  console.log(res)
                  if (res.code) {
                    wx.request({
                      url: `${app.globalData.http}api/v1/token/user`,
                      method: "post",
                      data: {
                        code: res.code,
                        raw_data: that.data.userInfo
                      },
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      success(res) {
                        app.globalData.Token = res.data;
                        that.getschoolList();
                        console.log(app.globalData.Token);

                      }
                    })
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                }
              })
            }
          });
        } else {
          wx.redirectTo({
            url: '../login/login'
          })
        }
      }
    });
  },
})
