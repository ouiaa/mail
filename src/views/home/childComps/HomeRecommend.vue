<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.title" class="recom-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>


<script>
export default {
  name: "HomeRecommend",
  // 获取数据
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.recommend {
  display: flex;
  text-align: center;
  padding: 10px 0 20px;
  font-size: 12px;
  border-bottom: 8px solid #eee;
}
.recom-item {
  flex: 1;
  width: 100%;
}
/* 图片大小建议使用百分比，可以适配多种屏幕 */
.recom-item img {
  width: 80%;
}
</style>