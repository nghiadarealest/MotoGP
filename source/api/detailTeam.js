import {fetchTeamById} from './admin/team/team.js'

const id = localStorage.getItem("teamId");

const fetchDetailTeam = async(id) => {
    let body =  document.querySelector('.team__container');
    if(!id) {
        body.innerHTML = `<div class="error-container">
        <img src="https://www.motogp.com/resources/v7.7.1/i/svg-files/elements/motogp-logo.svg" class="icon error-container__icon"/>
                    <span class="error-container__text">
                    404 NOT FOUND
                </span></div>`;
        return
    }
    const data = await fetchTeamById(id);
    console.log(data)

    if(data) {
        body.innerHTML = `
         <div class="team__background">
            <div class="team__background-team-colour js-background" style="background-color:${data.color}"></div>
            <div class="team__background-info">
                <div class="team__background-name js-background-name">${data.name}</div>
            </div>
            <div class="team__background-gradient"></div>
            <div class="team__background-image js-background-image">
                <div class="rider-image-container">
                    <div class="rider-image">
                        <div class="js-lazy-load u-observed lazy-image-wrapper " >
                           <img src="${data.image}">
                        </div>
                        <div class="team__background-image-gradient"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="team__info-container">
            <span class="team__info-name js-name">${data.name}</span>
        </div>
        `
    }



}

fetchDetailTeam(id)