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

        let expenseSerialised = JSON.stringify(expenseDetails);

        localStorage.setItem(expenseDetails.Category,expenseSerialised);
        showexpenseonScreen(expenseDetails);
        
        expenseAmt.value = '';
        description.value = '';
        category.value = '';
    }
}

function showexpenseonScreen(expense){
    const parentNode = document.getElementById('expenses');
    const childHTML = `<li id=${expense.Category}>  ${expense.expenseAmount} : ${expense.desc} : ${expense.Category}
    <button onClick=deleteExpense("${expense.Category}")>Delete Expense</button>
    <button onclick=editExpense("${expense.Category}","${expense.expenseAmount}","${expense.desc}")>Edit Expense</button>
    </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function editExpense(category,expenseAmt,desc){
    document.getElementById('category').value = category;
    document.getElementById('expenseAmount').value = expenseAmt;
    document.getElementById('description').value = desc;
    deleteExpense(category);
}

function deleteExpense(category){
    localStorage.removeItem(category);
    removeexpensefromScreen(category);
}

function removeexpensefromScreen(category){
    const parentNode = document.getElementById('expenses');
    const deleteChild = document.getElementById(category);
    if(deleteChild){
        parentNode.removeChild(deleteChild);
    }
}
