const username = document.getElementById('username')
const emailId = document.getElementById('emailId')
const password = document.getElementById('password')

async function signupUser() {
    try {
        const res = await axios.post('http://localhost:3000/signup')
    } catch (error) {
        console.log(error)
    }
}


