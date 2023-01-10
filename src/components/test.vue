<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="main">
          <el-row>
            <el-input placeholder="请输入自己的昵称" prefix-icon="el-icon-user-solid" v-model="ro_nickname" style="width:50%">
            </el-input>
            <el-button type="primary" @click="conectWebSocket()">建立连接</el-button>
            <el-button type="danger">断开连接</el-button>
          </el-row>
          <el-row>
            <el-input placeholder="请输入对方频道号" prefix-icon="el-icon-phone" v-model="aisle" style="width:40%"></el-input>
          </el-row>
          <el-row>
            <el-input placeholder="请输入要发送的消息" prefix-icon="el-icon-s-promotion" v-model="messageValue"
              style="width:50%"></el-input>
            <el-button type="primary" @click="sendMessage()">发送</el-button>
          </el-row>
          <div class="message">
            <div v-for="(value, key, index) in messageList" :key="index">
              <el-tag v-if="value.name == name" type="success" style="float:right">我：{{ value.msg }}</el-tag>
              <br />
              <el-tag v-if="value.name != name" style="float:left">{{ value.name }}：{{ value.msg }}</el-tag>
              <br />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
   
<script>
import { ref, reactive } from "vue"
export default {
  setup() {
    //拼接字符
    let ro_nickname = ref("");
    //昵称
    let name = ref(null);
    //websocket对象
    let websocket = null;
    //对方频道号
    let aisle = ref("");
    // 消息列表
    let messageList = reactive([]);
    // 消息内容
    let messageValue = ref("");

    //建立链接函数
    const conectWebSocket = () => {
      console.log("建立链接");
      if (ro_nickname.value === '') {
        alert('请输入自己的昵称');
      } else {
        //判断当前浏览器是否支持WebSocket
        if ("WebSocket" in window) {
          let socketUrl = "ws://localhost:8889/websocket/" + ro_nickname.value;
          console.log(socketUrl);
          websocket = new WebSocket(socketUrl);
          name.value = ro_nickname.value.split("-")[1];
          console.log(name.value)
          console.log(ro_nickname.value.split("-"))
        } else {
          alert('不支持建立socket链接');
        }
        //连接发生错误的回调方法
        websocket.onerror = function () {
            console.log(111)
        }

        //连接成功建立的回调函数方法
        websocket.onopen = function () {

        }

        //接收到消息的回调方法
        websocket.onmessage = function (event) {
          console.log(event.data)
          var object = JSON.parse(event.data);
          console.log(object);
          //显示消息
          if (!object.isFirst) {
            messageList.push(object);
            console.log(messageList);
            console.log(messageList[0].msg)
            console.log("name: " + name.value)
            console.log(messageList[0].name === name.value);
            console.log(ro_nickname.value.split("-"))
          }
        }

        //连接关闭时的回调方法
        websocket.onclose = function () {

        };

        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口
        window.onbeforeunload = function () {
          websocket.close();
        }
      }
    }

    //发送消息
    const sendMessage = () => {
      var socketMsg = { msg: messageValue.value };
      websocket.send(socketMsg);
    }

    //展示信息
    const showInfo = (people, aisle) => {
      alert({
        title: "当前在线人数：" + people,
        message: "您的频道号：" + aisle,
        duration: 0
      })
    }

    return {
      conectWebSocket,
      showInfo,
      sendMessage,
      messageList,
      ro_nickname,
      name,
      aisle,
      messageValue
    }
  }
};
</script>
   
<style scoped>
.main {
  position: relative;
  top: 20px;
}

.message {
  position: relative;
  overflow: auto;
  top: 20px;
  width: 100%;
  height: 40%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 5px;
}
</style>