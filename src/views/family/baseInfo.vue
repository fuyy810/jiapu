<template>
  <div class="app-container">

    <el-card class="box-card">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-width="150px" style="width:900px">
        <h3>家族基本信息</h3>
        <el-form-item label="家族名称" prop="title">
          <el-input v-model="dataForm.title" :disabled="!editable" placeholder="" />
        </el-form-item>
        <el-form-item label="谱籍" prop="puji">
          <el-input v-model="dataForm.puji" :disabled="!editable" placeholder="" />
        </el-form-item>
        <el-form-item label="堂号" prop="tanghao">
          <el-input v-model="dataForm.tanghao" :disabled="!editable" placeholder="" />
        </el-form-item>
        <el-form-item label="家族源流" type="textarea" prop="origin">
          <el-input v-model="dataForm.origin" type="textarea" :disabled="!editable" placeholder="" />
        </el-form-item>
        <el-form-item label="字辈派语" type="textarea" prop="zibei">
          <el-input v-model="dataForm.zibei" type="textarea" :disabled="!editable" placeholder="" />
        </el-form-item>
        <el-form-item label="家族名人" type="textarea" prop="famousPerson">
          <el-input v-model="dataForm.famousPerson" type="textarea" :disabled="!editable" placeholder="" />
        </el-form-item>
        <el-form-item label="家谱编修" type="textarea" prop="redaction">
          <el-input v-model="dataForm.redaction" type="textarea" :disabled="!editable" placeholder="" />
        </el-form-item>
      </el-form>
    </el-card>

    <div class="op-container" style="margin-top:20px;">
      <el-button v-if="editable === false" type="primary" @click="handleUpdate">编辑</el-button>
      <el-button v-if="editable === true" type="primary" @click="handleUpdate">保存</el-button>
    </div>

  </div>
</template>

<script>
import { detailFamily, updateFamily } from '@/api/family'

export default {
  name: 'FamilyDetail',
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
      editable: false,
      status: 0,
      dataForm: {
        id: undefined,
        title: '',
        puji: '',
        tanghao: '',
        origin: '',
        zibei: '',
        famousPerson: '',
        redaction: ''
      },
      downloadLoading: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init: function() {
      if (this.$route.query.id == null) {
        this.$route.query.id = sessionStorage.getItem('familyId')
      }
      const familyId = this.$route.query.id
      detailFamily({
        familyId: familyId
      })
        .then(response => {
          console.log(response.data)
          this.dataForm.id = response.data.id
          this.dataForm.title = response.data.title
          this.dataForm.puji = response.data.puji

          this.dataForm.tanghao = response.data.tanghao
          this.dataForm.origin = response.data.origin
          this.dataForm.zibei = response.data.zibei
          this.dataForm.famousPerson = response.data.famousPerson
          this.dataForm.redaction = response.data.redaction
        })
        .catch(() => {
        })
    },
    handleCancel: function() {
      this.$router.push({ path: '/family/list' })
    },
    handleUpdate: function() {
      if (!this.editable) {
        this.editable = true
        return
      }
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateFamily(this.dataForm)
            .then(response => {
              console.log(response)
              this.$notify.success({
                title: '成功',
                message: '保存家族成功'
              })
              this.editable = false
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: '保存家族失败'
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
