export const getData = async ( URL, endpoint) => {
    try {
        const res = await fetch(`${URL}${endpoint}`)
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}