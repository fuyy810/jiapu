<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>营销文章</h3>
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-width="150px">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="dataForm.title" placeholder="" />
        </el-form-item>
        <el-form-item label="文章内容" prop="userAgreementContent">
          <tinymce v-model="dataForm.content" :height="500" />
        </el-form-item>
      </el-form>
    </el-card>
    <div class="op-container">
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>

  </div>
</template>

<script>
import { createArticle } from '@/api/article'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'ArticleCreate',
  components: { Tinymce },

  data() {
    return {
      dataForm: {
        id: undefined,
        content: undefined,
        title: undefined,
        familyId: 0
      },
      rules: {
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    // this.init()
    this.dataForm.familyId = sessionStorage.getItem('familyId')
  },
  methods: {
    handleSave: function() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createArticle(this.dataForm)
            .then(response => {
              console.log(response)
              this.$notify.success({
                title: '成功',
                message: '创建成功'
              })
              this.$router.push({ path: '/advert/article/list' })
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: '创建失败'
              })
            })
        }
      })
    }
  }
}
</script>

<style>
  .el-card {
    margin-bottom: 10px;
  }
</style>
