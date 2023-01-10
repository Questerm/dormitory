<template>
  <div class="container">
    <!-- 头部部分 -->
    <Header></Header>
    <section>
      <!-- 搜索部分 -->
      <Search></Search>
      <!-- 购物车列表部分 -->
      <CarList></CarList>
    </section>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Search from '@/components/Search.vue'
import CarList from '@/components/CarList.vue'

export default {
  name: 'ShoppingCarView',
  components: { Header, Search, CarList }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: rgb(236, 236, 236);
  padding-bottom: 30px;
}
</style>