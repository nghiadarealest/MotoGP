fetch("https://motogp.onrender.com/api/riders/getByCategory?category=MotoGP")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var body =  document.querySelector('.results-table__tbody');

        var colorColPos
        data.forEach((e,index) => {

            if(index ==0) {
                colorColPos = 'color:#fff'
            }else{
                colorColPos ='color:#000'
            }

            var name = e.name.split(' ')

            body.innerHTML +=`
            <tr class="results-table__body-row">
                <td class="results-table__body-cell results-table__body-cell--pos " style="border-left: 4px solid rgb(157, 180, 217);${colorColPos}">${index +1}</td>
                <td class="results-table__body-cell results-table__body-cell--rider">
                    <div class="results-table__rider-details">
                        <div class="rider-image-container">
                            <div class="rider-image">
                                <img src="${e.image}" alt="uez" loading="lazy" class="img undefined picture__img ">
                            </div>
                        </div>
                        <div class="results-table__rider-name-wrapper ">
                            <div class="results-table__rider-name">
                                <span class="results-table__body-cell results-table__body-cell--number">93</span>
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
                    <img src="${e.countryId.image}" alt="ES flag" class="results-table__body-cell-flag">
                    <span>${e.teamId.name} </span>
                </div>
                </td>
                <td class="results-table__body-cell results-table__body-cell--points ">${e.point}</td>
            </tr>`
        });

    })
    .catch(e => console.log(e))