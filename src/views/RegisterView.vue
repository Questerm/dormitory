<template>
    <div class="register">
        <div class="box">
            <p class="title">用户注册</p>
            <form>
                <div v-for="(item, index) in userList" :key="index" class="user_box">
                    <img :src="item.imgUrl" :alt="item.title">
                    <input :type="item.type" :placeholder="item.placeholder" v-model="item.value.value" @change="test"
                        autocomplete>
                </div>
                <div class="role_box">
                    <img src="../assets/role.png">
                    <select name="user_role" v-model="userRole" @change="test">
                        <option value="管理员">管理员</option>
                        <option value="用户">用户</option>
                        <option value="商家">商家</option>
                        <option value="骑手">骑手</option>
                    </select>
                    <a @click="toLogin">去登录</a>
                    <div class="button" @click="submitInfo">注册</div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { register } from '@/api/login'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
    name: 'register',
    setup() {
        let userName = ref('');
        let userPass1 = ref('');
        let userPass2 = ref('');
        let userRole = ref('管理员');
        const store = useStore();

        const userList = [
            {
                imgUrl: require('@/assets/user.png'),
                placeholder: '请输入用户名',
                type: 'text',
                title: '用户名',
                value: userName
            },
            {
                imgUrl: require('@/assets/lock.png'),
                placeholder: '请输入密码',
                type: 'password',
                title: '密码',
                value: userPass1
            },
            {
                imgUrl: require('@/assets/lock.png'),
                placeholder: '请再次输入密码',
                type: 'password',
                title: '密码',
                value: userPass2
            },
        ];

        const router = useRouter()

        //提交注册表单
        const submitInfo = () => {
            if (userName.value === '' || userPass1.value === '' || userPass2.value === '') {
                alert('字段不能为空噢！');
                return;
            }
            if (userPass1.value !== userPass2.value) {
                alert('您两次输入的密码不正确');
                return;
            }
            const info = {
                'id': userName.value,
                'password': userPass1.value,
                'role': userRole.value,
            }
            onFinsh(JSON.stringify(info));
        }

        //提交数据
        const onFinsh = async (values) => {
            const data = await register(values);
            store.commit('updateUserRole', userRole.value);
            if (data.code === 200) {
                if (userRole.value === '用户') {
                    store.commit('updateUserName', data.obj.uuId)
                    router.replace('suppleuser');
                } else if (userRole.value === '商家') {
                    store.commit('updateUserName', data.obj.ssId)
                    router.replace('suppleshopowner');
                } else if (userRole.value === '骑手') {
                    store.commit('updateUserName', data.obj.ddId)
                    router.replace('supplemarki')
                } else {
                    router.replace('adminHome')
                }
            } else {
                alert('该用户名已存在');
            }
        }

        //跳转到注册页面
        const toLogin = () => {
            router.replace('login');
        }

        return {
            userList,
            userRole,
            userName,
            userPass1,
            userPass2,
            submitInfo,
            toLogin
        }
    }
}
</script>

<style lang="less" scoped>
.register {
    width: 100%;
    height: 100%;
    background: url("@/assets/bac.jpg") no-repeat center;
    background-size: cover;

    .box {
        width: 640px;
        height: 464px;
        background-color: #ffffff;
        opacity: 0.8;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
    }

    .title {
        margin-top: 22px;
        text-align: center;
        font-weight: bolder;
        font-size: 20px;
        color: #18216d;
    }

    input {
        display: block;
        width: 410px;
        height: 44px;
        padding-left: 50px;
        margin-top: 25px;
        margin-left: 110px;
        font-size: 18px;
        outline: 0;
        box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.2);
        border-radius: 30px;
        border: 0;
    }

    select {
        display: block;
        width: 410px;
        height: 44px;
        padding-left: 50px;
        margin-top: 18px;
        margin-left: 110px;
        padding-right: 15px;
        font-size: 18px;
        outline: 0;
        box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.2);
        border-radius: 30px;
        border: 0;
    }

    a {
        position: absolute;
        bottom: 42px;
        right: 4px;
        text-align: right;
        text-decoration: none;
        color: #000;
        font-size: 14px;
        margin-right: 126px;
        margin-top: 20px;
        cursor: pointer;
    }

    .button {
        display: block;
        height: 38px;
        width: 190px;
        line-height: 38px;
        margin-left: 220px;
        margin-top: 36px;
        border-radius: 30px;
        background-color: #18216d;
        color: #ffffff;
        outline: none;
        border: 0;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
    }

    .user_box,
    .role_box {
        position: relative;

        img {
            position: absolute;
            left: 122px;
            top: 8px;
            width: 26px;
            height: 26px;
        }
    }
}
</style>