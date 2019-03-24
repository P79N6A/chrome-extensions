let list = []

const currentId = window.location.search.match(/^\?chapterId=(\d+)/)[1]

// chrome.runtime.sendMessage("我需要list", function(response) {
//   console.log("收到list")
//   list = response
// })

window.onload = function () {
  // if (!list || list.length === 0) {
  //   alert("重新进入课程列表页刷新后在进一次")
  // } else {
    const tab1 = document.getElementById('dct1')
    const tab2 = document.getElementById('dct2')
    if (!tab1) {
      jumpUrl()
      return 
    }
    if (tab1.title !== '视频') {
      setTimeout(() => {
        tab2.click()
      }, getTime())
    }
    getList()
    setTimeout(() => {
      if (!list || list.length === 0) {
        alert("重新进入课程列表页刷新后在进一次")
      } else {
        videoPlay()
      }
    }, 1000)
  // }
}

function getList() {
  if (list && list.length > 0) {
    return
  }
  const ncells = document.getElementsByClassName('ncells')
  list = [...ncells].map(item => {
    const ele = item.children[0]
    ele.addEventListener('click', (e) => {
      e.stopPropagation()
      e.preventDefault()
      window.location.href = `https://mooc1-2.chaoxing.com/mycourse/studentstudy?chapterId=${ele.href.match(/(\d+)'\);/)[1]}&courseId=203694600&clazzid=7368634&enc=cc2ae5c833d5165c6b7d3f7b8fd9ce00`
    })
    return {id: ele.href.match(/(\d+)'\);/)[1], orange: /orange/.test(ele.children[0].children[0].className)}
  })
}

async function videoPlay() {
  try {
    const index = list.findIndex(item => item.id == currentId)
    let _iframe = document.getElementById('iframe')
    const _iframe1 = _iframe.contentWindow.document.getElementsByClassName('ans-attach-online')
    const tab2 = document.getElementById('dct2')
    const tab3 = document.getElementById('dct3')

    function jumpAnswer() {
      setTimeout(() => {
        if (tab2.title !== "章节测验") {
          tab3.click()
        } else {
          tab2.click()
        }
      }, getTime())
    }

    if (_iframe && _iframe1[0] && !list[index].orange) {
      // jumpUrl()
      jumpAnswer()
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
    for (let i = 0; i < _iframe1.length; i++) {
      await playPromise(i)
    }
    // jumpUrl()
    jumpAnswer()
  } catch (error) {
    console.log(error)
    alert("出了点问题，建议刷新一下")
  }
}

function jumpUrl () {
  const index = list.findIndex(item => item.id == currentId)
  if (index + 1 === list.length) {
    return
  }
  setTimeout(() => {
    window.location.href = `https://mooc1-2.chaoxing.com/mycourse/studentstudy?chapterId=${list[index + 1].id}&courseId=203694600&clazzid=7368634&enc=cc2ae5c833d5165c6b7d3f7b8fd9ce00`
  }, getTime())
}

function getTime() {
  return Math.random() * 4 + 3
}