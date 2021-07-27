import galleryItems from './app.js';
// console.log(galleryItems);

const refs = {
    gallery: document.querySelector('.js-gallery'),
    backdrop: document.querySelector('.js-lightbox'),
    overlay: document.querySelector('.lightbox__overlay'),
    modal: document.querySelector('.lightbox__content'),
    image: document.querySelector('.lightbox__image'),
    closeBtn: document.querySelector('[data-action="close-lightbox"]'),
};

function creatGalleryElement() {
    return galleryItems
    .map(({ preview, original, description }, index) => {
        return `<li class="gallery__item">
        <a
            class="gallery__link"
            href="${original}"
        >
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>`})
    .join('');   
};

refs.gallery.insertAdjacentHTML('beforeend', creatGalleryElement());

// const creatGalleryElement = (acc, { preview, original, description }) =>
//     acc +`<li class="gallery__item">
//         <a
//             class="gallery__link"
//             href="${original}"
//         >
//             <img
//                 class="gallery__image"
//                 src="${preview}"
//                 data-source="${original}"
//                 alt="${description}"
//             />
//         </a>
//     </li>`;
// const galleryMarkUp = galleryItems.reduce(creatGalleryElement, '');
// refs.gallery.insertAdjacentHTML('beforeend', galleryMarkUp);

refs.gallery.addEventListener('click', onOpenModal);
refs.closeBtn.addEventListener('click', onCloseModal);
refs.overlay.addEventListener('click', onDivOverlayClick);

function onOpenModal(event) {
    window.addEventListener('keydown', onEscKeyPress);
    event.preventDefault();
    const target = event.target;
    if (target.nodeName !== 'IMG') {
        return;
    } if (target.nodeName === 'IMG') {
            refs.backdrop.classList.add('is-open');
            refs.image.src = target.dataset.source;
            refs.image.alt = target.alt;
        }
};

function onCloseModal(event) {
    window.removeEventListener('keydown', onEscKeyPress);

    refs.backdrop.classList.remove('is-open');
    refs.image.src = '';
    refs.image.alt = '';
};

function onDivOverlayClick(event) {
    // console.log(event.currentTarget);
    // console.log(event.target);
    if (event.currentTarget === event.target) {
        // console.log('кликнули в оверлэй');
        onCloseModal();
    }
};

function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    if (event.code === ESC_KEY_CODE) {
        onCloseModal();
    }
};