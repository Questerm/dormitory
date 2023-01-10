<template>
    <div class="success">
        <!-- 导航栏 -->
        <Header></Header>
        <div class="bac">
            <el-result icon="success" title="您的反馈我们已收到" sub-title="感谢您的反馈，请耐心等待我们的回复">
                <template #extra>
                    <el-button type="primary" @click="toHome">回到首页</el-button>
                </template>
            </el-result>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router'
export default {
    name: 'successView',
    components: { Header },
    setup() {
        const router = useRouter();
        const toHome = () => {
            router.replace('home');
        }

        return {
            toHome
        }
    }
}
</script>

<style lang="less" scoped>
.success {
    width: 100%;
    height: 100%;
    background-color: rgb(236, 236, 236);
    padding-bottom: 150px;

    .bac {
        width: 800px;
        height: 500px;
        background-color: #fff;
        margin: 90px auto;
        padding: 30px 100px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>