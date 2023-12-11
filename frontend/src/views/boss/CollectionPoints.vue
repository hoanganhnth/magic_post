<template>
  <div class='dashboard'>
   <nap-bar-boss></nap-bar-boss>
    <div class='dashboard-app'>
      <div class='dashboard-content'>
        <div class="container">
    <h1>Danh sách tài khoản trưởng điểm tập kết</h1>

    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Điểm tập kết</th>
          <th>Tên trưởng điểm</th>
          <th>Địa chỉ email</th>
          <th>Vai trò</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="item in items" :key="item.id"> 
          
          <td>{{ item.transaction }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.userRole }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
    <button id="add" @click="showForm = !showForm">
  <i class="fas fa-plus"></i> Thêm nhân viên
</button>
<div v-if="showForm" class="container-form">
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
      </div>
    </div>
  </div>
</template>
    
<script>
import NapBarBoss from '../../components/NapBarBoss.vue'
export default {
  components: { NapBarBoss },

  name: 'CollectionPoints',
  data() {

    return {
      showForm: false,
      items : [
  {
    id:1,
    transaction:"Hà Nội",
    name: "John Doe",
    email: "johndoe@example.com",
    userRole: "admin",
    status: "active",
  },
  {
    id:2,
    transaction:"Đà Nẵng",
    name: "Jane Doe",
    email: "janedoe@example.com",
    userRole: "user",
    status: "inactive",
  },
],
      username : "",
      email:"",
      first_name:"",
      last_name :"",
      password:"",
      password_confirm:"",
     

    };
  },
   
  
};
</script>

   
<style >
#add {
  background-color: #3498db;
  color: #fff;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

#add i {
  margin-right: 8px;
}

#add:hover {
  background-color: #2980b9;
}

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

.container-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  font-size: 18px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}


/* Add component-specific styles here */</style>
    