<template>
  <div class="box">
    <div id="main" :style="{ width: '500px', height: '800px' }"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { selectCourseChooseNumber } from "@/api/home";
import { handleErrorResponse } from "@/util/request";
import { getToken, removeToken } from "@/util/auth";
export default {
  name: "Echarts1",
  data() {
    return {
      courseName: null,
      number: null,
    };
  },
  mounted() {
    this.selectCourse();
    console.log(this.data);
  },
  methods: {
    selectCourse() {
      selectCourseChooseNumber()
        .then((response) => {
          if (response.code === 200) {
            // Object.values() 静态方法返回一个给定对象的自有可枚举字符串键属性值组成的数组。
            // 将对象的 值 取出来组成一个数组
            this.courseName = Object.values(response.data.courseName);
            this.number = Object.values(response.data.Number);
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById("main"));
            // 绘制图表
            myChart.setOption({
              title: {
                text: "学生选课信息",
              },
              tooltip: {},
              xAxis: {
                data: this.courseName,
              },
              yAxis: {},
              series: [
                {
                  name: "选课人数",
                  type: "bar",
                  data: this.number,
                },
              ],
            });
          } else if (response.code === 401) {
            handleErrorResponse(response.code);
            removeToken(getToken);
            this.$router.push("/");
            this.$message({
              type: "error",
              message: "请重新登录",
            });
          } else if (response.code === 403) {
            handleErrorResponse(response.code);
            this.dialogVisible = false;
          } else {
            handleErrorResponse(response.code);
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
