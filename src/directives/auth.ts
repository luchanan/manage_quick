// 操作权限指令
import {hasAuth} from '@/utils/auth'
export default {
  mounted(el: HTMLElement, binding: any) {
    let key = binding.value;
    if(!hasAuth(key)) {
      el.parentNode?.removeChild(el)
    }
  }
}