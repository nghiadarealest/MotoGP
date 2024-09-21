fetch("https://motogp.onrender.com/api/riders/getByCategory?category=MotoGP")
    .then(response => response.json())
    .then(data => {
        console.log(data)

        var body =  document.querySelector('.rider-list__container');

        data.forEach((e, index) => {
            var name = e.name.split(' ')


            body.innerHTML += `<a class="rider-list__rider ">
                    <div class="rider-list__background">
                        <div class="rider-list__background-team-colour" style="background-color: ${e.teamId.color}"></div>
                        <div class="rider-list__background-name">${e.hashtag}</div>
                        <div class="rider-list__background-gradient"></div>
                    </div>
                    <div class="rider-list__image-container">
                        <div class="rider-list__image ">
                            <img src="${e.image}" alt="ia" loading="lazy" class="img undefined picture__img object-fit-cover-picture__img">
                        </div>
                    </div>
                    <div class="rider-list__info-container">
                        <span class="rider-list__info-hashtag">${e.hashtag}</span>
                        <div class="rider-list__info-name">
                            <span>${name[0]}</span>
                            <span>${name[1]}</span>
                        </div>
                        
                        <div class="rider-list__details-container">
                            <span class="rider-list__details-country">
                                    <div class="rider-list__flag-container">
                                        <img class="rider-list__details-flag" src="${e.countryId.image}" alt="IT flag" loading="lazy"  />
                                    </div>
                                Italy
                            </span>
                                <span class="rider-list__details-team">${e.teamId.name}</span>
                            <span class="rider-list__details-years-active js-years-active"></span>
                        </div>
                    </div>
                </a>`
        })
    })
    .catch(e => console.log(e))