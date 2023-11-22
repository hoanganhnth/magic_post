<template>
    <div>
        <footer class="footer">
        <div class="footer-content">
            <div class="footer-section about">
                <h2>Về chúng tôi</h2>
                <p>Mô tả về dịch vụ giao hàng của bạn.</p>
            </div>
            <div class="footer-section contact">
                <h2>Liên hệ</h2>
                <p>Email: your@email.com</p>
                <p>Điện thoại: 123-456-7890</p>
            </div>
            <div class="footer-section links">
                <h2>Liên kết hữu ích</h2>
                <ul>
                    <li><a href="#">Trang chủ</a></li>
                    <li><a href="#">Dịch vụ</a></li>
                    <li><a href="#">Liên hệ</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2023 Your Delivery Service. All rights reserved.</p>
        </div>
    </footer>
      <!-- Display a form for the user to enter checkout information -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'PageFooter',
    // Add component logic here if needed
  }
  </script>
  
  <style scoped>
  .footer {
    background-color: #333;
    color: #fff;
    padding: 50px 0;
}

.footer-content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.footer-section {
    flex: 1;
    padding: 20px;
}

.footer-section h2 {
    color: #3498db;
}

.footer-section p {
    color: #ccc;
}

.footer-section ul {
    list-style: none;
    padding: 0;
}

.footer-section a {
    color: #fff;
    text-decoration: none;
}

.footer-bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid #666;
}

@media (max-width: 600px) {
    .footer-content {
        flex-direction: column;
    }
}
  /* Add component-specific styles here */
  </style>
  