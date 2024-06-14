import axios from "../api/axios.js";
import { handleLoading } from "../utils/index.js";
import { handleErrors } from "../errors/index.js";


class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

const createNewUser = async (e) => {
    e.preventDefault();

    const children = Array.from(e.target.children).slice(0, 3);
    const inputValues = children.map(input => input.value);

    let user = new User(...inputValues)

    try{
        handleLoading(true, $authButton);
        const response = await axios.post("/users", user);
        console.log(response)
        handleErrors("Successfully registered!", "success", 0, $toastElement)
    }
    catch(error){
        handleErrors(error.response.data?.message, "error", 0, $toastElement)
    }
    finally{
        handleLoading(false, $authButton);
    }
    
}

$authForm.addEventListener("submit", createNewUser);