var header =  document.querySelector('.sub-header');
header.innerHTML = `
        <div class="tabs-header" >
            <nav class="tabs widget-outer-spacing">
                <ul class="tabs__list">
                    <li class="tabs__item  ">
                        <a href="/source/pages/result.html" class="tabs__link is-active" >
                            <span class="tabs__link-text">
                                Results
                            </span>
                        </a>
                    </li>

                    <li class="tabs__item  ">
                        <a href="/source/pages/standings.html" class="tabs__link is-active" >
                            <span class="tabs__link-text">
                                Standings
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
`