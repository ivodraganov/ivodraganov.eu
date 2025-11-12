import { html } from 'https://unpkg.com/lit-html?module';

export const Contact = () => html`
  <div class="center-content">
    <div class="content-wrapper">
      <div class="text-content">
        <h1>Contact me</h1>

        <form id="contact-form" class="contact-form" novalidate>
          <input type="text" name="name" placeholder="Your name" required>
          <input type="email" name="email" placeholder="Your email address" required>
          <textarea name="message" placeholder="Your message..." required></textarea>
          <button id="submit-btn" type="submit">Submit</button>
        </form>

        <p id="status-message" class="status-message"></p>
        <button id="go-home" class="back-button">⬅ Back</button>
      </div>
    </div>
  </div>
`;


export function attachContactEvents() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('status-message');
    const btn = document.getElementById('submit-btn');
    const back = document.getElementById('go-home');
    if (!form) return;


    if (back) {
        back.addEventListener('click', () => {
            location.hash = '#/home';
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!form.reportValidity()) return;

        btn.disabled = true;
        const originalText = btn.textContent;
        btn.textContent = 'Sending…';
        status.textContent = '';
        status.removeAttribute('style');

        try {
            const data = new FormData(form);
            const res = await fetch('https://formspree.io/f/xldadedy', {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: data
            });

            if (res.ok) {
                status.textContent = '✅ Message sent successfully!';
                status.style.color = 'limegreen';


                form.querySelectorAll('input, textarea, button[type="submit"]').forEach(el => el.disabled = true);

            } else {
                const err = await res.json().catch(() => ({}));
                if (err.errors && err.errors.length) {
                    status.textContent = '❌ ' + err.errors.map(e => e.message).join(', ');
                } else {
                    status.textContent = '❌ Failed to send message.';
                }
                status.style.color = 'red';
            }
        } catch (error) {
            status.textContent = '❌ Network error. Please try again.';
            status.style.color = 'red';
            console.error(error);
        } finally {
            if (status.style.color !== 'limegreen') {
                btn.disabled = false;
                btn.textContent = originalText;
            } else {
                btn.textContent = 'Submitted';
            }
        }
    });
}
