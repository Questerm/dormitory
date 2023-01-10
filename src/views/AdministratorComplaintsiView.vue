<template>
    <div class="home">
        <!-- 导航栏 -->
        <AdministratorHeader></AdministratorHeader>
        <div class="complaints">
            <div class="complaint" v-for="(item, index) in $store.state.complaintList" :key="index">
                <div class="up">
                    <div class="co-l">
                        <img src="@/assets/touxiang.jpg" alt="">
                        <h4>{{ item.uid }}</h4>
                    </div>
                    <div class="co-r">
                        <p>{{ item.comContent }}</p>
                        <div class="co-imgs">
                            <img :src="item.compImage1" alt="" />
                        </div>
                    </div>
                </div>
                <div class="down">
                    <div class="kind">
                        {{item.compKind}}
                    </div>
                    <el-button type="primary" @click="dealBtn(item.complaintId)">处理完成</el-button>
                </div>
            </div>
            <el-dialog v-model="dialogVisible" title="确认框" width="30%">
                您已处理成功
                <template #footer>
                    <span class="dialog-footer">
                        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="clickBtn">确定</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import AdministratorHeader from '@/components/AdministratorHeader.vue';
import { getAllComplaint, deleteComplaintByCId } from '@/api/administratorComplaints'
import { useStore } from 'vuex'
export default {
    name: 'administratorComplaints',
    components: { AdministratorHeader },
    setup() {
        const store = useStore();
        const dialogVisible = ref(false);
        let cId = null;
        const getComment = async () => {
            const data = await getAllComplaint();
            store.state.complaintList = data.obj;
        }

        const dealBtn = (cid) => {
            dialogVisible.value = true;
            cId = cid;
        }

        const clickBtn = async() => {
            await deleteComplaintByCId(cId);
            dialogVisible.value = false;
            getComment();
        }

        onMounted(() => {
            getComment();
        })
        return {
            dialogVisible,
            dealBtn,
            clickBtn
        }
    }
}
</script>

<style lang="less" scoped>
.home {
    width: 100%;
    height: 100%;
    background-color: rgb(236, 236, 236);

    .complaints {
        width: 1316px;
        padding: 20px 0;
        margin: 0 auto;
        margin-top: 50px;
        background-color: #fff;
        border-radius: 48px;
        .complaint {
            margin: 20px 0;
            display: flex;
            flex-direction: column;
            border-radius: 16px;
            border: 1px solid rgb(237, 237, 237);
            width: 1100px;
            margin: 0 auto;

            .up {
                padding: 10px 40px;
                display: flex;
                align-items: center;

                .co-l {
                    margin-top: 6px;
                    float: left;

                    img {
                        width: 100px;
                        height: 100px;
                        border-radius: 16px;
                    }
                }

                .co-r {
                    float: left;
                    margin-left: 26px;

                    p {
                        text-align: left;
                        line-height: 30px;
                    }

                    .co-imgs {
                        text-align: left;

                        img {
                            width: 100px;
                            height: 100px;
                            margin-right: 20px;
                            border-radius: 16px;
                        }
                    }
                }
            }

            .down {
                padding-right: 20px;
                text-align: right;
                margin-bottom: 10px;
                .kind {
                    display: inline-block;
                    height: 40px;
                    background-color: antiquewhite;
                    font-size: 14px;
                    line-height: 38px;
                    margin-right: 80px;
                    padding: 0 10px;
                    border-radius: 10px;
                }
            }
        }
    }
}
</style>