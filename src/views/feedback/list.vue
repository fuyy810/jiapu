<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <span>问题类型</span>
      <el-select v-model="listQuery.catalog" placeholder="全部">
        <el-option v-for="item in catalog" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <span>回复状态</span>
      <el-select v-model="listQuery.status" placeholder="全部">
        <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" @click="handleRefresh()">刷新</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label="序号" prop="id" sortable />

      <el-table-column align="center" label="问题类型" prop="catalog">
        <template slot-scope="scope">
          {{ scope.row.catalog | catalogFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="问题描述" prop="description" />

      <el-table-column align="center" label="提问人" prop="name" />

      <el-table-column align="center" label="提问人手机号" prop="userPhone" />

      <el-table-column align="center" label="提出时间" prop="createTime" />

      <el-table-column align="center" label="回复状态" prop="status">
        <template slot-scope="scope">
          {{ scope.row.status | statusFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleView(scope.row)">查看</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchList, deleteFeedback } from '@/api/feedback'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const catalogMap = {
  4: '其他',
  3: '家谱编修',
  2: '家谱树成员',
  1: '家族资料'
}

const statusMap = {
  1: '已回复',
  0: '待回复'
}

export default {
  name: 'FeedbackDetail',
  filters: {
    catalogFilter(catalog) {
      return catalogMap[catalog]
    },
    statusFilter(status) {
      return statusMap[status]
    }
  },
  components: { Pagination },
  data() {
    return {
      catalog: [
        { value: '0', label: '全部' },
        { value: '1', label: '家族资料' },
        { value: '2', label: '家谱树成员' },
        { value: '3', label: '家谱编修' },
        { value: '4', label: '其他' }
      ],
      status: [
        { value: '-1', label: '全部' },
        { value: '0', label: '未回复' },
        { value: '2', label: '已回复' }
      ],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        keywords: undefined,
        catalog: '0',
        status: '-1',
        familyId: 0
      },
      downloadLoading: false,
      dialogFormVisible: false,
      dataForm: {
        id: undefined,
        post: ''
      },
      rules: {
      }
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
    handleView(row) {
      this.$router.push({ path: '/feedback/detail', query: { id: row.id }})
    },
    handleDelete(row) {
      this.$confirm('此操作将删除该问题信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const query = {
          id: row.id
        }
        deleteFeedback(query)
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
