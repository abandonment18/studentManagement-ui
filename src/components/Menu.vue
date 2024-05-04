<template>
  <div>
    <el-menu
      default-active="/admin/home"
      class="left-menu"
      :router="true"
      :unique-opened="true"
      style="border-right: none"
      :collapse="collapse"
    >
      <template v-for="parent in data" :key="parent.id">
        <!-- ?. 允许你一次性访问嵌套对象的属性，如果任何一个属性为 null 或 undefined，整个表达式将返回 undefined，而不会导致错误。
        在你提到的模板代码中，parent.childMenus?.length > 0 就是使用可选链操作符。
        这里，如果 parent.childMenus 是 undefined 或 null，整个表达式会被短路，返回 undefined，而不会引发错误。
        这是一种更简洁和安全的方式来检查深层属性是否存在。 -->
        <el-sub-menu
          v-if="parent.parentId == 0 && parent.childMenus?.length > 0"
          :index="parent.path"
        >
          <template #title>
            <el-icon>
              <component :is="parent.icon"></component>
            </el-icon>
            <span>{{ parent.menuName }}</span>
          </template>
          <template v-for="child in parent.childMenus" :key="child.id">
            <el-menu-item :index="child.path">
              <el-icon>
                <component :is="child.icon"></component>
              </el-icon>
              <span>{{ child.menuName }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item :index="parent.path" v-else>
          <el-icon>
            <component :is="parent.icon"></component>
          </el-icon>
          <template #title>{{ parent.menuName }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<!-- <script setup>

const menu = defineProps(["data", "collapse"]);
console.log(menu);
</script> -->

<script>
export default {
  name: "Menu",
  props: ["data", "collapse"],
  data() {
    return {};
  },
  mounted() {},
};
</script>
<style scoped></style>
