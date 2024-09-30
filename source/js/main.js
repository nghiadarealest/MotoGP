import {fetchRider} from '../api/rider.js';
import {fetchTeam} from '../api/team.js';
import {fetchResult} from '../api/result.js';

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

//http://localhost:3000
//https://motogp.onrender.com

const textNavs = $$('.main-navigation__link')
const tabItems = $$('.tabs__link')
const riderMenuItems = $$('.rider-grid__menu-item')
const teamMenuItems = $$('.teams-grid__menu-item')
const primaryFilters = $$('.primary-filter__filter-select')

// textNavs.forEach((textNav) => {
//     textNav.onclick = function () {  
//         $$('.main-navigation__link.active').classList.remove('active')   
//         this.classList.add('active')
//     }
// })

// tabItems.forEach(tabItem => {
//     // tabItem.onclick = function () { 
//     //     $('.tabs__link.active').classList.remove('active')   
//     //     this.classList.add('active')
//     // }
//     tabItem.addEventListener('click', function() {
//         // Remove the 'active' class from all tab links
//         if ($('.tabs__link.active')) {
//             $('.tabs__link.active').classList.remove('active');
//         }
//         // Add the 'active' class to the clicked tab link
//         this.classList.add('active');
//       });
// })


// rider
riderMenuItems.forEach(riderMenuItem => {
    riderMenuItem.addEventListener('click', function() {
        // Remove the 'active' class from all tab links
        if ($('.rider-grid__menu-item.active')) {
            $('.rider-grid__menu-item.active').classList.remove('active');
        }
        // Add the 'active' class to the clicked tab link
        this.classList.add('active');
        fetchRider(this.value)
      });
})

//team
teamMenuItems.forEach(teamMenuItem => {
    teamMenuItem.addEventListener('click', function() {
        // Remove the 'active' class from all tab links
        if ($('.teams-grid__menu-item.active')) {
            $('.teams-grid__menu-item.active').classList.remove('active');
        }
        // Add the 'active' class to the clicked tab link
        this.classList.add('active');
        fetchTeam(this.value)
      });
})

// result 
primaryFilters.forEach(primaryFilter => {
    primaryFilter.addEventListener('change', function(e) {
        var calendarId = $('.primary-filter__filter-select--event').value
        var category = $('.primary-filter__filter-select--cat').value
        var session = $('.primary-filter__filter-select--session').value

        if(primaryFilter.className.includes("primary-filter__filter-select--event")) {
            calendarId = e.target.value
        }else if (primaryFilter.className.includes("primary-filter__filter-select--cat")){
            category = e.target.value
        }else if (primaryFilter.className.includes("primary-filter__filter-select--session")){
            session = e.target.value
        }

        fetchResult(calendarId,category,session)
    })
})










