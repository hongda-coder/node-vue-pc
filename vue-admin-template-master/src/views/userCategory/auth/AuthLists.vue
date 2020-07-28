<template>
  <div class="app-container">
    <el-button type="primary" size="medium" style="margin: 20px 0" @click="addAuth">添加权限</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="权限名称">
        <template slot-scope="scope">{{ scope.row.desc }}</template>
      </el-table-column>
      <el-table-column label="权限路劲">
        <template slot-scope="scope">{{ scope.row.name}}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | filterStatus">{{ scope.row.status === 1? '正常' : '禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="delUser(scope.row.id)" 
          >删除</el-button>
          <el-button
            type="danger"
            @click="toEdit(scope.row)" 
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        prev-text="上一页"
        next-text="下一页"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { authLists, deleteAuth } from "@/api/user";
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      page: 1
    };
  },
  created() {
    this.getAuthLists();
  },
  filters: {
    filterStatus(status) {
      const statusMap = {
        "1": "success",
        "-1": "danger",
      };
      return statusMap[status];
    },
  },
  methods: {
    // 获取数据
    getAuthLists() {
      this.listLoading = true;
      authLists({page: this.page}).then((res) => { 
        this.list = res.data.rulelist;
        this.total = res.data.total;
        this.listLoading = false;
      });
    },
    // 分页
    handleCurrentChange(page) {
      this.page = page
      authLists({ page: this.page }).then((res) => { 
        this.list = res.data.rulelist;
        this.listLoading = false;
      });
    },

    // 删除用户
    delUser(id) {
      this.$confirm("确定删除该权限?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
      }).then(() => {
        deleteAuth({ id: id }).then((res) => {
          if (res.data.msg === 20000) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getAuthLists();
          }
        });
      });
    },
    // 去添加
    addAuth () {
      this.$router.push("/add/auth")
    },
    // 去编辑
    toEdit(row) { 
      this.$router.push({
        path: "/edit/auth",
        query: row
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  width: 450px;
  margin: 15px auto;
}
</style>


