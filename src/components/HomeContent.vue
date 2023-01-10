<template>
    <div class="homeContent">
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
            <!-- 地址 -->
            <div class="address">
                <span>地址选择</span>
                <el-select v-model="addressValue" class="m-2" placeholder="地址" size="large">
                    <el-option v-for="item in addressList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <!-- 搜索按钮 -->
            <el-button type="primary" color="#626aef" @click="findTheShops">搜 索</el-button>
        </div>
        <div class="storeShow">
            <div class="store" v-for="(item, index) in $store.state.homeList" :key="index">
                <div class="store-l">
                    <h3>{{ item.sname }}</h3>
                    <img :src="item.simage" :alt="item.sname" @click="toShopInfo(item.sname, item.sid)">
                    <div class="address">{{ item.address }}</div>
                </div>
                <div class="store-r">
                    <div class="goods" v-for="(goods, idx) in item.topGoods" :key="idx">
                        <img :src="goods.picture" :alt="goods.gname">
                        <div class="text">
                            <p>{{ goods.gname }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTop3GoodsBysId, findShop } from '@/api/userHome'
import { useStore } from 'vuex'
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

        onMounted(() => {
            getTop3Item();
        })

        // 请求商店前三的数据
        const getTop3Item = async () => {
            const data = await getTop3GoodsBysId();
            console.log(data)
            store.state.homeList = data.obj
        }

        //跳往商品详情页
        const toShopInfo = (sName, sId) => {
            store.commit("updateShopName", sName)
            store.commit('updateSelectedSid', sId);
            router.replace('shopInfo');
        }

        //条件查询商店
        const findTheShops = async () => {
            const data = await findShop({ kind: speciesValue.value, address: addressValue.value, lPrice: num1.value, rPrice: num2.value });
            console.log(data)
            store.state.homeList = data.obj
        }

        return {
            num1,
            num2,
            speciesValue,
            speciesList,
            addressList,
            addressValue,
            toShopInfo,
            store,
            findTheShops
        }
    }
}
</script>

<style lang="less" scoped>
.homeContent {
    width: 1326px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 16px;
    padding-bottom: 30px;
    background-color: rgb(255, 255, 255);
    margin-top: 36px;

    .select {
        width: 1326px;
        height: 94px;
        margin: 0 auto;
        padding-top: 30px;
        background-color: rgb(255, 255, 255);
        border-radius: 16px 16px 0 0;

        .price {
            float: left;
            margin-left: 50px;

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

        .address {
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

    .storeShow {
        width: 1326px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;

        .store {
            width: 1066px;
            background-color: #f7f9fa;
            margin: 20px 0;
            border-radius: 10px;
            padding: 20px 0;

            .store-l {
                float: left;
                margin-left: 52px;
                display: flex;
                flex-direction: column;

                h3 {
                    font-weight: 500;
                    font-size: 15px;
                    text-align: left;
                    margin-bottom: 10px;
                }

                img {
                    width: 200px;
                    cursor: pointer;
                }

                .address {
                    width: 95px;
                    height: 30px;
                    background-color: #ffe9cf;
                    margin-left: 50px;
                    margin-top: 14px;
                    font-size: 14px;
                    line-height: 30px;
                    border-radius: 6px;
                }
            }

            .store-r {
                float: left;
                margin: 30px 0 0 80px;

                .goods {
                    float: left;
                    margin: 0 15px;
                    width: 200px;
                    height: 190px;
                    background-color: #fff;
                    border-radius: 5px;
                    font-size: 14px;
                    text-align: left;

                    img {
                        width: 100%;
                        height: 100px;
                        border-radius: 5px 5px 0 0;
                    }

                    .text {
                        margin: 20px 10px 0 10px;

                        p {
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        .desc {
                            margin-top: 10px;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }

    .paginantion {
        margin: 20px 0;
    }
}
</style>