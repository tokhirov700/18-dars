const instance = axios.create({
    baseURL: "http://localhost:7777",
    headers: {
        "Content-Type" : "application/json"
    },
    timeout: 10000
})

export default instance