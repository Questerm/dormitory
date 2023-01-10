<template>
  <div class="header">
    <div class="logoBox" @click="toHome">
      <img src="@/assets/logo.png" alt="">
      宿舍配送服务
    </div>
    <div class="personal">
      <ul>
        <li @click="toShopCar">
          <img src="@/assets/car.svg" alt="购物车">
          <span>购物车</span>
        </li>
        <li @click="toOrderList">
          <img src="@/assets/order.svg" alt="订单">
          <span>我的订单</span>
        </li>
        <li @click="toFeedback">
          <img src="@/assets/tousupingjia.svg" alt="反馈">
          <span>意见反馈</span>
        </li>
        <li>
          <div class="personalBox">
            <div class="hpt">
              <img src="@/assets/touxiang.jpg" alt="">
            </div>
            <el-dropdown>
              <span class="el-dropdown-link">
                {{userName}}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="toPersonInfo">我的资料</el-dropdown-item>
                  <el-dropdown-item @click="toLogOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'Header',
  components: {
    ArrowDown
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const userRole = store.state.userRole;
    const userName = store.state.userName;
    
    // 跳往购物车页面
    const toShopCar = () => {
      router.replace('shoppingCar');
    }

    // 跳往我的资料页面
    const toPersonInfo = () => {
      if (userRole === '用户') {
        router.replace('userperson');
      } else if (userRole === '商家') {
        router.replace('shopperson');
      } else if (userRole === '骑手') {
        router.replace('markiperson');
      }
    } 

    //跳转首页
    const toHome = () => {
      router.replace('home');
    }

    // 退出登录
    const toLogOut = () => {
      store.state.userName = null;
      router.replace('login');
    }

    //跳转到投诉评价
    const toFeedback = () => {
      router.replace('feedback');
    }

    //跳转到订单页面
    const toOrderList = () => {
      router.replace('order')
    }

    return {
      toShopCar,
      toPersonInfo,
      toHome,
      toLogOut,
      userName,
      toFeedback,
      toOrderList
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 46px;
  background-color: #CDD6DD;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.15);

  .logoBox {
    margin-left: 30px;
    line-height: 50px;
    font-size: 18px;
    cursor: pointer;

    img {
      width: 38px;
      height: 38px;
      vertical-align: middle;
    }
  }

  .proName {
    line-height: 50px;

    img {
      width: 38px;
      height: 38px;
      vertical-align: middle;
    }

    .ipt {
      outline: none;
      width: 200px;
      height: 30px;
      border: 2px solid #bfbfbf;
      border-radius: 5px;
      padding-left: 10px;
      margin-left: 10px;
    }
  }

  .personal {
    line-height: 50px;
    margin-right: 20px;

    ul {
      list-style: none;

      li {
        cursor: pointer;
        float: left;
        margin-right: 40px;
        text-decoration: none;

        img {
          width: 30px;
          height: 30px;
          vertical-align: middle;
          margin-right: 8px;
          line-height: 30px;
          cursor: pointer;
        }

        span {
          font-size: 18px;
          color: #000;
        }

        .personalBox {
          display: inline-block;

          .hpt {
            display: inline-block;
            width: 40px;
            height: 40px;
            border-radius: 5px;
            margin-right: 15px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 5px;
            }
          }

          .el-dropdown {
            line-height: 50px;
            cursor: pointer;

            .el-dropdown-link {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>