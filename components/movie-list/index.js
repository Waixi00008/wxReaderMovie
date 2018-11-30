// components/movie-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:Object
  },

  /**
   * 组件的初始数据
   */
  data:{
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onMoreTap: function (event) {
      const category = event.currentTarget.dataset.category
      wx.navigateTo({
        url: '/pages/movies/more-movie/more-movie?category=' + category,
      })
    },
  }
})
