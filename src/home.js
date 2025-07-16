import { html, render } from 'https://unpkg.com/lit-html?module';




export const Home = () => html`
    <div class="center-content">
        <div class="content-wrapper">
            <div class="profile-pic"></div>
            <div class="text-content">
                <h1>Ivo Draganov</h1>
                <p class="description">Computer Science Teacher
                    <br>Software Engineer with JavaScript
                </p>
                <div class="social-icons">
                    <a href="https://www.facebook.com/idraganov91" target="_blank"><i class="fab fa-facebook">
                        <img src="./images/facebook.png" class="social-icon" alt="Facebook">    
                    </a>
                    <a href="https://www.instagram.com/ivo.draganov/" target="_blank">
                        <img src="./images/instagram.png" class="social-icon" alt="Instagram">
                    </a>
                    <a href="https://github.com/ivodraganov" target="_blank">
                        <img src="./images/github.png" class="social-icon" alt="GitHub">
                    </a>
                    <a href="mailto:draganov.ivo@proton.me" target="_blank">
                        <img src="./images/email.png" class="social-icon" alt="draganov.ivo@proton.me">
                    </a>
                </div>
            </div>
        </div>
    </div>
`;
