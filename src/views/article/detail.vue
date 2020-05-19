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
import { readArticle, updateArticle } from '@/api/article'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'ArticleDetail',
  components: { Tinymce },

  data() {
    return {
      dataForm: {
        id: undefined,
        content: undefined,
        title: undefined
      },
      rules: {
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init: function() {
      if (this.$route.query.id == null) {
        return
      }
      const id = this.$route.query.id
      readArticle({
        articleId: id
      })
        .then(response => {
          console.log(response.data)
          this.dataForm = response.data
        })
        .catch(() => {
        })
    },
    handleSave: function() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          delete this.dataForm.addTime
          delete this.dataForm.updateTime
          updateArticle(this.dataForm)
            .then(response => {
              this.$notify.success({
                title: '成功',
                message: '更新成功'
              })
              this.$router.push({ path: '/advert/article/list' })
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: '更新失败'
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
