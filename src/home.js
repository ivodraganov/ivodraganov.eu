import { html, render } from 'https://unpkg.com/lit-html?module';

export const Home = () => html`
    <div class="center-content">
        <div class="content-wrapper">
            <div class="profile-pic"></div>
            <div class="text-content">
                <h1>Ivo Draganov</h1>
                <p class="description">Proffesional Truck Driver</p>
                <div class="social-icons">
                    <a href="/contact" title="Email">
                    <img src="./images/email.png" class="social-icon">
                    </a><a href="https://www.instagram.com/ivo.draganov/" title="Instagram">
                    <img src="./images/instagram.png" class="social-icon">
                    </a><a href="https://www.buymeacoffee.com/draganov.ivo" title="Buy me a coffee">
                    <img src="./images/bff.svg" class="social-icon">
                    </a>
                </div>
            </div>
        </div>
    </div>
`;
