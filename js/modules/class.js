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

export default classSelector