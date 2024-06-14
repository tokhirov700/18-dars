import axios from "../api/axios.js";
import { handleErrors } from "../errors/index.js";

const $username = document.querySelector("#username");
const $email = document.querySelector("#email");
const $toastElement = document.querySelector("#liveToast");

const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        handleErrors("No token found. Please log in again.", "error", 0, $toastElement);
        return;
    }

    try {
        const response = await axios.get("/users/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const { name, email } = response.data;
        $username.textContent = `Username: ${name}`;
        $email.textContent = `Email: ${email}`;
    } catch (error) {
        handleErrors(error.response.data?.message, "error", 0, $toastElement);
    }
};

document.addEventListener("DOMContentLoaded", fetchUserProfile);
