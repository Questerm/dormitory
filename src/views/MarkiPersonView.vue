<template>
    <div class="person">
        <!-- 导航栏 -->
        <Header></Header>
        <!-- 修改信息部分 -->
        <div class="changeInfo">
            <div class="headImg" @mouseenter.stop="showMask" @mouseleave="hiddenMask" @click="dialogFormVisible = true">
                <img src="@/assets/swiper3.jpg" alt="头像">
                <div class="mark" ref="mask">修改头像</div>
                <!-- 修改头像框框 -->
                <div class="dialog">
                    <el-dialog v-model="dialogFormVisible" title="修改头像" width="30%">
                        <div class="changeImg">
                            <img src="" alt="">
                            <input type="file" />
                        </div>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                                <el-button type="primary" @click="dialogFormVisible = false">
                                    Confirm
                                </el-button>
                            </span>
                        </template>
                    </el-dialog>
                </div>
            </div>
            <div class="info">
                <form>
                    <div class="ipt" v-for="(item, index) in iptList" :key="index">
                        <span>{{ item.name }}</span>
                        <el-input v-model="item.value.value" />
                    </div>
                </form>
            </div>
            <div class="submit">
                <el-button type="primary">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
export default {
    name: 'UserPersonView',
    components: { Header },
    setup() {
        const mask = ref(null);
        let userName = ref('Quester');
        let userPass = ref('123456');
        let markiSsex = ref('女');
        let markiNum = ref('1236954565');
        let dialogFormVisible = ref(false);
        const formLabelWidth = '80px'
        const iptList = [
            {
                name: '用户名',
                value: userName,
                type: 'text',
            },
            {
                name: '密码',
                value: userPass,
                type: 'password',
            },
            {
                name: '性别',
                value: markiSsex,
                type: 'text',
            },
            {
                name: '电话',
                value: markiNum,
                type: 'text',
            },
        ]

        // 鼠标划过时显示修改头像
        const showMask = () => {
            mask.value.style.visibility = 'visible';
        }

        // 鼠标划走时隐藏修改头像
        const hiddenMask = () => {
            mask.value.style.visibility = 'hidden';
        }
        return {
            iptList,
            showMask,
            hiddenMask,
            mask,
            dialogFormVisible,
            formLabelWidth
        }
    }
}
</script>

<style lang="less" scoped>
.person {
    width: 100%;
    padding-bottom: 150px;
    background-color: rgb(235, 247, 249);

    .changeInfo {
        width: 1000px;
        margin: 0 auto;
        margin-top: 70px;
        background-color: #fff;
        border-radius: 16px;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 50px 0;

        .headImg {
            width: 80px;
            height: 80px;
            position: relative;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
                border-radius: 8px;
            }

            .mark {
                width: 100%;
                height: 100%;
                line-height: 80px;
                position: absolute;
                top: 0;
                left: 0;
                background-color: rgba(0, 0, 0, .4);
                color: #fff;
                font-size: 14px;
                border-radius: 8px;
                visibility: hidden;
            }
        }

        .ipt {
            width: 380px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin: 30px 0;

            /deep/.el-input {
                width: 300px;
                height: 40px;
                margin-left: 25px;
            }
        }

        .submit {
            margin: 15px 0;
        }
    }
}
</style>