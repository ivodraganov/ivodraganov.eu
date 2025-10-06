import { html, render } from "https://cdn.jsdelivr.net/npm/lit-html@3.1.2/lit-html.js";

const IMAGES = [
    {
        src: "./photos/Butterfly.jpg",
        title: "Butterfly",
        date: "28-Apr-2019"
    },
    {
        src: "./photos/dup.jpg",
        title: "Dog",
        date: "26-Apr-2019"
    },
    {
        src: "./photos/G0026728.JPG",
        title: "Road",
        date: "26-Oct-2025"
    },
    {
        src: "./photos/hostess_cashier_room.JPG",
        title: "Hostess cashier room",
        date: "06-Oct-2025"
    },
    {
        src: "./photos/IMG_8350_1.jpg",
        title: "Bamboo",
        date: "29-Aug-2020"
    },
    {
        src: "./photos/IMG_9224.jpg",
        title: "Flower",
        date: "04-Aug-2024"
    },
    {
        src: "./photos/krushuna.jpg",
        title: "Waterfall",
        date: "05-May-2019"
    },
    {
        src: "./photos/lale.jpg",
        title: "Tulip",
        date: "26-Apr-2019"
    },
    {
        src: "./photos/Pink_magnolia.jpg",
        title: "Pink Magnolia",
        date: "25-May-2019"
    },

    {
        src: "./photos/pretty_flowers.jpg",
        title: "Pretty flowers",
        date: "27-June-2025"
    },
    {
        src: "./photos/purple_tullip.jpg",
        title: "Purple Tullip",
        date: "26-Apr-2019"
    },
    {
        src: "./photos/flower_in_sunglasses.jpg",
        title: "Flower in sunglasses",
        date: "29-Aug-2020"
    }
];

const homeTemplate = () => html`
  <section class="gallery">
    <div class="container" id="gallery"></div>

    <div class="lightbox" id="lightbox" aria-hidden="true" role="dialog">
      <div class="bg-blur" id="bgBlur"></div>
      <div class="canvas">
        <img id="lightImage" class="photo" src="" alt="" />
      </div>
      <button class="close" id="closeBtn">✕</button>
      <div class="controls">
        <button class="btn" id="prevBtn">Prev</button>
        <button class="btn" id="nextBtn">Next</button>
      </div>
    </div>
  </section>
`;

function setupGallery() {
    const app = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const bgBlur = document.getElementById('bgBlur');
    const lightImage = document.getElementById('lightImage');
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let photoMeta = document.getElementById('photoMeta');
    if (!photoMeta) {
        photoMeta = document.createElement('div');
        photoMeta.id = 'photoMeta';
        photoMeta.className = 'photo-meta';
        document.querySelector('.canvas').appendChild(photoMeta);
    }

    let current = 0;

    function buildGallery(images) {
        app.innerHTML = '';
        let idx = 0;
        while (idx < images.length) {
            const row = document.createElement('div');
            row.className = 'row';
            const count = 4;
            for (let i = 0; i < count && idx < images.length; i++, idx++) {
                const card = document.createElement('div');
                card.className = 'thumb';
                card.dataset.index = idx;

                const img = document.createElement('img');
                img.src = images[idx].src;
                img.alt = images[idx].title || `photo-${idx + 1}`;

                const caption = document.createElement('div');
                caption.className = 'caption';
                caption.textContent = `${idx + 1} / ${images.length}`;

                card.appendChild(img);
                card.appendChild(caption);
                row.appendChild(card);

                card.addEventListener('click', () => openLightbox(Number(card.dataset.index)));

                img.addEventListener('contextmenu', e => e.preventDefault());
            }
            app.appendChild(row);
        }
    }

    function openLightbox(index) {
        current = index;
        showLightbox();
        updateLightboxImages();
        document.body.style.overflow = 'hidden';
        lightbox.setAttribute('aria-hidden', 'false');
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        bgBlur.classList.remove('show');
        lightImage.classList.remove('show');
        document.body.style.overflow = '';
        lightbox.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            bgBlur.style.backgroundImage = '';
            lightImage.src = '';
            photoMeta.innerHTML = '';
        }, 450);
    }

    function showLightbox() {
        lightbox.classList.add('open');
        requestAnimationFrame(() => {
            bgBlur.classList.add('show');
            lightImage.classList.add('show');
        });
    }

    function updateLightboxImages() {
        if (IMAGES.length === 0) return;
        const imgObj = IMAGES[current];
        const next = IMAGES[(current + 1) % IMAGES.length];
        bgBlur.style.backgroundImage = `url('${next.src}')`;
        lightImage.classList.remove('show');
        setTimeout(() => {
            lightImage.src = imgObj.src;
            lightImage.alt = imgObj.title || `photo-${current + 1}`;
            photoMeta.innerHTML = `
        <h3>${imgObj.title || ''}</h3>
        <p>${imgObj.description || ''}</p>
        <small>${imgObj.date || ''}</small>
      `;
            lightImage.onload = () => {
                void lightImage.offsetWidth;
                lightImage.classList.add('show');
            };
        }, 80);
    }

    function goNext() { current = (current + 1) % IMAGES.length; updateLightboxImages(); }
    function goPrev() { current = (current - 1 + IMAGES.length) % IMAGES.length; updateLightboxImages(); }

    window.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('open')) {
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowRight') goNext();
            else if (e.key === 'ArrowLeft') goPrev();
        }
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', goNext);
    prevBtn.addEventListener('click', goPrev);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === bgBlur) closeLightbox();
    });

    document.addEventListener('contextmenu', e => {
        if (e.target.tagName === 'IMG') e.preventDefault();
    });

    buildGallery(IMAGES);
}

export function homeView(ctx) {
    render(homeTemplate(), document.getElementById('app'));
    setTimeout(setupGallery, 0);
}
