<template>
    <div class="container">
        <div class="title">
            <h1>我的订单</h1>
        </div>
        <div class="order-title">
            <div class="orderTitle-l">
                <ul>
                    <li>
                        商品名称
                    </li>
                </ul>
            </div>
            <div class="orderTitle-r">
                <ul>
                    <li>单价</li>
                    <li>数量</li>
                    <li>实付</li>
                    <li>订单状态</li>
                    <li ref="operationTitle">操作</li>
                </ul>
            </div>
        </div>
        <div class="orderList">
            <div class="order" v-for="(item, index) in $store.state.orderList" :key="index" ref="order">
                <div class="item-l">
                    <div class="itemInfo">
                        <div class="shopName">{{ `店铺名:${item.sname}` }}</div>
                        <div class="describe">
                            <img :src="item.picture" :alt="item.sname">
                            <p>{{ item.gname }}</p>
                        </div>
                    </div>
                </div>
                <div class="item-r">
                    <ul>
                        <li>
                            {{ `￥${item.price}` }}
                        </li>
                        <li class="num">
                            {{ item.gnum }}
                        </li>
                        <li class="sum">
                            {{ `¥ ${item.oprice}` }}
                        </li>
                        <li class="states">
                            <img v-if="item.payState === '已下单'" src="@/assets/yixiadan.png" alt="" />
                            <img v-if="item.payState === '已拣货'" src="@/assets/yijianhuo.png" alt="" />
                            <img v-if="item.payState === '已接单'" src="@/assets/yijiedan.png" alt="" />
                            <img v-if="item.payState === '配送中'" src="@/assets/peisongzhong.png" alt="" />
                            <img v-if="item.payState === '已完成'" src="@/assets/yiwancheng.png" alt="" />
                            <img v-if="item.payState === '确认退单'" src="@/assets/yituidan.jpg" alt="" />
                        </li>
                        <li ref="operationBtn" class="operationBtn">
                            <el-button v-if="!(item.payState === '已完成')" type="success" @click="dialogTableVisible = true" disabled>评论
                            </el-button>
                            <el-button v-if="item.payState === '已完成'" type="success" @click="clickBtn(item.gid, item.sid, item.oid)">评论
                            </el-button>
                            <el-button v-if="!(item.payState === '已完成') && item.payState !== '确认退单'" type="danger" @click="clickBackBtn(item.oid)">退单</el-button>
                            <el-button v-if="item.payState === '已完成' || item.payState === '确认退单'" type="danger" @click="dialogVisible = true" disabled>退单
                            </el-button>
                        </li>
                    </ul>
                </div>
            </div>
            <el-dialog v-model="dialogVisible" title="确认框" width="30%">
                您确定退单吗？
                <template #footer>
                    <span class="dialog-footer">
                        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="certainBtn">确定</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
        <el-dialog v-model="dialogTableVisible" title="评论" width="50%">
            <div class="commitItem"
            v-for="(item, index) in $store.state.commentGoods" :key="index">
                <div class="commitItemTitle">
                    <img :src="item.picture" alt="">
                    {{ item.gname }}
                </div>
                <el-input v-model="commitText" type="textarea" :rows="8" resize="none" placeholder="请写下对商品的感受和体验吧~"
                    style="width: 600px" />
                <div class="clearfix">
                    <a-upload v-model:file-list="fileList" @change="upDownImg" list-type="picture-card"
                        @preview="handlePreview">
                        <div v-if="fileList.length < 6">
                            <plus-outlined />
                            <div style="margin-top: 8px">可上传六张图片</div>
                        </div>
                    </a-upload>
                    <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                        <img alt="example" style="width: 100%" :src="previewImage" />
                    </a-modal>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
                    <el-button type="primary" @click="commitBtn">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>

</template>

<script>
import { ref, onMounted } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue';
import { selectOrderByUId, insertComment, backOrder, findCommentGoodsByOId } from '@/api/userHome'
import { useStore } from 'vuex'
export default {
    name: 'orderList',
    components: { PlusOutlined },
    setup() {
        const order = ref(null);
        const operationTitle = ref(null);
        const operationBtn = ref(null);
        const dialogTableVisible = ref(false)
        const dialogVisible = ref(false)
        const commitText = ref(null)
        const fileList1 = ref([]);
        const store = useStore();
        let index = ref(0);
        let sId = ref('');
        let oId = ref(0);

        //发起请求拿到用户的订单
        const getOrderList = async () => {
            const data = await selectOrderByUId({uId: store.state.userName});
            store.commit('updateOrderList', data.obj);
            console.log(data)
        }
        onMounted(() => {
            getOrderList();
        })

        let fileObj = new Array(6).fill(null);

        function getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }

        const previewVisible = ref(false);
        const previewImage = ref('');
        const previewTitle = ref('');
        const fileList = ref([]);

        const handleCancel = () => {
            previewVisible.value = false;
            previewTitle.value = '';
        };

        const handlePreview = async file => {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            previewImage.value = file.url || file.preview;
            previewVisible.value = true;
            previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
        };

        // 点击评论按钮
        const clickBtn = (gid, sid, oid) => {
            console.log(gid)
            dialogTableVisible.value = true;
            index.value = gid;
            sId.value = sid;
            findCommentGoods(oid);
        }

        //提交评论
        const commitBtn = async() => {
            dialogTableVisible.value = false;
            for (let i = 0; i < fileList.value.length; i++) {
                fileObj[i] = fileList.value[i].thumbUrl;
            }
            const data = await insertComment({content: commitText.value, gId: index.value, coImage: fileObj, sId: sId.value})
            console.log(data)
        }

        //上传图片
        const upDownImg = (e) => {
            e.fileList[e.fileList.length - 1].status = 'done';
        }

        // 确认退单
        const certainBtn = async () => {
            const data = await backOrder({oId: oId.value})
            console.log(data)
            dialogVisible.value = false
        }

        // 点击退单
        const clickBackBtn = (oid) => {
            dialogVisible.value = true;
            oId.value = oid;
        }

        // 发请求拿到订单的商品
        const findCommentGoods = async(oid) => {
            console.log(oid)
            const data =await findCommentGoodsByOId({oId: oid});
            console.log(data);
            store.state.commentGoods = data.obj;
        }

        return {
            order,
            operationTitle,
            operationBtn,
            commitBtn,
            dialogTableVisible,
            fileList1,
            commitText,
            previewVisible,
            previewImage,
            fileList,
            handleCancel,
            handlePreview,
            previewTitle,
            upDownImg,
            dialogVisible,
            certainBtn,
            index,
            clickBtn,
            clickBackBtn,
            findCommentGoods
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;

    /deep/.el-overlay-dialog {
        .el-button {
            margin-left: 10px;
        }

        top: -50px;

        .el-dialog__body {
            margin: 0 0;
            height: 400px;
            overflow: hidden;
            overflow-y: auto;

            /deep/.avatar-uploader {
                width: 316px;

                .ant-upload {
                    width: 200px;
                    height: 200px;
                    margin-right: 18px;

                    img {
                        width: 200px;
                        height: 200px;
                    }
                }
            }

            .commitItem {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                border: 1px solid rgb(232, 232, 232);
                padding: 12px 12px;
                border-radius: 16px;

                .commitItemTitle {
                    display: flex;

                    img {
                        width: 120px;
                        height: 120px;
                        margin-right: 30px;
                    }
                }

                .el-textarea {
                    margin-top: 15px;
                    margin-left: 1;
                }

                .clearfix {
                    margin-top: 20px;
                }
            }
        }
    }

    .title {
        width: 1216px;
        height: 80px;
        border-radius: 48px 48px 0 0;
        margin-top: 30px;
        background-color: #fff;
        border-bottom: 1px solid rgb(198, 198, 198);
        text-align: left;

        h1 {
            font-weight: 500;
            padding-left: 30px;
            line-height: 80px;
        }
    }

    .order-title {
        position: relative;
        width: 1216px;
        height: 76px;
        background-color: #fff;
        padding: 0 30px;

        .orderTitle-l {
            position: absolute;
            left: 36px;
            top: 0;

            ul {
                height: 40px;
                list-style: none;

                li {
                    float: left;
                    margin-left: 236px;
                    line-height: 76px;
                }
            }
        }

        .orderTitle-r {
            position: absolute;
            right: 0;
            top: 0;

            ul {
                padding: 0 20px;
                height: 40px;
                list-style: none;

                li {
                    float: left;
                    padding: 0 54px;
                    line-height: 76px;
                }
            }
        }
    }

    .orderList {
        width: 1216px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        padding-bottom: 50px;
        border-radius: 0 0 48px 48px;

        /deep/.el-dialog__body {
            height: 0;
            overflow: hidden;
            overflow-y: none;
        }

        .order {
            width: 95%;
            height: 200px;
            background-color: #fff;
            padding: 15px 0;
            border-radius: 15px;
            border: 1px solid rgb(181, 181, 181);
            margin-bottom: 18px;

            .item-l {
                float: left;
                display: flex;
                justify-content: space-around;

                .itemInfo {
                    margin-left: 40px;

                    .shopName {
                        text-align: left;
                        margin-bottom: 15px;
                    }

                    .describe {
                        display: flex;

                        img {
                            width: 170px;
                            height: 112px;
                            margin-right: 30px;
                        }

                        p {
                            width: 134px;
                            font-size: 14px;
                            text-align: left;
                        }
                    }
                }
            }

            .item-r {
                margin-top: 8px;
                float: left;
                margin-left: 134px;

                ul {
                    list-style: none;

                    li {
                        float: left;
                        line-height: 72px;
                        width: 98px;
                        text-align: left;
                        margin-top: 30px;
                        margin-right: 42px;

                        img {
                            width: 70px;
                            height: 70px;
                        }
                    }

                    .num {
                        margin-right: 38px;
                    }

                    .sum {
                        margin-right: 30px;
                    }

                    .states {
                        margin-right: 45px;
                    }

                    .operationBtn {
                        margin-right: 0px;
                        margin-top: 0px;

                    }
                }
            }
        }

    }

    .el-button {
        margin-left: 0;
    }
}
</style>