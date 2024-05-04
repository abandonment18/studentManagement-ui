<template>
  <div class="app-container home">
    <el-row type="flex" justify="center" :gutter="10">
      <el-col :span="24">
        <el-card>
          <div slot="header">
            <span>君子四艺</span>
          </div>
          <div>
            <el-row type="flex" justify="center" :gutter="10">
              <el-col>
                <el-card class="today">
                  <div class="font-title">
                    <span>琴</span>
                  </div>
                  <div class="font-content">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;锦瑟无端五十弦，一弦一柱思华年。——唐代
                    李商隐
                  </div>
                </el-card>
              </el-col>
              <el-col>
                <el-card class="month">
                  <div class="font-title">
                    <span>棋</span>
                  </div>
                  <div class="font-content">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对河车马夜枰棋，活路经营尽入思。虑患谋身每如许，不应容易落便宜。——宋代
                    钱时
                  </div>
                </el-card>
              </el-col>
              <el-col>
                <el-card class="year">
                  <div class="font-title">
                    <span>书</span>
                  </div>
                  <div class="font-content">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;细读离骚还痛饮，饱看修竹何妨肉。——宋代
                    辛弃疾
                  </div>
                </el-card>
              </el-col>
              <el-col>
                <el-card class="year-save">
                  <div class="font-title">
                    <span>画</span>
                  </div>
                  <div class="font-content">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;远看山有色，近听水无声。
                    春去花还在，人来鸟不惊。——唐代 王维
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" :gutter="10" style="margin-top: 10px">
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <span>大学就业前景排名</span>
          </div>
          <div>
            <el-table :data="employmentRankingsList">
              <el-table-column
                label="排名"
                type="index"
                align="center"
                width="80"
              />
              <el-table-column label="专业名称" align="center" prop="major" />
              <el-table-column
                label="月收入"
                align="center"
                prop="monthlyIncome"
              />
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <span>编程语言排名</span>
          </div>
          <div>
            <el-table :data="programmingLanguageRankingsList">
              <el-table-column
                label="排名"
                type="index"
                align="center"
                width="80"
              />
              <el-table-column label="语言" align="center" prop="language" />
              <el-table-column
                label="知名度"
                align="center"
                prop="popularity"
              />
              <el-table-column
                label="与上月比较"
                align="center"
                prop="comparisonLastMonth"
              />
              <el-table-column
                label="年度之星"
                align="center"
                prop="annualStar"
              />
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" :gutter="10" style="margin-top: 10px">
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <span>学生选课信息</span>
          </div>
          <div>
            <div id="energyOverall" :style="{ height: '500px' }"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <span>日历</span>
          </div>
          <div>
            <div id="energyPercent" :style="{ height: '500px' }"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" :gutter="10" style="margin-top: 10px">
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <span>学生总人数</span>
          </div>
          <div>
            <div id="energyMap" :style="{ height: '400px' }"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <span>梯度堆积面积图</span>
          </div>
          <div>
            <div id="energyTrend" :style="{ height: '400px' }"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as echarts from "echarts";
import {
  selectCourseChooseNumber,
  selectEmploymentRankings,
  selectProgrammingLanguageRankings,
  selectStudentCount,
} from "@/api/home";
import { handleErrorResponse } from "@/util/request";
import { getToken, removeToken } from "@/util/auth";
export default {
  name: "home",
  data() {
    return {
      courseName: null,
      number: null,
      employmentRankingsList: [],
      programmingLanguageRankingsList: [],
      studentCount: 8,
    };
  },
  created() {
    // this.selectCount();
  },
  async mounted() {
    // 主张图
    await this.selectCourse();
    // 日历
    await this.calendarEcharts();
    // 仪表盘
    await this.dashboardEcharts();
    // 梯度面积图
    await this.gradientEcharts();
    // 第一张排名表
    await this.selectEmploymentRankingsList();
    // 第二章排名表
    await this.selectProgrammingLanguageRankingsList();
  },
  methods: {
    // selectCount() {
    //   selectStudentCount()
    //     .then((res) => {
    //       this.studentCount = res.data + 0;
    //       console.log(this.studentCount);
    //     })
    //     .catch(() => {});
    // },
    selectEmploymentRankingsList() {
      selectEmploymentRankings()
        .then((res) => {
          this.employmentRankingsList = res.data;
        })
        .catch(() => {});
    },
    selectProgrammingLanguageRankingsList() {
      selectProgrammingLanguageRankings()
        .then((res) => {
          this.programmingLanguageRankingsList = res.data;
        })
        .catch(() => {});
    },
    selectCourse() {
      selectCourseChooseNumber()
        .then((response) => {
          if (response.code === 200) {
            // Object.values() 静态方法返回一个给定对象的自有可枚举字符串键属性值组成的数组。
            // 将对象的 值 取出来组成一个数组
            this.courseName = Object.values(response.data.courseName);
            // console.log(this.courseName);
            this.number = Object.values(response.data.Number);
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(
              document.getElementById("energyOverall")
            );
            // 绘制图表
            myChart.setOption({
              title: {
                // text: "学生选课信息",
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
    calendarEcharts() {
      var chartDom = document.getElementById("energyPercent");
      var myChart = echarts.init(chartDom);
      var option;

      // This example requires ECharts v5.4.0 or later
      const cellSize = [80, 80];
      const pieRadius = 30;
      function getVirtualData() {
        const date = +echarts.time.parse("2017-02-01");
        const end = +echarts.time.parse("2017-03-01");
        const dayTime = 3600 * 24 * 1000;
        const data = [];
        for (let time = date; time < end; time += dayTime) {
          data.push([
            echarts.time.format(time, "{yyyy}-{MM}-{dd}", false),
            Math.floor(Math.random() * 10000),
          ]);
        }
        return data;
      }
      const scatterData = getVirtualData();
      const pieSeries = scatterData.map(function (item, index) {
        return {
          type: "pie",
          id: "pie-" + index,
          center: item[0],
          radius: pieRadius,
          coordinateSystem: "calendar",
          label: {
            formatter: "{c}",
            position: "inside",
          },
          data: [
            { name: "Work", value: Math.round(Math.random() * 24) },
            { name: "Entertainment", value: Math.round(Math.random() * 24) },
            { name: "Sleep", value: Math.round(Math.random() * 24) },
          ],
        };
      });
      option = {
        tooltip: {},
        legend: {
          data: ["Work", "Entertainment", "Sleep"],
          bottom: 20,
        },
        calendar: {
          top: "middle",
          left: "center",
          orient: "vertical",
          cellSize: cellSize,
          yearLabel: {
            show: false,
            fontSize: 30,
          },
          dayLabel: {
            margin: 20,
            firstDay: 1,
            nameMap: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          monthLabel: {
            show: false,
          },
          range: ["2017-02"],
        },
        series: [
          {
            id: "label",
            type: "scatter",
            coordinateSystem: "calendar",
            symbolSize: 0,
            label: {
              show: true,
              formatter: function (params) {
                return echarts.time.format(params.value[0], "{dd}", false);
              },
              offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
              fontSize: 14,
            },
            data: scatterData,
          },
          ...pieSeries,
        ],
      };

      option && myChart.setOption(option);
    },
    async dashboardEcharts() {
      await selectStudentCount()
        .then((res) => {
          this.studentCount = res.data + 0;
          // console.log(this.studentCount);
        })
        .catch(() => {});
      // 初始化echarts实例
      this.gaugeChart = echarts.init(document.getElementById("energyMap"));
      await this.gaugeChart.setOption({
        series: [
          {
            name: "评价",
            type: "gauge",
            center: ["50%", "55%"],
            radius: "75%",
            min: 0,
            max: 300,
            itemStyle: {
              color: "#4FC3F7",
              shadowColor: "rgba(0,138,255,0.45)",
            },
            // 进度条
            progress: {
              show: true,
              width: 20,
              roundCap: true,
            },
            // 坐标轴线
            axisLine: {
              show: true,
              roundCap: true,
              lineStyle: {
                width: 20,
              },
            },
            // 仪表盘指针
            pointer: {
              show: false,
            },
            // 刻度标签
            axisLabel: {
              show: false,
            },
            // 刻度
            axisTick: {
              show: false,
            },
            // 分隔线
            splitLine: {
              show: false,
            },
            title: {
              offsetCenter: [0, "20%"],
              fontSize: 20,
            },
            detail: {
              offsetCenter: [0, "-10%"],
              valueAnimation: true,
              textStyle: {
                fontSize: 30,
              },
              formatter: "{value}",
            },
            data: [{ value: this.studentCount, name: "总人数" }],
          },
        ],
      });
    },
    gradientEcharts() {
      var chartDom = document.getElementById("energyTrend");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        title: {
          // text: "Gradient Stacked Area Chart",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Line 1",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(128, 255, 165)",
                },
                {
                  offset: 1,
                  color: "rgb(1, 191, 236)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [140, 232, 101, 264, 90, 340, 250],
          },
          {
            name: "Line 2",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(0, 221, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(77, 119, 255)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 282, 111, 234, 220, 340, 310],
          },
          {
            name: "Line 3",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(55, 162, 255)",
                },
                {
                  offset: 1,
                  color: "rgb(116, 21, 219)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [320, 132, 201, 334, 190, 130, 220],
          },
          {
            name: "Line 4",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 0, 135)",
                },
                {
                  offset: 1,
                  color: "rgb(135, 0, 157)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 402, 231, 134, 190, 230, 120],
          },
          {
            name: "Line 5",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 191, 0)",
                },
                {
                  offset: 1,
                  color: "rgb(224, 62, 76)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 302, 181, 234, 210, 290, 150],
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.home {
  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;
}
.font-content {
  font-size: 18px;
}
.font-title {
  font-size: 20px;
  padding-bottom: 20px;
}
.today {
  /* background-color: #60cfeb; */
  color: aliceblue;
  background: url("../assets/images/city1.jpg") no-repeat center;
  background-size: 100%;
}
.month {
  /* background-color: #f7b018; */
  color: aliceblue;
  background: url("../assets/images/city2.jpg") no-repeat center;
  background-size: 100%;
}
.year {
  /* background-color: #fb846c; */
  color: aliceblue;
  background: url("../assets/images/city3.jpg") no-repeat center;
  background-size: 100%;
}
.year-save {
  /* background-color: #28b976; */
  color: aliceblue;
  background: url("../assets/images/city4.jpg") no-repeat center;
  background-size: 100%;
}
.el-card__body {
  float: right;
}
</style>
