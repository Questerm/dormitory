<template>
    <div class="header">
        <div class="logoBox" @click="toHome">
            <img src="@/assets/logo.png" alt="">
            宿舍配送服务
        </div>
        <div class="personal">
            <ul>
                <li @click="toUserControl" ref="user">
                    <img src="@/assets/yonghuguanli.svg" alt="用户管理">
                    <span>用户管理</span>
                </li>
                <li @click="toShopControl" ref="shop">
                    <img src="@/assets/shangjiaguanli.svg" alt="商家管理">
                    <span>商家管理</span>
                </li>
                <li @click="toMarkiControl" ref="mariki">
                    <img src="@/assets/peisong.svg" alt="配送员管理">
                    <span>配送员管理</span>
                </li>
                <li @click="toComplaintsControl" ref="complaints">
                    <img src="@/assets/tousutiwen.svg" alt="投诉处理">
                    <span>投诉处理</span>
                </li>
            </ul>
        </div>
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
    </div>
</template>

<script>
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    name: 'administratorHeader',
    components: {
        ArrowDown
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const user = ref(null);
        const shop = ref(null);
        const mariki = ref(null);
        const complaints = ref(null);
        const userName = store.state.userName;

        onMounted(() => {
            console.log(store.state.adminiRole)
            if (store.state.adminiRole === '用户') {
                user.value.style.backgroundColor = '#fff';
                shop.value.style.backgroundColor = '';
                mariki.value.style.backgroundColor = '';
                complaints.value.style.backgroundColor = '';
            } else if (store.state.adminiRole === '商家') {
                user.value.style.backgroundColor = '';
                shop.value.style.backgroundColor = '#fff';
                mariki.value.style.backgroundColor = '';
                complaints.value.style.backgroundColor = '';
            } else if (store.state.adminiRole === '骑手') {
                user.value.style.backgroundColor = '';
                shop.value.style.backgroundColor = '';
                mariki.value.style.backgroundColor = '#fff';
                complaints.value.style.backgroundColor = '';
            } else {
                user.value.style.backgroundColor = '';
                shop.value.style.backgroundColor = '';
                mariki.value.style.backgroundColor = '';
                complaints.value.style.backgroundColor = '#fff';
            }
        })

        //跳到用户管理页面
        const toUserControl = () => {
            store.commit('updateAdminiRole', '用户')
            router.replace('adminHome')
        }

        //跳到商家管理页面
        const toShopControl = () => {
            store.commit('updateAdminiRole', '商家')
            router.replace('adminShop')
        }

        //跳到骑手页面
        const toMarkiControl = () => {
            store.commit('updateAdminiRole', '骑手')
            router.replace('adminMarki')
        }

        //跳到投诉管理页面
        const toComplaintsControl = () => {
            store.commit('updateAdminiRole', '投诉处理')
            router.replace('adminComplaints')
        }

        // 退出登录
        const toLogOut = () => {
             router.replace('/')
        }

        //跳往我的资料页面
        const toPersonInfo = () => {
            router.replace('adminiPerson')
        }

        return {
            toUserControl,
            toShopControl,
            toMarkiControl,
            toComplaintsControl,
            user,
            shop,
            mariki,
            complaints,
            userName,
            toLogOut,
            toPersonInfo
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
    justify-content: space-between;
    align-items: center;
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
        margin-right: -30px;

        ul {
            list-style: none;

            li {
                cursor: pointer;
                float: left;
                margin-right: 80px;
                text-decoration: none;
                padding: 0 10px;
                border-radius: 16px;
                height: 35x;
                line-height: 35px;

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

            }
        }
    }

    .personalBox {
        display: inline-block;
        display: flex;
        align-items: center;
        margin-right: 20px;

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
</style>