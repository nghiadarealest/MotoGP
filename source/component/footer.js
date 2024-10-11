
let footerF = () => {
    let footer =  document.querySelector('.footer');

    footer.innerHTML = `
    <div class="sponsors">
        <a href="https://www.qatarairways.com" class="sponsor-logo qatar-airways">Qatar Airways</a>
        <a href="https://www.tissotwatches.com" class="sponsor-logo tissot">Tissot</a>
        <a href="https://www.michelin.com" class="sponsor-logo michelin">Michelin</a>
        <a href="https://www.bmw.com" class="sponsor-logo bmw">BMW</a>
        <a href="https://www.estrellagalicia.es" class="sponsor-logo estrella-galicia">Estrella Galicia</a>
        <a href="https://www.dhl.com" class="sponsor-logo dhl">DHL</a>
    </div>
    <div class="container">
        <div class="footer-sections">
            <!-- Media & Commercial -->
            <div class="footer-column">
                <h4>Media & Commercial</h4>
                <a href="#">Official Sponsors</a>
                <a href="#">TV Broadcast</a>
                <a href="#">MotoGP™ Apps</a>
            </div>

            <!-- Help -->
            <div class="footer-column">
                <h4>Help</h4>
                <a href="#">Contact us</a>
                <a href="#">FAQ</a>
                <a href="#">Join MotoGP™</a>
            </div>

            <!-- Tickets & Hospitality -->
            <div class="footer-column">
                <h4>Tickets & Hospitality</h4>
                <a href="#">Tickets</a>
                <a href="#">Hospitality</a>
                <a href="#">Experiences</a>
            </div>

            <!-- Game Hub -->
            <div class="footer-column">
                <h4>Game Hub</h4>
                <a href="#">MotoGP™ Fantasy</a>
                <a href="#">MotoGP™ Predictor</a>
                <a href="#">MotoGP™ eSport</a>
                <a href="#">MotoGP™ Guru</a>
                <a href="#">MotoGP™'24</a>
            </div>

            <!-- About Us -->
            <div class="footer-column">
                <h4>About Us</h4>
                <a href="#">Dorna Sports</a>
                <a href="#">Cookie Policy</a>
                <a href="#">Legal Notice</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Purchase Policy</a>
            </div>
        </div>

        <!-- App Download Section -->
        <div class="app-download">
            <p>Download the Official MotoGP™ App</p>
            <a href="#"><img src="https://resources.motogp.pulselive.com/photo-resources/2023/04/04/034ae330-1e43-4826-837e-9ee825aae98f/app-store.svg?width=118" alt="App Store"></a>
            <a href="#"><img src="https://resources.motogp.pulselive.com/photo-resources/2023/04/04/5dda2176-adfd-43e3-99a4-d0f79afada4e/play-store.svg?width=118" alt="Google Play"></a>
        </div>

        <!-- Social Icons -->
        <div class="social-icons">
            <a href="#"><i class="fa fa-facebook"></i></a>
            <a href="#"><i class="fa fa-instagram"></i></a>
            <a href="#"><i class="fa fa-twitter"></i></a>
            <a href="#"><i class="fa fa-youtube"></i></a>
            <a href="#"><i class="fa fa-linkedin"></i></a>
        </div>

        <!-- Copyright -->
        <div class="copyright">
            <p>© 2024 Dorna Sports SL. All rights reserved. All trademarks are the property of their respective owners.</p>
        </div>
    </div>`

}

footerF()

