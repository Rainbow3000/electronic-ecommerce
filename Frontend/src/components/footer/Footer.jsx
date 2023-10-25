import React from 'react'
import './footer.scss'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
const Footer = () => {
  return (
   <>
      <footer class="footer">
  	 <div class="container">
  	 	<div class="row">
  	 		<div class="footer-col">
  	 			<h4>Công ty</h4>
  	 			<ul>
  	 				<li><a href="#">Về chúng tôi</a></li>
  	 				<li><a href="#">Dịch vụ của chúng tôi</a></li>
  	 				<li><a href="#">Chính sách bảo mật</a></li>
  	 				<li><a href="#">Chương trình thông minh</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>get help</h4>
  	 			<ul>
  	 				<li><a href="#">FAQ</a></li>
  	 				<li><a href="#">Giao hàng</a></li>
  	 				<li><a href="#">Trả hàng</a></li>
  	 				<li><a href="#">Trạng thái đơn hàng</a></li>
  	 				<li><a href="#">Tùy chọn thanh toán</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>online shop</h4>
  	 			<ul>
  	 				<li><a href="#">Đồng hồ</a></li>
  	 				<li><a href="#">Túi sách</a></li>
  	 				<li><a href="#">Giày</a></li>
  	 				<li><a href="#">Thời trang</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>Theo dõi chúng tôi</h4>
  	 			<div class="social-links" style={{display:'flex',justifyContent:'flex-start'}}>
  	 				<a href="#" style={{display:'flex',justifyContent:'center',alignItems:'center'}}><FacebookIcon/></a>
  	 				<a href="#" style={{display:'flex',justifyContent:'center',alignItems:'center'}}><TwitterIcon/></a>
  	 				<a href="#" style={{display:'flex',justifyContent:'center',alignItems:'center'}}><InstagramIcon/></a>
  	 				<a href="#" style={{display:'flex',justifyContent:'center',alignItems:'center'}}><GoogleIcon/></a>
  	 				
  	 			</div>
  	 		</div>
  	 	</div>
  	 </div>
  </footer>
   </>
  )
}

export default Footer