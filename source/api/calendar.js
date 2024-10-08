
let fetchCalendar = (year) => {
    if(!year) year = 2024


    let loadingElement = document.querySelector('.loading-indicator'); 
    loadingElement.innerHTML = `<img src="https://www.motogp.com/resources/v7.7.1/i/svg-files/elements/motogp-logo.svg" class="icon loading-indicator__icon"/>
                    <span class="loading-indicator__text">
                    LOADING
                </span>`;

    fetch(`https://motogp.onrender.com/api/calendars/getAll?year=${year}`)
        .then(response => response.json())
        .then(data => {
            loadingElement.innerHTML = ''
            console.log(data)
            let month;
            let body =  document.querySelector('.calendar-listings__month');
            let errorContainer =  document.querySelector('.error-container')

            if(data.length == 0) {
                errorContainer.innerHTML=`
                <img src="https://www.motogp.com/resources/v7.7.1/i/svg-files/elements/motogp-logo.svg" class="icon error-container__icon"/>
                    <span class="error-container__text">
                    404 NOT FOUND
                </span>
                `
                body.innerHTML = ``
                return
            } else {
                errorContainer.innerHTML = ''
            }
            body.innerHTML = ''
    
            data.forEach((e, index) => {
                const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                const monthNamesShort= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                let startDate = new Date(e.startDate);
                let endDate = new Date(e.endDate);
                let now = new Date(Date.now())
                let status = 'finish';
                let html;
    
                if(month != monthNames[startDate.getMonth()]) {
                    html += `<div class="calendar-listings__month-title">
                         ${monthNames[startDate.getMonth()]}
                    </div>`
                }
    
                month = monthNames[startDate.getMonth()]

                html += `<ul class="calendar-listings__month-listings" id=${e._id} style="cursor: pointer">
                <li 
                    class="calendar-listing__event-container js-event"
                >
                    <a class="calendar-listing__event" >
                        <div class="calendar-listing__status-container">
                            <div class="calendar-listing__status-type">
                                    GP${index+1}
                            </div>`

                if(now.getMonth() > startDate.getMonth()) {
                    // finish
                    status = "finish"
                    html += `
                            <div class="calendar-listing__status-bar">
                                <div class="calendar-listing__status-icon"></div>
                                <div class="calendar-listing__status-text">
                                    finished
                                </div>
                            </div>
                        </div>`
                } else if(now.getMonth() == startDate.getMonth()) {
                    if(now.getDate() > endDate.getDate()) {
                        // finnish 
                        status = "finish"
                        html += `
                            <div class="calendar-listing__status-bar">
                                <div class="calendar-listing__status-icon"></div>
                                <div class="calendar-listing__status-text">
                                    finished
                                </div>
                            </div>
                        </div>`
                    } else if(now.getDate() > startDate.getDate() && now.getDate() < endDate.getDate()) {
                        // live 
                        status = "live"
                        html += `
                            <div class="calendar-listing__status-bar" style="background-color:#ff4343;">
                                <div class="calendar-listing__status-icon" ></div>
                                <div class="calendar-listing__status-text">
                                    live
                                </div>
                            </div>
                        </div>`
                    } else if (now.getDate() < startDate.getDate()){
                        // upcoming
                        status = "upcoming"
                        html += `
                        <div class="calendar-listing__status-bar" style="background-color: #f9f9f9;
                            color: #6d7279;
                            border: .05rem solid hsla(215, 5%, 45%, .15);">
                            <div class="calendar-listing__status-icon" style="background-image: url(${"https://www.motogp.com/resources/v7.8.0/i/svg-files/elements/event-upcoming.svg"});"></div>
                            <div class="calendar-listing__status-text">
                                upcoming
                            </div>
                        </div>
                     </div>`
                    }
                } else if(now.getMonth() < startDate.getMonth()) {
                    // upcoming
                    status = "upcoming"
                    html += `
                        <div class="calendar-listing__status-bar" style="background-color: #f9f9f9;
                            color: #6d7279;
                            border: .05rem solid hsla(215, 5%, 45%, .15);">
                            <div class="calendar-listing__status-icon" style="background-image: url(${"https://www.motogp.com/resources/v7.8.0/i/svg-files/elements/event-upcoming.svg"});"></div>
                            <div class="calendar-listing__status-text">
                                upcoming
                            </div>
                        </div>
                     </div>`
                } 

                html += `
                        <div class="calendar-listing__information">
    
                            <div class="calendar-listing__details">
                                <div class="calendar-listing__date-container">
                                    <div class="calendar-listing__date-start-container">
                                        <div class="calendar-listing__date-start-day">
                                            ${startDate.getDate()}
                                        </div>
                                        <div class="calendar-listing__date-start-month">
                                            ${monthNamesShort[startDate.getMonth()]}
                                        </div>
                                    </div>
                                    <div class="calendar-listing__date-end-container">
                                        <div class="calendar-listing__date-end-day">
                                            ${endDate.getDate()}
                                        </div>
                                        <div class="calendar-listing__date-end-month">
                                            ${monthNamesShort[endDate.getMonth()]}
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="calendar-listing__title">
                                    ${e.title}
                                    <div class="calendar-listing__location-container calendar-listing__location-container--desktop">    
                                            <div class="calendar-listing__location-flag">
                                                <img class="calendar-listing_flag" src="${e.countryId.image}" alt="flag" loading="lazy"  />
                                            </div>
    
                                            <div class="calendar-listing__location-track-name">
                                                ${e.location}
                                            </div>
                                    </div>
                                </div>
                            </div>
    
                            <div class="calendar-listing__track-container">
                                <div class="calendar-listing__track-image">
                                    <img src="${e.image}" alt="Calendar_Background" loading="lazy" class="img undefined picture__img object-fit-cover-picture__img">
                                </div>
        
                                <div class="calendar-listing__track-layout ">
                                    <img class="calendar-listing__layout" src="${e.layout}" alt="Autódromo Internacional do Algarve track" loading="lazy">  
                                </div>
        
                                <div class="calendar-listing__track-sponsor">
                                    <span class="calendar-listing__track-sponsor-text">Title sponsor</span>
                                    <img src="${e.sponsorImage}" alt="sponsor-small" loading="lazy" class="img undefined picture__img ">
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
                 </ul>`
                
                 body.innerHTML += html;

                
            });

            let calendars =  document.querySelectorAll('.calendar-listings__month-listings');
            console.log(calendars)
            calendars.forEach((ca) => {
                ca.addEventListener('click', () => {
                    localStorage.setItem("calendarId", ca.id);
                    window.location.href = "/source//pages/detailCalendar.html";
                 })
            }) 
                 
           
        })
        .catch(e => console.log(e))
}

fetchCalendar(2024)
