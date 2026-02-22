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

export default tabs