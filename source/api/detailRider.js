import {fetchRiderById} from './admin/rider/rider.js'

const id = localStorage.getItem("riderId");

const fetchDetailRider = async(id) => {
    let body =  document.querySelector('.rider-hero__container');
    if(!id) {
        body.innerHTML = `<div class="error-container">
        <img src="https://www.motogp.com/resources/v7.7.1/i/svg-files/elements/motogp-logo.svg" class="icon error-container__icon"/>
                    <span class="error-container__text">
                    404 NOT FOUND
                </span></div>`;
        return
    }
    const data = await fetchRiderById(id);
    console.log(data)

    if(data) {
        body.innerHTML = `
         <div class="rider-hero__background">
            <div class="rider-hero__background-team-colour js-background" style="background-color:${data.teamId.color}"></div>
            <div class="rider-hero__background-info">
                <div class="rider-hero__background-initials js-background-initials">${data.hashtag}</div>
                <div class="rider-hero__background-name js-background-name">${data.name}</div>
            </div>
            <div class="rider-hero__background-gradient"></div>
            <div class="rider-hero__background-image js-background-image">
                <div class="rider-image-container">
                    <div class="rider-image">
                        <div class="js-lazy-load u-observed lazy-image-wrapper " >
                           <img src="${data.image}">
                        </div>
                        <div class="rider-hero__background-image-gradient"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="rider-hero__info-container">
            <span class="rider-hero__info-hashtag js-hashtag">${data.hashtag}</span>
            <span class="rider-hero__info-name js-name">${data.name}</span>
            <div class="rider-hero__details-container">
                <span class="rider-hero__details-country">
                        <div class="rider-hero__flag-container">
                            <img class="rider-hero__details-flag" src="${data.countryId.image}" alt="it flag" loading="lazy">
                        </div>
                        ${data.countryId.name}
                </span>
                <span class="rider-hero__details-team js-team">${data.teamId.name}</span>
            </div>
        </div>
        `
    }



}

fetchDetailRider(id)