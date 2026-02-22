'use strict'

import classCard from './modules/class'
import forms from './modules/forms'
import loader from './modules/loader'
import modal, { openModal } from './modules/modal'
import slider from './modules/slider'
import tabs from './modules/tabs'
import timer from './modules/timer'

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => { 
        openModal('.modal__content','.modal',)
        console.log("hato")
    }, 5000)

    // Tabs, loader, timer va sliderlarni chaqirish
    tabs(".tabheader__item", ".tab_content", ".tabheader__items")
    loader('.loader-wrapper')
    timer('2026-09-05', '.timer')
    modal('[data-modal]', '.modal', '.modal__content', modalTimerId)
    forms("form", modalTimerId, ".modal")
    classCard('.offers-items')
    slider(".offer__slide", ".offer__slider-prev", ".offer__slider-next", "#total", "#current", ".offer__slider-wrapper", ".offer__slider-inner");
})
