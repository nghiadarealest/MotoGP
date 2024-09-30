var fetchTeam = (category) => {

    if(!category) category='MotoGP'
    var loadingElement = document.querySelector('.loading-indicator'); 
    loadingElement.innerHTML = `<img src="https://www.motogp.com/resources/v7.7.1/i/svg-files/elements/motogp-logo.svg" class="icon loading-indicator__icon"/>
                    <span class="loading-indicator__text">
                    LOADING
                </span>`;


    fetch(`https://motogp.onrender.com/api/teams/getByCategory?category=${category}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        loadingElement.innerHTML = ''


        var body = document.querySelector('.teams-list__container');
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

        data.forEach((e, index) => {

            body.innerHTML +=`<a class="teams-list__team">
                    <div class="teams-list__background">
                        <div class="teams-list__background-team-colour" style="background-color:${e.color};"></div>
                        <div class="teams-list__background-name">${e.name}</div>
                        <div class="teams-list__background-gradient"></div>
                    </div>
                    <div class="teams-list__image-container">
                        <div class="teams-list__image ">
                            <img src="${e.image}" alt="sport-data-image:team:background" loading="lazy" class="img undefined picture__img ">
                        </div>
                    </div>
                    <div class="teams-list__info-container">
                        <div class="teams-list__info-name">${e.name}</div>

                        <div class="teams-list__riders-container">
                            <div class="teams-list__riders-name">
                                Maverick Viñales
                            </div>
                            <div class="teams-list__riders-name">
                                Aleix Espargaro
                            </div>
                        </div>
                    </div>
                </a>`
        })
    })
    .catch(e => console.log(e))
}

fetchTeam()

export {fetchTeam}

