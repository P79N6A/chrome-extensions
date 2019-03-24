const request = require('request')

request("http://www.cxeytk.com/nd.jsp?id=826&nSL=[0%2C1%2C2%2C4%2C12%2C8%2C5%2C6%2C7%2C9%2C10%2C11]#skeyword=%E5%88%9B%E4%B8%9A%E5%88%9B%E6%96%B0%E6%89%A7%E8%A1%8C%E5%8A%9B&_np=0_35", (err, res, data) => {
  console.log(data, 2, err, 4, res.body)
})