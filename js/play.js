let list = []

const currentId = window.location.search.match(/^\?chapterId=(\d+)/)[1]

chrome.runtime.sendMessage("我需要list", function(response) {
  console.log("收到list")
  list = response
})

window.onload = function () {
  if (!list || list.length === 0) {
    alert("重新进入课程列表页刷新后在进一次")
  } else {
    setTimeout(() => {
      videoPlay()
    }, 1000)
  }
}

async function videoPlay() {
  try {
    const index = list.findIndex(item => item.id == currentId)
    let _iframe = document.getElementById('iframe')
    const _iframe1 = _iframe.contentWindow.document.getElementsByClassName('ans-attach-online')
    if (_iframe && !_iframe1[0]) {
      jumpUrl()
      return
    }
    if (_iframe && _iframe1[0] && !list[index].orange) {
      jumpUrl()
      return
    }

    function playPromise(count) {
      return new Promise((resolve, reject) => {
        try {
          _iframe = _iframe1[count].contentWindow
          const nodes = _iframe.document.getElementById('video').children
          const divClick = nodes[1]
          const videoPlay = nodes[0]
          const pause = _iframe.document.getElementById('ext-comp-1036')
          const topic = _iframe.document.getElementById('ext-comp-1035')
      
          divClick.click()
      
          videoPlay.addEventListener('play', () => {
            console.log('开始播放')
          })
          videoPlay.addEventListener('pause', () => {
            if (pause && topic && pause.style.display !== 'none') {
                topic.style.display = 'none'
                pause.style.display = 'none'
                videoPlay.play()
            } else {
              console.log('不是做题')
            }
          })
          videoPlay.addEventListener('ended', () => {
            resolve()
          })
        } catch (error) {
          reject()
        }
      })
    }

    if (_iframe1.length === 0) {
      _iframe = _iframe1[0].contentWindow
      const nodes = _iframe.document.getElementById('video').children
      const divClick = nodes[1]
      const videoPlay = nodes[0]
      const pause = _iframe.document.getElementById('ext-comp-1036')
      const topic = _iframe.document.getElementById('ext-comp-1035')
  
      divClick.click()
  
      videoPlay.addEventListener('play', () => {
        console.log('开始播放')
      })
      videoPlay.addEventListener('pause', () => {
        if (pause && topic && pause.style.display !== 'none') {
            topic.style.display = 'none'
            pause.style.display = 'none'
            videoPlay.play()
        } else {
          console.log('不是做题')
        }
      })
      videoPlay.addEventListener('ended', () => {
        jumpUrl()
      })
    } else {
      for (let i = 0; i < _iframe1.length; i++) {
        await playPromise(i)
      }
      jumpUrl()
    }
  } catch (error) {
    alert("出了点问题，建议刷新一下")
  }
}

function jumpUrl () {
  const index = list.findIndex(item => item.id == currentId)
  setTimeout(() => {
    window.location.href = `https://mooc1-2.chaoxing.com/mycourse/studentstudy?chapterId=${list[index + 1].id}&courseId=203694600&clazzid=7368634&enc=cc2ae5c833d5165c6b7d3f7b8fd9ce00`
  }, 2000)
}