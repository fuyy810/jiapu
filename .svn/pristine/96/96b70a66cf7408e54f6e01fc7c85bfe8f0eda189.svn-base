<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.keywords" clearable class="filter-item" style="width: 300px;" placeholder="输入微信昵称、家族ID或姓名查找" />
      <el-select v-model="listQuery.role" class="filter-item" placeholder="全部">
        <el-option v-for="item in role" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" @click="handleRefresh()">刷新</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label="ID" prop="id" sortable />

      <el-table-column align="center" label="微信昵称" prop="nickname" />

      <el-table-column align="center" label="微信头像">
        <template slot-scope="scope">
          <img :src="scope.row.headimg" style="width: 60px; height: 60px;">
        </template>
      </el-table-column>

      <el-table-column align="center" label="注册时间" prop="createTime" />

      <el-table-column align="center" label="权限等级" prop="role">
        <template slot-scope="scope">
          {{ scope.row.role | roleFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="家族ID" prop="familySn" />

      <el-table-column align="center" label="姓名" prop="name" />

      <el-table-column align="center" label="家族名称" prop="familyTitle" />

      <el-table-column align="center" label="手机号" prop="phone" />

      <el-table-column align="center" label="绑定审核" prop="status">
        <template slot-scope="scope">
          {{ scope.row.status | statusFilter }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 1 && scope.row.role === 0" type="primary" size="mini" @click="handleAuthorize(scope.row)">授权</el-button>
          <el-button v-else type="default" disabled="disabled" size="mini">授权</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 授权家族委员对话框 -->
    <el-dialog title="授权家族委员" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 600px; margin-left:50px;">
        <el-form-item label="职务" prop="post">
          <el-input v-model="dataForm.post" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, authorizeUser } from '@/api/wxUser'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const roleMap = {
  1: '家族委员',
  0: '普通用户'
}

const statusMap = {
  1: '已通过',
  2: '审核中',
  0: '未绑定'
}

export default {
  name: 'User',
  filters: {
    roleFilter(role) {
      return roleMap[role]
    },
    statusFilter(status) {
      return statusMap[status]
    }
  },
  components: { Pagination },
  data() {
    return {
      role: [{
        value: '-1',
        label: '全部'
      }, {
        value: '0',
        label: '普通用户'
      }, {
        value: '1',
        label: '家族委员'
      }],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        keywords: undefined,
        role: '-1'
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
    handleAuthorize(row) {
      this.dataForm.id = row.id
      this.dialogFormVisible = true
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          authorizeUser(this.dataForm)
            .then(response => {
              console.log(response)
              this.$notify.success({
                title: '成功',
                message: '授权成功'
              })
              this.getList()
              this.dialogFormVisible = false
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: '授权失败'
              })
            })
        }
      })
    }
  }
}
</script>
