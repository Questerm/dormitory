<template>
    <div class="suppleMarki">
        <div class="box">
            <p class="title">配送员信息补充</p>
            <form>
                <div v-for="(item, index) in userList" :key="index" class="user_box">
                    <img :src="item.imgUrl" :alt="item.title">
                    <input :type="item.type" :placeholder="item.placeholder" v-model="item.value.value" @change="test"
                        autocomplete>
                </div>
                <div class="button" @click="submitInfo">提交</div>
            </form>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { completeDeliveryman } from '@/api/login'
export default {
    name: 'suppleMarki',
    setup() {
        let markiSsex = ref('');
        let markiNum = ref('');
        const store = useStore();
        const userName = store.state.userName

        const userList = [
            {
                imgUrl: require('@/assets/xingbie.svg'),
                placeholder: '请输入性别',
                type: 'text',
                title: '性别',
                value: markiSsex
            },
            {
                imgUrl: require('@/assets/dianhua.svg'),
                placeholder: '请输入电话',
                type: 'text',
                title: '电话',
                value: markiNum
            },
        ];

        const router = useRouter()

        //提交表单
        const submitInfo = () => {
            if (markiSsex.value === '' || markiNum.value === '') {
                alert('字段不能为空噢！');
                return;
            }
            onFinsh(JSON.stringify({ ddId: userName, dGender: markiSsex.value, dPhoneNum: markiNum.value }))
        }

        //提交数据
        const onFinsh = async (values) => {
            const data = await completeDeliveryman(values);
            if (data.code === 200) {
                router.replace('markiHome');
            }
        }

        return {
            userList,
            submitInfo
        }
    }
}
</script>
  
<style lang="less" scoped>
.suppleMarki {
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
        margin-bottom: 80px;
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
        margin-top: 30px;
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
    }

    .button {
        display: block;
        height: 38px;
        line-height: 38px;
        width: 190px;
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