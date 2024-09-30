

var fetchOptionEvent = () => {
    fetch(`https://motogp.onrender.com/api/calendars/getAll?year=2024`)
    .then(response => response.json())
    .then(data => {
        var body =  document.querySelector('.primary-filter__filter-select--event');

        data.forEach(e => {
            body.innerHTML += `<option value=${e._id}>${e.title}</option>`
        })
    })
    .catch(e => console.log(e))
}

fetchOptionEvent()



var fetchResult = (calendarId, category, session) => {

    if(!calendarId) calendarId = "66f170e0dc1fa1dd4a86f419";
    if(!category) category = 'MotoGP';
    if(!session) session = 'RAC';

    var loadingElement = document.querySelector('.loading-indicator'); 
    loadingElement.innerHTML = `<img src="https://www.motogp.com/resources/v7.7.1/i/svg-files/elements/motogp-logo.svg" class="icon loading-indicator__icon"/>
                    <span class="loading-indicator__text">
                    LOADING
                </span>`;

    fetch(`https://motogp.onrender.com/api/calendarRider/getByCalendarCategorySession?calendarId=${calendarId}&category=${category}&session=${session}&year=2024`)
    .then(response => response.json())
    .then(data => {
        loadingElement.innerHTML = ''
        console.log(data )

        var body =  document.querySelector('.results-table__tbody');
        var errorContainer =  document.querySelector('.error-container')

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
        var max

        data[0].riders.forEach((e, index) => {
            var name = e.riderId.name.split(' ')
            var valTimeGap 
            var point

            if(index == 0) {
                max = e.timeFinish
                valTimeGap = e.timeFinish
            } else {
                valTimeGap = `+${(parseFloat(e.timeFinish.replace(':', '')) - parseFloat(max.replace(':', ''))).toFixed(3)}`;
            }

            if( data[0].session == "RAC" || data[0].session == "SPR") {
                if(e.point == 0 ) {
                    point = ''
                }else {
                    point = e.point
                }
            } else {
                point = ''
            }

            body.innerHTML += `
            <tr class="results-table__body-row">
                <td class="results-table__body-cell results-table__body-cell--pos " style="border-left: 4px solid ${e.riderId.teamId.color};">${index +1}</td>
                <td class="results-table__body-cell results-table__body-cell--points ">${point}</td>
                <td class="results-table__body-cell results-table__body-cell--rider">
                    <div class="results-table__rider-details">
                        <div class="rider-image-container">
                            <div class="rider-image">
                                <img src="${e.riderId.image}" alt="ez" loading="lazy" class="img undefined picture__img ">
                            </div>
                        </div>
                        <div class="results-table__rider-name-wrapper ">
                            <div class="results-table__rider-name">
                                <span class="results-table__body-cell results-table__body-cell--number">${e.riderId.number}</span>
                                <span class="results-table__body-cell results-table__body-cell--full-name">
                                    <a class="results-table__rider-link">
                                        <span class="results-table__first-name">${(name[0].split(''))[0]}. </span> 
                                        ${name[1]}
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="results-table__body-cell results-table__body-cell--team ">
                    <div>
                    <img src="${e.riderId.countryId.image}" alt="ES flag" class="results-table__body-cell-flag">
                    <span>${e.riderId.teamId.name} </span>
                </div>
                </td>
                <td class="results-table__body-cell results-table__body-cell--time"><span>${valTimeGap}</span></td>
            </tr>`
        })
    })
    .catch(e => console.log(e))
}

fetchResult()



export {fetchResult}

