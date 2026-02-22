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

export default slider