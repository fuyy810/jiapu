<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 700px; margin-left:50px;">
      <el-form-item label="家谱名称" prop="title">
        <el-input v-model="dataForm.title" />
      </el-form-item>
      <el-form-item label="家谱封面" prop="cover">
        <el-upload
          :action="uploadPath"
          :show-file-list="false"
          :on-success="uploadSuccess"
          class="avatar-uploader"
          accept=".jpg,.jpeg,.png,.gif"
        >
          <img v-if="dataForm.cover" :src="dataForm.cover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon avatar" />
        </el-upload>
        <span>* 建议尺寸长260*宽200像素</span>
      </el-form-item>
      <el-form-item label="撰修者" prop="author">
        <el-input v-model="dataForm.author" />
      </el-form-item>
      <el-form-item label="撰修时间" prop="editTime">
        <el-input v-model="dataForm.editTime" />
      </el-form-item>
      <el-form-item label="出版发行" prop="publish">
        <el-input v-model="dataForm.publish" />
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input v-model="dataForm.version" />
      </el-form-item>
      <el-form-item label="册数" prop="bookCount">
        <el-input v-model="dataForm.bookCount" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="createData">确定</el-button>
    </div>

  </div>
</template>

<script>
import { createFamilyTree } from '@/api/family-tree'
import { uploadPath } from '@/api/storage'
import { getToken } from '@/utils/auth'

export default {
  name: 'FamilyTreeCreate',
  data() {
    return {
      uploadPath,
      list: undefined,
      select: undefined,
      dialogFormVisible: false,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        keywords: undefined
      },
      dataForm: {
        id: undefined,
        title: undefined,
        cover: undefined,
        author: undefined,
        editTime: undefined,
        publish: undefined,
        version: undefined,
        bookCount: undefined,
        familyId: 0
      },
      rules: {
        // name: [{ required: true, message: '广告标题不能为空', trigger: 'blur' }]
        // content: [{ required: true, message: '广告内容不能为空', trigger: 'blur' }],
        // url: [{ required: true, message: '广告图片不能为空', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  computed: {
    headers() {
      return {
        'X-Litemall-Admin-Token': getToken()
      }
    }
  },
  created() {
    this.dataForm.familyId = sessionStorage.getItem('familyId')
  },
  methods: {
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          console.log(this.dataForm)
          createFamilyTree(this.dataForm)
            .then(response => {
              console.log(response)
              this.$notify.success({
                title: '成功',
                message: '添加家谱成功'
              })
              this.$router.push({ path: '/family-tree/list' })
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: '添加家谱失败'
              })
            })
        }
      })
    },
    cancel() {
      this.$router.push({ path: '/family-tree/list' })
    },
    clearUrl() {
      this.dataForm.link = ''
    },
    selectUrl() {
      this.dialogFormVisible = true
    },
    chooseUrl(row) {
      this.dataForm.link = '/admin/auth/market?id=' + row.id
      this.dialogFormVisible = false
    },
    resetList() {
      this.listQuery = {
        page: 1,
        limit: 20,
        keywords: undefined
      }
      this.getList()
    },
    uploadSuccess: function(res) {
      console.log(res)
      this.dataForm.cover = res.data
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 145px;
  height: 145px;
  display: block;
}
.input-with-select {
  width: 110px;
}
</style>
