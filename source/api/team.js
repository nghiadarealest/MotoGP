fetch("https://motogp.onrender.com/api/teams/getByCategory?category=MotoGP")
    .then(response => response.json())
    .then(data => {
        console.log(data)

        var body =  document.querySelector('.teams-list__container');

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