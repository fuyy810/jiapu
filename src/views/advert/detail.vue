<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 700px; margin-left:50px;">
      <el-form-item label="广告标题" prop="title">
        <el-input v-model="dataForm.title" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="dataForm.sort" />
        <span>* 数字越大排名越靠前</span>
      </el-form-item>
      <el-form-item label="广告图片" prop="thumbnail">
        <el-upload
          :action="uploadPath"
          :show-file-list="false"
          :on-success="uploadSuccess"
          class="avatar-uploader"
          accept=".jpg,.jpeg,.png,.gif"
        >
          <img v-if="dataForm.thumbnail" :src="dataForm.thumbnail" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon avatar" />
        </el-upload>
        <span>* 首页banner建议尺寸750*393像素，广告图片建议尺寸722*260像素</span>
      </el-form-item>
      <el-form-item label="广告链接" prop="link">
        <el-input v-model="dataForm.link" :disabled="true" style="width:400px" />
        <el-button-group>
          <el-button @click="selectUrl">选择链接</el-button>
          <el-button @click="clearUrl">清除链接</el-button>
        </el-button-group>
        <span>* 选择链接后点击跳转到相应页面</span>
      </el-form-item>
      <el-form-item label="是否显示" prop="isshow">
        <el-select v-model="dataForm.isshow" style="width: 600px;" placeholder="请选择">
          <el-option :value="true" label="显示" />
          <el-option :value="false" label="隐藏" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="updateData">确定</el-button>
    </div>
    <!-- 对话框 -->
    <el-dialog title="选择链接" :visible.sync="dialogFormVisible">
      <div class="filter-container">
        <el-input v-model="listQuery.keywords" clearable class="filter-item" style="width: 200px;" placeholder="请输入文章标题" />

        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button class="filter-item" type="primary" @click="resetList">刷新</el-button>
      </div>

      <!-- 查询结果 -->
      <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>

        <el-table-column align="center" label="序号" type="index" />
        <el-table-column align="center" label="文章标题" prop="title" />
        <el-table-column align="center" label="更新时间" prop="updateTime" />
        <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="chooseUrl(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-dialog>

  </div>
</template>

<script>
import { detailAdvert, updateAdvert, listArticle } from '@/api/advert'
import { uploadPath } from '@/api/storage'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'AdvertDetail',
  components: { Pagination },
  data() {
    return {
      uploadPath,
      dialogFormVisible: false,
      list: undefined,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        keywords: undefined
      },
      dataForm: {
        id: undefined,
        title: undefined,
        sort: 0,
        thumbnail: undefined,
        link: undefined,
        isshow: true
      },
      rules: {
        name: [{ required: true, message: '广告标题不能为空', trigger: 'blur' }]
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
    this.listQuery.familyId = sessionStorage.getItem('familyId')
    this.init()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listArticle(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })

      // // 取服务项目列表
      // listAllCategory().then(response => {
      //   this.list1 = response.data
      // }).catch(() => {
      //   this.list1 = []
      // })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    init: function() {
      if (this.$route.query.id == null) {
        return
      }
      const advertId = this.$route.query.id
      detailAdvert({
        advertId: advertId
      })
        .then(response => {
          console.log(response.data)
          this.dataForm = response.data
        })
        .catch(() => {
        })
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        name: undefined,
        url: undefined,
        link: undefined,
        positionId: 1,
        enabled: true,
        status: undefined
      }
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          delete this.dataForm.createTime
          delete this.dataForm.updateTime
          updateAdvert(this.dataForm)
            .then(() => {
              this.$notify.success({
                title: '成功',
                message: '更新广告成功'
              })
              this.$router.push({ path: '/advert/list' })
            })
            .catch(response => {
              this.$notify.error({
                title: '失败'
                // message: response.data.errmsg
              })
            })
        }
      })
    },
    cancel() {
      this.$router.push({ path: '/advert/list' })
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
      this.dataForm.thumbnail = res.data.url
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
