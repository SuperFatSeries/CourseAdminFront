<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('mytable.name')" v-model="listQuery.name" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.role" :placeholder="$t('role.ta')" clearable style="width: 90px" class="filter-item" disabled="true">
        <el-option key="2" label="$t('role.ta')" value="$t('role.ta')"/>
      </el-select>
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
      <el-table-column :label="$t('mytable.id')" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('mytable.username')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('mytable.name')" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('mytable.institute')" min-width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.institute }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('mytable.email')" align="center" min-width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('mytable.role')" width="110px" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.role | roleTagFilter">{{ scope.row.role | roleFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('mytable.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button :disabled="handleDisable(row)" type="primary" size="small" @click="handleSetTA(scope.row)">{{ $t('mytable.setAsTA') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="$t('modal.add')" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('mytable.role')" prop="role">
          <el-select v-model="temp.role" :placeholder="$t('role.ta')" class="filter-item" disabled="true">
            <el-option key="2" label="$t('role.ta')" value="$t('role.ta')"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('mytable.username')" prop="username">
          <el-input v-model="temp.username"/>
        </el-form-item>
        <el-form-item :label="$t('mytable.name')" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item :label="$t('mytable.institute')" prop="institute">
          <el-input v-model="temp.institute"/>
        </el-form-item>
        <el-form-item :label="$t('mytable.email')" prop="email">
          <el-input v-model="temp.email"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="createData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, addAdmin } from '@/api/admin'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

const roleOptions = [
  // { key: 0, display_name: this.$t('role.admin') },
  // { key: 1, display_name: this.$t('role.teacher') },
  // { key: 2, display_name: this.$t('role.ta') }
  { key: 0, display_name: 'Admin' },
  { key: 1, display_name: 'Teacher' },
  { key: 2, display_name: 'TA' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const roleKeyValue = roleOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  directives: {
    waves
  },
  filters: {
    roleTagFilter(role) {
      const roleMap = {
        0: 'primary',
        1: 'success',
        2: 'info'
      }
      return roleMap[role]
    },
    roleFilter(role) {
      return roleKeyValue[role]
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
        name: undefined,
        role: 2,
        institute: undefined,
        sort: '+id'
      },
      roleOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      temp: {
        id: undefined,
        username: '',
        role: '',
        name: '',
        institute: '',
        email: '',
        ta: []
      },
      dialogFormVisible: false,
      rules: {
        role: [{ required: true, message: 'role is required', trigger: 'change' }],
        username: [{ required: true, message: 'username is required', trigger: 'blur' }],
        name: [{ required: true, message: 'name is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      setAsTA: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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
        username: '',
        role: '',
        name: '',
        institute: '',
        email: ''
      }
    },
    // 打开新增模态框
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 确认新增数据
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          addAdmin(this.temp).then(() => {
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
    handleDisable(row) {
      if (row.disable === undefined) {
        row.disable = false
      }
      return row.disable
    },
    // 设为当前课程TA
    handleSetTA(row) {
      this.$confirm('确认删除？').then(_ => {
        // console.log(row.disable)
        row.disable = true
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
