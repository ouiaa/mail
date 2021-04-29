<template>
  <div class="goods-list">
    <!-- 每个数据的显示是固定的，不需要插槽 -->
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goodsItem="item"
      class="goods-list-item"
    ></goods-list-item>
  </div>
</template>


<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  // 获取商品数据
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.goods-list {
  display: flex;
  /* 换行 */
  flex-wrap: wrap;
  /* justify-content: space-around; */
  justify-content: space-evenly;

  padding: 2px;
}
</style>