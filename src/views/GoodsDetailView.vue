<template>
    <div class="goodsDetail">
        <!-- 导航栏 -->
        <Header></Header>
        <!-- 主体部分 -->
        <div class="infoBox">
            <div class="describe">
                <div class="left">
                    <img :src="titleImg" alt="商品图">
                </div>
                <div class="right" v-for="(item, index) in $store.state.goodsItem" :key="index">
                    <h3>商品名称：{{ item.gName }}</h3>
                    <span>{{ `月销： ${item.sales}` }}</span>
                    <span>价钱： {{ `${item.price} / ${item.specification}` }}</span>
                    <div class="type">
                        <span>类型：</span>
                        <el-tag>{{ item.kind }}</el-tag>
                    </div>
                    <div class="cal">
                        <span>数量：</span>
                        <el-input-number v-model="num" :min="1" :max="10" size="small" />
                    </div>
                    <el-button type="primary" @click="addToCar">加入购物车</el-button>
                    <el-dialog v-model="dialogTableVisible" title="提交成功" width="30%">
                        您已加入购物车
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
                                <el-button type="primary" @click="dialogTableVisible = false">确定</el-button>
                            </span>
                        </template>
                    </el-dialog>
                </div>
            </div>
            <div class="later">
                <el-tabs v-model="activeName" class="demo-tabs">
                    <el-tab-pane label="商品详情" name="first">
                        <div v-for="(item, index) in $store.state.theGoods" :key="index">
                            <div class="message">
                                {{ item.introduction }}
                            </div>
                            <div class="imgs">
                                <img :src="item.picture1" alt="" />
                                <img :src="item.picture2" alt="" />
                                <img :src="item.picture3" alt="" />
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="商品评价" name="second">
                        <div class="comments">
                            <div class="re_and_comment" v-for="(item, index) in $store.state.CommentList" :key="index">
                                <div class="comment">
                                    <div class="up">
                                        <div class="co-l">
                                            <img :src="item.uimage" alt="">
                                            <h4>{{ item.uid }}</h4>
                                        </div>
                                        <div class="co-r">
                                            <p>{{ item.content }}</p>
                                            <div class="co-imgs">
                                            <img :src="item.coImage1" alt="">
                                            <!-- <img :src="item.picture2" alt="">
                                            <img :src="item.picture3" alt=""> -->
                                        </div>
                                        </div>
                                    </div>
                                    <div class="down">
                                        {{ item.cdate }}
                                    </div>
                                </div>
                                <div 
                                class="reComment"
                                v-if="item.reContent !== null">
                                    商家回复：
                                    <p>{{ item.reContent }}</p>
                                    <div class="date">
                                        {{ item.cdate }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header'
import { selectGoods, joinCart, getGoodsByGId, selectCommentByGId } from '@/api/userHome'
import { useStore } from 'vuex'
export default {
    name: 'goodsDetailView',
    components: { Header },
    setup() {
        const num = ref(1);
        const activeName = ref('first')
        const store = useStore();
        const dialogTableVisible = ref(false);
        let gId = null;
        let titleImg = ref('');

        //拿到商品评论
        const getComment = async (gid) => {
            const data = await selectCommentByGId({ gId: gid });
            store.state.CommentList = data.obj
        }

        //拿商品详细信息
        const getTheGoodsByGId = async (gid) => {
            const data = await getGoodsByGId(gid);
            store.state.theGoods = [data.obj];
            titleImg.value = data.obj.picture
        }

        //加入购物车
        const addToCar = async () => {
            dialogTableVisible.value = true;
            await joinCart({ gNum: num.value, gId: gId, uId: store.state.userName })
        }

        onMounted(() => {
            getGoods();
            getTheGoodsByGId(store.state.gid)
            getComment(store.state.gid)
        })

        //请求所有商品数据
        const getGoods = async () => {
            const data = await selectGoods({ gName: store.state.goodsName });
            store.state.goodsItem = data.obj;
            gId = data.obj[0].gid;
        }

        return {
            num,
            activeName,
            addToCar,
            dialogTableVisible,
            getGoodsByGId,
            getTheGoodsByGId,
            titleImg
        }
    }
}
</script >

<style lang="less" scoped>
.goodsDetail {
    width: 100%;
    background-color: rgb(236, 236, 236);
    padding-bottom: 150px;

    .infoBox {
        width: 1326px;
        margin: 0 auto;
        border-radius: 16px;
        background-color: rgb(255, 255, 255);
        margin-top: 36px;
        padding-bottom: 50px;

        .describe {
            padding-top: 50px;
            height: 550px;

            .left {
                float: left;
                margin: 20px 200px;
                width: 350px;
                height: 350px;
                border-radius: 16px;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 16px;
                }
            }

            .right {
                margin: 50px 50px;
                float: left;
                display: flex;
                align-items: flex-start;
                flex-direction: column;

                h3,
                span,
                .type,
                .cal {
                    margin: 10px 0;
                }
                h3 {
                    width: 340px;
                    text-align: left;
                }

                /deep/.el-button {
                    margin: 20px 15px;
                }
            }
        }

        .later {
            .demo-tabs {
                padding: 0 50px;

                .message {
                    padding: 20px 50px;
                    text-align: left;
                }

                .imgs {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    img {
                        margin: 20px 0;
                        width: 600px;
                        height: 600px;
                        border-radius: 16px;
                    }
                }
            }

            .selectBtn {
                text-align: left;
            }

            .comments {
                margin-top: 30px;

                .comment {
                    margin: 20px 0;
                    display: flex;
                    flex-direction: column;
                    border-radius: 16px;
                    border: 1px solid rgb(237, 237, 237);

                    .up {
                        padding: 10px 40px;
                        display: flex;
                        align-items: center;

                        .co-l {
                            margin-top: 6px;
                            float: left;

                            img {
                                width: 150px;
                                height: 150px;
                                border-radius: 16px;
                            }
                        }

                        .co-r {
                            float: left;
                            margin-left: 80px;

                            p {
                                text-align: left;
                                line-height: 30px;
                            }

                            .co-imgs {
                                text-align: left;

                                img {
                                    width: 150px;
                                    height: 150px;
                                    margin-right: 20px;
                                    border-radius: 16px;
                                }
                            }
                        }
                    }

                    .down {
                        padding-right: 20px;
                        text-align: right;
                    }
                }

                .reComment {
                    width: 1225px;
                    height: 116px;
                    margin: 20px 0;
                    padding: 10px 20px;
                    text-align: left;
                    background-color: #ececec;
                    border-radius: 16px;

                    p {
                        padding-top: 10px;
                    }

                    .date {
                        line-height: 30px;
                        text-align: right;
                    }
                }
            }
        }
    }
}
</style>