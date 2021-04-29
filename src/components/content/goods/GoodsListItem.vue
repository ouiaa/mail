<template>
  <div class="goods-item" @click="itemClick">
    <!-- @onload监听图片的加载 -->
    <img :src="goodsItem.show.img" alt="" @load="imgLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ "￥" + goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>


<script>
export default {
  name: "GoodsListItem",
  // 父传子获得item数据
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgLoad() {
      this.$EventBus.$emit("itemImgLoad");
    },
    itemClick() {
      /* this.$router.push({
        path: "/detail",
        query: {
          id: this.goodsItem.iid,
        },
      }); */
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
};
</script>
<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  flex: 48%;
  /* width: 48%; */
}

.goods-item img {
  width: 100%;
  padding: 0 2px;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>