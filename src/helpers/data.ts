import { isPlainObject } from './utils'

export function transformRequest(data: any): any {
  
  console.log(isPlainObject(data));
  
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
