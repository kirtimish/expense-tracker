const forgotPassword = document.getElementById('forgotPassForm')
forgotPassword.addEventListener('onsubmit', forgotPasswordFunc);

async function forgotPasswordFunc(e) {
    e.preventDefault();

    const form = new FormData(e.target)

    const userDetails = {
        email: form.get('email')
    }
    try {
        const res = await axios.post('http://localhost:3000/password/forgotpassword', userDetails)
        if(res.status == 202){
            alert('Mail sent successfully');
        } else {
            throw new Error('Something went wrong. Try again!!')
        }
    } catch (error) {
        console.log(error)
    }
}