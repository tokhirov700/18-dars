import axios from "../api/axios.js";
import { handleLoading, saveToLocalStorage } from "../utils/index.js";
import { handleErrors } from "../errors/index.js";

class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

const $authForm = document.querySelector("#login-form");
const $authButton = $authForm.querySelector("button");
const $toastElement = document.querySelector("#liveToast");

const loginUser = async (e) => {
    e.preventDefault();

    for (const child of $authForm.children) {
        console.log(child, child.value)
    }

    const children = Array.from(e.target.children).slice(0, 2);
    const inputValues = children.map(input => input.value);

    let user = new User(...inputValues);

    try {
        handleLoading(true, $authButton);
        console.log(user);
        const response = await axios.post("/users/login", user);
        console.log(response);
        if (response.data.token) {
            saveToLocalStorage("token", response.data.token);
            handleErrors("Successfully logged in!", "success", 0, $toastElement);
            const profileResponse = await axios.get("/users/profile", {
                headers: {
                    Authorization: `Bearer ${response.data.token}`
                }
            });
            console.log(profileResponse.data); 
            window.location.href = "/profile.html"; 
        } else {
            throw new Error({ response });
        }
    } catch (error) {
        handleErrors(error.response.data?.message, "error", 0, $toastElement);
    } finally {
        handleLoading(false, $authButton);
    }
};

$authForm.addEventListener("submit", loginUser);
