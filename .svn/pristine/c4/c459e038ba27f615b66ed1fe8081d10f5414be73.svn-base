<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" size="small" type="primary" @click="handleCreate()">添加分册</el-button>
    </div>

    <div v-for="(book, i) in books" :key="book.id" class="book">
      <img src="../../assets/family-tree-book.jpg" style="width: 200px; height: 200px; cursor:pointer;" @click="clickBook(i)">
      <i class="el-icon-circle-close delete" @click="clickDelete(i)" />
      <div style="text-align:center; font-size:18px;">{{ book.bookTitle }}</div>
    </div>

    <!-- 添加对话框 -->
    <el-dialog title="添加分册" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 600px; margin-left:50px;">
        <el-form-item label="分册名称" prop="bookTitle">
          <el-input v-model="dataForm.bookTitle" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>

.book {
  display: inline-block;
  position: relative;
  margin: 0 10px;
  font-size: 30px;
}
.book .delete {
  position: absolute;
  top: 0px;
  right: 0px;
  color: red;
  cursor:pointer;
}

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

<script>
import { fetchList, createFamilyTreeBook, deleteFamilyTreeBook } from '@/api/family-tree-book'
import { uploadPath } from '@/api/storage'
import { getToken } from '@/utils/auth'

export default {
  name: 'FamilyTreeBookList',
  data() {
    return {
      books: [],
      dialogFormVisible: false,
      url: '../../assets/family-tree-book.jpg',
      uploadPath,
      list: undefined,
      listQuery: {
        familyTreeId: 0
      },
      dataForm: {
        familyTreeId: 0,
        bookTitle: undefined
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
    this.init()
  },
  methods: {
    init: function() {
      if (this.$route.query.id == null) {
        return
      }
      const familyTreeId = this.$route.query.id
      this.dataForm.familyTreeId = familyTreeId
      this.listQuery.familyTreeId = familyTreeId
      fetchList(this.listQuery).then(response => {
        console.log(response.data.data)
        this.books = response.data.data
      }).catch(() => {
        this.books = []
      })
    },
    handleCreate() {
      this.dialogFormVisible = true
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          console.log(this.dataForm)
          createFamilyTreeBook(this.dataForm)
            .then(response => {
              this.$notify.success({
                title: '成功',
                message: '添加分册成功'
              })
              this.dialogFormVisible = false
              this.init()
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: '添加分册失败'
              })
            })
        }
      })
    },
    cancel() {
      this.$router.push({ path: '/family-tree/list' })
    },
    clickDelete: function(i) {
      this.$confirm('此操作将删除该册家谱, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const query = {
          id: this.books[i].id
        }
        console.log(query)
        deleteFamilyTreeBook(query)
          .then(response => {
            console.log(response)
            this.$notify.success({
              title: '成功',
              message: '删除成功'
            })
            this.init()
          })
          .catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.message
            })
          })
      }).catch(() => {})
    },
    clickBook: function(i) {
      this.$router.push({ path: '/family-tree/book/img', query: { familyTreeBookId: this.books[i].id }})
    }
  }
}
</script>
