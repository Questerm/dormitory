<template>
    <div class="header">
        <div class="logoBox" @click="toHome">
            <img src="@/assets/logo.png" alt="">
            宿舍配送服务
        </div>
        <div class="personal">
            <ul>
                <li @click="toMyGoods" ref="goods">
                    <img src="@/assets/car.svg" alt="我的商品">
                    <span>我的商品</span>
                </li>
                <li @click="toOrderList" ref="order">
                    <img src="@/assets/order.svg" alt="订单" >
                    <span>我的订单</span>
                </li>
                <li @click="toComment" ref="comment">
                    <img src="@/assets/tousupingjia.svg" alt="商品评价" >
                    <span>商品评价</span>
                </li>
                <li>
                    <div class="personalBox">
                        <div class="hpt"></div>
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                {{ userName }}
                                <el-icon class="el-icon--right">
                                    <arrow-down />
                                </el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="toPersonInfo">我的资料</el-dropdown-item>
                                    <el-dropdown-item @click="toLogOut">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script>
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'

export default {
    name: 'Header',
    components: {
        ArrowDown
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const goods = ref(null);
        // const message = ref(null);
        const order = ref(null);
        const comment = ref(null);
        const userRole = store.state.userRole;
        const userName = store.state.userName;
        onMounted(() => {
            if (store.state.shopTitle === '我的商品') {
                goods.value.style.backgroundColor = '#fff';
                // message.value.style.backgroundColor = '';
                order.value.style.backgroundColor = '';
                comment.value.style.backgroundColor = '';
            } else if (store.state.shopTitle === '我的消息') {
                goods.value.style.backgroundColor = '';
                // message.value.style.backgroundColor = '#fff';
                order.value.style.backgroundColor = '';
                comment.value.style.backgroundColor = '';
            } else if (store.state.shopTitle === '我的订单') {
                goods.value.style.backgroundColor = '';
                // message.value.style.backgroundColor = '';
                order.value.style.backgroundColor = '#fff';
                comment.value.style.backgroundColor = '';
            } else {
                goods.value.style.backgroundColor = '';
                // message.value.style.backgroundColor = '';
                order.value.style.backgroundColor = '';
                comment.value.style.backgroundColor = '#fff';
            }
        })

        // 跳往我的商品页面
        const toMyGoods = () => {
            store.commit('updateShopTitle', '我的商品')
            router.replace('shopHome');
        }

        // 跳往我的信息页面
        const toMessage = () => {
            store.commit('updateShopTitle', '我的消息')
            router.replace('messageShop');
        }

        // 跳往我的资料页面
        const toPersonInfo = () => {
            if (userRole === '用户') {
                router.replace('userperson');
            } else if (userRole === '商家') {
                router.replace('shopperson');
            } else if (userRole === '骑手') {
                router.replace('markiperson');
            }
        }

        //跳转首页
        const toHome = () => {
            router.replace('shopHome');
        }

        // 退出登录
        const toLogOut = () => {
            store.state.userName = null;
            router.replace('login');
        }

        //跳转到商品评论
        const toComment = () => {
            store.commit('updateShopTitle', '商品评论')
            router.replace('shopcomment');
        }

        //跳转到订单页面
        const toOrderList = () => {
            store.commit('updateShopTitle', '我的订单')
            router.replace('orderShop')
        }

        return {
            toMyGoods,
            toPersonInfo,
            toHome,
            toLogOut,
            userName,
            toMessage,
            toComment,
            toOrderList,
            // message,
            goods,
            comment,
            order
        }
    }
}
</script>
  
<style lang="less" scoped>
.header {
    width: 100%;
    height: 46px;
    background-color: #CDD6DD;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.15);

    .logoBox {
        margin-left: 30px;
        line-height: 50px;
        font-size: 18px;
        cursor: pointer;

        img {
            width: 38px;
            height: 38px;
            vertical-align: middle;
        }
    }

    .proName {
        line-height: 50px;

        img {
            width: 38px;
            height: 38px;
            vertical-align: middle;
        }

        .ipt {
            outline: none;
            width: 200px;
            height: 30px;
            border: 2px solid #bfbfbf;
            border-radius: 5px;
            padding-left: 10px;
            margin-left: 10px;
        }
    }

    .personal {
        line-height: 50px;
        margin-right: 20px;

        ul {
            list-style: none;

            li {
                cursor: pointer;
                float: left;
                margin-right: 40px;
                text-decoration: none;
                height: 35px;
                line-height: 35px;
                border-radius: 16px;
                padding: 0 10px;

                img {
                    width: 30px;
                    height: 30px;
                    vertical-align: middle;
                    margin-right: 8px;
                    line-height: 30px;
                    cursor: pointer;
                }

                span {
                    font-size: 18px;
                    color: #000;
                }

                .personalBox {
                    display: inline-block;

                    .hpt {
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                        border-radius: 5px;
                        background-color: antiquewhite;
                        margin-right: 15px;
                        vertical-align: middle;
                    }

                    .el-dropdown {
                        line-height: 50px;
                        cursor: pointer;

                        .el-dropdown-link {
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }
}
</style>