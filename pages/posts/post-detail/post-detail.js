// pages/posts/post-detail/post-detail.js
const postsData = require('../../../data/posts-data.js')
const app = getApp()
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
    const postid = options.postid
    //全局变量  播放且是这篇文章
    const isPlaying = app.globalData.g_isPlayingMusic && app.globalData.g_currentPostId === postid;

    const postData = postsData.postList[postid]
    //获取所有文章的收藏情况
    let postsCollected = wx.getStorageSync("posts-collected") || {}
    //当前文章的收藏情况
    let currentCollected = postsCollected[postid] || false
    this.setData({
      postData,
      postid,
      postsCollected,
      isCollected: currentCollected,
      isPlaying
    })
    
    //音乐播放监听事件
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlaying:true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentPostId = this.data.postid
    })
    //音乐暂停监听事件
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlaying: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentPostId = this.data.postid
    })

    wx.onBackgroundAudioStop(() => {
      this.setData({
        isPlaying: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentPostId = this.data.postid
    })
    
  },
  //播放音乐
  onPlayingMusic:function() {
    const { dataUrl, title, coverImgUrl } = postsData.postList[this.data.postid].music
    if (this.data.isPlaying) {
      wx.stopBackgroundAudio()
    }else {
      wx.playBackgroundAudio({
        dataUrl,
        title,
        coverImgUrl
      })
    }
    this.setData({
      isPlaying:!this.data.isPlaying
    })
    app.globalData.g_isPlayingMusic = this.data.isPlaying
    app.globalData.g_currentPostId = this.data.postid
  },
  onCollectTap: function () {
    //设置当前文章的缓存
    let {
      postsCollected,
      postid,
      isCollected
    } = this.data
    //ture or false 前面没有postid时已设置false
    postsCollected[postid] = !postsCollected[postid]
    this.showToast(postsCollected, isCollected)
    //this.showModal(postsCollected, isCollected)
  },
  showToast: function (postsCollected, isCollected) {
    //异步getPostsCollectedAsync和同步的区别  同步会阻塞，异步可能会有回调地狱
    //this.getPostsCollectedAsync(postsCollected, isCollected)
    this.getPostsCollectedSync(postsCollected, isCollected)
  },
  //异步
  getPostsCollectedAsync: function (postsCollected, isCollected) {
    console.log("异步getPostsCollectedAsync")
    //设置所有文章的收藏情况
    wx.setStorage({
      key: 'posts-collected',
      data: postsCollected,
      success:() => {
        //设置当前文章的收藏
        this.setData({
          postsCollected,
          isCollected: !isCollected
        })
        wx.showToast({
          title: isCollected ? '取消收藏成功' : '收藏成功',
          duration: 1000,
          mask: false
        })
      }
    })
  },
  //同步
  getPostsCollectedSync: function (postsCollected, isCollected) {
    console.log("同步getPostsCollectedSync")
    //设置所有文章的收藏情况
    wx.setStorageSync("posts-collected", postsCollected)
    //设置当前文章的收藏
    this.setData({
      postsCollected,
      isCollected: !isCollected
    })
    wx.showToast({
      title: isCollected ? '取消收藏成功' : '收藏成功',
      duration: 1000,
      mask: false
    })
  },
  showModal: function (postsCollected, isCollected) {
    wx.showModal({
      title: '收藏',
      content: isCollected ? '取消收藏该文章' : '收藏该文章？',
      success: (res) => {
        if (res.confirm) {
          //设置所有文章的收藏情况
          wx.setStorageSync("posts-collected", postsCollected)
          //设置当前文章的收藏
          this.setData({
            postsCollected,
            isCollected: !isCollected
          })
        }
      }
    })
  },
  onShareTap: function() {
    let itemList = [
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList,
      itemColor: "#b3d4db",
      success: (res) => {
        if(!res.cancel) {
          wx.showModal({
            title:'分享',
            content: "用户" + itemList[res.tapIndex]
          })
        }
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