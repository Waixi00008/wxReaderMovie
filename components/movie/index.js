// components/movie/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //点击电影，跳转到详情
    onMovieTap: function (e) {
      const movieId = e.currentTarget.dataset.movieid
      wx.navigateTo({
        url: '/pages/movies/movie-detail/movie-detail?id=' + movieId
      })
    },
  }
})
