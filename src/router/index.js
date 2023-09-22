import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    redirect: "/login",
    path: "/",
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/admin/index",
    name: "index",
    component: () => import("../views/index.vue"),
    meta: {
      title: "主页",
    },
    children: [
      // {
      //   redirect: "/admin/courses",
      //   path: "/index",
      // },
      {
        path: "/admin/home",
        name: "home",
        component: () => import("../views/home.vue"),
        meta: {
          title: "展示页",
        },
      },
      {
        path: "/admin/courses",
        name: "courses",
        component: () => import("../views/teacher/Courses.vue"),
        meta: {
          title: "课程信息",
        },
      },
      {
        path: "/admin/personalinfo",
        name: "personalinfo",
        component: () => import("../views/PersonalInfo.vue"),
        meta: {
          title: "个人信息",
        },
      },
      {
        path: "/admin/allstudent",
        name: "allstudent",
        component: () => import("../views/student/AllStudent.vue"),
        meta: {
          title: "所有学生",
        },
      },
      {
        path: "/admin/studentcourses",
        name: "studentcourses",
        component: () => import("../views/student/StudentCourses.vue"),
        meta: {
          title: "学生选课信息",
        },
      },

      {
        path: "/admin/allteacher",
        name: "allteacher",
        component: () => import("../views/teacher/AllTeacher.vue"),
        meta: {
          title: "所有教师",
        },
      },
      {
        path: "/admin/units",
        name: "units",
        component: () => import("../views/teacher/Units.vue"),
        meta: {
          title: "教师单位",
        },
      },
      {
        path: "/admin/teachercourses",
        name: "teachercourses",
        component: () => import("../views/teacher/TeacherCourses.vue"),
        meta: {
          title: "教师授课信息",
        },
      },
      {
        path: "/admin/registerTeacher",
        name: "registerTeacher",
        component: () => import("../views/registerTeacher.vue"),
        meta: {
          title: "注册教师",
        },
      },
      {
        path: "/admin/registerStudent",
        name: "registerStudent",
        component: () => import("../views/registerStudent.vue"),
        meta: {
          title: "注册学生",
        },
      },
      {
        path: "/admin/updatePassword",
        name: "updatePassword",
        component: () => import("../views/changePassword.vue"),
        meta: {
          title: "修改密码",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
