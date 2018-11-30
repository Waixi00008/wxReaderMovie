// pages/movies/movies.js
const app = getApp()
const utils = require("../../utils/utils.js") 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    containerShow:true,
    isShowSearch:false,
    searchResult: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const doubanBaseUrl = app.globalData.doubanBaseUrl
    const filterData = "?start=0&&count=3"
    const inTheatersUrl = doubanBaseUrl + "/v2/movie/in_theaters" + filterData
    const comingSoonUrl = doubanBaseUrl + "/v2/movie/coming_soon" + filterData
    const top250Url = doubanBaseUrl + "/v2/movie/top250" + filterData

    //正在热映
    this.getMovieListData(inTheatersUrl, "inTheaters","正在热映")
    //即将上映
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映")
    //top250
    this.getMovieListData(top250Url, "top250", "豆瓣Top250")
  },
  onBindFocus: function() {
    this.setData({
      containerShow: false,
      isShowSearch: true
    })
  },
  onCloseTap:function(){
    this.setData({
      containerShow:true,
      isShowSearch: false,
      searchResult: {}
    })
  },
  onBindConfirm:function(event) {
    const searchUrl = app.globalData.doubanBaseUrl + "/v2/movie/search?q=" + event.detail.value
    this.getMovieListData(searchUrl, "searchResult", "")
  },
  onMoreTap:function(event) {
    const category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  },
  getMovieListData: function (url, settedKey, categoryTitle) {
    utils.http(url, this.processDoubanData, {settedKey, categoryTitle})
    
    // wx.request({
    //   url,
    //   data: {},
    //   method: 'GET',
    //   header: {
    //     "Content-Type": "json"
    //   },
    //   success: (res) => {
    //     this.processDoubanData(res.data, settedKey, categoryTitle)
    //   },
    //   fail: (err) => {
    //     console.log(err)
    //   }
    // })
  },
  processDoubanData: function (data, data2) {
    const {settedKey,categoryTitle} = data2
    const movies = []
    data.subjects.forEach((movie) => {
      const title = movie.title.length >= 8 ? (movie.title.substring(0, 6) + "...") : movie.title
      const temp = {
        title,
        stars: utils.convertToStarsArray(movie.rating.stars),
        coverageUrl: movie.images.large,
        average: movie.rating.average,
        movieId: movie.id
      }
      movies.push(temp)
    })

    const movieData = {}
    movieData[settedKey] = {
      categoryTitle,
      movies,
    }
    this.setData(movieData)
  },
  //点击电影，跳转到详情
  onMovieTap:function(e) {
    const movieId = e.currentTarget.dataset.movieid
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId
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