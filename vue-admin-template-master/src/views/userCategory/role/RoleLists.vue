<template>
  <div class="app-container">
     <el-button type="primary" size="medium" style="margin: 20px 0" @click="addRole">添加角色</el-button>
    <el-table
      v-loading="listLoading"
      :data="lists"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column> 
      <el-table-column label="角色" >
        <template slot-scope="scope">{{ scope.row.desc }}</template>
      </el-table-column>
      <el-table-column label="权限" >
        <template slot-scope="scope">{{ scope.row.rule_ids }}</template>
      </el-table-column> 
      <el-table-column class-name="status-col" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag >{{ scope.row.status === 1? '正常' : '禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="delRole(scope.row.id)" :disabled=" scope.row.id == 1 ? true : false">删除</el-button>
          <el-button type="danger" @click="toEdit(scope.row)" :disabled="scope.row.id == 1 ? true : false">编辑</el-button>
        </template>
      </el-table-column>
    </el-table> 
  </div>
</template>

<script>
import { roleLists, deleteRole } from "@/api/user";
export default {
  data() {
    return {
      lists: [],
      listLoading: true, 
    };
  },
 
  created() {
    this.getRoleLists();
  },
  methods: {
    // 获取数据
    getRoleLists() {
      this.listLoading = true;
      roleLists().then(res => {  
        console.log(res)
        this.lists = res.data.rolelist;  
        this.listLoading = false;  
      });
    }, 
    // 添加角色
    addRole () {
      this.$router.push("add/role")
    },
    // 删除角色
    delRole (id) {
      console.log(id)
      this.$confirm("确定删除该角色?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
      }).then(() => {
        deleteRole({ id: id }).then((res) => {
          if (res.data.msg === 20000) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getRoleLists();
          }
        });
      });
    },
    // 编辑权限
    toEdit(row) {
      this.$router.push({
        path: 'edit/role',
        query: row
      })
    }

  }
};
</script>

<style lang="scss" scoped>
.block {
  width: 450px;
  margin: 15px auto;  
}
</style>

