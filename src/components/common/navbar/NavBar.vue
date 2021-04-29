<template>
  <div class="nav-bar">
    <!-- 仅需放入三个插槽，用div包裹插槽，为了定义样式 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
.nav-bar {
  display: flex;
  height: 44px;
  width: 100%;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  /* 不设置背景颜色，每个导航栏颜色可能不一样 */
}
/* 左右两块固定宽度，中间弹性布局占1份 */
.left,
.right {
  width: 30px;
  /* background-color: pink; */
}
.center {
  flex: 1;
  /* background-color: skyblue; */
}
</style>