<template>
  <div class="home">
    <div class="box">
      <p class="title">用户登录</p>
      <form>
        <div v-for="(item, index) in userList" :key="index" class="user_box">
          <img :src="item.imgUrl" :alt="item.title">
          <input :type="item.type" :placeholder="item.placeholder" v-model="item.value.value" @change="test"
            autocomplete>
        </div>
        <a @click="toRegister">去注册</a>
        <div class="button" @click="userLogin">登录</div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { login } from '@/api/login'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'HomeView',
  setup() {
    let userName = ref('');
    let userPass = ref('');
    let userRole = ref('管理员');
    const store = useStore();

    const userList = [
      {
        imgUrl: require('@/assets/user.png'),
        placeholder: '请输入用户名',
        type: 'text',
        title: '用户名',
        value: userName
      },
      {
        imgUrl: require('@/assets/lock.png'),
        placeholder: '请输入密码',
        type: 'password',
        title: '密码',
        value: userPass
      },
      {
        imgUrl: require('@/assets/role.png'),
        placeholder: '请输入角色',
        type: 'text',
        title: '角色',
        value: userRole
      }
    ];

    const router = useRouter()

    //提交登录表单
    const userLogin = () => {
      if (userName.value === '' || userPass.value === '' || userRole.value === '') {
        alert('字段不能为空噢！');
        return;
      }
      if (userRole.value !== '管理员' && userRole.value !== '商家' && userRole.value !== '用户' && userRole.value !== '骑手') {
        alert('输入的角色不正确噢!');
        return;
      }
      onFinsh(JSON.stringify({ id: userName.value, password: userPass.value, role: userRole.value }));
    }

    // 提交数据
    const onFinsh = async (values) => {
      const data = await login(values);
      localStorage.setItem("token", data.obj.token);
      localStorage.setItem("role", userRole.value);
      store.commit('updateUserRole', userRole.value)
      store.commit('updateUserName', userName.value)
      if (data.code === 200) {
        if (userRole.value === '用户') {
          router.replace('home');
        } else if (userRole.value === '商家') {
          router.replace('shopHome');
        } else if (userRole.value === '管理员') {
          router.replace('adminHome');
        } else {
          router.replace('markiHome');
        }
      } else {
        if (data.message === '密码不正确') {
          alert('您输入的密码不正确');
        } else {
          alert('您输入的用户不存在');
        }
      }
    }

    //跳转到注册页面
    const toRegister = () => {
      router.replace('register');
    }

    return {
      userList,
      userName,
      userPass,
      userRole,
      userLogin,
      toRegister
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  background: url("@/assets/bac.jpg") no-repeat center;
  background-size: cover;

  .box {
    width: 640px;
    height: 464px;
    background-color: #ffffff;
    opacity: 0.8;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;

    .title {
      margin-top: 34px;
      text-align: center;
      font-weight: bolder;
      font-size: 20px;
      color: #18216d;
    }

    input {
      display: block;
      width: 410px;
      height: 44px;
      padding-left: 50px;
      margin-top: 40px;
      margin-left: 110px;
      font-size: 16px;
      outline: 0;
      box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.2);
      border-radius: 30px;
      border: 0;
    }

    a {
      position: absolute;
      right: 4px;
      bottom: 112px;
      text-align: right;
      text-decoration: none;
      color: #000;
      font-size: 14px;
      margin-right: 126px;
      margin-top: 20px;
      cursor: pointer;
    }

    .button {
      display: block;
      height: 38px;
      width: 190px;
      margin-left: 220px;
      margin-top: 68px;
      padding-top: 8px;
      border-radius: 30px;
      background-color: #18216d;
      color: #ffffff;
      outline: none;
      border: 0;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }

    .user_box {
      position: relative;

      img {
        position: absolute;
        left: 122px;
        top: 8px;
        width: 26px;
        height: 26px;
      }
    }

  }
}
</style>
