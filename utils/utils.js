function convertToStarsArray(data) {
  //data是字符串形式
  const stars = data.substring(0, 1)
  //[1,1,1,0,0]  三颗星
  const starsArray = []
  for (let i = 0; i < 5; i++) {
    if (i < stars) {
      starsArray.push(1)
    } else {
      starsArray.push(0)
    }
  }
  return starsArray
}
//数组转化字符串
function convertArrayToString(data,sKey) {
  return data.toString().split(",").join(sKey)
}
//对象转化字符传
function convertObjectToString(data,key) {
  //判断对象是否为空
  if(Object.keys(data).length == 0) {
    return ''
  }else {
    let arr = []
    for (let i = 0; i < data.length; i++) {
      arr.push(data[i][key])
    }
    return this.convertArrayToString(arr, " / ")
  }
}

//处理影人信息 获取大头像和名字
function convertCastsInfo(data) {
  if (Object.keys(data).length == 0) {
    return []
  } else {
    let arr = []
    for (let i = 0; i < data.length; i++) {
      let temp = {
        avatar: data[i].avatars ? data[i].avatars.large : "",
        name:data[i].name
      }
      arr.push(temp)
    }
    return arr
  }
}

function http(url, callback, data = {}) {
  wx.request({
    url,
    data: {},
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: (res) => {
      callback(res.data, data)
    },
    fail: (err) => {
      console.log(err)
    }
  })
}

module.exports = {
  convertToStarsArray,
  convertArrayToString,
  convertObjectToString,
  convertCastsInfo,
  http
}