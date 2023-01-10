<template>
    <div class="shopHome">
        <ShopHeader></ShopHeader>
        <Search></Search>
        <!-- 主体内容 -->
        <div class="table">
            <h3>我的商品详情</h3>
            <div class="info_title">
                <ul>
                    <li>商品编号</li>
                    <li>商品名称</li>
                    <li>图片</li>
                    <li>单价</li>
                    <li>销量</li>
                    <li>商品类型</li>
                    <li>操作</li>
                    <input type="checkbox" style="width:25px;height:25px;margin-right: -2px;"/>
                </ul>
            </div>
            <div class="info_items">
                <div class="info_item" v-for="(item, index) in $store.state.goodsList" :key="index">
                    <ul>
                        <li>{{ item.gid }}</li>
                        <li>{{ item.gName }}</li>
                        <li><img :src="item.picture" alt=""></li>
                        <li>{{ `¥${item.price}` }}</li>
                        <li>{{ item.sales }}</li>
                        <li>{{ item.kind }}</li>
                        <li>
                            <!-- 删除按钮 -->
                            <el-button type="danger">
                                删除
                            </el-button>
                            <!-- 修改按钮 -->
                            <el-button type="warning">
                                修改
                            </el-button>
                            <input type="checkbox" style="width:25px;height:25px;"/>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="button">
                <!-- 删除全部按钮 -->
                <el-button type="danger">
                    删除全部
                </el-button>
                <!-- 添加按钮 -->
                <el-button type="success" @click="dialogTableVisible = true;">
                    添加
                </el-button>
                <el-dialog v-model="dialogTableVisible" title="添加商品" width="40%">
                    <div class="ipt" v-for="(item, index) in iptList" :key="index">
                        <span>{{ item.name }}</span>
                        <el-input v-model="item.value.value" :type="item.type" />
                    </div>
                    <!-- 图片上传 -->
                    <div class="imgUpdown">
                        <span class="img">图片</span>
                        <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card"
                            class="avatar-uploader" :show-upload-list="false" @change="handleChange">
                            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                            <div v-else>
                                <loading-outlined v-if="loading"></loading-outlined>
                                <plus-outlined v-else></plus-outlined>
                                <div class="ant-upload-text">上传一张图片</div>
                            </div>
                        </a-upload>
                    </div>
                    <div class="detail">
                        <span>详情信息</span>
                        <el-input v-model="detailInfo" resize="none" :rows="8" type="textarea"
                            placeholder="请输入商品的详细信息" />
                    </div>
                    <div class="clearfix">
                        <a-upload list-type="picture-card" v-model:file-list="fileList1" @change="upDownImg">
                            <div v-if="fileList1.length < 3">
                                <plus-outlined />
                                <div class="ant-upload-text">上传三张图片</div>
                            </div>
                        </a-upload>
                        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                            <img alt="example" style="width: 100%" :src="previewImage" />
                        </a-modal>
                    </div>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
                            <el-button type="primary" @click="insertTheGoods">确定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import ShopHeader from '@/components/ShopHeader.vue'
import Search from '@/components/Search.vue'
import { getGoodsBysId, insertGoods } from '@/api/shopHome'
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
export default {
    name: 'shopHome',
    components: {
        ShopHeader, Search, PlusOutlined, LoadingOutlined
    },
    setup() {
        let goodName = ref('');
        let kind = ref('');
        let price = ref('');
        let introduction = ref('');
        let searchName = ref('');
        let specification = ref('')
        const detailInfo = ref('');
        const store = useStore();
        const dialogTableVisible = ref(false)
        const fileList = ref([]);
        const loading = ref(false);
        const imageUrl = ref('');
        const previewVisible = ref(false);
        const previewImage = ref('');
        let fileList1 = ref([]);
        let index = ref('')

        const handleCancel = () => {
            previewVisible.value = false;
        };

        //发起请求拿到所有用户的数据
        const getAllGoodsList = async () => {
            const data = await getGoodsBysId({ sId: store.state.userName });
            store.commit('updateGoodsList', data.obj);
        }

        onMounted(() => {
            getAllGoodsList();
        })

        //将图片转换成base64
        function getBase64(img, callback) {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(img);
        }

        // 上传图片的改变
        const handleChange = info => {
            getBase64(info.file.originFileObj, base64Url => {
                imageUrl.value = base64Url;
                loading.value = false;
            });
        };

        const iptList = [
            {
                name: '名称',
                value: goodName,
                type: 'text',
            },
            {
                name: '类型',
                value: kind,
                type: 'text',
            },
            {
                name: '价格',
                value: price,
                type: 'text',
            },
            {
                name: '规格',
                value: specification,
                type: 'text'
            }
        ]

        //上传图片
        const upDownImg = (e) => {
            e.fileList[e.fileList.length - 1].status = 'done';
        }

        //添加商品
        const insertTheGoods = async () => {
            dialogTableVisible.value = false;
            await insertGoods({
                gName: goodName.value, kind: kind.value,
                price: price.value, introduction: introduction.value,
                specification: specification.value, picture: imageUrl.value,
                picture1: fileList1.value[0].thumbUrl, picture2: fileList1.value[1].thumbUrl,
                picture3: fileList1.value[2].thumbUrl, sId: store.state.userName
            });
            getAllGoodsList();
            goodName.value = '';
            kind.value = '';
            price.value = '';
            introduction.value = '';
            specification.value = '';
            imageUrl.value = '';
            fileList1.value = [];
        }

        return {
            dialogTableVisible,
            iptList,
            insertTheGoods,
            searchName,
            index,
            fileList,
            loading,
            imageUrl,
            handleChange,
            detailInfo,
            fileList1,
            previewImage,
            handleCancel,
            previewVisible,
            upDownImg
        }
    }
}
</script>

<style src="@/assets/css/shopHome.css" scoped>

</style>
<style lang="less" scoped>
.shopHome {
    width: 100%;
    height: 100%;
    background-color: rgb(236, 236, 236);
    padding-bottom: 150px;

    .search {
        position: relative;
        opacity: 0.8;
        margin: 0 auto;
        margin-top: 22px;
        border-radius: 10px;

        input {
            width: 1020px;
            height: 40px;
            margin-left: 20px;
            margin-top: 6px;
            background-color: #fff;
            opacity: 0.8;
            border-radius: 30px;
            outline: none;
            box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.2);
            border: 0;
            padding-left: 20px;
            font-size: 16px;
        }

        .searchBtn {
            position: absolute;
            right: 242px;
            top: 16px;
            width: 45px;
            height: 45px;
            outline: none;
            background-color: transparent;
            border: 0;
            cursor: pointer;

            .searchLogo {
                height: 20px;
                width: 20px;
            }
        }
    }

    .table {
        position: relative;
        width: 1360px;
        height: 600px;
        background-color: #fff;
        border-radius: 20px;
        margin: 24px auto;

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

        /deep/.el-overlay-dialog {
            top: -50px;

            .el-dialog__body {
                padding: 0px;
                height: 500px;
                overflow: hidden;
                overflow-y: auto;

                .ipt {
                    width: 380px;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    margin: 8px auto;

                    .el-input {
                        width: 300px;
                        height: 40px;
                        margin-left: 25px;
                    }
                }

                .imgUpdown {
                    width: 380px;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    margin: 8px auto;

                    .img {
                        display: inline-block;
                        width: 40px;
                    }
                }

                .detail {
                    width: 380px;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    margin: 8px auto;

                    .el-textarea {
                        width: 300px;
                        margin-left: 20px;
                    }
                }

                .clearfix {
                    margin-top: 20px;
                }
            }
        }
    }

    .button {
        display: flex;
        justify-content: right;

        .el-button {
            margin-right: 30px
        }
    }
}
</style>