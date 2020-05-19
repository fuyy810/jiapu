<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-text">
          出海次数
        </div>
        <div class="card-panel-num">
          <count-to :start-val="0" :end-val="newShippingCount" :duration="2600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-text">
          用户预约量
        </div>
        <div class="card-panel-num">
          <count-to :start-val="0" :end-val="newOrderCount" :duration="2600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-text">
          船主入驻
        </div>
        <div class="card-panel-num">
          <count-to :start-val="0" :end-val="newShipOwnerCount" :duration="2600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-text">
          新增用户
        </div>
        <div class="card-panel-num">
          <count-to :start-val="0" :end-val="newUserCount" :duration="2600" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { todayCount } from '@/api/dashboard'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      newShippingCount: 0,
      newOrderCount: 0,
      newShipOwnerCount: 0,
      newUserCount: 0
    }
  },
  created() {
    this.getCount()
  },
  methods: {
    getCount() {
      todayCount().then(response => {
        console.log(response.data)
        this.newShippingCount = response.data.count.shippingCount
        this.newOrderCount = response.data.count.orderCount
        this.newShipOwnerCount = response.data.count.shipOwnerCount
        this.newUserCount = response.data.count.userCount
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 5px;

  .card-panel-col {
    margin-bottom: 10px;
  }

  .card-panel {
    height: 68px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-text {
      float: left;
      line-height: 68px;
      font-size: 20px;
      padding-left: 20px;
    }
    .card-panel-num {
        float: right;
        line-height: 68px;
        font-size: 20px;
        padding-right: 20px;
      }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
