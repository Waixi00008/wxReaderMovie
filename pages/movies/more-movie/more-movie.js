// pages/movies/more-movie/more-movie.js
const app = getApp()
const utils = require("../../../utils/utils.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    totalCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const category = options.category
    const doubanBaseUrl = app.globalData.doubanBaseUrl
    let dataUrl = ''

    switch (category) {
      case '正在热映':
        dataUrl = doubanBaseUrl + "/v2/movie/in_theaters"
        break;
      case '即将上映':
        dataUrl = doubanBaseUrl + "/v2/movie/coming_soon"
        break;
      case '豆瓣Top250':
        dataUrl = doubanBaseUrl + "/v2/movie/top250"
        break;
    }
    this.setData({
      category,
      dataUrl
    })
    this.getMovieListData(dataUrl)
  },
  // //下拉刷新，手机端是上拉
  // onScrollToLower: function () {
  //   //改变start数据，相当于分页请求
  //   const newUrl = `${this.data.dataUrl} + "?start=${this.data.totalCount}&count=20"`
  //   utils.http(newUrl, this.processDoubanData)
  //   //显示加载状态
  //   wx.showNavigationBarLoading()
  // },
  getMovieListData: function (url) {
    utils.http(url, this.processDoubanData)
  },

  processDoubanData: function (data) {
    let movies = []
    data.subjects.forEach((movie) => {
      let title = movie.title.length >= 8 ? (movie.title.substring(0, 6) + "...") : movie.title
      let temp = {
        title,
        stars: utils.convertToStarsArray(movie.rating.stars),
        coverageUrl: movie.images.large,
        average: movie.rating.average,
        movieId: movie.id
      }
      movies.push(temp)
    })
    let totalCount = this.data.totalCount
    totalCount += 20
    //累积数据
    let totalMovie = this.data.movies.concat(movies)

    this.setData({
      movies: totalMovie,
      totalCount
    })

    //隐藏加载状态
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh();
  },
  //点击电影，跳转到详情
  onMovieTap: function (e) {
    const movieId = e.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //动态设置导航栏标题
    wx.setNavigationBarTitle({
      title: this.data.category
    })
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
    console.log("dataUrl",this.data.dataUrl)
    var refreshUrl = this.data.dataUrl +
      "?star=0&count=20";
    this.setData({
      movies: [],
      totalCount: 0
    })
    console.log(refreshUrl)
    utils.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数  上拉加载
   */
  onReachBottom: function () {
    //改变start数据，相当于分页请求
    const newUrl = `${this.data.dataUrl} + "?start=${this.data.totalCount}&count=20"`
    utils.http(newUrl, this.processDoubanData)
    //显示加载状态
    wx.showNavigationBarLoading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})