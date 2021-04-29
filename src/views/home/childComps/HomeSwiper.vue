<template>
  <div>
    <swiper>
      <!-- 遍历banners里面内容放swiper-item -->
      <!-- 注意v-for必须搭配key，用item.title唯一绑定当前的item -->
      <swiper-item v-for="item in banners" :key="item.title">
        <!-- 根据banners里的数据动态绑定链接和图片 -->
        <!-- 每个图片都是个a标签 -->
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "HomeSwiper",
  // 父传子banners数据，并设置默认值
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imgLoad() {
      // 使用节流阀 让4张图片加载完毕只发射一次事件
      if (!this.isLoad) {
        this.$emit("swiperImgLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style>
</style>