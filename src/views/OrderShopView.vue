<template>
    <div class="order">
        <!-- 导航栏 -->
        <ShopHeader></ShopHeader>
        <div class="container">
            <div class="title">
                <h1>我的订单</h1>
            </div>
            <div class="order-title">
                <div class="orderTitle-l">
                    <ul>
                        <li>
                            商品名称
                        </li>
                    </ul>
                </div>
                <div class="orderTitle-r">
                    <ul>
                        <li>单价</li>
                        <li>数量</li>
                        <li>实付</li>
                        <li>订单状态</li>
                        <li>操作</li>
                    </ul>
                </div>
            </div>
            <div class="orderList">
                <div class="order" v-for="(item, index) in $store.state.orderShopList" :key="index" ref="order">
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
                                <el-button v-if="item.payState === '已下单'" type="primary" @click="successYanHuo(item.oid)">完成拣货</el-button>
                                <img v-if="item.payState === '已拣货'" src="@/assets/yijianhuo.png" alt="" />
                                <img v-if="item.payState === '已接单'" src="@/assets/yijiedan.png" alt="" />
                                <img v-if="item.payState === '配送中'" src="@/assets/peisongzhong.png" alt="" />
                                <img v-if="item.payState === '已完成'" src="@/assets/yiwancheng.png" alt="" />
                                <img v-if="item.payState === '确认退单'" src="@/assets/yituidan.jpg" alt="" />
                            </li>
                            <li class="operationBtn">
                                <el-button v-if="item.payState === '申请退单'" type="danger" @click="certainBtn(item.oid)">确认退单</el-button>
                            </li>
                        </ul>
                    </div>
                </div>
                <el-dialog v-model="dialogVisible" title="确认框" width="30%">
                    确认退单吗？
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button type="primary" @click="dialogVisible = false">取消</el-button>
                            <el-button type="primary" @click="certainBtn">确定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import ShopHeader from '@/components/ShopHeader'
import { ref, onMounted } from 'vue'
import { getShopOrders, pickOrderGoods, takeBackOrder } from '@/api/shopHome'
import { useStore } from 'vuex'
export default {
    name: 'orderView',
    components: { ShopHeader },
    setup() {
        const order = ref(null);
        const dialogVisible = ref(false)
        const store = useStore();

        //完成拣货
        const successYanHuo = async(oid) => {
            await pickOrderGoods({oId: oid})
            getOrderList();
        }

        //发起请求拿到商家的订单
        const getOrderList = async () => {
            const data = await getShopOrders({ sId: store.state.userName });
            store.commit('updateOrderShopList', data.obj);
        }

        onMounted(() => {
            getOrderList();
        })

        // 确认退单
        const certainBtn = async(oid) => {
            await takeBackOrder({ oId: oid })
            dialogVisible.value = false
            getOrderList();
        }

        return {
            order,
            dialogVisible,
            certainBtn,
            successYanHuo
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

            h1 {
                font-weight: 500;
                padding-left: 30px;
                line-height: 80px;
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
                right: 0;
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
                    margin-left: 134px;

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