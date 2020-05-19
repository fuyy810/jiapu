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

      <el-table-column align="center" label="微信昵称" prop="nickname" />

      <el-table-column align="center" label="微信头像">
        <template slot-scope="scope">
          <img :src="scope.row.headimg" style="width: 60px; height: 60px;">
        </template>
      </el-table-column>

      <el-table-column align="center" label="申请绑定时间" prop="createTime" />

      <el-table-column align="center" label="家族ID" prop="familySn" />

      <el-table-column align="center" label="姓名" prop="name" />

      <el-table-column align="center" label="手机号" prop="phone" />

      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="handlePass(scope.row)">通过</el-button>
          <el-button type="danger" size="small" @click="handleDeny(scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchList, passMember, rejectMember } from '@/api/member'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'MemberAudit',
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
        status: ''
      },
      downloadLoading: false
    }
  },
  created() {
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
    handlePass(row) {
      const query = {
        userId: row.id
      }
      passMember(query)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '通过成功'
          })
          this.getList()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: '通过失败'
          })
        })
    },
    handleDeny(row) {
      const query = {
        userId: row.id
      }
      rejectMember(query)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '拒绝成功'
          })
          this.getList()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: '拒绝失败'
          })
        })
    }
  }
}
</script>
