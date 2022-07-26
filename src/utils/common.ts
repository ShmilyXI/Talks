// 千分位分割
export const formatPrice = (price: number) => {
  return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 切换body是否overflow: hidden
export const toggleBodyOverflow = (flag: boolean) => {
  if (!document?.body) return;
  if (flag) {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  } else {
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  }
};

// 滚动到指定位置
export const scrollToElement = (element: HTMLElement) => {
  if (!document.body || !element) return;
  element.scrollIntoView();
};
