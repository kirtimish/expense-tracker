const email = document.getElementById('emailId');
const password = document.getElementById('password');

async function postLogin(e) {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:3000/user/login')
    } catch (error) {
        console.log('Post route not found', error)
    }
}