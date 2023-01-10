<template>
    <div class="order">
        <!-- 导航栏 -->
        <MarkiHeader></MarkiHeader>
        <div class="container">
            <div class="title">
                <h1>我的订单</h1>
                <!-- 地址 -->
                <div class="species">
                    <span>地址选择</span>
                    <el-select v-model="addressValue" class="m-2" placeholder="地址" size="large">
                        <el-option v-for="item in addressList" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </div>
                <!-- 宿舍楼 -->
                <div class="address">
                    <span>宿舍楼选择</span>
                    <el-select v-model="dorValue" class="m-2" placeholder="宿舍楼号" size="large">
                        <el-option v-for="item in dorList" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </div>
            </div>
            <div class="order-title">
                <div class="orderTitle-l">
                    <ul>
                        <li>
                            商品信息
                        </li>
                    </ul>
                </div>
                <div class="orderTitle-r">
                    <ul>
                        <li>单价</li>
                        <li>数量</li>
                        <li>实付</li>
                        <li>订单状态</li>
                    </ul>
                </div>
            </div>
            <div class="orderList">
                <div class="order" v-for="(item, index) in $store.state.orderMarKiList" :key="index" ref="order">
                    <div class="item-l">
                        <div class="itemInfo">
                            <div class="shopName">{{ `店铺名:${item.sname}` }}</div>
                            <div class="describe">
                                <img :src="item.picture" :alt="item.sname">
                                <p>{{ item.gname }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="item-r">
                        <ul>
                            <li>
                                {{ `￥${item.price}` }}
                            </li>
                            <li class="num">
                                {{ item.gnum }}
                            </li>
                            <li class="sum">
                                {{ `¥ ${item.oprice}` }}
                            </li>
                            <li class="states">
                                <el-button v-if="item.payState === '已拣货'" type="primary" @click="getOrder(item.oid)">接单</el-button>
                                <el-button v-if="item.payState === '已接单'" type="primary" @click="successQuHuo(item.oid)">取货</el-button>
                                <el-button v-if="item.payState === '配送中'" type="primary" @click="successPeiSong(item.oid)">完成配送</el-button>
                                <!-- <el-button v-if="item.payState === '配送中'" type="primary" @click="successPeiSong(item.oid)">完成配送</el-button> -->
                                <img v-if="item.payState === '已完成'" src="@/assets/yiwancheng.png" alt="" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MarkiHeader from '@/components/MarkiHeader'
import { ref, onMounted } from 'vue'
import { findOrders, takeOrder, deliveryOrder, finishOrder} from '@/api/marKiHome'
import { useStore } from 'vuex'
export default {
    name: 'orderView',
    components: { MarkiHeader },
    setup() {
        const order = ref(null);
        const dialogVisible = ref(false)
        const store = useStore();
        const addressValue = ref('');
        const dorValue = ref('');
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
        const dorList = [];
        for (let i = 1; i <= 25; i++) {
            let obj = {};
            obj.label = `${i}栋`;
            obj.value = `${i}栋`;
            dorList.push(obj);
        }
        
        //完成下单
        const getOrder = async(oid) => {
            console.log({oId: oid, dId: store.state.userName})
            await takeOrder({oId: oid, dId: store.state.userName})
            getOrderList();
        }

        // 配送中
        const successQuHuo = async(oid) => {
            console.log(oid)
            await deliveryOrder({oId: oid})
            getOrderList();
        }
        
        //完成配送
        const successPeiSong = async(oid) => {
            await finishOrder({oId: oid})
            getOrderList();
        }

        //发起请求拿到订单
        const getOrderList = async () => {
            const data = await findOrders();
            store.commit('updateOrderMarKiList', data.obj);
        }
        onMounted(() => {
            getOrderList();
        })

        // 确认退单
        const certainBtn = () => {
            dialogVisible.value = false
        }

        const updateOrder = () => {
            getOrderList();
        }

        return {
            order,
            dialogVisible,
            certainBtn,
            addressList,
            dorList,
            addressValue,
            dorValue,
            findOrders,
            getOrder,
            successQuHuo,
            successPeiSong,
            updateOrder
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

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;

        /deep/.el-overlay-dialog {
            .el-button {
                margin-left: 10px;
            }
        }

        .title {
            width: 1216px;
            height: 80px;
            border-radius: 48px 48px 0 0;
            margin-top: 30px;
            background-color: #fff;
            border-bottom: 1px solid rgb(198, 198, 198);
            text-align: left;
            display: flex;

            h1 {
                font-weight: 500;
                padding-left: 30px;
                line-height: 80px;
            }

            .species {
                float: left;
                margin-left: 50px;
                margin-top: 20px;

                span {
                    font-size: 14px;
                }

                /deep/.el-select {
                    width: 110px;
                    margin-left: 10px;
                }
            }

            .address {
                float: left;
                margin-left: 50px;
                margin-top: 20px;

                span {
                    font-size: 14px;
                }

                /deep/.el-select {
                    width: 110px;
                    margin-left: 10px;
                }
            }
        }

        .order-title {
            position: relative;
            width: 1216px;
            height: 76px;
            background-color: #fff;
            padding: 0 30px;

            .orderTitle-l {
                position: absolute;
                left: 36px;
                top: 0;

                ul {
                    height: 40px;
                    list-style: none;

                    li {
                        float: left;
                        margin-left: 236px;
                        line-height: 76px;
                    }
                }
            }

            .orderTitle-r {
                position: absolute;
                right: 30px;
                top: 0;

                ul {
                    padding: 0 20px;
                    height: 40px;
                    list-style: none;

                    li {
                        float: left;
                        padding: 0 54px;
                        line-height: 76px;
                    }
                }
            }
        }

        .orderList {
            width: 1216px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #fff;
            padding-bottom: 50px;
            border-radius: 0 0 48px 48px;

            /deep/.el-dialog__body {
                height: 0;
                overflow: hidden;
                overflow-y: none;
            }

            .order {
                width: 95%;
                height: 200px;
                background-color: #fff;
                padding: 15px 0;
                border-radius: 15px;
                border: 1px solid rgb(181, 181, 181);
                margin-bottom: 18px;

                .item-l {
                    float: left;
                    display: flex;
                    justify-content: space-around;

                    .itemInfo {
                        margin-left: 40px;

                        .shopName {
                            text-align: left;
                            margin-bottom: 15px;
                        }

                        .describe {
                            display: flex;

                            img {
                                width: 170px;
                                height: 112px;
                                margin-right: 30px;
                            }

                            p {
                                width: 134px;
                                font-size: 14px;
                                text-align: left;
                            }
                        }
                    }
                }

                .item-r {
                    margin-top: 8px;
                    float: left;
                    margin-left: 238px;

                    ul {
                        list-style: none;

                        li {
                            float: left;
                            line-height: 72px;
                            width: 98px;
                            text-align: left;
                            margin-top: 30px;
                            margin-right: 42px;

                            img {
                                width: 70px;
                                height: 70px;
                            }
                        }

                        .num {
                            margin-right: 38px;
                        }

                        .sum {
                            margin-right: 24px;
                        }

                        .states {
                            margin-right: 45px;
                        }

                        .operationBtn {
                            margin-right: 0px;
                        }
                    }
                }
            }

        }

        .el-button {
            margin-left: 0;
        }
    }
}
</style>