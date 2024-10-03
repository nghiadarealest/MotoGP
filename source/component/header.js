
let headerH = () => {
    let header =  document.querySelector('.header');

    header.innerHTML = `
    <div class="main-navigation">
        <div class="top_navigation">
            <p> 
                #RacingForTheFuture
                Tickets
                Hospitality
                Experiences
                Store
                Authentics
            </p>
        </div>
        <div class="main-navigation__container">
            <div class="main-navigation__wrapper">
                <div class="main-navigation__content">
                    <a href="/source/main.html" class="main-navigation__logo-75" aria-label="MotoGP Logo"></a>
                    <div class="main-navigation__menu-container">
                        <ul class="main-navigation__menu-list js-menu-list">
        <li class="main-navigation__item     ">
                <a class="main-navigation__link  "
                    href="/source/pages/calendal.html"
                >
                    Calendar
                </a>
        </li>
        <li class="main-navigation__item     ">
                
                <a class="main-navigation__link    "
                    href="/source/pages/result.html"
                >
                    Results & Standings
                </a>
        </li>
        <li class="main-navigation__item     ">
                
                <a class="main-navigation__link    "
                    href="/source/pages/rider.html"
                >
                    Riders & Teams
                </a>
        </li>
                        </ul>
                    </div>
                    <div class="sso sso--main-bar" >
            
        </div>
                </div>
            </div>
        </div>

        
    </div>`

    let username =  document.querySelector('.sso--main-bar');

    if(localStorage.getItem('username')) {
        username.innerHTML = `<span class="username">${localStorage.getItem('username')}</span> 
                                 <i class="ti-shift-right icon"></i>`
        let logout =  document.querySelector('.ti-shift-right');
        logout.addEventListener('click', () => {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            location.reload()
        })
        
    } else {
        username.innerHTML = `
        <a href="/source/pages/login.html" class="sso__login-button">
                    Login
                </a>
                <a href="/source/pages/login.html" class="sso__register-button">
                    <span class="sso__register-button-text sso__register-button-text--bold">
                        Register
                    </span>
                    <div class="sso__picture">
                        <i class="ti-drupal icon"></i>
                    </div>
                </a>`
    }

    let list =  document.querySelector('.main-navigation__menu-list');

    if(localStorage.getItem('username') == 'admin') {
        list.innerHTML += ` <li class="main-navigation__item     ">
                
                <a class="main-navigation__link    "
                    href="/source/pages/admin/admin.html"
                >
                    Admin Page
                </a>
        </li>`
    }

}

headerH()

