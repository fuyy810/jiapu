<template>
  <div class="app-container">

    <el-card class="box-card">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-width="150px" style="width:900px">
        <h3>家族信息</h3>
        <el-form-item label="家族名称" prop="title">
          <el-input v-model="dataForm.title" placeholder="" />
        </el-form-item>
        <el-form-item label="家族姓氏" prop="surname">
          <el-input v-model="dataForm.surname" placeholder="" />
        </el-form-item>
      </el-form>
    </el-card>

    <div class="op-container" style="margin-top:20px;">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleCreate">提交</el-button>
    </div>

  </div>
</template>

<script>
import { createFamily } from '@/api/family'

export default {
  name: 'FamilyCreate',
  data() {
    return {
      rules: {
        title: [
          { required: true, message: '请输入家族标题', trigger: 'blur' }
        ],
        surname: [
          { required: true, message: '请输入家族姓氏', trigger: 'blur' }
        ]
      },
      dataForm: {
        id: undefined,
        title: '',
        surname: ''
      },
      downloadLoading: false
    }
  },
  created() {
  },
  methods: {
    handleCancel: function() {
      this.$router.push({ path: '/family/list' })
    },
    handleCreate: function() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createFamily(this.dataForm)
            .then(response => {
              console.log(response)
              this.$notify.success({
                title: '成功',
                message: '创建家族成功'
              })
              this.$router.push({ path: '/family/list' })
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: '创建家族失败'
              })
            })
        }
      })
    }
  }
}
</script>

<style scoped>
  .idcard{
    width: 400px;
  }
</style>
