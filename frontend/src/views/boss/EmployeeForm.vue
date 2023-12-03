<template>
    <nap-bar-boss></nap-bar-boss>
    <div>
      <h1>{{ formTitle }}</h1>
      <form @submit.prevent="submitForm">
        <label>ID:</label>
        <input v-model="user.id" :disabled="isEditMode" />
  
        <label>Name:</label>
        <input v-model="user.name" />
  
        <label>Email:</label>
        <input v-model="user.email" />
  
        <!-- Thêm các trường khác tùy thuộc vào cấu trúc User của bạn -->
  
        <button type="submit">Save</button>
      </form>
    </div>
  </template>
  
  <script>
import NapBarBoss from '@/components/NapBarBoss.vue';
  export default {
  components: { NapBarBoss },
    name:'EmployeeForm',
    data() {
      return {
        user: {
          id: '',
          name: '',
          email: '',
          // Thêm các trường khác tùy thuộc vào cấu trúc User của bạn
        },
      };
    },
    computed: {
      isEditMode() {
        return this.$route.params.id !== undefined;
      },
      formTitle() {
        return this.isEditMode ? 'Edit User' : 'Add User';
      },
    },
    methods: {
      submitForm() {
        // Gọi API hoặc backend để lưu người dùng
        // Sau đó chuyển hướng về trang danh sách người dùng
        this.$router.push('/users');
      },
    },
    created() {
      // Nếu ở chế độ sửa, bạn có thể gọi API hoặc backend để lấy thông tin người dùng
      // Dựa trên id được truyền qua từ route params
      if (this.isEditMode) {
        const userId = this.$route.params.id;
        // Gọi API hoặc backend để lấy thông tin người dùng và gán vào this.user
      }
    },
  };
  </script>
<style scoped>
/* UserForm.vue */

h1 {
  color: #333;
}

form {
  max-width: 400px;
  margin: 20px auto;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
}
</style>
