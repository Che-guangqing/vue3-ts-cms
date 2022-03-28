import axios, { AxiosResponse } from 'axios'

// axios.request({
//   url: ''
// })

// get
axios.get('http://123.207.32.32:8000/home/multidata').then((res: AxiosResponse) => {
  console.log(res.data)
})

// axios全局配置选项
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000
// axios.defaults.headers = {}

// get and params
axios
  .get('/get', {
    params: {
      name: 'cc',
      age: 18
    },
    timeout: 20000
  })
  .then((res) => {
    console.log(res.data)
  })

// post
axios
  .post('/post', {
    data: {
      name: 'cc',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

// all -> 多个请求,一起返回数据
axios.all([axios.get('/get', { params: { name: 'cc' } }), axios.post('/post', { data: { name: 'hh' } })]).then((res) => {
  console.log('all =>', res)
})

// 拦截器
axios.interceptors.request.use(
  // 请求发送成功
  (config) => {
    // 添加token, isLoading动画
    return config
  },
  // 请求发送失败
  (err) => {
    console.log('请求发送错误')
    return err
  }
)

axios.interceptors.response.use(
  // 服务器正常返回数据
  (res) => {
    console.log(res, '响应成功')
    return res.data
  },
  // 服务器返回失败
  (err) => {
    console.log(err, '响应失败')
    return err
  }
)

// httpbin.org

// new Promise<string>((resolve, reject) => {
//   resolve('123')
// }).then((res) => {
//   console.log(res.length)
// })
