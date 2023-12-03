<template>
    <div>
        <div class="container-fluid bg-dark text-white mt-5 py-5 px-sm-3 px-md-5">
        <div class="row pt-5">
            <div class="col-lg-7 col-md-6">
                <div class="row">
                    <div class="col-md-6 mb-5">
                        <h3 class="text-primary mb-4">Liên hệ</h3>
                        <p><i class="fa fa-map-marker-alt mr-2"></i>144 Xuân Thủy-Cầu Giấy-Hà Nội</p>
                        <p><i class="fa fa-phone-alt mr-2"></i>+012 345 67890</p>
                        <p><i class="fa fa-envelope mr-2"></i>info@example.com</p>
                        <div class="d-flex justify-content-start mt-4">
                            <a class="btn btn-outline-light btn-social mr-2" href="#"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-outline-light btn-social mr-2" href="#"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-outline-light btn-social mr-2" href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a class="btn btn-outline-light btn-social" href="#"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <div class="col-md-6 mb-5">
                        <h3 class="text-primary mb-4">Quick Links</h3>
                        <div class="d-flex flex-column justify-content-start">
                            <a class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Trang chủ</a>
                            <a class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Về MagicPost</a>
                            <a class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Dịch vụ</a>
                            <a class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Tin tức</a>
                            <a class="text-white" href="#"><i class="fa fa-angle-right mr-2"></i>Liên hệ</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-5 col-md-6 mb-5">
                <h3 class="text-primary mb-4">Lời cảm ơn</h3>
                <p>Công ty của chúng tôi luôn nỗ lực để người dùng có những trải nghiệm tốt nhất khi sử dụng dịch vụ.</p>
                <div class="w-100">
                    <div class="input-group">
                        <input type="text" class="form-control border-light" style="padding: 30px;" placeholder="Your Email Address">
                        <div class="input-group-append">
                            <button class="btn btn-primary px-4">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-5" style="border-color: #3E3E4E !important;">
        <div class="row">
            <div class="col-lg-6 text-center text-md-left mb-3 mb-md-0">
                <p class="m-0 text-white">&copy; <a href="#">Your Site Name</a>. All Rights Reserved. 
				
				<!--/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/-->
				Designed by <a href="https://htmlcodex.com">HTML Codex</a>
                </p>
            </div>
            <div class="col-lg-6 text-center text-md-right">
                <ul class="nav d-inline-flex">
                    <li class="nav-item">
                        <a class="nav-link text-white py-0" href="#">Privacy</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white py-0" href="#">Terms</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white py-0" href="#">FAQs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white py-0" href="#">Help</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
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
  