fetch("https://motogp.onrender.com/api/calendars/getAll?year=2024")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var month;
        var body =  document.querySelector('.calendar-listings__month');

        data.forEach((e, index) => {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const monthNamesShort= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            var startDate = new Date(e.startDate);
            var endDate = new Date(e.endDate);

            console.log(startDate.getDate())

            if(month != monthNames[startDate.getMonth()]) {
                body.innerHTML += `<div class="calendar-listings__month-title">
                     ${monthNames[startDate.getMonth()]}
                </div>`
            }

            month = monthNames[startDate.getMonth()]

            body.innerHTML += `<ul class="calendar-listings__month-listings">
            <li 
                class="calendar-listing__event-container js-event calendar-listing__event-container--finished "
            >
                <a class="calendar-listing__event" >
                    <div class="calendar-listing__status-container">
                        <div class="calendar-listing__status-type">
                                GP${index+1}
                        </div>
                        <div class="calendar-listing__status-bar">
                            <div class="calendar-listing__status-icon"></div>
                            <div class="calendar-listing__status-text">
                                finished
                            </div>
                        </div>
                    </div>

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
        });
       
    })
    .catch(e => console.log(e))