const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
}

interface Options {
  timeout?: number
  data?: object
  method?: string
  headers: string
}

function queryStringify(data:object): string {
  const stingifiedData = Object.keys(data: Object).reduce(
    (acc, el) => acc.concat(`${el}=${data[el]}&`),
    '?'
  )
  return stingifiedData.substring(0, stingifiedData.length - 1)
}
export default class HTTPTransport{
  get = (url: string, options: Options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout)
  }

  put = (url: string, options: Options = {}) => {
    if (options.data) {
      options.data = queryStringify(options.data)
    }
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
  }

  post = (url: string, options: Options = {}) => {
    if (options.data) {
      options.data = queryStringify(options.data)
    }
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout)
  }

  delete = (url: string, options: Options = {}) => {
    if (options.data) {
      options.data = queryStringify(options.data)
    }
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
  }


  request = (url: string, options: Options, timeout: number = 5000) => {
      const { method, data, headers } = options
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      if (method === METHODS.GET && data) {
        url = url + queryStringify(data)
      }
      xhr.open(method, url)

      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject

      xhr.onerror = reject

      xhr.ontimeout = reject
      
      xhr.setRequestHeader = headers;
      xhr.timeout = timeout;

      if (method === METHODS.GET || !data) {
        xhr.send()
        console.log(xhr)
      } else {
        xhr.send(JSON.stringify(data))
        console.log(xhr)
      }
    })
  }
}

