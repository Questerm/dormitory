<template>
    <div class="shopinfo">
        <!-- 导航栏 -->
        <Header></Header>
        <!-- 搜索部分 -->
        <div class="search">
            <form>
                <input type="text" placeholder="请输入商品名称" v-model="searchValue"/>
                <div class="button" @click="findTheGoods">
                    <img src="@/assets/search.png" alt="搜索">
                </div>
            </form>
        </div>
        <!-- 商品内容部分 -->
        <ShopInfoContent></ShopInfoContent>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import ShopInfoContent from '@/components/ShopInfoContent.vue'
import { ref } from '@vue/reactivity'
import { selectGoods } from '@/api/userHome'
import { useStore } from 'vuex'
export default {
    name: 'shopInfoView',
    components: { Header, ShopInfoContent },
    setup() {
        let searchValue = ref('');
        const store = useStore();

        const findTheGoods = async() => {
            const data = await selectGoods({gName: searchValue.value});
            store.commit('updateShopList', data.obj);
            searchValue.value = '';
        }
        return {
            searchValue,
            findTheGoods
        }
    }
}
</script>

<style lang="less" scoped>
.shopinfo {
    width: 100%;
    background-color: rgb(236, 236, 236);
    padding-bottom: 150px;

    .search {
        position: relative;
        opacity: 0.8;
        margin: 0 auto;
        margin-top: 22px;
        border-radius: 10px;

        input {
            width: 1020px;
            height: 40px;
            margin-left: 20px;
            margin-top: 6px;
            background-color: #fff;
            opacity: 0.8;
            border-radius: 30px;
            outline: none;
            box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.2);
            border: 0;
            padding-left: 20px;
            font-size: 16px;
        }

        form {
            .button {
                position: absolute;
                right: 242px;
                top: 14px;
                width: 45px;
                height: 45px;
                outline: none;
                background-color: transparent;
                border: 0;
                cursor: pointer;

                img {
                    height: 20px;
                    width: 20px;
                }
            }
        }
    }
}
</style>