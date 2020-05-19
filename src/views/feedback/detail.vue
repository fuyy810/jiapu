<template>
  <div class="app-container">
    <h4>问题</h4>
    <div class="table-layout">
      <el-row>
        <el-col :span="4" class="table-cell-title">序号</el-col>
        <el-col :span="5" class="table-cell-title">问题类型</el-col>
        <el-col :span="5" class="table-cell-title">提出人</el-col>
        <el-col :span="5" class="table-cell-title">提出人手机号</el-col>
        <el-col :span="5" class="table-cell-title">提出时间</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell">{{ dataForm.id }}</el-col>
        <el-col :span="5" class="table-cell">{{ dataForm.catalog | catalogFilter }}</el-col>
        <el-col :span="5" class="table-cell">{{ dataForm.name }}</el-col>
        <el-col :span="5" class="table-cell">{{ dataForm.userPhone }}</el-col>
        <el-col :span="5" class="table-cell">{{ dataForm.createTime }}</el-col>
      </el-row>
    </div>

    <div class="table-layout">
      <el-row>
        <el-col :span="16" class="table-cell-title">问题描述</el-col>
        <el-col :span="8" class="table-cell-title">附加图片</el-col>
      </el-row>
      <el-row>
        <el-col :span="16" class="table-cell">{{ dataForm.description }}</el-col>
        <el-col :span="8" class="table-cell">
          <img v-for="(item, i) in dataForm.pictures" :key="item.id" :src="item.url" width="40" height="40" @click="handleViewPicture(i)">
        </el-col>
      </el-row>
    </div>

    <el-dialog title="附加图片" :visible.sync="dialogFormVisible" @opened="dialogOpened">
      <el-carousel ref="carousel" :autoplay="false" arrow="always">
        <el-carousel-item v-for="item in dataForm.pictures" :key="item.id" style="text-align:center">
          <img :src="item.url" width="300" height="300">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>

  </div>
</template>

<script>
import { detailFeedback, updateFamily } from '@/api/feedback'

const catalogMap = {
  4: '其他',
  3: '家谱编修',
  2: '家谱树成员',
  1: '家族资料'
}

export default {
  name: 'FeedbackDetail',
  filters: {
    catalogFilter(catalog) {
      return catalogMap[catalog]
    }
  },
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
        catalog: '',
        name: '',
        userPhone: '',
        createTime: '',
        description: '',
        pictures: [
        ]
      },
      downloadLoading: false,
      dialogFormVisible: false,
      activeIndex: 0
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
      const feedbackId = this.$route.query.id
      detailFeedback({
        feedbackId: feedbackId
      })
        .then(response => {
          console.log(response.data)
          this.dataForm = response.data
        })
        .catch(() => {
        })
    },
    handleCancel: function() {
      this.$router.push({ path: '/family/list' })
    },
    handleUpdate: function() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateFamily(this.dataForm)
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
    },
    handleViewPicture: function(i) {
      this.activeIndex = i
      this.dialogFormVisible = true
    },
    dialogOpened: function() {
      this.$refs.carousel.setActiveItem(this.activeIndex)
    }
  }
}
</script>

<style scoped>
  .idcard{
    width: 400px;
  }

  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }
  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }
  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
</style>
