'use strict'

if(document.querySelector('.box-slider__swiper')) {
    const swiperOne = new Swiper('.box-slider__swiper', {
        navigation: {
            nextEl: '.box-slider__swiper-button-prev',
            prevEl: '.box-slider__swiper-button-next',
          },
          spaceBetween: 30,
          effect: "fade",
          autoplay: {
                delay: 4000,
              },
    })
}

if (document.querySelector('.small-gallery__swiper')) {
    const swiperTwo = new Swiper('.small-gallery__swiper', {
        navigation: {
            nextEl: '.small-gallery__swiper-button-prev',
            prevEl: '.small-gallery__swiper-button-next',
          },
          spaceBetween: 15,
          slidesPerView: 4,
          breakpoints: {
            // when window width is >= 320px
            0: {
              slidesPerView: 4,
            },
            767.98: {
                slidesPerView: 3,
              },
            991.98: {
                slidesPerView: 4,
            }
          }
    })
}

if(document.querySelector('.small-gallery__swiper-wrapper')) {
    lightGallery(document.querySelector('.small-gallery__swiper-wrapper'), {
        plugins: [lgZoom, lgHash],
        licenseKey: 'your_license_key',
        speed: 500,
    });
}

// Додаємо клас для всіх .submenu.
function languageActive() {
    let sublist = document.querySelectorAll('.sublist');
    let searchBlock = document.querySelector('.search-block');
    let headerShadow = document.querySelector('.header__shadow');

    if(sublist.length) {
        sublist.forEach(item => {
            item.addEventListener('click', function(e) {
                this.classList.toggle('active');

                if(e.target.classList[0] === '_icon-loupe') {
                    headerShadow.classList.toggle('active');
                    document.body.classList.toggle('look');

                    if(window.matchMedia('(max-width: 767.98px)').matches) {
                        let wrapperSearchMob = document.querySelector('.search-block-form__item');
                        
                        if(wrapperSearchMob) {
                            wrapperSearchMob.querySelector('input').focus();

                            setTimeout(() => {
                                if(document.body.classList.contains('look')) {
                                    if(wrapperSearchMob.querySelector('input') == document.activeElement) {
                                        wrapperSearchMob.classList.add('focus');
                                    } ;
                                };
                            }, 0);
                        };
                        
                    };
                };
            });

            document.addEventListener('click', function(e) {
                if(e.target.classList[0] !== 'language__active' && e.target.classList[0] !== '_icon-user' && e.target.classList[0] !== '_icon-loupe' && e.target.classList[0] !== '_icon-hamburger' && e.target.classList[0] !== 'nav__link' && e.target.classList[0] !== 'nav__item') {

                        item.classList.remove('active');
                    
                };
            });
        });
    };

    if(searchBlock) {
        let searchBlockClose = searchBlock.querySelector('.search-block__close');

        searchBlock.addEventListener('click', function(e) {
            e.stopPropagation()
        });

        searchBlockClose.addEventListener('click', function() {
            searchBlock.parentNode.classList.remove('active');
            headerShadow.classList.remove('active');
            document.body.classList.remove('look');
        });
    };

    // При кліку на .header__shadow забираємо клас .active в активних сабменю.
    if(headerShadow) {
        headerShadow.addEventListener('click', function() {
            searchBlock.parentNode.classList.remove('active');
            headerShadow.classList.remove('active');
            document.body.classList.remove('look');

            // Видвляємо класс в моб версії ".focus".
            if(window.matchMedia('(max-width: 767.98px)').matches) {
                document.querySelector('.search-block-form__item').classList.remove('focus');
            };
        });
    };
};

languageActive();


// Додаємо всім попапам на сайті класс .active.
function addClassPopup() {
    let popupBtns = document.querySelectorAll('.btn-popup');
    let formPopupBtns = document.querySelectorAll('form');


    if(formPopupBtns.length) {
        formPopupBtns.forEach(form => {
            form.addEventListener('submit', function(e) {
                let btn = form.querySelector('.btn-popup');
                
                if(btn) {
                    if (btn.getAttribute('data-id') !== undefined) {
                        e.preventDefault();
                    };
                }

                
            });
        });
    };



    if(popupBtns.length) {

        popupBtns.forEach(btn => {

            btn.addEventListener('click', function(e) {

                // let btnXhttp = document.querySelectorAll('.xttp-popup');
                // console.log(btnXhttp)

                // let xhttp = new XMLHttpRequest();
                // let url = '';
                // // https://jsonplaceholder.typicode.com/posts/1

                //     xhttp.addEventListener('readystatechange', function() {
                //         if(this.readyState == 4 || this.status == 200) {

                //             if(btn.classList.contains('xhttp-popup') && url !== '') {
                //                 openPopup()
                //             } else {
                //                 openPopup()
                //             }         
                //         } 
                //     })
                
                //     xhttp.open('get', url);
                //     xhttp.send()


                // function openPopup() {
                    let dataId = btn.dataset.id;
                    let popup = document.querySelector(`#${dataId}`);
    
                    if(popup) {
                        popup.classList.add('active');
                        document.body.classList.add('look');
        
                    document.addEventListener('click', function(e) {
                        if(e.target.classList[0] === 'modal' || e.target.classList[0] === '_icon-close') {
                            popup.classList.remove('active');
                            document.body.classList.remove('look');
                            };
                        });
                    };
                // }

            });
        });
    };
};

addClassPopup();


// Міняємо іконку в .search
function changeIconSearch() {
    let btnSearch = document.querySelector('.search-block-form__btn');

    if(btnSearch) {
        if(window.matchMedia('(max-width: 767.98px)').matches) {
            btnSearch.querySelector('span').classList.remove('_icon-loupe');
            btnSearch.querySelector('span').classList.add('_icon-arrow-up-left2');
        };
    };
};

changeIconSearch();


// Робимо клік на ".search-block-form__not-value"  і чисти інпут.
function cleanInput() {
    let wrapperSearch = document.querySelector('.search-block-form__item');

    if(wrapperSearch) {
        let close = wrapperSearch.querySelector('.search-block-form__not-value');
        let input = wrapperSearch.querySelector('input');

        input.addEventListener('input', function() {
            if(input.value !== '') {
                close.classList.add('active');
                input.classList.add('width');
            } else {
                close.classList.remove('active');
                input.classList.remove('width');
            }

            if(close) {
                close.addEventListener('click', function() {
                    input.value = '';

                    if(input.value === '') {
                        close.classList.remove('active');
                        input.classList.remove('width');
                    }
                });
            };
        });




    };
};

cleanInput();

// Перевіпяємо form чи не пусті інпути і виводимо ошибку.
function formInputError(form) {
    let forms = document.querySelectorAll(form);

    if(forms) {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                if(form) {
                    let formInput =  form.querySelectorAll('.input');

                    formInput.forEach(input => {
                        if(input.value === '') {
                            e.preventDefault()
                            input.classList.add('error')
                            let message = input.parentNode.querySelector('.message');
                            if(message) {
                                message.classList.add('error');
                            }

                            let nextMessage = input.parentNode;
                            if(nextMessage) {
                                nextMessage.classList.add('error');
                            }
                           
                        };

                        input.addEventListener('input', function() {
                            if(this.value !== '') {
                                let message = input.parentNode.querySelector('.message');
                                let formInput =  form.querySelectorAll('.input');

                                if(formInput.length) {
                                    formInput.forEach(item => {
                                        item.classList.remove('error')
                                    })
                                }

                                if(message) {
                                    message.classList.remove('error');
                                }
                                
                                this.parentNode.classList.remove('error')
                            };
                        });
                    });
                };
            });
        });
    };
};

formInputError(".search-block-form");
formInputError(".comments-form__form");
formInputError(".change-password-form");
formInputError(".form-register");
formInputError(".error-form");
formInputError(".login-wrapper-form");


// Робимо кнопці ефект появлення в слайвері ".box-slider__swiper";
function effectBtn() {
    let sliderItems = document.querySelectorAll('.box-slider__swiper-slide');

    window.addEventListener('transitionend', function() {

        sliderItems.forEach((item, index) => {
            if(item.classList.contains('swiper-slide-active')) {
                window.addEventListener('transitionend', () => {
                    let btn = item.querySelector('.box-slider__btn');
                    
                        if (item.classList.contains('swiper-slide-active')) {
                            if(btn) {
                                btn.classList.add('active');
                            } 
                        }
                })
            }
        })
    });

    window.addEventListener('transitionstart', function() {
        sliderItems.forEach(item => {
            let btn = item.querySelector('.box-slider__btn');

            if (item.classList.contains('swiper-slide-active') == false) {
                btn.classList.remove('active');
            }
        })
    })
};

effectBtn();


// Додаємо при скролі класс .fixed для хедера.
function addHeaderClass() {
    let header = document.querySelector('.headers');
    
    let headerHeaght = header.clientHeight;


    if(header) {

        if(window.matchMedia("(max-width: 767.98px)").matches) {
            let headerStep = document.querySelector('.header-basket-step');

            header.nextElementSibling.style.marginTop = `${header.clientHeight + 10}px`;

            if (headerStep) {
                headerStep.nextElementSibling.style.marginTop = `0px`;
            }

        } else {
            header.nextElementSibling.style.marginTop = `0px`;
        }

        document.addEventListener('scroll', function() {
            
            let headerHeight = header.clientHeight;

            if (window.matchMedia("(max-width: 767.98px)").matches) {
                return false;
            } else {
                if (window.scrollY >= headerHeight) {
                    header.classList.add('fixed');
                    header.nextElementSibling.style.marginTop = `${headerHeaght}px`;

                } else {
                    header.classList.remove('fixed');
                    header.nextElementSibling.style.marginTop = `0px`;
                }
            }
        });
    };
};

addHeaderClass();

// При хавері змінюється картинка в блоці ".box-products".

function hoverProduct() {
    let products = document.querySelectorAll('.box-products-wrapper__item');

    products.forEach(item => {
        let blockImg = item.querySelector('.box-products-wrapper__block-img ')
        blockImg.addEventListener('mouseenter', function() {
            let img = blockImg.querySelector('img');
            let imgSrc = img.src;
            let dataSrc = img.dataset.src;

            if(dataSrc) {
                img.src = dataSrc;

                this.addEventListener('mouseleave', function() {
                    img.src = imgSrc;
                });
            };
        });
    });
};

hoverProduct();

// Робимо акардиони на сайті.
function accardion() {
    let accardions = document.querySelectorAll('.accordion');

    if(accardions.length) {
        accardions.forEach(item => {
            let accardionHeader = item.querySelector('.accordion__header');

            accardionHeader.addEventListener('click', function() {
                accardionHeader.classList.toggle('active');

                if(accardionHeader.classList.contains('active')) {
                    let accardionBody = accardionHeader.nextElementSibling;

                    accardionBody.style.height = `${accardionBody.scrollHeight}px`;

                } else {
                    accardionHeader.nextElementSibling.style.height = `0px`;
                }
            });
        });
    };
};

accardion();

// Робимо клік на кнопку '.footer__btn-start' яка повиртає на початок сторінки.
function goStart() {
    let footer = document.querySelector('.footer');


    if (footer) {
        let header = document.querySelector('.header');
        let btnStartWrapper = document.querySelector('.footer__btn-start');
        let btnStart = btnStartWrapper.querySelector('button');

        if (btnStartWrapper && header && btnStart) {
            window.addEventListener('scroll', function() {
                if (window.scrollY >= header.clientHeight) {
                    btnStartWrapper.classList.add('active');
                } else {
                    btnStartWrapper.classList.remove('active');
                }
            });
        }

        if (btnStart) {
            
            btnStart.addEventListener('click', function() {
                console.log(btnStart.innerHTML === '❮')
                if(btnStart.innerHTML === '❮') {

                    window.scrollBy({
                        top: -window.scrollY,
                        behavior: 'smooth'
                    })
                }
            });
        };
    }
};

goStart();


// Заміняємо кнопку '.footer__btn-start' на кнрпку яка визиває пошук в мобільній версії.
function mobSearch() {
    let btnStart = document.querySelector('.footer__btn-start');

    if (btnStart) {
        if(matchMedia('(max-width: 499.98px)').matches) {
            let btn = btnStart.querySelector('button');

            btn.innerHTML = '';
            btnStart.classList.add('search');
            btn.classList.add('_icon-loupe');

            if(btn.classList.contains('_icon-loupe')) {
                btnStart.addEventListener('click', function(e) {
                    let search = document.querySelector('.icons__item.search');
                    let shadow = document.querySelector('.header__shadow');

                    if(search && shadow) {
                        search.classList.add('active');
                        shadow.classList.add('active');
                        document.body.classList.add('look');

                        btnStart.classList.remove('active');

                        document.addEventListener('click', function() {
                            if (!search.classList.contains('active')) {
                                btnStart.classList.add('active');
                            }
                        })
                    };
                });
            };
        };
    };
};

mobSearch();

// Змінюємо велмку картинку на сторінція продукт.
function addBigImg() {
    let bigImg = document.querySelector('.product-gallery__big-img');
    let allSmallGallery = document.querySelectorAll('.small-gallery__swiper-slide');

    if(bigImg) {
        if(allSmallGallery.length) {
            allSmallGallery.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    let imgDataSrc = this.querySelector('img').dataset.src;

                    if (imgDataSrc) {
                        bigImg.querySelector('img').src = imgDataSrc;
                        bigImg.querySelector('img').dataset.count = this.querySelector('img').dataset.imgId;

                        console.log(this.querySelector('img').dataset.imgId)
                    }
                    
                });
            });
        };
    };
};

addBigImg();


// Відкриважмо галерею lightGallery по кліку на велику картинку на сторінці Product.

function openGallery() {
    let bigImgProduct = document.querySelector('.product-gallery__big-img img');

    if (bigImgProduct) {
        bigImgProduct.addEventListener('click', function() {
            let dataCount = this.dataset.count;

            location.href = `#lg=1&slide=${dataCount}`;
            location.hash = `#lg=1&slide=${dataCount}`;

             window.location.reload()
        })
    };
};


openGallery();

// Роюимл таби на сайті.
function workTabs() {
    let tabsBtn = document.querySelectorAll('.tabs-btn');
    let tabsbody = document.querySelectorAll('.tabs-body');

    if(tabsBtn.length) {
        tabsBtn.forEach(item => {
            item.addEventListener('click', function() {
                removeCalssActive();
                this.classList.add('active');
                let dataBody = item.dataset.tabBody;


                let body = document.querySelector(`.tabs-body-${dataBody}`);
                body.classList.add('active');
            });
        });
    };

    function removeCalssActive() {
        tabsBtn.forEach(item => {
            item.classList.remove('active')
        });

        tabsbody.forEach(item => {
            item.classList.remove('active')
        });
    }
};

workTabs();

// Додаємо клас .active для '.product-popup-bootom' на сторінці продукт.
function addClassActivePopapBottom() {
    let popupBottom = document.querySelector('.product-popup-bootom');

    if (popupBottom) {
        document.addEventListener('scroll', function() {
            if(window.scrollY >= 500) {
                popupBottom.classList.add('active');
            } else {
                popupBottom.classList.remove('active');
            }
        });
    }

};

addClassActivePopapBottom();


// При активному інпут радіо, робимо активний блок з інпутами на сторінці 'register'.
function activeInputRadioBlock() {
    let inputRadio = document.querySelectorAll('.input-checked');

    if (inputRadio.length) {
        inputRadio.forEach(item => {
            item.addEventListener('change', function(e) {
                // console.log(this)
                if (e.target.type === 'radio') {
                    if(this.checked) {
                        let checkedId = this.dataset.checkedId;
    
                        if(checkedId) {
                            let blockActive = document.querySelector(`#${checkedId}`);
                            
                            removeClassActive();
                            blockActive.classList.add('active');
                        }
                    }
                };

                
                if (e.target.type === 'checkbox') {
                    console.log(1)
                    let checkedId = this.dataset.checkedId;
                    let blockActive = document.querySelector(`#${checkedId}`);

                    if(blockActive) {
                        if (this.checked) {
                            blockActive.classList.add('active');
                            
                        } else {
                            blockActive.classList.remove('active');
                        }
                    }

                };
            });
        });
    };

    function removeClassActive() {
        let blocks = document.querySelectorAll('.active-form');

        blocks.forEach(item => {
            item.classList.remove('active');
        });
    };
};

activeInputRadioBlock();


// Робимо тінь на інпут при фокусі на сторінці error.

function effectInput() {
    let form = document.querySelector('.error-form');
    

    if(form) {
        let input = form.querySelector('.input');

        if(input) {
            input.addEventListener('focus', function() {
            

                form.classList.add('focus')
            })
    
            input.addEventListener('blur', function() {
                if(form.classList.contains('focus')) {
                    form.classList.remove('focus')
                }
             })
        }
    }
}

effectInput();


// Включаємо музику прикліку на картинку на сторвнці benefits.

function playMusic() {
    let musicWrapper = document.querySelectorAll('.benefits-music__item');

    if(musicWrapper.length) {
        console.log(musicWrapper)

        musicWrapper.forEach(item => {
            let img = item.querySelector('img'); 

            if(img) {
                img.addEventListener('click', function() {
                    let audio = img.parentNode.querySelector('audio');
                    // removeClassPlay()
                    // audio.classList.toggle('play');

                    if (audio.classList.contains('play')) {
                        
                        audio.classList.remove('play');
                        audio.pause()
                    }  else {
                        removeClassPlay()
                        audio.classList.add('play');
                        audio.play()
                    };
                });
            };
        });
    };

    function removeClassPlay() {
        let musicWrapper = document.querySelectorAll('.benefits-music__item audio');
    
        musicWrapper.forEach(item => {
            item.classList.remove('play');
    
            item.pause()
        });
    };
};

playMusic()
