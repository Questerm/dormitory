<template>
    <div class="carList">
        <div class="title">
            <h1>购物车</h1>
        </div>
        <div class="order-title">
            <div class="orderTitle-l">
                <ul>
                    <li>
                        <input type="checkbox" class="checkall" @change="handleCheckAllChange" ref="checkall1">
                        <span>全选</span>
                    </li>
                    <li>
                        商品名称
                    </li>
                </ul>
            </div>
            <div class="orderTitle-r">
                <ul>
                    <li>单价</li>
                    <li>数量</li>
                    <li>小计</li>
                    <li>操作</li>
                </ul>
            </div>
        </div>
        <div class="orderList">
            <div class="order" v-for="(item, index) in $store.state.carList" :key="index" ref="order">
                <div class="item-l">
                    <input type="checkbox" @change="handleCheckedGoodsChange($event, item.cid)" ref="check" />
                    <div class="itemInfo">
                        <div class="shopName">{{ `店铺名:${item.sname}` }}</div>
                        <div class="describe">
                            <img :src="item.picture" :alt="item.sname">
                            <p>{{ item.gname }}</p>
                        </div>
                    </div>
                </div>
                <div class="item-r">
                    <span class="price">{{ `￥${item.price}` }}</span>
                    <div class="nums">
                        <el-input-number v-model="item.gnum" :min="1" :max="999" />
                    </div>
                    <span class="sum">¥{{ item.price * item.gnum }}</span>
                    <div class="delete">
                        <el-button type="danger">删除</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 结算部分 -->
        <div class="settlement">
            <div class="c-fo-l">
                <input type="checkbox" class="checkall" @change="handleCheckAllChange" ref="checkall2">
                <el-button type="danger" round>删除</el-button>
                <el-button type="danger" round>删除全部</el-button>
            </div>
            <div class="c-fo-r">
                <div class="text">
                    <span>已选商品</span>
                    <span class="count-sum">{{ countSum }}</span>
                    <span>件</span>
                </div>
                <div class="sum">
                    <span>总价：</span>
                    <span class="price-sum">{{ `¥${priceSum}` }}</span>
                </div>
                <el-button type="warning" round @click="dialogTableVisible = true">结算</el-button>
                <el-dialog v-model="dialogTableVisible" title="提交确认" width="30%">
                    您确定提交订单吗？
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
                            <el-button type="primary" @click="submitItem">确定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { findCartGoodsList } from '@/api/userHome'
import { useStore } from 'vuex'
import { createOrder } from '@/api/userHome'
export default {
    name: 'CarList',
    setup() {
        const dialogTableVisible = ref(false)
        const check = ref(null);
        const order = ref(null);
        const checkall1 = ref(null);
        const checkall2 = ref(null);
        const store = useStore();
        let countSum = ref(0);
        let priceSum = ref(0);
        let cids = [];
        //websocket对象
        let websocket = null;
        let ro_nickname = "";
        let oid = null;

        //查找购物车数据
        const findTheCartGoodsList = async () => {
            const data = await findCartGoodsList({ uId: store.state.userName });
            console.log(data.obj)
            store.commit('updateCarList', data.obj);
        }

        onMounted(() => {
            findTheCartGoodsList();
        })

        //计算总数
        const theSum = () => {
            for (let i = 0; i < store.state.carList.length; i++) {
                if (check.value[i].checked) {
                    countSum.value += store.state.carList[i].gnum;
                    priceSum.value += store.state.carList[i].gnum * store.state.carList[i].price;
                }

            }
        }

        //全选操作
        const handleCheckAllChange = (e) => {
            if (e.target.checked) {
                checkall1.value.checked = true;
                checkall2.value.checked = true;
                for (let i = 0; i < check.value.length; i++) {
                    cids.push(store.state.carList[i].cid);
                    check.value[i].checked = true;
                    order.value[i].style.backgroundColor = "rgb(246 247 247)";
                    order.value[i].style.borderColor = "rgb(246 247 247)";
                }
                // 计算总数
                theSum();
            } else {
                cids = [];
                checkall1.value.checked = false;
                checkall2.value.checked = false;
                countSum.value = 0;
                priceSum.value = 0;
                for (let i = 0; i < check.value.length; i++) {
                    check.value[i].checked = false;
                    order.value[i].style.backgroundColor = "rgb(255, 255, 255)";
                    order.value[i].style.borderColor = "rgb(181, 181, 181)";
                }
            }
        }

        //单选操作
        const handleCheckedGoodsChange = (e, cid) => {
            if (e.target.checked) {
                e.target.parentNode.parentNode.style.backgroundColor = "rgb(246 247 247)";
                e.target.parentNode.parentNode.style.borderColor = "rgb(246 247 247)";
                // 计算总数
                theSum();
                cids.push(cid);
                for (let i = 0; i < check.value.length; i++) {
                    if (check.value[i].checked === false) return
                }
                checkall1.value.checked = true;
                checkall2.value.checked = true;
            } else {
                if (cids.indexOf(cid) !== -1) {
                    cids.splice(cids.indexOf(cid), 1);
                }
                countSum.value = 0;
                priceSum.value = 0;
                // 计算总数
                theSum();
                e.target.parentNode.parentNode.style.backgroundColor = "rgb(255, 255, 255)";
                e.target.parentNode.parentNode.style.borderColor = "rgb(181, 181, 181)";
                checkall1.value.checked = false;
                checkall2.value.checked = false;
            }
        }

        //结算商品
        const submitItem = async () => {
            dialogTableVisible.value = false
            const data = await createOrder({ uid: store.state.userName, cids: cids });
            oid = data.obj.oid;
            findTheCartGoodsList();
        }

        return {
            handleCheckAllChange,
            handleCheckedGoodsChange,
            check,
            order,
            checkall1,
            checkall2,
            priceSum,
            countSum,
            submitItem,
            findTheCartGoodsList,
            dialogTableVisible
        }
    }
}
</script>

<style lang="less" scoped>
.carList {
    display: flex;
    flex-direction: column;
    align-items: center;

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
                    .checkall {
                        margin: 0 15px;
                    }

                    float: left;
                    margin-right: 194px;
                    line-height: 76px;
                }
            }
        }

        .orderTitle-r {
            position: absolute;
            right: 26px;
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

                input[type='checkbox'] {
                    cursor: pointer;
                    margin: 0 15px;
                    position: relative;
                }

                .itemInfo {
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
                            font-size: 14px;
                            width: 200px;
                        }
                    }
                }
            }

            .item-r {
                margin-top: 68px;
                float: left;
                margin-left: 192px;

                .price {
                    width: 50px;
                    float: left;
                    text-align: left;
                    margin-right: 12px;
                }

                .nums {
                    width: 200px;
                    float: left;
                    margin-right: 8px;
                }

                .sum {
                    width: 50px;
                    float: left;
                    margin-right: 84px;
                }

                .delete {
                    float: left;
                    margin-right: 26px;
                }
            }
        }
    }

    .settlement {
        width: 1216px;
        height: 80px;
        line-height: 50px;
        padding: 15px 34px;
        border-radius: 0 0 15px 15px;
        margin: 0 auto;
        background-color: #fff;

        .c-fo-l {
            float: left;

            input[type='checkbox'] {
                cursor: pointer;
                margin: 0 15px;
                position: relative;
            }

            .el-button {
                margin-left: 34px;
            }
        }

        .c-fo-r {
            float: right;

            .text {
                float: left;

                span {
                    display: inline-block;
                    margin-right: 10px;
                }
            }

            .sum {
                float: left;
                line-height: 50px;
                margin-left: 20px;
                margin-right: 20px;

                .mon {
                    font-size: 16px;
                    font-weight: 700;
                    color: red;
                }
            }
        }
    }
}
</style>