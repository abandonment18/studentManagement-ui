<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <el-scrollbar>
          <div class="logo">
            <img src="../assets/images/c.jpg" />
            <span v-show="!isCollapse">学生选课管理系统</span>
          </div>
          <!-- <el-menu
            default-active="/admin/home"
            class="left-menu"
            :collapse="isCollapse"
            :router="true"
            :unique-opened="true"
            style="border-right: none"
          >
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
            </el-sub-menu>
            <el-menu-item index="/admin/personalinfo">
              <el-icon><User /></el-icon>
              <template #title>个人资料</template>
            </el-menu-item>
            <el-menu-item index="/admin/personChat">
              <el-icon><Menu /></el-icon>
              <template #title>聊天</template>
            </el-menu-item>
            <el-sub-menu index="/index/setting">
              <template #title>
                <el-icon><setting /></el-icon>
                <span>设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  index="/admin/registerStudent"
                  v-if="userType === '0'"
                >
                  <el-icon><Operation /></el-icon>
                  <span>注册学生</span>
                </el-menu-item>
                <el-menu-item
                  index="/admin/registerTeacher"
                  v-if="userType === '0'"
                >
                  <el-icon><VideoPlay /></el-icon>
                  <span>注册教师</span>
                </el-menu-item>
                <el-menu-item index="/admin/updatePassword">
                  <el-icon><VideoPlay /></el-icon>
                  <span>修改密码</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu> -->

          <Menu :data="menuList" :collapse="isCollapse"></Menu>
        </el-scrollbar>
      </el-aside>

      <!-- <el-aside class="left" :width="asideWidth">
        <el-scrollbar>
          <div class="logo">
            <img src="../assets/logo.png" />
            <span v-show="!isCollapse">学生选课管理系统</span>
          </div>

          <Menu :data="menuList" :collapse="isCollapse"></Menu>

        </el-scrollbar>
      </el-aside> -->

      <el-container>
        <el-header>
          <el-icon
            @click="isCollapse = !isCollapse"
            style="cursor: pointer; height: 40px"
            :size="40"
            color="#1E90FF"
          >
            <Expand v-if="isCollapse" />
            <Fold v-else />
          </el-icon>
          <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in listName" :key="item">
              <router-link :to="item.path">{{ item.path }}</router-link>
            </el-breadcrumb-item>
          </el-breadcrumb> -->
          <el-dropdown>
            <span class="el-dropdown-link">
              设置
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-men>
                <el-dropdown-item
                  @click="registerStudent()"
                  v-if="userType === '0'"
                  >注册学生</el-dropdown-item
                >
                <el-dropdown-item
                  @click="registerTeacher()"
                  v-if="userType === '0'"
                  >注册教师</el-dropdown-item
                >
                <el-dropdown-item @click="quit()">退出登录</el-dropdown-item>
              </el-dropdown-men>
            </template>
          </el-dropdown>
          <!-- <h1 class="title">学生选课管理系统</h1> -->
          <div class="personal">
            <span>欢迎您，{{ userType == "0" ? "教师" : "学生" }}</span
            >：<span>{{ personal.name }}</span
            >&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<span
              >编号：{{ personal.numberId }}</span
            >
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import { getToken, removeToken } from "@/util/auth";
export default {
  components: {
    Menu,
  },
  data() {
    return {
      isCollapse: false,
      listName: [],
      personal: {
        numberId: "",
        name: "",
      },
      userType: "",
      menuList: [],
    };
  },
  async created() {
    await this.getMenu();

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
      // request.get("/logout").then((response) => {
      //   // console.log(response);
      //   if (response.code === 200) {
      //     this.$router.push({
      //       path: "/",
      //     });
      //     removeUserType(getUserType);
      //     removeToken(getToken);
      //     removeUserId(getUserId);
      //     this.$message({
      //       type: "success",
      //       message: "退出成功",
      //     });
      //   }
      // });
      this.$store
        .dispatch("user/logout")
        .then((res) => {
          if (res.code === 200) {
            this.$router.push({
              path: "/",
            });
            removeToken();
            this.$message({
              type: "success",
              message: "退出成功",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 个人信息
    personalInfo() {
      // selectPerson().then((response) => {
      //   if (response.code == 200) {
      //     this.personal = response.data;
      //     this.userType = response.data.userType;
      //     setUserType(response.data.userType);
      //     if (response.data.userType == "0") {
      //       this.personal.numberId = response.data.teacherID;
      //     } else if (response.data.userType == "1") {
      //       this.personal.numberId = response.data.studentID;
      //     }
      //     setUserId(this.personal.numberId);
      //   }
      // });
      this.$store
        .dispatch("user/personInfo")
        .then((res) => {
          this.personal.name = res.data.name;
          this.userType = res.data.userType;
          if (res.data.userType == "0") {
            this.personal.numberId = res.data.teacherID;
          } else if (res.data.userType == "1") {
            this.personal.numberId = res.data.studentID;
          }
        })
        .catch((error) => {
          // console.log(error);
        });
    },
    getMenu() {
      this.$store
        .dispatch("menu/getMenu", getToken())
        .then((res) => {
          this.menuList = res.data;
        })
        .catch(() => {});
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
.logo {
  height: 50px;
  line-height: 50px;
  padding-left: 17px;
  img {
    width: 35px;
    vertical-align: middle;
    border-radius: 50%;
  }
  span {
    color: #000;
    font-weight: bold;
    padding-left: 12px;
    font-size: 16px;
  }
}
.el-main {
  padding-top: 3px;
  padding-left: 10px;
}

.el-aside {
  width: 200px;
}

.hand {
  cursor: pointer;
}

.head {
  background-color: #409eff;
  padding-top: 10px;
  color: #fff;
}

.head .head-l {
  font-size: 18px;
  font-weight: bold;
}

.head .head-r {
  font-size: 18px;
  text-align: right;
}
.left {
  background-color: #5b6f88;
  height: 100vh;
  width: 185px;
}

.unReadInfo {
  display: inline-block;
  margin-right: 30px;
}

.el-dropdown {
  margin-top: 20px;
  float: right;
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
