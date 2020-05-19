<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.keywords" clearable class="filter-item" style="width: 300px;" placeholder="输入姓名查找" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" @click="handleRefresh()">刷新</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label="家族ID" prop="id" sortable />

      <el-table-column align="center" label="姓名" prop="name" />

      <el-table-column align="center" label="家族名称" prop="familyTitle" />

      <el-table-column align="center" label="手机号" prop="phone" />

      <el-table-column align="center" label="职务" prop="post" />

      <el-table-column align="center" label="授权时间" prop="authorizedTime" />

      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="danger" @click="handleUnAuthorize(scope.row)">解除权限</el-button>
          <el-button type="primary" @click="handleResetPassword(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { committeeList, unAuthorizeUser, resetPassword } from '@/api/wxUser'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'User',
  filters: {
  },
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
      downloadLoading: false,
      dialogFormVisible: false,
      rules: {
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      committeeList(this.listQuery).then(response => {
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
    handleUnAuthorize(row) {
      this.$confirm('解除家族委员权限将变更为普通用户确定解除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const query = {
          id: row.id
        }
        unAuthorizeUser(query)
          .then(response => {
            this.$notify.success({
              title: '成功',
              message: '解绑成功'
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
    },
    handleResetPassword(row) {
      this.$confirm('确定将登录密码重置为123456吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const query = {
          id: row.id
        }
        resetPassword(query)
          .then(response => {
            this.$notify.success({
              title: '成功',
              message: '重置成功'
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
    },
    changeRoles() {
      this.$store.dispatch('user/changeRoles', 'admin').then(() => {
        // this.$emit('change')
        this.$router.push({ path: '/family/list' })
      })
    }
  }
}
</script>
