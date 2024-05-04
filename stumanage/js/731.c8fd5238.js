"use strict";(self["webpackChunkStudentManagement"]=self["webpackChunkStudentManagement"]||[]).push([[731],{494:function(e,r,l){l.d(r,{J:function(){return t},i:function(){return m}});var a=l(7068);function m(e){return(0,a.Z)({method:"post",url:"/admin/registerStudents",data:e})}function t(e){return console.log(e),(0,a.Z)({method:"post",url:"/admin/registerTeachers",data:e})}},4731:function(e,r,l){l.r(r),l.d(r,{default:function(){return b}});var a=l(6252);const m=e=>((0,a.dD)("data-v-379c10fb"),e=e(),(0,a.Cn)(),e),t={class:"crumbs"},o={class:"box"},u={class:"left"},d=m((()=>(0,a._)("h1",{style:{margin:"0 0 20px 0"}},"注册学生",-1)));function s(e,r,l,m,s,n){const i=(0,a.up)("el-breadcrumb-item"),p=(0,a.up)("el-breadcrumb"),f=(0,a.up)("el-input"),g=(0,a.up)("el-form-item"),c=(0,a.up)("el-button"),b=(0,a.up)("el-form");return(0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a._)("div",t,[(0,a.Wm)(p,{separator:"/"},{default:(0,a.w5)((()=>[(0,a.Wm)(i,{to:{path:"/admin/home"}},{default:(0,a.w5)((()=>[(0,a.Uk)("首页")])),_:1}),(0,a.Wm)(i,null,{default:(0,a.w5)((()=>[(0,a.Uk)("设置")])),_:1}),(0,a.Wm)(i,{to:{path:"/admin/registerStudent"}},{default:(0,a.w5)((()=>[(0,a.Uk)("注册学生")])),_:1})])),_:1})]),(0,a._)("div",o,[(0,a._)("div",u,[d,(0,a.Wm)(b,{model:s.form,ref:"form",rules:s.rules,"status-icon":"",class:"demo-form","label-position":"left","label-width":"80px","require-asterisk-position":"right"},{default:(0,a.w5)((()=>[(0,a.Wm)(g,{label:"用户名",prop:"username"},{default:(0,a.w5)((()=>[(0,a.Wm)(f,{modelValue:s.form.username,"onUpdate:modelValue":r[0]||(r[0]=e=>s.form.username=e),clearable:""},null,8,["modelValue"])])),_:1}),(0,a.Wm)(g,{label:"密码",prop:"password"},{default:(0,a.w5)((()=>[(0,a.Wm)(f,{modelValue:s.form.password,"onUpdate:modelValue":r[1]||(r[1]=e=>s.form.password=e),type:"password",clearable:""},null,8,["modelValue"])])),_:1}),(0,a.Wm)(g,{label:"学生编号",prop:"studentID"},{default:(0,a.w5)((()=>[(0,a.Wm)(f,{modelValue:s.form.studentID,"onUpdate:modelValue":r[2]||(r[2]=e=>s.form.studentID=e),modelModifiers:{number:!0},clearable:""},null,8,["modelValue"])])),_:1}),(0,a.Wm)(g,{label:"姓名",prop:"name"},{default:(0,a.w5)((()=>[(0,a.Wm)(f,{modelValue:s.form.name,"onUpdate:modelValue":r[3]||(r[3]=e=>s.form.name=e)},null,8,["modelValue"])])),_:1}),(0,a.Wm)(g,{label:"邮箱",prop:"email"},{default:(0,a.w5)((()=>[(0,a.Wm)(f,{modelValue:s.form.email,"onUpdate:modelValue":r[4]||(r[4]=e=>s.form.email=e),clearable:""},null,8,["modelValue"])])),_:1}),(0,a.Wm)(g,{label:"电话",prop:"phoneNumber"},{default:(0,a.w5)((()=>[(0,a.Wm)(f,{modelValue:s.form.phoneNumber,"onUpdate:modelValue":r[5]||(r[5]=e=>s.form.phoneNumber=e),modelModifiers:{number:!0},clearable:""},null,8,["modelValue"])])),_:1}),(0,a.Wm)(g,{label:"昵称",prop:"nickName"},{default:(0,a.w5)((()=>[(0,a.Wm)(f,{modelValue:s.form.nickName,"onUpdate:modelValue":r[6]||(r[6]=e=>s.form.nickName=e),clearable:""},null,8,["modelValue"])])),_:1}),(0,a.Wm)(g,{label:"性别",prop:"gender"},{default:(0,a.w5)((()=>[(0,a.Wm)(f,{modelValue:s.form.gender,"onUpdate:modelValue":r[7]||(r[7]=e=>s.form.gender=e),clearable:""},null,8,["modelValue"])])),_:1}),(0,a.Wm)(g,{label:"年龄",prop:"age"},{default:(0,a.w5)((()=>[(0,a.Wm)(f,{modelValue:s.form.age,"onUpdate:modelValue":r[8]||(r[8]=e=>s.form.age=e),clearable:""},null,8,["modelValue"])])),_:1}),(0,a.Wm)(g,{label:"所属院系",prop:"department"},{default:(0,a.w5)((()=>[(0,a.Wm)(f,{modelValue:s.form.department,"onUpdate:modelValue":r[9]||(r[9]=e=>s.form.department=e),clearable:""},null,8,["modelValue"])])),_:1}),(0,a.Wm)(g,null,{default:(0,a.w5)((()=>[(0,a.Wm)(c,{type:"primary",onClick:r[10]||(r[10]=e=>n.handInsertForm()),style:{width:"100%"}},{default:(0,a.w5)((()=>[(0,a.Uk)("注册")])),_:1})])),_:1})])),_:1},8,["model","rules"])])])],64)}l(7658);var n=l(494),i=l(7068),p=l(3695),f={name:"registerStudent",data(){return{form:{},rules:{username:{required:!0,message:"请输入用户名",trigger:"blur"},password:{required:!0,message:"请输入密码",trigger:"blur"},studentID:{required:!0,message:"请输入学生编号数",trigger:"blur",pattern:/^([0-9])+$/},name:{required:!0,message:"请输入学生名称",trigger:"blur"},email:{required:!1,trigger:"blur",message:"请输入邮箱",pattern:/^([1-9])?([0-9])+@([a-zA-Z0-9]+).([a-zA-Z])+$/},phoneNumber:{required:!0,trigger:"blur",message:"请输入电话",pattern:/^([1-9])?([0-9]){11}$/},nickName:{required:!1,trigger:"blur",message:"请输入昵称"},gender:{required:!0,trigger:"blur",message:"请输入性别（男或女）",pattern:/^男$|^女$/},age:{required:!1,message:"请输入年龄",trigger:"blur",pattern:/^([1-9])?([0-9])+$/},department:{required:!0,message:"请输入学生所属院系",trigger:"blur"}}}},methods:{handInsertForm(){this.$refs["form"].validate((e=>{if(e){const e=this.form;(0,n.i)(e).then((e=>{console.log(e),200===e.code?(this.$message({type:"success",message:"注册成功"}),this.form={},void 0!=this.$refs["form"]&&this.$refs["form"].resetFields()):300===e.code?this.$message({type:"error",message:e.msg}):401===e.code?((0,i.y)(e.code),(0,p.gy)(p.LP),this.$router.push("/"),this.$message({type:"error",message:"请重新登录"})):(0,i.y)(e.code)})).catch((e=>{console.log(e)}))}else this.$message({type:"error",message:"验证失败，请检查后重新提交"});return!1}))}}},g=l(3744);const c=(0,g.Z)(f,[["render",s],["__scopeId","data-v-379c10fb"]]);var b=c}}]);
//# sourceMappingURL=731.c8fd5238.js.map