document.addEventListener('DOMContentLoaded', () => {

    const images = document.querySelectorAll('.slider-image');

    const bg = document.querySelectorAll('.bg')

    let transformProgress = 0;

    function generateRandomNumber() {
        return Math.floor(Math.random() * 31) - 15;
    }

    function applyStyles() {
        const wrappers = document.querySelectorAll('.slider-item-wrapper');

        wrappers.forEach((wrapper, j) => {
            wrapper.style.left = `${j * 100}%`;

            Array.from(wrapper.children).forEach((el, index) => {
                el.style.setProperty('--rotation', `${generateRandomNumber()}deg`);
                el.style.transitionDuration = `${(index / 3 + 0.5) + (j / 4)}s`;
                el.style.zIndex = `${Math.abs((index + 1 - 5))}`;
            });
        });

        bg.forEach((el, i) => {
            el.style.backgroundImage = `url(assets/img-${i+1}.webp)`
            el.style.zIndex = `${Math.abs((i + 1 - 5))}`;
        })
    }

    function transformItems(direction) {
        if ((direction === 1 && transformProgress >= 4) || (direction === -1 && transformProgress <= 0)) {
            return;
        }

        transformProgress += direction;

        images.forEach((el, index) => {
            el.style.left = `${transformProgress === 1 ? -50 :
                (-50 - ((transformProgress - 1) * 100))}%`;
        });

        bg.forEach((el, i) => {
            if(el.classList.contains('active')) {
                el.classList.remove('active')
            }
            if (transformProgress === i) {
                el.classList.add('active')
            }
        })
    }

    applyStyles();

    const leftBtn = document.querySelector('.left');
    const rightBtn = document.querySelector('.right');

    rightBtn.onclick = () => transformItems(1);
    leftBtn.onclick = () => transformItems(-1);
});
