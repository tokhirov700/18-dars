const ERROR_TYPES = ["Authorization", "Permission"];

export const handleErrors = (message, status, errorNumber, element) => {
    const $toastImage = element.querySelector("#toast-image");
    const $toastMessage = element.querySelector("#toast-message");
    const $toastTitle = element.querySelector("#toast-title");
    switch(status){
        case "error":
            $toastImage.src = "../images/error-icon.png";
        break;
        case "success":
            $toastImage.src = "../images/success-icon.png";
        break;
    }
    $toastMessage.innerHTML = message;
    $toastTitle.innerText = ERROR_TYPES[errorNumber]
    var toast = new bootstrap.Toast(element);
    toast.show();
}