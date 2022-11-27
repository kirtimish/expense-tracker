const username = document.getElementById('username')
const emailId = document.getElementById('emailId')
const password = document.getElementById('password')
const signupForm = document.getElementById('signup-form') 

async function signupUser() {
    try {
        const res = await axios.post('http://localhost:3000/user/signup')
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}


