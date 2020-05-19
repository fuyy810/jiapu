<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.keywords" clearable class="filter-item" style="width: 300px;" placeholder="输入家谱名称查找" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" @click="handleRefresh()">刷新</el-button>
      <el-button class="filter-item" type="primary" @click="handleCreate()">添加家谱</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label="序号" prop="id" sortable />

      <el-table-column align="center" label="家谱封面">
        <template slot-scope="scope">
          <img :src="scope.row.cover" style="width: 60px; height: 100px;">
        </template>
      </el-table-column>

      <el-table-column align="center" label="家谱名称" prop="title" />

      <el-table-column align="center" label="纂修者" prop="author" />

      <el-table-column align="center" label="纂修时间" prop="editTime" />

      <el-table-column align="center" label="出版发行" prop="publish" />

      <el-table-column align="center" label="版本" prop="version" />

      <el-table-column align="center" label="册数" prop="bookCount" />

      <el-table-column align="center" label="创建时间" prop="createTime" />

      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleView(scope.row)">查看</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchList, deleteFamilyTree } from '@/api/family-tree'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'FamilyTreeList',
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
        keywords: undefined
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
    handleCreate() {
      this.$router.push({ path: '/family-tree/create' })
    },
    handleView(row) {
      this.$router.push({ path: '/family-tree/book', query: { id: row.id }})
    },
    handleUpdate(row) {
      this.$router.push({ path: '/family-tree/detail', query: { id: row.id }})
    },
    handleDelete(row) {
      this.$confirm('此操作将删除该谱文信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const query = {
          id: row.id
        }
        deleteFamilyTree(query)
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
