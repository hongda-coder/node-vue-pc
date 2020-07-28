<template>
  <div class="editor">
    <el-form :model="form" label-width="80px" :rules="rules" ref="form">
      <el-form-item label="权限名称" style="position: relative;" prop="desc" >
        <el-input v-model="form.desc"  ></el-input> 
      </el-form-item>
      <el-form-item label="权限路径" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item> 
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          active-text="开启"
          inactive-text="关闭">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateInfo('form')">立即提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editAuth } from "@/api/user";
export default {
  name: "AddAuth",
  data() {
    return {
      form: { 
      }, 
      rules: {
        desc: [
          { required: true, message: "权限名称", trigger: "blur" }, 
        ],
        name: [
          { required: true, message: "权限路径", trigger: "change" }, 
        ], 
      },
    };
  },  
  mounted () {
    console.log(this.$route.query)
    this.form = this.$route.query   
    this.form.status = this.form.status == 1 ? true : false
  },
  methods: { 
    // 修改信息
    updateInfo(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          editAuth(this.form).then((res) => {
            console.log(res)
            if (res.data.msg === 20000) {
              this.$router.push("/user/auth");
            }
          });
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
 
</style>





