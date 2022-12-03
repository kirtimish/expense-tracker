const token = localStorage.getItem('token');

window.addEventListener('DOMContentLoaded',async (event) => {
    event.preventDefault();

    try {
        const res = await axios.get('http://localhost:3000/getAllUrl',{headers: {'Authorization' : token}})

        if(res.status === 200){
            console.log(res)
        }
    } catch (error) {
        console.log(error)
    }
})