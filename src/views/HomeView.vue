<template>
    <div class="home">
        <!-- 导航栏 -->
        <Header></Header>
        <div class="search">
            <form>
                <input type="text" placeholder="请输入商品名称" v-model="searchValue" />
                <div class="button" @click="getTheShop">
                    <img src="@/assets/search.png" alt="搜索">
                </div>
            </form>
        </div>
        <!-- 内容 -->
        <HomeContent></HomeContent>
    </div>
</template>

<script>
import { ref, watch } from 'vue'
import Header from '@/components/Header.vue'
import HomeContent from '@/components/HomeContent.vue'
import { useStore } from 'vuex'
import { selectShop, getTop3GoodsBysId } from '@/api/userHome'
export default {
    components: { Header, HomeContent },
    setup() {
        const store = useStore();
        const searchValue = ref('');
        const getTheShop = async () => {
            if (searchValue.value === '') {
                const data = await getTop3GoodsBysId();
                store.state.homeList = data.obj;
                return
            }
            const data = await selectShop({ sName: searchValue.value })
            store.state.homeList = data.obj
            searchValue.value = '';
        }

        var t = null;
        // 防抖函数
        function debounce (fn, timer, triggleNow) {
            return function () {
                if (t) {
                    clearTimeout(t);
                }
                if (triggleNow) {
                    var firstClick = !t; 
                    if (firstClick) {
                        fn.apply(this, arguments);
                    }
                    t = setTimeout(() => {
                        t = null;
                    }, timer);
                } else {
                    t = setTimeout(() => {
                        fn.apply(this, arguments);
                    }, timer);
                }
            }()
        }

        async function getData(){
            const data = await selectShop({ sName: searchValue.value })
            store.state.homeList = data.obj;
        }

        watch(searchValue, () => {
            debounce(getData, 3000, true)
        })

        return {
            searchValue,
            getTheShop,
            getData
        }
    }
}
</script>

<style lang="less" scoped>
.home {
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