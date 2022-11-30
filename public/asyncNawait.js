

async function addExpense(event) {
    event.preventDefault();
    const expenseAmt = event.target.expenseAmt.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    const expenseDetails = {
        expenseAmt,
        description,
        category
    }
        try {
            const token = localStorage.getItem('token')
            const res = await axios.post('http://localhost:3000/insert-expense',expenseDetails,{headers: { 'Authorization' : token}})
            console.log(res)
            if(res.status == 201){
                window.location.href = './expense.html'
                showexpenseonScreen(res.data);
            }
            
        } catch (error) {
            console.log(error)
        }

        // let expenseSerialised = JSON.stringify(expenseDetails);

        // localStorage.setItem(expenseDetails.Category,expenseSerialised);
        // showexpenseonScreen(expenseDetails);
}

window.addEventListener('DOMContentLoaded', async function() {
    try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:3000/get-expenses',{headers: { "Authorization": token}});
        
        
        if(res.status == 200){
            console.log(checkIfPremium)
            for(let i=0;i<res.data.length;i++){
                showexpenseonScreen(res.data[i]);
            }
        }

        checkIfPremium();
        
    } catch (error) {
        console.log(error)
    }

})

function showexpenseonScreen(expense){
    const parentNode = document.getElementById('expenses');
    const childHTML = `<li id=${expense.id} class="expense-list-item">  ${expense.expenseAmt} : ${expense.description} : ${expense.category}
    <button onClick=deleteExpense("${expense.id}") class="action-btn">Delete Expense</button>
    <button onclick=editExpense("${expense.id}","${expense.category}","${expense.expenseAmt}","${expense.description}") class="action-btn">Edit Expense</button>
    </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editExpense(expenseId,category,expenseAmt,desc){
    document.getElementById('category').value = category;
    document.getElementById('expenseAmount').value = expenseAmt;
    document.getElementById('description').value = desc;
    deleteExpense(expenseId);
}

async function deleteExpense(expenseId){
    try {
        const token = localStorage.getItem('token')
        const res = await axios.delete(`http://localhost:3000/expense/delete-expense/${expenseId}`, {headers: {"Authorization": token}});

        removeUserFromScreen(expenseId);
    } catch (error) {
        console.log(error)
    }
    // localStorage.removeItem(category);
    // removeexpensefromScreen(category);
}

function removeexpensefromScreen(expenseId){
    const parentNode = document.getElementById('expenses');
    const deleteChild = document.getElementById(expenseId);
    if(deleteChild){
        parentNode.removeChild(deleteChild);
    }
}

function premiumUser() {
    document.body.classList.add('dark');
}

function checkIfPremium() {
    let usertype = localStorage.getItem('user');

    if(usertype === "true"){
        premiumUser();
        getPremiumLeaderboard();
    }
}

document.getElementById('premium-btn').onclick = async function (e) {
    const token = localStorage.getItem('token')
    const response  = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "7003442036"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
            localStorage.setItem('user', true);
            premiumUser();
            getPremiumLeaderboard();
            alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}

async function getPremiumLeaderboard(){
    const token = localStorage.getItem('token');
try {
const response = await axios.get('http://localhost:3000/premiums', {headers : {'Authorization': token}} )

if(response.data.success){
    console.log(response);
    if(response.data.data.length>0){
        response.data.data.sort((a,b)=>{
            return a.totalExpense - b.totalExpense;
        });
        console.log(response.data.data[0].user.username);
        console.log(response.data.data[0].user)

       

        response.data.data.map((user, id)=>{
            console.log(id);
            showLeaderboard(user, id);
        })

    }
}

} catch (err) {
console.log(err);

}

}

function showLeaderboard(user , id){
    console.log(id);
    console.log(user);
    const leaderboardDiv = document.getElementById('leaderboardDiv')
    let child = `<li class="leaderboardList">
            <p class="sno">${id+1} </p>
            <p class="name" id="user" onclick="openUserExpenses('${user.user.id}')">${user.user.username}</p>
            <p class="name">${user.totalExpense}</p>
    </li>`

    leaderboardDiv.innerHTML += child
}

function openUserExpenses(){
    console.log(user)
    localStorage.setItem('clickedUser' , user)
    window.location.href = './leaderboard.html'
}