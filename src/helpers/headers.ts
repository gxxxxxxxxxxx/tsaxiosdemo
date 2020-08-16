import { isPlainObject } from './utils'

function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(item => {
    if (item !== normalizeName && item.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[item]
      delete headers[item]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charst=utf-8'
    }
  }
  return headers
}

export function headersToObj(headers: string): any {
  let obj = Object.create(null)
  if (!headers) {
    return obj
  }
  headers.split('\r\n').forEach(item => {
    let [key,val] = item.split(':')
    key = key.trim().toLowerCase()
   if(!key) return
    obj[key] = val
  })
 return obj
}
