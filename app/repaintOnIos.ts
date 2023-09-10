const iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);

export const repaintOnIos = (element: Element) => {
  if (iOS) {
    element.setAttribute("hidden", "");
    requestAnimationFrame(() => {
      element.removeAttribute("hidden");
    });
  }
};
