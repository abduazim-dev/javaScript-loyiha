function loader(parentSelector){
    document.body.style.overflow = "hidden"
    const loader = document.querySelector(parentSelector)
    setTimeout(() => {
        loader.style.display = "none"
        document.body.style.overflow = ""
    }, 2000)
}

export default loader