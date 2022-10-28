const expenseAmt = document.getElementById('expenseAmount');
const description = document.getElementById('description');
const category = document.getElementById('category');
const myForm = document.getElementById('expenseTracker-form');

myForm.addEventListener('submit',addExpense);

function addExpense(e) {
    if(expenseAmt.value == '' || description.value == '' || category.value == ''){
        alert('Please fill all details');
    } else {
        e.preventDefault();

        const expenseDetails = {
            expenseAmount : expenseAmt.value,
            desc : description.value,
            Category : category.value
        }

        axios.post('https://crudcrud.com/api/43121808229e4159b974e252d942bf31/expenseData',expenseDetails)
        .then(res => {
            showexpenseonScreen(res.data);
        })
        .catch(err => console.log(err));

        // let expenseSerialised = JSON.stringify(expenseDetails);

        // localStorage.setItem(expenseDetails.Category,expenseSerialised);
        // showexpenseonScreen(expenseDetails);
        
        expenseAmt.value = '';
        description.value = '';
        category.value = '';
    }
}

window.addEventListener('DOMContentLoaded', function() {
    axios.get('https://crudcrud.com/api/43121808229e4159b974e252d942bf31/expenseData')
    .then(res => {
        for(let i=0;i<res.data.length;i++){
            showexpenseonScreen(res.data[i]);
        }
    })
    .catch(err => console.log(err));
})

function showexpenseonScreen(expense){
    const parentNode = document.getElementById('expenses');
    const childHTML = `<li id=${expense._id}>  ${expense.expenseAmount} : ${expense.desc} : ${expense.Category}
    <button onClick=deleteExpense("${expense._id}")>Delete Expense</button>
    <button onclick=editExpense("${expense._id}","${expense.Category}","${expense.expenseAmount}","${expense.desc}")>Edit Expense</button>
    </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editExpense(expenseId,category,expenseAmt,desc){
    document.getElementById('category').value = category;
    document.getElementById('expenseAmount').value = expenseAmt;
    document.getElementById('description').value = desc;
    deleteExpense(expenseId);
}

function deleteExpense(expenseId){
    axios.delete(`https://crudcrud.com/api/43121808229e4159b974e252d942bf31/expenseData/${expenseId}`)
    .then(res => {
        removeexpensefromScreen(expenseId)
    })
    .catch(err => console.log(err));
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
