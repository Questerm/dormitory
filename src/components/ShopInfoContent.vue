<template>
    <div class="shopInfoContent">
        <!-- 店名部分 -->
        <div class="shopNameBox">
            <img src="@/assets/lvdao.jpg" alt="">
            <h2>{{ $store.state.shopName }}</h2>
        </div>
        <!-- 选项部分 -->
        <div class="select">
            <!-- 价格 -->
            <div class="price">
                <ul>
                    <li>价格区间</li>
                    <li>
                        <el-input v-model="num1" placeholder="¥" />
                    </li>
                    <li><span>—</span></li>
                    <li>
                        <el-input v-model="num2" placeholder="¥" />
                    </li>
                </ul>
            </div>
            <!-- 种类 -->
            <div class="species">
                <span>种类选择</span>
                <el-select v-model="speciesValue" class="m-2" placeholder="种类" size="large">
                    <el-option v-for="item in speciesList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <!-- 搜索按钮 -->
            <el-button type="primary" color="#626aef" @click="findTheGoods">搜 索</el-button>
        </div>
        <div class="goodsShow">
            <div class="box" v-for="(item, index) in $store.state.shopList" :key="index"
                @click="toShopInfo(item.gid, item.gName)">
                <img :src="item.picture" :alt="item.gName">
                <p class="review">{{ item.gName }}</p>
                <div class="info">
                    <div class="price"> {{ `${item.price}元 / ${item.specification}` }}</div>
                    <div class="sell">{{ `月销${item.sales}单` }}</div>
                </div>
            </div>
        </div>
        <!-- 分页 -->
        <div class="paginantion">
            <el-pagination v-model:currentPage="currentPage" :page-size="5" :small="false" :disabled="false"
                :background="true" layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getPage, findGoods } from '@/api/userHome'
export default {
    name: 'HomeContent',
    setup() {
        const num1 = ref('');
        const num2 = ref('');
        const speciesValue = ref('')
        const addressValue = ref('')
        const router = useRouter();
        const store = useStore();
        const speciesList = [
            {
                value: '日用品',
                label: '日用品',
            },
            {
                value: '方便速食',
                label: '方便速食',
            },
            {
                value: '零食',
                label: '零食',
            },
            {
                value: '饮品',
                label: '饮品',
            },
            {
                value: '水果',
                label: '水果',
            },
        ]
        const addressList = [
            {
                value: '南苑',
                label: '南苑',
            },
            {
                value: '北苑',
                label: '北苑',
            },
        ]
        const currentPage = ref(1)
        let total = ref(0);


        //页数请求数据
        const handleCurrentChange = async (val) => {
            const data = await getPage(val, 5);
            total.value = data.total;
            store.commit('updateShopList', data.records);
        }

        onMounted(() => {
            handleCurrentChange(currentPage.value);
        })

        //跳往商品详情页
        const toShopInfo = (gid, gName) => {
            store.state.goodsName = gName;
            store.state.gid = gid;
            router.replace('goodsDetail');
        }

        //根据属性查商品
        const findTheGoods = async () => {
            currentPage.value = 1;
            const data = await findGoods(currentPage.value, 5, { kind: speciesValue.value, lPrice: num1.value, rPrice: num2.value })
            total.value = data.obj.length;
            store.commit('updateShopList', data.obj);
        }

        return {
            num1,
            num2,
            speciesValue,
            speciesList,
            addressList,
            addressValue,
            toShopInfo,
            handleCurrentChange,
            currentPage,
            total,
            findTheGoods
        }
    }
}
</script>

<style lang="less" scoped>
.shopInfoContent {
    width: 1326px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 16px;
    padding-bottom: 30px;
    background-color: rgb(255, 255, 255);
    margin-top: 36px;

    .shopNameBox {
        width: 1326px;
        height: 80px;
        background-color: #fff;
        border-radius: 16px;
        margin: 20px auto 0;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 60px;
            height: 60px;
            margin-right: 30px;
            border-radius: 50%;
        }
    }

    .select {
        width: 1326px;
        height: 94px;
        margin: 0 auto;
        padding-top: 30px;
        background-color: rgb(255, 255, 255);
        border-radius: 16px 16px 0 0;

        .price {
            float: left;
            margin-left: 424px;

            ul {
                list-style: none;

                li {
                    float: left;
                    font-size: 14px;
                    line-height: 38px;
                    margin: 0 5px;

                    /deep/.el-input {
                        width: 49px;
                        height: 40px;
                    }
                }
            }
        }

        .species {
            float: left;
            margin-left: 50px;

            span {
                font-size: 14px;
            }

            /deep/.el-select {
                width: 94px;
                margin-left: 10px;
            }
        }

        /deep/.el-button {
            margin-left: 300px;
            height: 40px;
        }
    }

    .goodsShow {
        width: 1326px;
        background-color: #fff;
        padding: 0 50px;

        .box {
            float: left;
            height: 240px;
            width: 215px;
            background-color: #efefef;
            border-radius: 10px;
            margin: 30px 15px;
            cursor: pointer;

            img {
                width: 100%;
                height: 144px;
                border-radius: 10px 10px 0 0;
            }

            p {
                margin-bottom: 0px;
            }

            .review {
                font-size: 14px;
                height: 30px;
                padding: 0 28px;
                margin-top: 15px;
                text-align: left;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .info {
                .price {
                    text-align: left;
                    font-size: 14px;
                    padding: 0 28px;
                }

                .sell {
                    font-size: 14px;
                    padding: 0 28px;
                    text-align: right;
                }
            }
        }
    }

    .paginantion {
        margin: 20px 0;
    }
}
</style>