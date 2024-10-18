import {fetchCalendarById} from './admin/calendar/calendar.js'

const id = localStorage.getItem("calendarId");

const fetchDetailCalendar = async(id) => {
    let body =  document.querySelector('.default-template');
    if(!id) {
        body.innerHTML = `
        <div class="error-container">
        <img src="https://www.motogp.com/resources/v7.7.1/i/svg-files/elements/motogp-logo.svg" class="icon error-container__icon"/>
                    <span class="error-container__text">
                    404 NOT FOUND
                </span></div>`;
        return
    }
    const data = await fetchCalendarById(id);
    console.log(data)

    if(data) {
        body.innerHTML = `
        <header class="event-hero">
            <div class="event-hero__wrapper">
                <div class="event-hero__background">
                    <div class="js-lazy-load u-observed lazy-image-wrapper ">
                        <img src="${data.image}" alt="2024" loading="lazy" class="img undefined picture__img object-fit-cover-picture__img">
                    </div>
                </div>
                <div class="event-hero__info-wrapper">
                    <h1 class="event-hero__info-title">${data.title}</h1>
                    <div class="event-hero__info-circuit">
                        <div class="event-hero__info-circuit-flag">
                            <img src="${data.countryId.image}" alt="flag">
                        </div>
                        <p class="event-hero__info-circuit-name">${data.location}</p>
                    </div>
                    <div class="event-hero__info-promo">
                        <p class="event-hero__info-promo-hashtag">#${data.location}</p>
                        <div class="event-hero__info-promo-sponsor">
                            <p class="event-hero__info-promo-sponsor-txt">title sponsor</p>
                            <div class="event-hero__info-promo-sponsor-icon__wrapper" style="background-image: url(${data.sponsorImage});">
                            </div>
                        </div>
                    </div>
                </div>
                <a href="#" class="event-hero__live-link "><div class="event-hero__live-wrapper">
                    <div class="event-hero__live-icon"></div>
                    <p class="event-hero__live-txt">follow live now</p>
                </div>
            </a>
            <div class="event-hero__ctas-wrapper">
                <a href="#" target="_self" rel="" class="event-hero__ctas-btn">Results</a>
                <a href="#" target="_self" rel="" class="event-hero__ctas-btn">replays</a>
                <a href="#" target="_self" rel="" class="event-hero__ctas-btn">standings</a>
            </div>
            </div>
        </header>
        `
    }



}

fetchDetailCalendar(id)