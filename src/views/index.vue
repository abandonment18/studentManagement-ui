<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <el-menu
          default-active="/admin/home"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          router="true"
          unique-opened="true"
        >
          <!-- @open="handleOpen"
          @close="handleClose" -->
          <el-menu-item index="/admin/home">
            <el-icon><HomeFilled /></el-icon>
            <template #title>首页</template>
          </el-menu-item>
          <el-menu-item index="/admin/courses">
            <el-icon><Menu /></el-icon>
            <template #title>课程信息</template>
          </el-menu-item>
          <el-sub-menu index="/index/student">
            <template #title>
              <el-icon><location /></el-icon>
              <span>学生信息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admin/allstudent" v-if="userType === '0'">
                <el-icon><UserFilled /></el-icon>
                <span>所有学生</span>
              </el-menu-item>
              <el-menu-item index="/admin/studentcourses">
                <el-icon><WindPower /></el-icon>
                <span>学生选课</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="/index/teacher">
            <template #title>
              <el-icon><location /></el-icon>
              <span>教师信息</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admin/allteacher">
                <el-icon><Avatar /></el-icon>
                <span>所有教师</span>
              </el-menu-item>
              <el-menu-item index="/admin/units" v-if="userType === '0'">
                <el-icon><OfficeBuilding /></el-icon>
                <span>教师单位</span>
              </el-menu-item>
              <el-menu-item index="/admin/teachercourses">
                <el-icon><Coin /></el-icon>
                <span>教师授课</span>
              </el-menu-item>
            </el-menu-item-group>
            <!-- <el-sub-menu index="2-4">
              <template #title><span>item four</span></template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
            </el-sub-menu> -->
          </el-sub-menu>
          <el-menu-item index="/admin/personalinfo">
            <el-icon><User /></el-icon>
            <template #title>个人资料</template>
          </el-menu-item>

          <el-sub-menu index="/index/setting">
            <template #title>
              <el-icon><setting /></el-icon>
              <span>设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admin/registerStudent">
                <el-icon><Operation /></el-icon>
                <span>注册学生</span>
              </el-menu-item>
              <el-menu-item index="/admin/registerTeacher">
                <el-icon><VideoPlay /></el-icon>
                <span>注册教师</span>
              </el-menu-item>
              <el-menu-item index="/admin/updatePassword">
                <el-icon><VideoPlay /></el-icon>
                <span>修改密码</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <!-- <el-menu-item index="3">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item> -->
        </el-menu></el-aside
      >
      <el-container>
        <el-header>
          <el-radio-group v-model="isCollapse">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">关闭</el-radio-button>
          </el-radio-group>
          <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in listName" :key="item">
              <router-link :to="item.path">{{ item.path }}</router-link>
            </el-breadcrumb-item>
          </el-breadcrumb> -->
          <h1 class="title">学生选课管理系统</h1>
          <div class="personal">
            <span>欢迎您，{{ personal.userType == "0" ? "教师" : "学生" }}</span
            >：<span>{{ personal.name }}</span
            >&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<span
              >编号：{{ personal.numberId }}</span
            >
          </div>
          <el-dropdown>
            <span class="el-dropdown-link">
              设置
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="registerStudent()"
                  >注册学生</el-dropdown-item
                >
                <el-dropdown-item @click="registerTeacher()"
                  >注册教师</el-dropdown-item
                >
                <el-dropdown-item @click="quit()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import request from "@/util/request";
import {
  removeToken,
  getToken,
  setUserType,
  removeUserType,
  getUserType,
  setUserId,
  removeUserId,
  getUserId,
} from "@/util/auth";
import { selectPerson } from "@/api/personalInfo";
export default {
  data() {
    return {
      isCollapse: false,
      listName: [],
      personal: {
        numberId: "",
        name: "",
      },
      userType: "",
    };
  },
  created() {
    // console.log(this.$route.matched);
    this.listName = this.$route.matched;
  },
  //这里必须使用监听，否则无法实时获取路由变动信息。监听后路由会实时变动，不然需要手动刷新路径才会改变

  //   watch: {
  //     $route(to, from) {
  //       console.log(to);
  //       console.log(from);
  //       this.listName = to.matched;
  //     },
  //   },
  mounted() {
    this.personalInfo();
  },
  methods: {
    // handleOpen(key, keypath) {
    //   console.log(key, keypath);
    //   // if (key == "1") {
    //   //   this.currentView = "components";
    //   // }
    // },
    // 退出登录
    quit() {
      request.get("/logout").then((response) => {
        // console.log(response);
        if (response.code === 200) {
          this.$router.push({
            path: "/",
          });
          removeUserType(getUserType);
          removeToken(getToken);
          removeUserId(getUserId);
          this.$message({
            type: "success",
            message: "退出成功",
          });
        }
      });
    },
    // 个人信息
    personalInfo() {
      selectPerson().then((response) => {
        if (response.code == 200) {
          this.personal = response.data;
          this.userType = response.data.userType;
          setUserType(response.data.userType);
          if (response.data.userType == "0") {
            this.personal.numberId = response.data.teacherID;
          } else if (response.data.userType == "1") {
            this.personal.numberId = response.data.studentID;
          }
          setUserId(this.personal.numberId);
        }
      });
    },
    // 路径跳转
    registerTeacher() {
      this.$router.push("/admin/registerTeacher");
    },

    registerStudent() {
      this.$router.push("/admin/registerStudent");
    },
  },
};
</script>

<style scoped>
/* 头部导航 */
.el-header {
  display: flex;
  justify-content: space-between;
}
.el-dropdown {
  justify-content: center;
  align-items: center;
}

.el-dropdown-link:focus-visible {
  outline: none;
}
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0.8;
}
.personal {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
