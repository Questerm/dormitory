<template>
    <div class="person">
        <!-- 导航栏 -->
        <ShopHeader></ShopHeader>
        <!-- 修改信息部分 -->
        <div class="changeInfo">
            <div class="headImg" @mouseenter.stop="showMask" @mouseleave="hiddenMask">
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
                                <el-button @click="dialogFormVisible = false">取消</el-button>
                                <el-button type="primary" @click="toHome">
                                    确定
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
            <div class="submit" >
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
import ShopHeader from '@/components/ShopHeader.vue'
import { getShopBySId, updateShop } from '@/api/shopHome'
import { useStore } from 'vuex'
import router from '@/router'
export default {
    name: 'UserPersonView',
    components: { ShopHeader },
    setup() {
        const mask = ref(null);
        let userName = ref('');
        let userPass = ref('');
        let shopLicense = ref('');
        let phoneNum = ref('');
        let shopAddress = ref('');
        let shopName = ref('');
        const dialogTableVisible = ref(false)
        let dialogFormVisible = ref(false);
        const formLabelWidth = '80px'
        const store = useStore();

        //获取商家信息
        const getShop = async () => {
            console.log(store.state.userName)
            const data = await getShopBySId({ sId: store.state.userName });
            userName.value = data.obj.sId;
            userPass.value = data.obj.sPassword;
            shopLicense.value = data.obj.licenseNum;
            phoneNum.value = data.obj.phoneNum;
            shopAddress.value = data.obj.address;
            shopName.value = data.obj.sName;
        }

        //更新信息
        const updateInfo = async () => {
            dialogTableVisible.value = true;
            await updateShop(JSON.stringify({ sId: userName.value, sPassword: userPass.value, licenseNum: shopLicense.value, phoneNum: phoneNum.value, address: shopAddress.value, sName: shopName.value }));
        }

        //返回首页
        const toHome = () => {
            dialogTableVisible.value = false;
            router.replace('shopHome')
        }

        onMounted(() => {
            getShop();
        })

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
                name: '营业执照',
                value: shopLicense,
                type: 'text',
            },
            {
                name: '电话',
                value: phoneNum,
                type: 'text',
            },
            {
                name: '地址',
                value: shopAddress,
                type: 'text'
            },
            {
                name: '店名',
                value: shopName,
                type: 'text'
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
            formLabelWidth,
            updateInfo,
            toHome,
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
        }

        .ipt {
            width: 400px;
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