<template>
  <div class="app-container">
    <el-form :model="form" label-width="80px" ref="form">
      <el-form-item label="角色名称" style="width: 500px">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
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
        <el-table-column label="权限名称">
          <template slot-scope="scope">{{ scope.row.desc }}</template>
        </el-table-column>
        <el-table-column label="权限路径">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column class-name="status-col" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isAuth"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              inactive-text="禁用"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item>
        <el-button type="primary" @click="updateInfo">立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { authLists, editRole } from "@/api/user";
export default {
  name: "EditRole",
  data() {
    return {
      form: {
        desc: "",
        id: "",
      },
      lists: [],
      queryLists: "",
      listLoading: false,
      rule_ids: [],
    };
  },
  mounted() { 
    this.form.desc = this.$route.query.desc;
    this.form.id = this.$route.query.id;
    this.queryLists = this.$route.query.rule_ids.split(",");
    this.getData();
  },
  methods: {
    getData() {
      authLists().then((res) => {
        this.lists = res.data.rulelist;
        console.log(this.queryLists);
        this.lists.forEach((item, index) => {
          item.isAuth = this.queryLists.indexOf(String(item.id)) != -1;
        });
      });
    },
    updateInfo() {
      this.authIds = this.lists.reduce((pre, item, index) => {
        if (item.isAuth) {
          pre.push(item.id);
        }
        return pre;
      }, []);
      this.rule_ids = this.authIds.join(",");
      this.form.rule_ids = this.rule_ids;

      editRole(this.form).then((res) => {
        console.log(res);
        if (res.data.msg === 20000) {
          this.$router.push("/user/role");
        }
      });
    },
  },
};
</script>








