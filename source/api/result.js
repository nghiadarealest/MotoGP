fetch("https://motogp.onrender.com/api/calendarRider/getByCalendarCategorySession?calendarId=66da7ec4637fb57ad8b12ae9&category=MotoGP&session=RAC&year=2024")
    .then(response => response.json())
    .then(data => {
        console.log(data)

        var body =  document.querySelector('.results-table__tbody');
        var max

        data[0].riders.forEach((e, index) => {
            var name = e.riderId.name.split(' ')
            var valTimeGap 

            if(index == 0) {
                max = e.timeFinish
                valTimeGap = e.timeFinish
            } else {
                valTimeGap = `+${(parseFloat(e.timeFinish.replace(':', '')) - parseFloat(max.replace(':', ''))).toFixed(3)}`;
            }

            body.innerHTML += `
            <tr class="results-table__body-row">
                <td class="results-table__body-cell results-table__body-cell--pos " style="border-left: 4px solid ${e.riderId.teamId.color};">${index +1}</td>
                <td class="results-table__body-cell results-table__body-cell--points ">${e.point}</td>
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