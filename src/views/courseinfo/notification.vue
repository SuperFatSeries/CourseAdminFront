<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('mytable.title')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-date-picker v-model="listQuery.startTime" type="datetime" format="yyyy-MM-dd" placeholder="选择开始日期"/>
      <el-date-picker v-model="listQuery.endTime" type="datetime" format="yyyy-MM-dd" placeholder="选择开始日期"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column :label="$t('mytable.id')" align="center" width="65" type="index"/>
      <el-table-column :label="$t('mytable.title')" min-width="250px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('mytable.notificationContent')" min-width="250px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('mytable.createdTime')" width="250px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.created_time | timestampFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('mytable.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('mytable.edit') }}</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('mytable.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="$t('dialog.' + dialogStatus)" :visible.sync="dialogFormVisible" width="550px">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('mytable.title')" prop="title">
          <el-input v-model="temp.title"/>
        </el-form-item>
        <el-form-item :label="$t('mytable.notificationContent')" prop="content">
          <el-input v-model="temp.content"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, add, update, delete_ } from '@/api/notification'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime, formatDate } from '@/utils'

export default {
  name: 'Notification',
  directives: {
    waves
  },
  filters: {
    timestampFilter(timestamp) {
      return formatDate(timestamp)
    }
  },
  data() {
    return {
      tableKey: 10,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        startTime: undefined,
        endTime: undefined,
        sort: '+id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        id: undefined,
        title: '',
        content: ''
      },
      dialogFormVisible: false,
      dialogStatus: 'create',
      rules: {
        title: [{ required: true, message: 'title is required', trigger: 'blur' }],
        content: [{ required: true, message: 'content is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
    this.$store.watch(
      (state) => {
        return this.$store.state.courseId
      },
      (nVal, oVal) => {
        this.getList()
      })
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      fetchList(this.$store.state.courseId, this.listQuery).then(response => {
        this.list = response.data.data.content
        this.total = response.data.data.totalElements
        this.listLoading = false
        // Just to simulate the time of the request
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 1.5 * 1000)
      })
    },
    // 过滤
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 每页显示条数
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    // 换页
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        title: '',
        content: ''
      }
    },
    // 打开新增模态框
    handleCreate() {
      console.log(this.course)
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 确认新增数据
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          add(this.$store.state.courseId, this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 打开编辑模态框
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 确认编辑数据
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          update(this.$store.state.courseId, tempData.id, tempData).then(() => {
            // 替代数据
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除？').then(_ => {
        delete_(this.$store.state.courseId, row.id).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        })
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
