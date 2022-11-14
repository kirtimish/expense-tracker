const expenseAmt = document.getElementById('expenseAmount');
const description = document.getElementById('description');
const category = document.getElementById('category');
const myForm = document.getElementById('expenseTracker-form');

myForm.addEventListener('submit',addExpense);

async function addExpense() {
        try {
            const res = await axios.post('http://localhost:3000/insert-expense')
            showexpenseonScreen(res.data);
        } catch (error) {
            console.log(error)
        }

        // let expenseSerialised = JSON.stringify(expenseDetails);

        // localStorage.setItem(expenseDetails.Category,expenseSerialised);
        // showexpenseonScreen(expenseDetails);
}

window.addEventListener('DOMContentLoaded', async function() {
    try {
        const res = await axios.get('http://localhost:3000/get-expenses');
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
    const childHTML = `<li id=${expense.id}>  ${expense.expenseAmt} : ${expense.description} : ${expense.category}
    <button onClick=deleteExpense("${expense.id}")>Delete Expense</button>
    <button onclick=editExpense("${expense.id}","${expense.category}","${expense.expenseAmt}","${expense.description}")>Edit Expense</button>
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
        const res = await axios.post(`http://localhost:3000/delete-expense/${expenseId}`) 
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
