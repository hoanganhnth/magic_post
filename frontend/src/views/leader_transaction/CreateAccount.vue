<template>
<div>
  <page-header></page-header>
  <div class="container">
    <h1>Danh sách tài khoản giao dịch viên</h1>

    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Tên giao dịch viên</th>
          <th>Số điện thoại</th>
          <th>Địa chỉ email</th>
          <th>Vai trò</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr> 
           <!-- v-for="item in items" :key="item.id" -->
          <td>{{ item.username }}</td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.userRole }}</td>
        </tr>
      </tbody>
    </table>

    <form @submit.prevent="onSubmit">
      <input type="text" v-model="username" placeholder="Tên đăng nhập">
      <input type="text" v-model="first_name" placeholder="Họ">
      <input type="text" v-model="last_name" placeholder="Tên">
      <input type="email" v-model="email" placeholder="Địa chỉ email">
      <input type="password" v-model="password" placeholder="Mật khẩu">
      <input type="password" v-model="password_confirm" placeholder="Nhập lại mật khẩu">
      <button type="submit">Tạo tài khoản</button> 
    </form>
  </div>
</div>
</template>

<script>
import { useAuthStore } from '../../store/auth';
import PageHeader from '../../components/PageHeader.vue';

import axios from 'axios';
export default {
  components: { PageHeader },
  data() {
    return {
      item: [],
      username : "",
      email:"",
      first_name:"",
      last_name :"",
      password:"",
      password_confirm:"",
     

    };
  },
   async mounted() {
  
    
    // try {
    //   this.data = await useAuthStore().getUser();

    // } catch (error) {
    //   console.error('Error fetching data from API:', error);
    // }
  
  
    // Lấy dữ liệu từ server
  axios.get("http://localhost:8081/api/auth/user", {
      headers: {
    Authorization: "Bearer " + accessToken,
  },
 } )
      .then((response) => {
        
        this.item = response.data;
        console.log(this.item)
      })
      .catch((error) => {
        console.log(useAuthStore().accessToken)
        console.log(error);
      });
  },
  methods: {
   
     async onSubmit() {
   
      
      const payload = {
          username: this.username,
          email: this.email,
          password: this.password,
          password_confirm: this.password_confirm,
          first_name: this.first_name,
          last_name: this.last_name,

        }
   
     // Gửi yêu cầu tạo tài khoản đến server
    axios.post("http://localhost:8081/api/auth/registerAdmin",payload
      
         
        )
        .then((response) => {
          // Xử lý thành công
          console.log("Tạo tài khoản thành công!");
       
        })
        .catch((error) => {
          console.log(this.email)
          // Xử lý thất bại
          console.log(error.response.data.message);
        });
    },
  },
};
</script>
  <style scoped>
 .container {
  width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 30px;
  font-weight: bold;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
}

th {
  background-color: #337ab7;
  color: #fff;
}

input {
  width: 100%;
  border-radius: 5px;
  padding: 10px;
}

button {
  background-color: #337ab7;
  color: #fff;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 10px;
}

.form-control {
  width: 100%;
  border-radius: 5px;
  padding: 10px;
}

#form-create-account {
  margin-top: 20px;
}

.create-account-button {
  background-color: #337ab7;
  color: #fff;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}
  </style>