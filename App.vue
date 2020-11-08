<template>
  <div v-if="data" class="items">
    <div v-for="row in data.fields" class="item">
      <div v-for="item in row">{{ item.name }} : {{ item.value }}</div>
    </div>
  </div>
  <span v-else>loading</span>
</template>

<script>
import Vue from "vue";

import { getProjectById } from "./api";

export default Vue.extend({
  methods: {
    async getBaseInfo(id) {
      const data = await getProjectById(id);
      this.data = data;
    },
  },
  mounted() {
    this.getBaseInfo(this.$parent.sheetid);
    const style = document.createElement("link");
    style.type = "text/css";
    style.rel = "stylesheet";
    style.href = "/style.css";
    document.head.appendChild(style);
  },
  data() {
    return {
      data: null,
    };
  },
});
</script>
