<template>
    <div class="feedback">
        <!-- 导航栏 -->
        <Header></Header>
        <!-- 主体部分 -->
        <h2>意见反馈</h2>
        <div class="opinion">
            <p>请在这里写下您的宝贵意见吧！</p>
            <el-form-item label="反馈类型">
                <el-radio-group v-model="form.resource">
                    <el-radio label="对网页版系统" />
                    <el-radio label="对商家" />
                    <el-radio label="对配送员" />
                </el-radio-group>
            </el-form-item>
            <el-form-item label="评论意见">
                <el-input v-model="form.desc" type="textarea" :rows="10" resize="none" placeholder="可以尽量描述的详细些"
                    style="width: 600px" />
            </el-form-item>
            <p>请上传一些图片，直观发现问题！</p>
            <div class="imgs">
                <img v-for="(item, index) in fileList" :key="index" :src="item">
                <div class="addImg" @click="isChange" ref="addImg">
                    点击添加图片
                    <input type="file" @click.stop="uploadImg" style="visibility: hidden" ref="ipt" />
                </div>
                <img src="@/assets/comment.svg" alt="评论" class="commentImg">
            </div>
            <p>请留下您的名字和联系方式吧！</p>
            <div class="text">
                <el-input v-model="userName" placeholder="姓名/用户名" />
                <el-input v-model="userNum" placeholder="电话号码" />
            </div>
            <el-button type="primary" @click="toSuccess">提交</el-button>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { reactive } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { insertComplaint } from '@/api/userHome'
export default {
    name: 'feedbackview',
    components: { Header },
    setup() {
        const ipt = ref(null);
        let userName = ref('');
        let userNum = ref('');
        const router = useRouter();
        const form = reactive({
            resource: '',
            desc: '',
        })
        let fileList = reactive([]);
        const dialogImageUrl = ref('')
        const dialogVisible = ref(false)
        const addImg = ref(null);
        let index = 0;

        //点击addImg盒子上传图片
        const isChange = () => {
            if (fileList.length === 6) {
                addImg.value.style.display = "none";
            }
            ipt.value.click()
        }

        // 上传图片
        const uploadImg = () => {
            ipt.value.onchange = () => {
                let reader = new FileReader();
                reader.onload = (e) => {
                    fileList[index] = e.target.result;
                    index++;
                    console.log(fileList)
                }
                reader.readAsDataURL(ipt.value.files[0]);
            }
        }

        //跳转到成功页面
        const toSuccess = async() => {
            if (fileList.length < 6) {
                let k = fileList.length - 1;
                for (let i = k+1; i < 6; i++) {
                    fileList[i] = null;
                }
            }
            await insertComplaint({compKind: form.resource, comContent: form.desc, compImage: fileList, uId: userName.value, uPhoneNum: userNum.value})
            router.replace('success');
        }

        return {
            form,
            dialogImageUrl,
            dialogVisible,
            fileList,
            userName,
            userNum,
            isChange,
            uploadImg,
            ipt,
            addImg,
            toSuccess
        }
    }
}
</script>

<style lang="less" scoped>
.feedback {
    width: 100%;
    background-color: rgb(236, 236, 236);
    padding-bottom: 150px;

    h2 {
        margin: 30px 0;
    }

    .opinion {
        width: 1200px;
        background-color: #fff;
        margin: 0 auto;
        padding: 30px 100px;
        border-radius: 16px;

        p {
            text-align: left;
            margin: 20px 0;
        }

        /deep/.el-upload-list {
            width: 600px;
        }

        /deep/.el-input {
            width: 100px;
            margin: 20px 0;
        }

        .imgs {
            position: relative;
            width: 512px;
            display: flex;
            flex-wrap: wrap;
            border: 1px solid rgb(241, 241, 241);
            border-radius: 16px;

            img {
                width: 150px;
                height: 150px;
                border-radius: 16px;
                margin: 10px 10px;
            }
            .commentImg {
                position: absolute;
                left: 630px;
                top: 10px;
                width: 300px;
                height: 300px;
            }

            .addImg {
                width: 150px;
                height: 150px;
                border-radius: 16px;
                border: 1px solid rgb(236, 236, 236);
                font-size: 14px;
                line-height: 150px;
                margin: 10px 10px;
                cursor: pointer;
            }
        }

        .text {
            display: flex;
            justify-content: left;

            /deep/.el-input {
                width: 200px;
                margin-right: 20px;
            }
        }
        /deep/.el-button {
                margin: 20px 0;
            }
    }
}
</style>