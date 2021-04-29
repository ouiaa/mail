<template>
  <div>
    <img src="~assets/img/common/back.svg" alt="" @click="imgClick" />
    详情页待完成
  </div>
</template>


<script>
export default {
  name: "Detail",
  data() {
    return {
      id: null,
    };
  },
  activated() {
    this.id = this.$route.params;
  },
  methods: {
    imgClick() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
img {
  vertical-align: middle;
}
</style>