const app = getApp()
const utils = require("../../../utils/utils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const url = app.globalData.doubanBaseUrl + '/v2/movie/subject/' + options.id
    utils.http(url, this.processDoubanData)
  },
  processDoubanData: function (data) {
    let movie = {
      movieImg: data.images ? data.images.large : "",
      title:data.title,
      countries: utils.convertArrayToString(data.countries, " / "),
      year: data.year,
      collect_count: data.collect_count,
      comments_count: data.comments_count,
      original_title: data.original_title,
      score: data.rating.average,
      stars: utils.convertToStarsArray(data.rating.stars),
      directors: utils.convertObjectToString(data.directors || {}, "name"),
      casts: utils.convertObjectToString(data.casts || {},"name"),
      castsInfo: utils.convertCastsInfo(data.casts || {}),
      genres: utils.convertArrayToString(data.genres," 、"),
      summary: data.summary
    }

    this.setData({
      movie
    })
  },
  //预览图片，小程序参数传递
  onPreviewImage:function(e) {
    let imgUrl = e.currentTarget.dataset.url
    wx.previewImage({
      urls: [imgUrl],
      current: imgUrl
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