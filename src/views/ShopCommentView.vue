<template>
  <div class="comment">
    <ShopHeader></ShopHeader>
    <div class="container">
      <div class="comments">
        <div class="re_and_comment" v-for="(item, index) in $store.state.commentList" :key="index">
          <div class="comment">
            <div class="up">
              <div class="co-l">
                <img src="@/assets/touxiang.jpg" alt="">
                <h4>用户</h4>
              </div>
              <div class="co-r">
                <p>{{ item.content }}</p>
              </div>
            </div>
            <div class="down">
              <div class="date">
                {{ item.cdate }}
              </div>
              <el-button type="primary" @click="clickBtn($event, item.coId)">回复评论</el-button>
            </div>
          </div>
          <div 
          class="reComment"
          v-if="item.reContent !== null">
            回复：
            <p>{{ item.reContent }}</p>
            <div class="date">
              {{ item.cdate }}
            </div>
          </div>
        </div>
        <el-dialog v-model="dialogVisible" title="回复评论" width="40%">
          <el-input v-model="textarea" :rows="8" type="textarea" placeholder="请输入回复评论的内容~" resize="none" />
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="certainBtn()">确定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import ShopHeader from '@/components/ShopHeader.vue';
import { ref, onMounted } from 'vue'
import { replyComment } from '@/api/shopHome'
import { useStore } from 'vuex'
import { getCommentBySId } from '@/api/shopHome'
export default {
  name: 'shopComment',
  components: { ShopHeader },
  setup() {
    const dialogVisible = ref(false);
    const textarea = ref('')
    const store = useStore();
    let coId = ref(0);

    //提交回复的评论
    const certainBtn = async () => {
      dialogVisible.value = false
      await replyComment({ coId: coId.value, reContent: textarea.value })
      getUserComment()
    }

    //拿到用户的评论
    const getUserComment = async () => {
      const data = await getCommentBySId({ sId: store.state.userName })
      store.state.commentList = data.obj;
    }

    const clickBtn = (e, coid) => {
      dialogVisible.value = true
      coId.value = coid;
      e.target.parentNode.disabled = true;
    }

    onMounted(() => {
      getUserComment();
    })

    return {
      certainBtn,
      dialogVisible,
      textarea,
      clickBtn
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  width: 100%;
  height: 100%;
  background-color: rgb(236, 236, 236);

  .container {
    width: 1216px;
    height: 620px;
    border-radius: 48px 48px;
    background-color: #fff;
    margin: 40px auto;

    .comments {
      display: flex;
      justify-content: center;
      padding-top: 20px;
      height: 570px;
      overflow: hidden;
      overflow-y: auto;

      .comment {
        width: 1100px;
        height: 170px;
        margin: 20px 0;
        display: flex;
        flex-direction: column;
        border-radius: 16px;
        border: 1px solid rgb(233, 233, 233);

        .up {
          padding: 10px 40px;
          display: flex;
          align-items: center;

          .co-l {
            margin-top: 6px;
            float: left;

            img {
              width: 60px;
              height: 60px;
              border-radius: 10px;
            }

            h4 {
              margin-top: 10px;
            }
          }

          .co-r {
            float: left;
            margin-left: 80px;

            p {
              text-align: left;
              line-height: 30px;
            }
          }
        }

        .down {
          display: flex;
          justify-content: flex-end;
          padding-right: 50px;
          margin-bottom: 10px;

          .date {
            margin-right: 176px;
            line-height: 30px;
            text-align: right;
          }
        }
      }

      .reComment {
        width: 1100px;
        height: 116px;
        margin: 20px 0;
        padding: 10px 20px;
        text-align: left;
        border: 1px solid rgb(197, 197, 197);
        border-radius: 16px;

        p {
          padding-top: 10px;
        }

        .date {
          margin-right: 294px;
          line-height: 30px;
          text-align: right;
        }
      }
    }
  }
}
</style>