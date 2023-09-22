<template>
  <div class="crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/home' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/admin/personalinfo' }"
        >个人资料</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
  <div class="box">
    <div class="right">
      <h1 style="margin: 0 0 20px 0">个人信息</h1>

      <el-form :model="form" status-icon class="demo-form">
        <el-form-item label="用户名" prop="userName" width="500px">
          <el-input v-model="form.userName" readonly />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName" readonly />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" readonly />
        </el-form-item>
        <el-form-item label="电话" prop="phoneNumber">
          <el-input v-model.number="form.phoneNumber" readonly />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" readonly />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="form.gender" readonly />
        </el-form-item>
        <el-form-item
          :label="form.userType === '0' ? '教师编号' : '学生编号'"
          prop="teacherIDOrStudentID"
        >
          <el-input v-model.number="form.teacherIDOrStudentID" readonly />
        </el-form-item>
        <el-form-item
          :label="form.userType === '0' ? '教师职称' : '年龄'"
          prop="titleOrAge"
        >
          <el-input v-model="form.titleOrAge" readonly />
        </el-form-item>
        <el-form-item label="所属院系" prop="department">
          <el-input v-model="form.department" readonly />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handUpdateForm()">修改</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="修改" v-model="dialogVisible" width="38%">
        <el-form
          :model="updateForm"
          status-icon
          class="demo-form"
          :rules="updateRules"
          ref="updateForm"
        >
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="updateForm.nickName" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="updateForm.email" />
          </el-form-item>
          <el-form-item label="电话" prop="phoneNumber">
            <el-input v-model.number="updateForm.phoneNumber" />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="updateForm.name" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-input v-model="updateForm.gender" />
          </el-form-item>
          <el-form-item
            :label="updateForm.userType === '0' ? '教师职称' : '年龄'"
            prop="titleOrAge"
          >
            <el-input v-model="updateForm.titleOrAge" />
          </el-form-item>
          <el-form-item label="所属院系" prop="department">
            <el-input v-model="updateForm.department" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { handleErrorResponse } from "@/util/request";
import { getToken, removeToken } from "@/util/auth";
import { selectPerson, updatePersonInfo } from "@/api/personalInfo";

export default {
  name: "personalinfo",
  data() {
    return {
      form: {
        teacherIDOrStudentID: "",
        titleOrAge: "",
      },
      updateForm: {
        titleOrAge: "",
      },
      dialogVisible: false,
      updateRules: {
        nickName: {
          required: true,
          trigger: "blur",
          message: "请输入昵称",
        },
        email: {
          required: true,
          trigger: "blur",
          message: "请输入邮箱",
          pattern: /^([1-9])?([0-9])+.@([a-zA-Z0-9])+$/,
        },
        phoneNumber: {
          required: true,
          trigger: "blur",
          message: "请输入电话",
          pattern: /^([1-9])?([0-9]){11}$/,
        },
        name: {
          required: true,
          trigger: "blur",
          message: "请输入名称",
        },
        gender: {
          required: true,
          trigger: "blur",
          message: "请输入性别（男或女）",
          pattern: /^男$|^女$/,
        },
        titleOrAge: {
          required: true,
          trigger: "blur",
          message: "请输入",
        },
        department: {
          required: true,
          trigger: "blur",
          message: "请输入所属院系",
        },
      },
    };
  },
  mounted() {
    this.selectPersonalInfo();
  },
  methods: {
    // 查询个人信息
    selectPersonalInfo() {
      const token = getToken();
      if (token !== null) {
        selectPerson().then((response) => {
          // console.log(response);
          if (response.code === 200) {
            this.form = response.data;
            // userType = 0 为教师（管理员）
            // userType = 1 为学生（普通用户）
            if (this.form.userType === "0") {
              this.form.teacherIDOrStudentID = this.form.teacherID;
              this.form.titleOrAge = this.form.title;
            } else if (this.form.userType === "1") {
              this.form.teacherIDOrStudentID = this.form.studentID;
              this.form.titleOrAge = this.form.age;
            }
          } else if (response.code === 401) {
            handleErrorResponse(response.code);
            removeToken(getToken);
            this.$router.push("/");
            this.$message({
              type: "error",
              message: "请重新登录",
            });
          } else {
            handleErrorResponse(response.code);
          }
        });
      } else {
        removeToken(getToken);
        this.$router.push("/");
        this.$message({
          type: "error",
          message: "请登录",
        });
      }
    },
    // 修改弹窗
    handUpdateForm() {
      this.dialogVisible = true;
      this.updateForm = this.form;

      if (this.$refs["updateForm"] !== undefined) {
        this.$refs["updateForm"].resetFields();
      }
    },
    // 修改个人信息
    save() {
      this.$refs["updateForm"].validate((validate) => {
        if (validate) {
          if (this.form.userType === "0") {
            this.updateForm.title = this.updateForm.titleOrAge;
          } else if (this.form.userType === "1") {
            this.updateForm.age = this.updateForm.titleOrAge;
          }
          const data = this.updateForm;
          updatePersonInfo(data).then((response) => {
            // console.log(response);
            if (response.code === 200) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.selectPersonalInfo();
              this.dialogVisible = false;
            } else if (response.code === 300) {
              this.$message({
                type: "error",
                message: "修改失败",
              });
            } else {
              handleErrorResponse(response.code);
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "验证失败，请检查后重新提交",
          });
        }
        this.selectPersonalInfo();
        return false;
      });
    },
  },
};
</script>

<style scoped>
.crumbs {
  margin-bottom: 20px;
}
.box {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.right {
  border: 1px solid#000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 800px;
  margin-top: 50px;
  border-radius: 10px;
}
.demo-form {
  width: 500px;
}
.demo-form button {
  width: 500px;
}
</style>
