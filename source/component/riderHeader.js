var header =  document.querySelector('.sub-header');
header.innerHTML = `
<div class="rider-header">
            <div class="rider-header__header">
                <div class="page-header">
                    <div class="page-header__container page-header__container--left">
                            <h1 class="page-header__title">
                                Riders & Teams
                            </h1>
                    </div>
                </div>
            </div>
        </div>

        <div class="tabs-header" >
            <nav class="tabs widget-outer-spacing">
                <ul class="tabs__list">
                    <li class="tabs__item  ">
                        <a href="/source/pages/rider.html" class="tabs__link is-active" >
                            <span class="tabs__link-text">
                                Riders
                            </span>
                        </a>
                    </li>

                    <li class="tabs__item  ">
                        <a href="/source/pages/teams.html" class="tabs__link is-active" >
                            <span class="tabs__link-text">
                                Teams
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
`