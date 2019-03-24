window.onload = function () {
  console.log("收集列表")
  const nodes = document.getElementsByClassName('articlename')
  const nodes2 = document.getElementsByClassName('icon')
  if (nodes && nodes.length > 0) {
    const list = [...nodes].map((item, index)=> {
      return {
        id: item.getElementsByTagName('a')[0].href.match(/chapterId=(\d+)/)[1],
        orange: nodes2[index].getElementsByTagName('em')[0].className === 'orange'
      }
    })

  chrome.runtime.sendMessage({list}, function(response) {
    console.log(response)
  })
  } else {
    console.log(没获取到)
  }
}