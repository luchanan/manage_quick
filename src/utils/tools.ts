export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
  return key in object
}
// path find value  
export function objectFindVaule (obj:any, path:any) {
  return path.split('.').reduce((target:any, key:any) => target && target[key], obj)
}
// list is valid
export function listBack (data:any, rootPath?:any, path?:any, success?:any, empty?:any) {
  let tPath = objectFindVaule(data, path)
  if (!data.error) {
    if (!objectFindVaule(data, rootPath) || !tPath || tPath.length === 0) {
      if (typeof empty === 'function') {
        empty()
      }
    } else {
      if (Array.isArray(tPath)) {
        success()
      }
    }
  }
}