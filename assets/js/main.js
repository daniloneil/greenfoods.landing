// preloader
(function () {
    document.body.onload = function () {
        setTimeout(function () {
            let preloader = document.getElementById('load');
            if (!preloader.classList.contains('success')) {
                preloader.classList.add('success');
            }
        }, 1500)
    }
})();

//  myLib
(function () {
    window.myLib = {};

    window.myLib.body = document.querySelector('body');

    window.myLib.closestAttr = function (item, attr) {
        var node = item;

        while (node) {
            var attrValue = node.getAttribute(attr);
            if (attrValue) {
                return attrValue;
            }

            node = node.parentElement;
        }

        return null;
    };

    window.myLib.closestItemByClass = function (item, className) {
        var node = item;

        while (node) {
            if (node.classList.contains(className)) {
                return node;
            }

            node = node.parentElement;
        }

        return null;
    };

    window.myLib.toggleScroll = function () {
        myLib.body.classList.toggle('noScroll');
    };
})();

// header
(function () {
    var headerPage = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 0) {
            headerPage.classList.add('isActive');
        } else {
            headerPage.classList.remove('isActive')
        }
    })

})();

// activeScroll
(function () {
    window.myLib = {};

    window.myLib.body = document.querySelector('body');

    window.myLib.closestAttr = function (item, attr) {
        var node = item;

        while (node) {
            var attrValue = node.getAttribute(attr);
            if (attrValue) {
                return attrValue;
            }

            node = node.parentElement;
        }

        return null;
    };

    window.myLib.closestItemByClass = function (item, className) {
        var node = item;

        while (node) {
            if (node.classList.contains(className)) {
                return node;
            }

            node = node.parentElement;
        }

        return null;
    };

    window.myLib.toggleScroll = function () {
        myLib.body.classList.toggle('noScroll');
    };
})();

// reviews
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" activeSlide", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " activeSlide";
};

// animate
(function () {
    const animItems = document.querySelectorAll('.animItems');

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);

        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                // получаю высоту моего объекта
                const animItemHeight = animItem.offsetHeight;
                // получаею позицию моего объекта относительно высоты
                const animItemOffset = offset(animItem).top;
                // коэфициент регулировки анимации
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }
                // если мы прокрутили больше чем позиция объекта, но меньше чем его высота, то добавляем класс актив
                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('activeAnim');
                } else {
                    // если есть класс animNoActiv,то класс актив убираться не будет
                    if (!animItem.classList.contains('animNoActiv')) {
                        animItem.classList.remove('activeAnim');
                    }

                }
            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + screenLeft
            }
        }

        // задержка функции 
        setTimeout(() => {
            animOnScroll();
        }, 300);
    }
})();

// popup
(function () {
    var showPopup = function (target) {
        target.classList.add('isActivePopup');
    };

    var closePopup = function (target) {
        target.classList.remove('isActivePopup');
    };

    myLib.body.addEventListener('click', function (e) {
        var target = e.target;
        var popupClass = myLib.closestAttr(target, 'data-popup');

        if (popupClass === null) {
            return;
        }

        e.preventDefault();
        var popup = document.querySelector('.' + popupClass);

        if (popup) {
            showPopup(popup);
            myLib.toggleScroll();
        }
    });

    myLib.body.addEventListener('click', function (e) {
        var target = e.target;

        if (target.classList.contains('btnClose') ||
            target.classList.contains('popupInner')) {
            var popup = myLib.closestItemByClass(target, 'popup');

            closePopup(popup);
            myLib.toggleScroll();
        }
    });

    myLib.body.addEventListener('keydown', function (e) {
            if (e.keyCode !== 27) {
                return;
            }

            var popup = document.querySelector('.popup.isActivePopup');

            if (popup) {
                closePopup(popup);
                myLib.toggleScroll();
            }
        }

    );
})();