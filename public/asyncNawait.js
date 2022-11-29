
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
            const res = await axios.post('http://localhost:3000/insert-expense',expenseDetails,{headers: { "Authorization": token}})
            if(res.status == 201){
                window.location.href = './expense.html'
                showexpenseonScreen(res);
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
        if(res.data){
            for(let i=0;i<res.data.length;i++){
                showexpenseonScreen(res.data[i]);
            }
        }
        
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
        const res = await axios.post(`http://localhost:3000/delete-expense/${expenseId}`,{headers: { "Authorization": token}}) 
        removeexpensefromScreen(expenseId)
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
