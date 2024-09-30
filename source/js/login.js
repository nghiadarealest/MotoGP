const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const loginForm = $('.container-form')

loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

   if(username == 'admin' && password == '123456') {
       localStorage.setItem("username", username);
       localStorage.setItem("password", password);
       window.location.href = "/source/main.html";
   }



    // Nếu thông tin hợp lệ, bạn có thể chuyển hướng đến trang khác
    // window.location.href = 'trang-chu.html';
});