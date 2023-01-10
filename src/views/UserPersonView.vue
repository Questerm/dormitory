<template>
    <div class="person">
        <!-- 导航栏 -->
        <Header></Header>
        <!-- 修改信息部分 -->
        <div class="changeInfo">
            <div class="headImg" @mouseenter.stop="showMask" @mouseleave.stop="hiddenMask" @click.capture="Isdialog1">
                <img src="@/assets/touxiang.jpg" alt="头像">
                <el-button text @click="Isdialog" style="display: none">
                    click to open the Dialog
                </el-button>
                <div class="mark" ref="mask">修改头像</div>
                <!-- 修改头像框框 -->
                <el-dialog v-model="dialogVisible" title="修改头像" width="30%" @closed="handleClose">
                    <div class="changeImg">
                        <img :src="imgUrl" alt="头像">
                        <input type="file" @click="uploadImg" />
                    </div>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button type="primary" @click="dialogVisible = false; isYes = false;">取消</el-button>
                            <el-button type="primary" @click="dialogVisible = false; isYes = true;">
                                确定
                            </el-button>
                        </span>
                    </template>
                </el-dialog>
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
                <el-button type="primary" @click="updateInfo">提交</el-button>
                <el-dialog v-model="dialogTableVisible" title="添加用户" width="40%">
                    您修改信息成功
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
                            <el-button type="primary" @click="toHome">确定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import { getUserByUId, updateUser } from '@/api/administratorUser'
import { useStore } from 'vuex'
import router from '@/router'
export default {
    name: 'UserPersonView',
    components: { Header },
    setup() {
        const mask = ref(null);
        let uuId = ref(0);
        let userName = ref('');
        let userPass = ref('');
        let userSno = ref('');
        let userSsex = ref('');
        let userLno = ref('');
        let userRno = ref('');
        let phoneNum = ref('');
        let imgUrl = ref('');
        const dialogTableVisible = ref(false)
        imgUrl.value = require('@/assets/swiper3.jpg');
        const dialogVisible = ref(false);
        let isYes = ref('false');
        const store = useStore();

        //获取用户信息
        const getUser = async () => {
            const data = await getUserByUId(store.state.userName);
            uuId.value = data.obj.uuId;
            userName.value = data.obj.uId;
            userPass.value = data.obj.uPassword;
            userSno.value = data.obj.stuNum;
            userSsex.value = data.obj.gender;
            userLno.value = data.obj.dorNum;
            userRno.value = data.obj.roomNum;
            phoneNum.value = data.obj.uphoneNum;
        }

        onMounted(() => {
            getUser()
        })

        //修改头像后的回调
        const handleClose = () => {
            if (isYes.value === true) {
                alert('修改头像成功！');
            }
        }
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
                name: '学号',
                value: userSno,
                type: 'text',
            },
            {
                name: '性别',
                value: userSsex,
                type: 'text',
            },
            {
                name: '楼号',
                value: userLno,
                type: 'text'
            },
            {
                name: '房间号',
                value: userRno,
                type: 'text'
            },
            {
                name: '电话',
                value: phoneNum,
                type: 'text'
            }
        ]

        // 鼠标划过时显示修改头像
        const showMask = () => {
            mask.value.style.visibility = 'visible';
        }

        // 鼠标划走时隐藏修改头像
        const hiddenMask = () => {
            mask.value.style.visibility = 'hidden';
        }

        const Isdialog1 = () => {
            Isdialog();
        }

        const Isdialog = () => {
            dialogVisible.value = true;
            isYes.value = false;
        }

        // 上传图片
        const uploadImg = (e) => {
            e.target.onchange = () => {
                let reader = new FileReader();
                reader.onload = (e) => {
                    imgUrl.value = e.target.result;
                    console.log(imgUrl.value)
                }
                reader.readAsDataURL(e.target.files[0]);
            }
        }

        //更新信息
        const updateInfo = async () => {
            dialogTableVisible.value = true;
            await updateUser(JSON.stringify({ uuId: uuId.value, uId: userName.value, uPassword: userPass.value, stuNum: userSno.value, gender: userSsex.value, dorNum: userLno.value, roomNum: phoneNum.value }));
        }

        //返回首页
        const toHome = () => {
            dialogTableVisible.value = false;
            router.replace('home')
        }

        return {
            toHome,
            iptList,
            showMask,
            hiddenMask,
            mask,
            dialogVisible,
            handleClose,
            formLabelWidth,
            Isdialog1,
            Isdialog,
            uploadImg,
            imgUrl,
            isYes,
            updateInfo,
            dialogTableVisible
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

            .changeImg {
                width: 200px;
                height: 200px;
                margin: 0 auto;
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