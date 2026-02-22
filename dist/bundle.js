/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/class.js"
/*!*****************************!*\
  !*** ./js/modules/class.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function classSelector(selector) {
    class OfferMenu {
        constructor(src, title, descr, sale, discount, parentSelector) {
            this.src = src
            this.title = title
            this.descr = descr
            this.sale = sale
            this.discount = discount
            this.parentSelector = document.querySelector(parentSelector)
            this.formatToUSD()
        }
        formatToUSD() {
            this.discount = Number(this.discount).toLocaleString("en-US", { style: "currency", currency: "USD" })
            this.sale = Number(this.sale).toLocaleString("en-US", { style: "currency", currency: "USD" })
        }
        render() {
            let element = document.createElement("div")
            element.innerHTML = `
                <img src="${this.src}" alt="${this.title}">
                <div>
                    <h3>${this.title}</h3>
                    <p>${this.descr}</p>
                    <p><del>${this.discount}</del> <span class="primary-text">${this.sale}</span></p>
                </div>
            `
            this.parentSelector.append(element)
        }
    }

    showClasses().then(res =>
        res.forEach(item => {
            const { src, title, descr, discount, sale } = item
            new OfferMenu(src, title, descr, sale, discount, selector).render()
        })
    )

    async function showClasses() {
        try {
            const response = await fetch("http://localhost:3000/offers")
            return response.json()
        } catch (e) {
            console.log("Error", e);
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (classSelector);

/***/ },

/***/ "./js/modules/forms.js"
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function forms(formSelector, modalTimerId) {
	const form = document.querySelector(formSelector),
		telegramTokenBot = '8335061727:AAGf5o8QoZHSZl2rzgYwjRqb4pM6V_DkMLc',
		chatId = '8434481394'

	const message = {
		success: 'Thanks for contacting with us',
		failure: 'Something went wrong',
	}

	form.addEventListener('submit', event => {
		event.preventDefault()
		const loader = document.createElement('div')
		loader.classList.add('loading')
		form.append(loader)
		const formData = new FormData(form)
		const object = {}
		formData.forEach((value, key) => {
			object[key] = value
		})
		sendMessage(loader, object)
	})

	async function sendMessage(loader, object) {
		try {
			await fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					chat_id: chatId,
					text: `Name: ${object.name}. Phone: ${object.phone}`,
				}
				)
			})
			showStatusMessage(message.success)
		} catch (e) {
			console.log("Error", e);
		} finally {
			loader.remove()
			form.reset()
		}
	}

	function showStatusMessage(message) {
		const modalDialog = document.querySelector('.modal__dialog')
		modalDialog.classList.add('hide')
		;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal__content', '.modal', modalTimerId)

		const statusModal = document.createElement('div')
		statusModal.classList.add('modal__dialog')
		statusModal.innerHTML = `
			<div class="modal__content">
				<div data-modal-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`
		document.querySelector(".modal").append(statusModal)

		statusModal.addEventListener('click', (event) => {
			if (event.target.hasAttribute('data-modal-close')) {
				statusModal.remove();
				modalDialog.classList.remove('hide');
				(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
				clearTimeout(stRemove)
			}
		});
		const stRemove = setTimeout(() => {
			statusModal.remove()
			modalDialog.classList.remove('hide')
			;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal')
		}, 4000)
	}

}
	
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ },

/***/ "./js/modules/loader.js"
/*!******************************!*\
  !*** ./js/modules/loader.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function loader(parentSelector){
    document.body.style.overflow = "hidden"
    const loader = document.querySelector(parentSelector)
    setTimeout(() => {
        loader.style.display = "none"
        document.body.style.overflow = ""
    }, 2000)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loader);

/***/ },

/***/ "./js/modules/modal.js"
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   modal: () => (/* binding */ modal),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalContentSelector, modalSelector, modalTimerId) {
	const modalContent = document.querySelector(modalContentSelector),
		modal = document.querySelector(modalSelector)

	modalContent.classList.add('modal_fade')
	modal.classList.add('show')
	modal.classList.remove('hide')
	document.body.style.overflow = 'hidden'

	if (modalTimerId) {
		clearTimeout(modalTimerId)
	}
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector)

	modal.classList.add('hide')
	modal.classList.remove('show')
	document.body.style.overflow = ''
}

function modal(btnSelector, modalSelector, modalContentSelector, modalTimerId) {
	const modalOpenBtns = document.querySelectorAll(btnSelector),
		modal = document.querySelector(modalSelector)

	modalOpenBtns.forEach(btn => {
		btn.addEventListener('click', () =>
			openModal(modalContentSelector, modalSelector, modalTimerId)
		)
	})

	modal.addEventListener('click', event => {
		if (
			event.target === modal ||
			event.target.getAttribute('data-modal-close') === ''
		) {
			closeModal(modalSelector)
		}
	})

	document.addEventListener('keydown', event => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector)
		}
	})
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ },

/***/ "./js/modules/slider.js"
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(slidesSelector, prevSelector, nextSelector, totalSelector, currentSelector,slidesWrapperS, slidesInnerS ) {
    const slides = document.querySelectorAll(slidesSelector),
        prev = document.querySelector(prevSelector),
        next = document.querySelector(nextSelector),
        total = document.querySelector(totalSelector),
        current = document.querySelector(currentSelector),
        slidesWrapper = document.querySelector(slidesWrapperS),
        slidesInner = document.querySelector(slidesInnerS),
        width = window.getComputedStyle(slidesWrapper).width


    slidesInner.style.width = 100 * slides.length + "%"
    slidesInner.style.display = "flex"
    slidesInner.style.transition = "all .5s ease"
    slidesWrapper.style.overflow = "hidden"

    let offset = 0,
        slideIndex = 1

    slides.forEach(slide => {
        slide.style.width = width
    })

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`
        current.textContent = `0${slideIndex}`
    } else {
        total.textContent = slides.length
    }

    next.addEventListener("click", () => {
        if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0
        } else {
            offset += +width.slice(0, width.length - 2)
        }
        slidesInner.style.transform = `translateX(-${offset}px)`

        if (slideIndex === slides.length) {
            slideIndex = 1
        } else {
            slideIndex++
        }
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex
        }
    })
    prev.addEventListener("click", () => {
        if (offset === 0) {
            offset = +width.slice(0, width.length - 2)
        } else {
            offset -= -width.slice(0, width.length - 2)
        }
        slidesInner.style.transform = `translateX(-${offset}px)`

        if (slideIndex === 1) {
            slideIndex = slides.length
        } else {
            slideIndex--
        }
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex
        }
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ },

/***/ "./js/modules/tabs.js"
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabContentSelector, tabheaderSelector) {
    const tabs = document.querySelectorAll(tabsSelector),
        tabContents = document.querySelectorAll(tabContentSelector),
        tabheader = document.querySelector(tabheaderSelector)
    function hiddenContents() {
        tabContents.forEach(tabC => {
            tabC.classList.add("hide")
        })
        tabs.forEach(tab => {
            tab.classList.remove("tabheader__item_active")
        })
    }
    function showContents(index) {
        tabContents[index].classList.remove("hide")
        tabContents[index].classList.add("show")
        tabContents[index].classList.add("fade")
        tabs[index].classList.add("tabheader__item_active")
    }

    hiddenContents()
    showContents(0)
    tabheader.addEventListener("click", event => {
        const target = event.target
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((tab, index) => {
                if (target == tab) {
                    hiddenContents()
                    showContents(index)

                }
            })
        }
    })

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ },

/***/ "./js/modules/timer.js"
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(deadlineSelector) {
    const deadline = deadlineSelector
    function getRemaning(endtime) {
        let days, hours, minutes, secunds
        const time = Date.parse(endtime) - Date.parse(new Date())

        if (time <= 0) {
            days = 0, hours = 0, minutes = 0, secunds = 0
        } else {
            days = Math.floor(time / (1000 * 60 * 60 * 24)),
                hours = Math.floor((time / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((time / (1000 * 60)) % 60),
                secunds = Math.floor((time / (1000)) % 60)
        }
        return {
            total: time,
            days,
            hours,
            minutes,
            secunds
        }
    }
    function addNol(number) {
        if (number < 10) {
            return `0${number}`
        }
        else {
            return number
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            day = timer.querySelector("#days"),
            minut = timer.querySelector("#minutes"),
            second = timer.querySelector("#seconds"),
            hour = timer.querySelector("#hours"),
            interval = setInterval(updateClock, 1000)

        updateClock()
        function updateClock() {
            const time = getRemaning(endtime)
            day.textContent = addNol(time.days)
            hour.textContent = addNol(time.hours)
            minut.textContent = addNol(time.minutes)
            second.textContent = addNol(time.secunds)

            if (time.total <= 0) {
                clearInterval(interval)
            }
        }

    }
    setClock(".timer", deadline)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/class */ "./js/modules/class.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/loader */ "./js/modules/loader.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");


;







window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => { 
        (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal__content','.modal',)
        console.log("hato")
    }, 5000)

    // Tabs, loader, timer va sliderlarni chaqirish
    ;(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])(".tabheader__item", ".tab_content", ".tabheader__items")
    ;(0,_modules_loader__WEBPACK_IMPORTED_MODULE_2__["default"])('.loader-wrapper')
    ;(0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('2026-09-05', '.timer')
    ;(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', '.modal__content', modalTimerId)
    ;(0,_modules_forms__WEBPACK_IMPORTED_MODULE_1__["default"])("form", modalTimerId, ".modal")
    ;(0,_modules_class__WEBPACK_IMPORTED_MODULE_0__["default"])('.offers-items')
    ;(0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])(".offer__slide", ".offer__slider-prev", ".offer__slider-next", "#total", "#current", ".offer__slider-wrapper", ".offer__slider-inner");
})

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map