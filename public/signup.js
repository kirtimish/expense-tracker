const username = document.getElementById('username')
const emailId = document.getElementById('emailId')
const password = document.getElementById('password')

function showuserDetails() {
    const username = username.value;
    const emailId = emailId.value;
    const password = password.value;

    const userDetails = {
        username,
        emailId,
        password
    }

    signupUser(userDetails)
}

async function signupUser(userdetails) {
    try {
        const res = await axios.post('',userdetails)
        if(res.status == 200){
            console.log('signup successfull')
        }
    } catch (error) {
        console.log(error)
    }
}


