let BASE_URL = ''

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://codewhy.org/dev'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://codewhy.org/prod'
} else if (process.env.NODE_ENV === 'test') {
  BASE_URL = 'http://codewhy.org/test'
}

console.log(process.env.NODE_ENV, BASE_URL)
export default BASE_URL
