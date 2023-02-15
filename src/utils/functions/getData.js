const URL_API = 'https://api.steinhq.com/v1/storages/63ece6e7eced9b09e9beec58';

export const getData = async (endpoint) => {
    try {
        const res = await fetch(`${URL_API}${endpoint}`)
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}