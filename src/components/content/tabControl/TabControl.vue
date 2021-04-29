<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="item"
      class="title"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>


<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // 子传父 实现TabControl点击切换商品
      this.$emit("tabClick", index);
    },
  },
};
</script>
<style scoped>
/* 统一的样式放一起 */
.tab-control {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  background-color: #fff;
  z-index: 99;
}
.tab-control .title {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.active span {
  padding: 3px;
  border-bottom: 3px solid var(--color-tint);
}
</style>