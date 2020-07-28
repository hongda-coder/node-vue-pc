<template>
  <div class="editor">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item> 
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item> 
      <el-form-item label="角色">
        <el-select v-model="form.role_id" placeholder="请选择">
          <el-option v-for="item in roleLists" :key="item.id" :label="item.desc" :value="item.id"></el-option>
        </el-select>
      </el-form-item>  
      <el-form-item>
        <el-button type="primary" @click="updateInfo">立即提交</el-button> 
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { userInfoEdit, roleLists,updateUser } from "@/api/user";
export default {
  name: "EditUser",
  data() {
    return {
      form: {
        username: '', 
        email: '',
        mobile: '',
        role_id: '',
        id: ''
      },  
      lists: []
    };
  },
  created() {
    this.form.id = this.$route.query.id;
    this.getData();
    
  },
  computed: {
    roleLists () {
     return this.lists.filter((item, index) => {
       return item.desc !== '超级管理员'
     }) 
    }
  },
  methods: {
    // 获取数据
    getData() {
      userInfoEdit({ id: this.form.id }).then(res => { 
        this.form.username = res.data.user.username
        this.form.email = res.data.user.email
        this.form.mobile = res.data.user.mobile
        this.form.role_id = res.data.user.role_id
      });
      roleLists().then(res => {
        this.lists = res.data.rolelist; 
      });
    },
    // 修改信息
    updateInfo() {  
      updateUser(this.form).then( res => { 
        if(res.data.msg === 20000) {
          this.$router.push("/user/user")
        }
      })
    }
  }
};
</script>


<style lang="scss" scoped>
.editor {
  max-width: 500px;
  margin: 100px auto;
}
</style>



