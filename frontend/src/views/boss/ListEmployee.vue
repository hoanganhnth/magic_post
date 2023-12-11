<template>
  <div>
    <nap-bar-boss></nap-bar-boss>
    <div class="container">
      <h1>Danh sách nhân viên</h1>
      <router-link to="/user/add">Thêm tài khoản nhân viên</router-link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Chức vụ</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <router-link :to="'/user/' + user.id">Edit</router-link>
              <button @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </template>
  
  <script>
  import NapBarBoss from '@/components/NapBarBoss.vue';
  import { useAuthStore } from '@/store/auth.js';
  export default {
    components: { NapBarBoss },
    name:'ListEmployee',
   
    data() {
      return {
        users: [
        
        ],
      };
    },
    async setup() {
      try {
       
       
        // const response = await AuthService.login(this.username, this.password);
        const data = await useAuthStore().getUser();
        console.log(data);
       
      } catch (error) {
        console.error(error);
        // Nếu có lỗi, hiển thị thông báo lỗi
        
      }
  },
    methods: {
      deleteUser(userId) {
        // Gọi API hoặc backend để xóa người dùng
        // Sau đó cập nhật danh sách người dùng
        this.users = this.users.filter(user => user.id !== userId);
      },
    },
  };
  </script>
  <style scoped>
  .container {
    margin: 5% auto;
  }
  /* UserList.vue */

  h1 {
    color: #333;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  button {
    margin-left: 5px;
    cursor: pointer;
    background-color: #f44336;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
  }
</style>
