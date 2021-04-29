<template>
  <div id="home">
    <nav-bar class="nav">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <!-- 狸猫换太子 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
      class="fix"
    ></tab-control>
    <!-- refs让Home组件可以访问Scroll子组件，从而访问scroll对象 -->
    <!-- 传递Scroll子组件probe-type的值来自定义是否返回顶部显示/隐藏 -->
    <!-- scroll监听子组件Scroll发送给Home父组件的position值 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="contentPullingUp"
    >
      <!-- 父传子数据，动态绑定属性 轮播图-->
      <home-swiper
        :banners="banners"
        @swiperImgLoad="swiperImgLoad"
      ></home-swiper>
      <!--  父传子数据，动态绑定属性 个性推荐信息 -->
      <home-recommend :recommends="recommends"></home-recommend>
      <!-- 本周流行 -->
      <home-feature></home-feature>
      <!-- 传递tab-control标题数据 -->
      <!-- 监听TabControl点击事件传递的数据,实现TabControl切换商品类型 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
        v-show="!isTabFixed"
      ></tab-control>
      <!-- 传入对应类型商品数据 -->
      <goods-list :goods="showGoods"> </goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>


<script>
// 组件按类导入，注册也一样
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import HomeFeature from "./childComps/HomeFeature";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
  },

  data() {
    return {
      banners: [],
      recommends: [],
      // result: null,
      // 商品存储的数据结构
      goods: {
        // 默认第0页，没有商品数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop", //默认是请求pop类型的商品数据
      isShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    // 计算属性计算当前商品类型的数据
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = -this.$refs.scroll.scroll.y;
  },
  created() {
    // 页面一创建就发送请求
    // 1.请求多个数据
    // 因为封装请求方法的名字与请求方法的名字一样
    // 所以必须加上this，保证调用的是methods里的，而不是请求的
    this.getHomeMultidata();

    // 2.请求商品数据 三种类型的数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    // 3.监听item里的图片加载完成
    /*  const refresh = this.debounce(this.$refs.scroll.refresh, 50);
    this.$EventBus.$on("itemImgLoad", () => {
      // console.log("-----");
      this.$nextTick(() => {
        // this.$refs.scroll.refresh();
        refresh();
      });
    }); */
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    // 3.监听item里的图片加载完成
    this.$EventBus.$on("itemImgLoad", () => {
      refresh();
    });

    // 获取tabControl的offsetTop
    // 所有的组件都有一个属性$el:用于获取组件中的元素
  },
  /* beforeupdated() {
    // this.$nextTick(() => {

    // });
    this.offsetTop = this.$refs.tabControl.$el.offsetTop;
    console.log(this.offsetTop);
  }, */
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      // console.log(index);
      // 使用switch语句修改当前点击Tab对应的商品类型
      switch (index) {
        case 0:
          this.currentType = "pop";
          this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 0);
          break;
        case 1:
          this.currentType = "new";
          this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 0);
          break;
        case 2:
          this.currentType = "sell";
          this.$refs.scroll.scrollTo(0, -this.tabOffsetTop, 0);
          break;
      }
      //通过ref改变组件内部的属性,使得两个切换栏的状态一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 返回顶部方法
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 根据卷掉的y
    contentScroll(pos) {
      // 显示/隐藏返回顶部
      this.isShow = -pos.y > 1000 ? true : false;
      // 狸猫换太子
      this.isTabFixed = -pos.y > this.tabOffsetTop - 44 ? true : false;
    },
    // 上拉加载更多
    contentPullingUp() {
      // 根据当前商品类型加载更多,调用请求商品数据的方法实现
      this.getHomeGoods(this.currentType);
      // 重新回调实现多次下拉加载
      this.$refs.scroll.finishPullUp();
    },
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关方法
     */
    // 1.请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        // 用变量来保存请求到的数据 因为函数一旦调用完res这个变量就会被销毁
        // 取里面我们需要的数据如banner/recommend
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(this.banners, this.recommends);
      });
    },
    // 2.请求商品数据
    // 增加参数，提高代码的复用性
    getHomeGoods(type) {
      // 请求流行/新款/精选三个类别下的商品数据
      // 请求当前页数下的下一页数据  page最初写0，这样默认就能请求第一页数据了 上滑后就能请求下一页数据 k[v]属性值
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // 保存里面的list数据
        // 使用扩展运算符实现，放到goods对象下的list（数组类型）,所以需要使用数组的push放入
        this.goods[type].list.push(...res.data.list);
        // 多了一组数据，那么页码需要+1
        this.goods[type].page += 1;
      });
    },
  },
};
</script>
<style scoped>
/* 定义个性的样式 */
/* 设置padding留出顶部导航栏的空间 */
#home {
  /* position: relative; */
  padding-top: 44px;
  height: 100vh;
}
.nav {
  /* 使用css变量 */
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用浏览器原生滚动时，为了让导航不一起滚动 */
  /* 导航栏固定定位 */
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
}
/* .tab-control {
  position: sticky;
  top: 44px;
  left: 0;
} */
/* 设置可滚动的区域 */
/* 方法1：使用calu计算滚动的高度 */
.content {
  height: calc(100% - 50px);
  overflow: hidden;
}
/* 方法2：绝对定位限制上下位置 */
/* .content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
} */
</style>