<template>
  <div class="app-container">

    <div class="filter-container">
      <div class="filter-item">
        <el-checkbox v-model="checked">全选</el-checkbox>
      </div>
      <div class="filter-item" style="float:right">
        <el-upload
          class="filter-item"
          :action="uploadPath"
          :on-success="uploadSuccess"
          accept=".jpg,.jpeg,.png,.gif"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-button class="filter-item" size="small" type="danger" @click="handleDelete()">删除</el-button>
      </div>
    </div>

    <div>
      <div v-for="(book, i) in pictures" :key="book.id" class="book">
        <img :src="book.url" style="width: 250px; height: 250px; cursor:pointer;" @click="clickBook(i)">
        <i class="el-icon-circle-close delete" @click="clickDelete(i)" />
        <div style="text-align: center;">
          <span v-text="book.name" />
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" :fullscreen="true" @opened="dialogOpened">
      <el-carousel ref="carousel" :autoplay="false" arrow="always" height="800px">
        <el-carousel-item v-for="item in pictures" :key="item.id" style="text-align:center">
          <img :src="item.url" width="800" height="800">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, createFamilyTreeBookImg, deleteAllFamilyTreeBookImg, deleteFamilyTreeBookImg } from '@/api/family-tree-book-img'
import { uploadPath } from '@/api/storage'
import { getToken } from '@/utils/auth'

export default {
  name: 'FamilyTreeBookImgList',
  data() {
    return {
      checked: false,
      pictures: [],
      deleteVisible: false,
      uploadPath,
      list: undefined,
      listQuery: {
        familyTreeBookId: 0
      },
      dataForm: {
        id: undefined,
        url: undefined,
        familyTreeBookId: undefined,
        name: undefined
      },
      rules: {
        // name: [{ required: true, message: '广告标题不能为空', trigger: 'blur' }]
        // content: [{ required: true, message: '广告内容不能为空', trigger: 'blur' }],
        // url: [{ required: true, message: '广告图片不能为空', trigger: 'blur' }]
      },
      downloadLoading: false,
      dialogFormVisible: false,
      activeIndex: 0
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
      if (this.$route.query.familyTreeBookId == null) {
        return
      }
      const familyTreeBookId = this.$route.query.familyTreeBookId
      this.dataForm.familyTreeBookId = familyTreeBookId
      this.listQuery.familyTreeBookId = familyTreeBookId
      fetchList(this.listQuery).then(response => {
        console.log(response.data.data)
        this.pictures = response.data.data
      }).catch(() => {
        this.pictures = []
      })
    },
    cancel() {
      this.$router.push({ path: '/family-tree/list' })
    },
    clickBook: function(i) {
      this.activeIndex = i
      this.dialogFormVisible = true
    },
    dialogOpened: function() {
      this.$refs.carousel.setActiveItem(this.activeIndex)
    },
    uploadSuccess: function(res) {
      console.log(res)
      this.dataForm.url = res.data.url
      this.dataForm.name = res.data.name
      createFamilyTreeBookImg(this.dataForm)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '添加图片成功'
          })
          this.init()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: '添加图片失败'
          })
        })
    },
    handleDelete: function() {
      console.log(this.checked)
      if (this.checked) {
        this.$confirm('此操作将删除该册家谱下全部图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const query = {
            familyTreeBookId: this.listQuery.familyTreeBookId
          }
          console.log(query)
          deleteAllFamilyTreeBookImg(query)
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
      }
    },
    clickDelete: function(i) {
      this.$confirm('此操作将删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const query = {
          id: this.pictures[i].id
        }
        console.log(query)
        deleteFamilyTreeBookImg(query)
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
    }
  }
}
</script>

<style>

.book {
  display: inline-block;
  position: relative;
  margin: 0 10px;
  font-size: 20px;
}
.book .delete {
  position: absolute;
  top: 0px;
  right: 0px;
  color: red;
  cursor:pointer;
}
</style>
