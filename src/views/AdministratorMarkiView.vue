<template>
    <div class="home">
        <!-- 导航栏 -->
        <AdministratorHeader></AdministratorHeader>
        <!-- 搜索框 -->
        <div class="search">
            <form>
                <input type="text" placeholder="请输入配送员名称" v-model="searchName" />
                <div type="submit" class="searchBtn" @click="searchDeliveryman">
                    <img src="@/assets/search.png" alt="搜索" class="searchLogo">
                </div>
            </form>
        </div>
        <!-- 主体内容 -->
        <div class="table">
            <h3>配送员详情</h3>
            <div class="info_title">
                <ul>
                    <li>编号</li>
                    <li>昵称</li>
                    <li>性别</li>
                    <li>电话</li>
                    <li>操作</li>
                    <input type="checkbox" style="width:25px;height:25px;margin-right: 326px;"
                        @change="handleCheckAllChange" ref="checkall" />
                </ul>
            </div>
            <div class="info_items">
                <div class="info_item" v-for="(item, index) in $store.state.markiList" :key="index">
                    <ul>
                        <li>{{ item.ddId }}</li>
                        <li>{{ item.dId }}</li>
                        <li>{{ item.dGender }}</li>
                        <li>{{ item.dPhoneNum }}</li>
                        <li>
                            <!-- 删除按钮 -->
                            <el-button type="danger" @click="deleteButton(item.ddId)">
                                删除
                            </el-button>
                            <!-- 修改按钮 -->
                            <el-button type="warning" @click="updateButton(index)">
                                修改
                            </el-button>
                            <input type="checkbox" style="width:25px;height:25px;"
                                @change="handleCheckedGoodsChange($event, item.ddId, index)" ref="check" />
                        </li>
                    </ul>
                </div>
                <el-dialog v-model="dialogDeleteVisible" title="删除用户" width="40%">
                    <div>您确定删除该用户吗？</div>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button type="primary" @click="dialogDeleteVisible = false">取消</el-button>
                            <el-button type="primary" @click="deleteDeliveryman(index)">确定</el-button>
                        </span>
                    </template>
                </el-dialog>
                <el-dialog v-model="dialogUpdateVisible" title="修改商家信息" width="40%">
                    <div class="ipt">
                        <span>昵称</span>
                        <el-input v-model="$store.state.updateListMarki.dId" type="text" />
                    </div>
                    <div class="ipt">
                        <span>密码</span>
                        <el-input v-model="$store.state.updateListMarki.dPassword" type="password" />
                    </div>
                    <div class="ipt">
                        <span>性别</span>
                        <el-input v-model="$store.state.updateListMarki.dGender" type="text" />
                    </div>
                    <div class="ipt">
                        <span>电话</span>
                        <el-input v-model="$store.state.updateListMarki.dPhoneNum" type="text" />
                    </div>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button type="primary" @click="dialogUpdateVisible = false">取消</el-button>
                            <el-button type="primary" @click="updateTheDeliveryman($store.state.updateListMarki)">确定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
            <div class="button">
                <!-- 删除全部按钮 -->
                <el-button type="danger" @click="dialogFormVisible = true">
                    删除全部
                </el-button>
                <el-dialog v-model="dialogFormVisible" title="删除全部用户">
                    您确定删除这些用户吗？
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button type="primary" @click="dialogFormVisible = false">取消</el-button>
                            <el-button type="primary" @click="deleteAll">
                                确定
                            </el-button>
                        </span>
                    </template>
                </el-dialog>
                <!-- 添加按钮 -->
                <el-button type="success" @click="dialogTableVisible = true;">
                    添加
                </el-button>
                <el-dialog v-model="dialogTableVisible" title="添加用户" width="40%">
                    <div class="ipt" v-for="(item, index) in iptList" :key="index">
                        <span>{{ item.name }}</span>
                        <el-input v-model="item.value.value" :type="item.type" />
                    </div>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
                            <el-button type="primary" @click="insertTheDeliveryman">确定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
 
<script>
import { useStore } from 'vuex'
import { getAllDeliveryman, deleteDeliverymanByDId, insertDeliveryman, updateDeliveryman, getDeliverymanByDId, deleteDeliverymans } from '@/api/administratorMarki'
import AdministratorHeader from '@/components/AdministratorHeader.vue';
import { ref, onMounted } from 'vue'
import DeepCopy from '@/util/DeepCopy'
export default {
    name: 'administrator',
    components: { AdministratorHeader },
    setup() {
        let markiName = ref('');
        let markiPass = ref('');
        let markiSsex = ref('');
        let markiNum = ref('');
        let searchName = ref('');
        let deleteList = [];
        let indexList = [];
        const dialogFormVisible = ref(false)
        const dialogUpdateVisible = ref(false)
        const dialogTableVisible = ref(false)
        const dialogDeleteVisible = ref(false)

        //发起请求拿到所有用户的数据
        const getAllDeliverymanList = async () => {
            const data = await getAllDeliveryman();
            store.commit('updateMarkiList', data.obj);
        }
        onMounted(() => {
            getAllDeliverymanList();
        })

        const iptList = [
            {
                name: '昵称',
                value: markiName,
                type: 'text',
            },
            {
                name: '密码',
                value: markiPass,
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


        const check = ref(null);
        const checkall = ref(null);
        const store = useStore();

        //全选操作
        const handleCheckAllChange = (e) => {
            if (e.target.checked) {
                for (const item of store.state.markiList) {
                    deleteList.push(item.ddId);
                }
                checkall.value.checked = true;
                for (let i = 0; i < check.value.length; i++) {
                    check.value[i].checked = true;
                }
            } else {
                deleteList = [];
                checkall.value.checked = false;
                for (let i = 0; i < check.value.length; i++) {
                    check.value[i].checked = false;
                }
            }
        }

        //单选操作
        const handleCheckedGoodsChange = (e, ddId, index) => {
            if (e.target.checked) {
                deleteList.push(ddId);
                indexList.push(index);
                for (let i = 0; i < check.value.length; i++) {
                    if (check.value[i].checked === false) return
                }
                checkall.value.checked = true;
            } else {
                deleteList.splice(deleteList.indexOf(ddId), 1);
                indexList.splice(deleteList.indexOf(ddId), 1);
                checkall.value.checked = false;
            }
        }

        // 删除用户
        const deleteDeliveryman = async (id) => {
            dialogDeleteVisible.value = false
            console.log(id)
            await deleteDeliverymanByDId(id);
            const data = await getAllDeliveryman();
            store.commit('updateMarkiList', data.obj);
        }

        //添加用户
        const insertTheDeliveryman = async () => {
            dialogTableVisible.value = false;
            await insertDeliveryman(JSON.stringify({ dId: markiName.value, dPassword: markiPass.value, dGender: markiSsex.value, dPhoneNum: markiNum.value }));
            const data = await getAllDeliveryman();
            store.commit('updateMarkiList', data.obj);
            markiName.value = '';
            markiPass.value = '';
            markiSsex.value = '';
            markiNum.value = '';
        }

        //修改用户
        const updateTheDeliveryman = async (values) => {
            dialogUpdateVisible.value = false
            console.log(JSON.stringify(values))
            await updateDeliveryman(JSON.stringify(values));
            const data = await getAllDeliveryman();
            store.commit('updateMarkiList', data.obj);
        }

        // 查找商家
        const searchDeliveryman = async () => {
            console.log(111)
            const data = await getDeliverymanByDId(searchName.value);
            store.commit('updateMarkiList', [data.obj]);
        }

        let index = ref('')

        //点击修改按钮
        const updateButton = (idx) => {
            dialogUpdateVisible.value = true;
            const obj = DeepCopy(store.state.markiList[idx]);
            store.state.updateListMarki = obj;
        }

        //点击删除按钮
        const deleteButton = (idx) => {
            dialogDeleteVisible.value = true;
            index.value = idx;
        }

        //点击删除所有用户
        const deleteAll = async () => {
            dialogFormVisible.value = false;
            console.log(deleteList)
            await deleteDeliverymans(deleteList);
            deleteList = [];
            const data = await getAllDeliveryman();
            store.commit('updateMarkiList', data.obj);
            checkall.value.checked = false;
            for (const item of indexList) {
                check.value[item].checked = false;
            }
        }

        return {
            handleCheckAllChange,
            checkall,
            check,
            handleCheckedGoodsChange,
            deleteDeliveryman,
            dialogFormVisible,
            dialogTableVisible,
            iptList,
            insertTheDeliveryman,
            dialogUpdateVisible,
            updateTheDeliveryman,
            dialogDeleteVisible,
            searchName,
            searchDeliveryman,
            updateButton,
            deleteButton,
            index,
            deleteAll
        }
    }
}
</script>
 
<style src="@/assets/css/adminiMarki.css" scoped>

</style>
<style lang="less" scoped>
.home {
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
        /deep/.el-dialog__body {
            padding: 0;

            .ipt {
                width: 381px;
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
        }

        .button {
            display: flex;
            justify-content: right;

            .el-button {
                margin-right: 30px
            }
        }
    }
}
</style>