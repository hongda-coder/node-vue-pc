<template>
  <div class="editor">
    <el-form :model="form" label-width="80px" :rules="rules" ref="form">
      <el-form-item label="用户名" style="position: relative;" prop="username" >
        <el-input v-model="form.username" @change="reqUsername(form.username)" :class="isShow ? 'error' : ''" ></el-input>
        <div class="hint" v-show="isShow">请输入正确用户名</div>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="form.role_id" placeholder="请选择">
          <el-option v-for="item in roleLists" :key="item.id" :label="item.desc" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateInfo('form')">立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addUser, roleLists, userName } from "@/api/user";
export default {
  name: "EditUser",
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        role_id: 2,
      },
      lists: [],
      usernameLists: [],
      isShow: false,
      rules: {
        username: [
          { required: true, message: "请输入正确用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ], 
        email: [
         { required: true, message: "请输入邮箱", trigger: "blur" },
        ],
        mobile: [ 
         { required: true, message: "请输入电话号码", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getData();
  },
  computed: {
    roleLists() {
      return this.lists.filter((item, index) => {
        return item.desc !== "超级管理员";
      });
    },
  },
  methods: {
    // 获取数据
    getData() {
      roleLists().then((res) => {
        this.lists = res.data.rolelist;
      });
      userName().then((res) => {
        this.usernameLists = res.data.userlist;
      });
    },
    // 修改信息
    updateInfo(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          addUser(this.form).then((res) => {
            if (res.data.msg === 20000) {
              this.$router.push("/user/user");
            }
          });
        }  
      }); 
    }, 
   
    reqUsername(username) {
      const userList = this.usernameLists; 
      console.log(username.length)
      userList.forEach((item) => {
        if (item.username == username) { 
          this.isShow = !this.isShow
        }  else if (username.length > 3 && username.length < 8) { 
          this.isShow = !this.isShow
        }
      });
    },
  },
};
</script>


<style >
.editor {
  max-width: 500px;
  margin: 100px auto;
}
.hint {
  position: absolute;
  color: #F56C6C;
  font-size: 12px;
  top: 30px;
}
 
.error /deep/ .el-input__inner{
    border-color: #F56C6C;
  }
</style>





