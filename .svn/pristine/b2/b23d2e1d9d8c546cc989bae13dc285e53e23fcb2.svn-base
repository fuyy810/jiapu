<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.keywords" clearable class="filter-item" style="width: 300px;" placeholder="输入名字或ID查找" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" @click="handleRefresh()">刷新</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label="家族ID" prop="familySn" sortable />

      <el-table-column align="center" label="姓名" prop="name" />

      <el-table-column align="center" label="手机号" prop="phone" />

      <el-table-column align="center" label="职务" prop="post" />

      <el-table-column align="center" label="授权时间" prop="authorizedTime" />
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { committeeList, deleteFamily } from '@/api/member'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Committee',
  components: { Pagination },
  filters: {
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        keywords: undefined,
        status: '',
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
      committeeList(this.listQuery).then(response => {
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
    handleCreate() {
      this.$router.push({ path: '/family/create' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/family/detail', query: { id: row.id }})
    },
    handleView(row) {
      this.$router.push({ path: '/family/baseInfo', query: { id: row.id }})
    },
    handleDelete(row) {
      this.$confirm('此操作将删除该家族信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const query = {
          id: row.id
        }
        deleteFamily(query)
          .then(response => {
            this.$notify.success({
              title: '成功',
              message: '删除成功'
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
