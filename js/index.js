console.log('啊啊啊啊，插件要工作了')
window.onload = function () {
  const ncells = document.getElementsByClassName('ncells')
  const urls = []
  for (let i = 0; i < ncells.length; i++) {
    const element = ncells[i].children[0]
    urls.push(element.href.match(/(\d+)'\);$/)[1])
  }
  const currentUrl = window.location.href
  console.log(urls, currentUrl)
  console.log(urls.findIndex(item => {
    return item === currentUrl
  }))
  
  try {
    setTimeout(() => {
      chrome.runtime.sendMessage({greeting: '你好，我是content-script呀，我主动发消息给后台！'}, function(response) {
        console.log('收到来自后台的回复：' + response);
      });
      // videoPlay()
    }, 2000)
      
  } catch (error) {
    console.log('没获取到')
  }
}

// function videoPlay() {
//   const _iframe = document.getElementById('iframe').contentWindow
//   const _iframe1 = _iframe.document.getElementsByClassName('ans-attach-online')[0].contentWindow
//   const div = _iframe1.document.getElementsByClassName('vjs-poster')
//   const video = _iframe1.document.getElementById('video_html5_api')
//   console.log(div[0])
//   div[0].click()
//   video.addEventListener('play', () => {
//     console.log('开始播放')
//   })
//   video.addEventListener('pause', () => {
//     const pause = _iframe1.document.getElementById('ext-comp-1036')
//     const topic = _iframe1.document.getElementById('ext-comp-1035')
//     if (pause.style.display !== 'none') {
//       topic.style.display = 'none'
//       pause.style.display = 'none'
//       video.play()
//     } else {
//       window.location.href="https://www.baidu.com"
//       console.log('不是做题')
//     }
//   })
// }