<template>
  <div class="chat-box">
    <header>聊天室 (在线:{{ count }}人)</header>
    <div class="msg-box" ref="msg-box">
      <div
        v-for="(i, index) in list"
        :key="index"
        class="msg"
        :style="i.userId == userId ? 'flex-direction:row-reverse' : ''"
      >
        <div class="user-head">
          <!-- <img :src="i.avatar" height="30" width="30" :title="i.username" /> -->
          <div>{{ username }}</div>
        </div>
        <div class="user-msg">
          <span
            :style="i.userId == userId ? ' float: right;' : ''"
            :class="i.userId == userId ? 'right' : 'left'"
            >{{ i.content }}</span
          >
        </div>
      </div>
    </div>
    <div class="input-box">
      <input
        type="text"
        ref="sendMsg"
        v-model="contentText"
        @keyup.enter="sendText()"
      />
      <div
        class="btn"
        :class="{ ['btn-active']: contentText }"
        @click="sendText()"
      >
        发送
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ws: null,
      count: 0,
      userId: this.$store.state.user.userId, // 当前用户ID
      username: this.$store.state.user.name, // 当前用户昵称
      //   avatar: this.$store.getters.avatar, // 当前用户头像
      list: [], // 聊天记录的数组
      contentText: "", // input输入的值
    };
  },
  mounted() {
    this.initWebSocket();
  },
  //   destroyed() {
  //     // 离开页面时关闭websocket连接
  //     // this.ws.onclose(undefined);
  //     this.ws.close();
  //   },
  methods: {
    // 发送聊天信息
    sendText() {
      this.$refs["sendMsg"].focus();
      if (!this.contentText) {
        return;
      }
      // console.log(this.ws);
      // console.log(WebSocket.OPEN);
      if (this.ws.readyState === WebSocket.OPEN) {
        let params = {
          userId: this.userId,
          username: this.username,
          msg: this.contentText,
          count: this.count,
        };
        this.ws.send(JSON.stringify(params)); //调用WebSocket send()发送信息的方法
        this.contentText = "";
        setTimeout(() => {
          this.scrollBottm();
        }, 500);

        this.ws.onmessage = (msg) => {
          let resData = JSON.parse(msg.data);
          // console.log(resData);
          this.count = resData.count;
          this.list = [
            ...this.list,
            {
              userId: resData.userId,
              username: resData.username,
              //   avatar: resData.avatar,
              content: resData.msg,
            },
          ];
          console.log(msg);
        };
      } else {
        console.warn("WebSocket is not open. Message not sent.");
      }
    },
    // 进入页面创建websocket连接
    initWebSocket: function () {
      // 判断页面有没有存在websocket连接
      if (window.WebSocket) {
        // var serverHot = window.location.hostname;
        // let sip = "1";
        // 填写本地IP地址 此处的 :9101端口号 要与后端配置的一致！
        var url = "ws://localhost:8888/personChat/1/" + this.userId; // `ws://127.0.0.1/9101/personChat/10086/聊天室`
        this.ws = new WebSocket(url);
        this.ws.onopen = this.open;
        this.ws.onclose = this.close;
        this.ws.onerror = this.error;
        // this.ws.onmessage = (e) => {
        //   //接收服务器返回的数据
        //   let resData = JSON.parse(e.data);
        //   this.count = resData.count;
        //   this.list = [
        //     ...this.list,
        //     {
        //       userId: resData.userId,
        //       username: resData.username,
        //       //   avatar: resData.avatar,
        //       content: resData.msg,
        //     },
        //   ];
        // };
        this.ws.onmessage = this.getMessage;
      }
    },

    open: function () {
      console.log("socket连接成功");
    },
    error: function () {
      console.log("连接错误");
    },
    getMessage: function (msg) {
      // 接收服务器返回的数据
      //   let resData = JSON.parse(msg);
      //   this.count = resData.count;
      //   this.list = [
      //     ...this.list,
      //     {
      //       userId: resData.userId,
      //       username: resData.username,
      //       //   avatar: resData.avatar,
      //       content: resData.msg,
      //     },
      //   ];
      console.log(msg.data);
    },
    send: function () {
      this.socket.send(params);
    },
    close: function () {
      console.log("socket已经关闭");
    },
    // 滚动条到底部
    scrollBottm() {
      let el = this.$refs["msg-box"];
      el.scrollTop = el.scrollHeight;
    },
  },
};
</script>

<style scoped>
.chat-box {
  margin: 0 auto;
  background: #fafafa;
  position: absolute;
  height: 85%;
  width: 80%;
  /* max-width: 700px; */
  display: flex;
  top: 111px;
}
header {
  top: 111px;
  position: fixed;
  width: 80%;
  height: 3rem;
  background: #409eff;
  /* max-width: 700px; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  font-size: 1rem;
}
.msg-box {
  position: absolute;
  height: calc(100% - 6.5rem);
  width: 100%;
  margin-top: 3rem;
  overflow-y: scroll;
}
.msg {
  width: 95%;
  min-height: 2.5rem;
  margin: 1rem 0.5rem;
  position: relative;
  display: flex;
  justify-content: flex-start !important;
}
.user-head {
  min-width: 2.5rem;
  width: 20%;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;

  /* position: absolute; */
}
.user-msg {
  width: 80%;
  /* position: absolute; */
  word-break: break-all;
  position: relative;
  z-index: 5;
}
.head {
  width: 1.2rem;
  height: 1.2rem;
}
span {
  display: inline-block;
  padding: 0.5rem 0.7rem;
  border-radius: 0.5rem;
  margin-top: 0.2rem;
  font-size: 0.88rem;
}
.left {
  background: white;
  animation: toLeft 0.5s ease both 1;
}
.right {
  background: #53a8ff;
  color: white;
  animation: toright 0.5s ease both 1;
}
@keyframes toLeft {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
@keyframes toright {
  0% {
    opacity: 0;
    transform: translateX(10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
.input-box {
  padding: 0 0.5rem;
  position: absolute;
  bottom: 80px;
  width: 100%;
  height: 3.5rem;
  background: #fafafa;
  box-shadow: 0 0 5px #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
input {
  height: 2.3rem;
  display: inline-block;
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 0.2rem;
  font-size: 0.88rem;
}
.btn {
  height: 2.3rem;
  min-width: 4rem;
  background: #e0e0e0;
  padding: 0.5rem;
  font-size: 0.88rem;
  color: white;
  text-align: center;
  border-radius: 0.2rem;
  margin-left: 0.5rem;
  transition: 0.5s;
}
.btn-active {
  background: #409eff;
}
</style>
