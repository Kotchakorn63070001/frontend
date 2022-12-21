import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001',
})
instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('Token')
        if (token) {
            config.headers['Authorization'] = `${token}`
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
// instance.interceptors.response.use(
//     (response) => {
//         return Promise.reject(error)
//     },
//     (error) => {
//         try{
//             if (axios.isCancel(error)) {
//                 return new Promise(() => {})
//             }
//             return Promise.reject(error)
//         } catch (error){
//             console.log(error)
//         }
//     }
// )

export default instance;
