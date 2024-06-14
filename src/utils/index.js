export const handleLoading = (status, element) => {
    if(status){
        element.querySelector("#loading").style.display = "block"
    }
    else{
        element.querySelector("#loading").style.display = "none"
    }
}

export const saveToLocalStorage = (key, data) =>{
    if(typeof data === "object" && data !== null){
        localStorage.setItem(key, JSON.stringify(data))
    }
    else{
        localStorage.setItem(key, data)
    }
}