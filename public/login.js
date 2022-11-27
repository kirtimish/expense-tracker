const email = document.getElementById('emailId');
const password = document.getElementById('password');

async function postLogin() {
    const loginDetails = {
        email: email.value,
        password: password.value
    }

    try {
        const res = await axios.post('http://localhost:3000/user/login',loginDetails)
        console.log(res.data)
    } catch (error) {
        console.log('Post route not found', error)
    }
}