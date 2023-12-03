<template>
  <page-header></page-header>

  <div class="employee-manager">
    <h2>Quản lý tài khoản nhân viên</h2>
    <div class="container">
    <button class="add-button" @click="addEmployee">Thêm nhân viên</button>
    <div class="employee-card" v-for="employee in employees" :key="employee.id">
      <h3>{{ employee.name }}</h3>
      <button class="edit-button" @click="editEmployee(employee.id)">Chỉnh sửa</button>
      <button class="delete-button" @click="deleteEmployee(employee.id)">Xóa</button>
    </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
export default {
  components: { PageHeader },
  name: 'UpdateEmployee',
  data() {
    return {
      employees: [
  { id: 1, name: 'Nguyễn Văn A', position: 'Nhân viên giao hàng', location: 'Hà Nội' },
  { id: 2, name: 'Trần Thị B', position: 'Nhân viên tư vấn', location: 'Đà Nẵng' },
  { id: 3, name: 'Phạm Văn C', position: 'Nhân viên kỹ thuật', location: 'TP Hồ Chí Minh' },
  { id: 4, name: 'Lê Thị D', position: 'Nhân viên bán hàng', location: 'Cần Thơ' },
  { id: 5, name: 'Vũ Văn E', position: 'Nhân viên giao hàng', location: 'Hải Phòng' }
]

    }
  },
  methods: {
    addEmployee() {
      // Thêm nhân viên
    },
    editEmployee(id) {
      // Chỉnh sửa thông tin nhân viên
    },
    deleteEmployee(id) {
      // Xóa nhân viên
    }
  }
}
</script>

<style scoped>
.container {
  width: 70%;
  border: 3px solid #031223;
  background-color: aliceblue;
}
.employee-manager {
  background-color: antiquewhite;
  width: 100%;
 
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.employee-card {
  background-color: #7964a270;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}

.add-button,
.edit-button,
.delete-button {
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  color: white;
  cursor: pointer;
}

.add-button {
  background-color: #4caf50;
}

.edit-button {
  background-color: #ff9800;
}

.delete-button {
  background-color: #f44336;
}
</style>
