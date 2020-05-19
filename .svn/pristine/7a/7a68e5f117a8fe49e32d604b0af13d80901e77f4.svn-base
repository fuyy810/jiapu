<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.keywords" clearable class="filter-item" style="width: 300px;" placeholder="输入广告标题查找" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" @click="handleRefresh()">刷新</el-button>
      <el-button class="filter-item" type="primary" @click="handleCreate()">新建广告</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" label="广告标题" prop="title" />
      <el-table-column align="center" label="排序" prop="sort" />
      <el-table-column align="center" label="广告图片">
        <template slot-scope="scope">
          <img :src="scope.row.thumbnail" style="width: 100px; height: 60px;">
        </template>
      </el-table-column>

      <el-table-column align="center" label="广告链接" prop="link" />

      <el-table-column align="center" label="是否显示" prop="isshow">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isshow ? 'success' : 'error' ">{{ scope.row.isshow ? '显示' : '隐藏' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="更新时间" prop="updateTime" />

      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchList, deleteAdvert } from '@/api/advert'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'AdvertList',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        keywords: undefined,
        familyId: 0
      },
      downloadLoading: false
    }
  },
  created() {
    this.listQuery.familyId = sessionStorage.getItem('familyId')
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        console.log(response.data.data)
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleRefresh() {
      this.listQuery.page = 1
      this.listQuery.limit = 20
      this.listQuery.keywords = undefined
      this.getList()
    },
    handleUpdate(row) {
      this.$router.push({ path: '/advert/detail', query: { id: row.id }})
    },
    handleCreate() {
      this.$router.push({ path: '/advert/create' })
    },
    handleDelete(row) {
      this.$confirm('此操作将删除该条广告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delete row.addTime
        delete row.updateTime
        deleteAdvert(row)
          .then(response => {
            this.$notify.success({
              title: '成功',
              message: '删除广告成功'
            })
            this.getList()
          })
          .catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.errmsg
            })
          })
      }).catch(() => {})
    }
  }
}
</script>
