<template>
  <div class="app-container">

    <el-card class="box-card">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-width="150px" style="width:900px">
        <h3>家族信息</h3>
        <el-form-item label="ID" prop="familySn">
          <el-input v-model="dataForm.familySn" placeholder="" :readonly="true" />
        </el-form-item>
        <el-form-item label="姓氏" prop="lastName">
          <el-input v-model="dataForm.lastName" placeholder="" :readonly="true" />
        </el-form-item>
        <el-form-item label="名字" prop="firstName">
          <el-input v-model="dataForm.firstName" placeholder="" :readonly="true" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="dataForm.gender" placeholder="未知" disabled="disabled">
            <el-option v-for="item in genderList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-input v-model="dataForm.birthday" placeholder="" :readonly="true" />
        </el-form-item>
        <el-form-item label="籍贯" prop="origin">
          <el-input v-model="dataForm.origin" placeholder="" :readonly="true" />
        </el-form-item>
        <el-form-item label="健在" prop="alive">
          <el-select v-model="dataForm.alive" placeholder="是" disabled="disabled">
            <el-option v-for="item in aliveList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="dataForm.alive === 0" label="卒日">
          <el-input v-model="dataForm.deathday" placeholder="" :readonly="true" />
        </el-form-item>
        <el-form-item label="字" prop="zi">
          <el-input v-model="dataForm.zi" placeholder="" :readonly="true" />
        </el-form-item>
        <el-form-item label="号" prop="hao">
          <el-input v-model="dataForm.hao" placeholder="" :readonly="true" />
        </el-form-item>
        <el-form-item label="父子序" prop="fuzixu">
          <el-input v-model="dataForm.fuzixu" placeholder="" :readonly="true" />
        </el-form-item>
        <el-form-item label="妻子序" prop="qizixu">
          <el-input v-model="dataForm.qizixu" placeholder="" :readonly="true" />
        </el-form-item>
        <el-form-item label="过继" prop="adoptive">
          <el-select v-model="dataForm.adoptive" placeholder="否" disabled="disabled">
            <el-option v-for="item in adoptiveList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="排行" prop="paihang">
          <el-input v-model="dataForm.paihang" placeholder="" :readonly="true" />
        </el-form-item>
        <el-form-item label="教育（科举）" prop="education">
          <el-input v-model="dataForm.education" type="textarea" placeholder="" :readonly="true" />
        </el-form-item>
        <el-form-item label="职业（官职）" prop="profession">
          <el-input v-model="dataForm.profession" type="textarea" placeholder="" :readonly="true" />
        </el-form-item>
        <el-form-item label="生平简介及其他" prop="introduction">
          <el-input v-model="dataForm.introduction" type="textarea" placeholder="" :readonly="true" />
        </el-form-item>
        <el-form-item v-if="dataForm.alive === 0" label="墓地位置" prop="cemeteryPlace">
          <el-input v-model="dataForm.cemeteryPlace" type="textarea" placeholder="" :readonly="true" />
        </el-form-item>
      </el-form>
    </el-card>

    <div class="op-container" style="margin-top:20px;">
      <el-button @click="handleCancel">取消</el-button>
    </div>

  </div>
</template>

<script>
import { detailMember } from '@/api/member'

export default {
  name: 'MemberInfo',
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
      genderList: [
        { value: 0, label: '未知' },
        { value: 1, label: '男' },
        { value: 2, label: '女' }
      ],
      aliveList: [
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ],
      adoptiveList: [
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ],
      dataForm: {
        id: undefined
      },
      downloadLoading: false
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
      const userId = this.$route.query.id
      detailMember({
        userId: userId
      })
        .then(response => {
          console.log(response.data)
          this.dataForm = response.data
        })
        .catch(() => {
        })
    },
    handleCancel: function() {
      this.$router.push({ path: '/member/list' })
    }
  }
}
</script>

<style scoped>
  .idcard{
    width: 400px;
  }
</style>
