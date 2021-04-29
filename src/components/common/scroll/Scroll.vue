<template>
  <div class="wrapper" ref="wrapper">
    <!-- 插槽内放滚动的内容 -->
    <div class="content"><slot></slot></div>
  </div>
</template>


<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    // 动态属性 是否监听滚动/是否上拉加载更多
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 不要使用document.querySelector('.warpper')该方法获取元素，因为类名为wrapper元素可能并不唯一
    // vue可以通过给元素绑定ref属性，唯一获取元素
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 自定义是否添加返回顶部显示/隐藏
      probeType: this.probeType,
      click: true,
      // 自定义是否添加上拉加载更多
      pullUpLoad: this.pullUpLoad,
    });
    // 监听滚动的位置
    this.scroll.on("scroll", (pos) => {
      // console.log(pos);
      this.$emit("scroll", pos);
    });
    // 监听上拉事件
    this.scroll.on("pullingUp", () => {
      // console.log("加载更多");
      this.$emit("pullingUp");
    });
  },
  methods: {
    // 返回顶部的方法
    // this.scroll && 多加一层判断更严谨，可能此时scroll对象未创建
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 重新回调加载更多
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // refresh
    refresh() {
      // console.log("---");  //检验防抖是否奏效
      this.scroll && this.scroll.refresh();
    },
  },
};
</script>
<style scoped>
</style>