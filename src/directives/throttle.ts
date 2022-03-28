// throttle指令
export default {
  mounted(el: HTMLElement, binding: any) {
    let throttleTime = binding.value;
    if (!throttleTime) {
      throttleTime = 300;
    }
    let cbFun: any;
    el.addEventListener('click', event => {
      if (!cbFun) {
        cbFun = setTimeout(() => {
          cbFun = null;
        }, throttleTime);
      } else {
        event && event.stopImmediatePropagation();
      }
    }, true);
  }
}