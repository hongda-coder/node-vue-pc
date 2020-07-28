<template>
  <div class="app-container">
    <el-button type="primary" size="medium" style="margin: 20px 0" @click="toAddUser"> 添加用户</el-button>
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
      <el-table-column label="用户名" width="120">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column label="性别" width="120">
        <template slot-scope="scope">{{ scope.row.sex | filterSex }}</template>
      </el-table-column>
      <el-table-column label="电话号码" align="center">
        <template slot-scope="scope">{{ scope.row.mobile }}</template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">{{ scope.row.email }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | filterStatus">{{ scope.row.status === 1? '正常' : '禁用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="delUser(scope.row.id)" :disabled="scope.row.id == 1 ? true : false">删除</el-button>
          <el-button type="danger" @click="toEdit(scope.row.id)" :disabled="scope.row.id == 1 ? true : false">编辑</el-button>
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
import { userLists, deleteUset } from "@/api/user";
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      page: 1
    };
  },
  filters: {
    filterStatus(status) {
      const statusMap = {
        "1": "success",
        "-1": "danger"
      };
      return statusMap[status];
    },
    filterSex(num) {
      const sexMap = {
        "1": "男",
        "0": "女"
      };
      return sexMap[num];
    }
  },
  created() {
    this.getUserLists();
  },
  methods: {
    // 获取数据
    getUserLists() {
      this.listLoading = true;
      userLists({page: this.page}).then(res => {  
        this.list = res.data.userlist;
        this.total = res.data.total;
        this.listLoading = false; 
      });
    },
    // 分页
    handleCurrentChange(page) {
      this.page = page
      userLists({ page: page }).then(res => {
        this.list = res.data.userlist;
        this.listLoading = false;
      });
    },
    toAddUser () {
      this.$router.push("/add/user")
    },
    // 删除用户
    delUser(id) { 
      this.$confirm("确定删除该用户?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      }).then(() => { 
        deleteUset({ id: id }).then(res => {  
          if (res.data.msg === 20000) {
            this.$message({
              type: "success",
              message: "删除成功!"
            }); 
            this.getUserLists()
          }
        });
      }); 
    },
    // 编辑用户
    toEdit (id) {
      this.$router.push({
        path:'/edit/user',
        query: {
          id: id
        }
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

