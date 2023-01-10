<template>
    <div class="order">
        <!-- 导航栏 -->
        <Header></Header>
        <OrderList></OrderList>
    </div>
</template>

<script>
import Header from '@/components/Header'
import OrderList from '@/components/OrderList'
export default {
    name: 'orderView',
    components: { Header, OrderList },
    setup() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
.order {
    width: 100%;
    height: 100%;
    background-color: rgb(236, 236, 236);
    padding-bottom: 30px;
}
</style>