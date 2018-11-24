App({
  globalData: {
    g_isPlayingMusic: false,
    g_currentPostId: null,
    doubanBaseUrl: 'https://douban.uieee.com'
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    //授权
    // wx.showModal({
    //   title: '微信授权',
    //   content: '请授权一些权限',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //       wx.openSetting({
    //         success(res) {
    //           console.log("openSetting", res.authSetting)
    //           const scope_data = [
    //             "scope.userInfo",
    //             "scope.userLocation",
    //             "scope.address",
    //             "scope.invoiceTitle",
    //             "scope.invoice",
    //             "scope.werun",
    //             "scope.record",
    //             "scope.writePhotosAlbum",
    //             "scope.camera"
    //           ]

    //           for (let i = 0; i < scope_data.length-1;i++) {
    //             wx.authorize({
    //               scope: scope_data[i],
    //               success() {
    //                 console.log("授权成功")
    //               }
    //             })
    //           }
    //         }
    //       })
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
    
    //授权录音
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.record']) {
    //       wx.authorize({
    //         scope: 'scope.record',
    //         success() {
    //           wx.startRecord()
    //         }
    //       })
    //     }
    //   }
    // })

    // // 查看是否授权
    // wx.getSetting({
    //   success(res) {
    //     console.log(res)
        
    //     if (res.authSetting['scope.userLocation']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getLocation({
    //         success: function(res) {
    //           console.log("location",res)
    //         },
    //       })
    //     }
    //     //保存到相册
    //     if (res.authSetting['scope.writePhotosAlbum']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          
    //       wx.saveImageToPhotosAlbum({
    //         filePath:"image2/cover.jpg",
    //         success: function (res) {
    //           //需要后端解密
    //           console.log("saveImageToPhotosAlbum", res)
    //         },
    //       })
    //     }
    //     if (res.authSetting['scope.werun']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getWeRunData({
    //         success: function(res) {
    //           //需要后端解密
    //           console.log("getWeRunData", res.encryptedData.stepInfoList)
    //         },
    //       })
    //     }
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         withCredentials:false,
    //         lang: "zh_CN",
    //         success: function (res) {
    //           console.log("getSetting",res)
    //         }
    //       })
    //     }
    //   }
    // })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
  }
})
