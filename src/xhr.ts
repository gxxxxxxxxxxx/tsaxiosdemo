import { AxiosRequestConfig, AxiosPromise, AxiosRespone } from './types'
import { headersToObj } from './helpers/headers'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    try {
      const { data = null, url, method = 'get', headers, responseType } = config
      const request = new XMLHttpRequest()
      if (responseType) {
        request.responseType = responseType
      }
      request.open(method.toUpperCase(), url, true)
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) {
          return
        }
        let responseHeaders = request.getAllResponseHeaders()
        responseHeaders = headersToObj(responseHeaders)
        const responseData = responseType !== 'text' ? request.response : request.responseText
        const response: AxiosRespone = {
          data: JSON.parse(responseData),
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        resolve(response)
      }
      Object.keys(headers).forEach(item => {
        request.setRequestHeader(item, headers[item])
      })
      request.send(data)
    } catch (e) {
      reject(e)
    }
  })
}
