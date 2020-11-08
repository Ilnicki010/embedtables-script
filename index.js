import Vue from "vue";
import App from "./App.vue";

(function (el) {
  if (el) {
    new Vue({
      el,
      render: (h) => h(App),
      data: () => Object.assign({}, el.dataset),
    });
  }
})(document.getElementById("sheetWeb"));
