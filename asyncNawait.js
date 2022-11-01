const expenseAmt = document.getElementById('expenseAmount');
const description = document.getElementById('description');
const category = document.getElementById('category');
const myForm = document.getElementById('expenseTracker-form');

myForm.addEventListener('submit',addExpense);

async function addExpense(e) {
    if(expenseAmt.value == '' || description.value == '' || category.value == ''){
        alert('Please fill all details');
    } else {
        e.preventDefault();

        const expenseDetails = {
            expenseAmount : expenseAmt.value,
            desc : description.value,
            Category : category.value
        }
         
        try {
            const res = await axios.post('https://crudcrud.com/api/7bfd895115f74b469e03286eecce97f4/expenseData',expenseDetails)
            showexpenseonScreen(res.data);
        } catch (error) {
            console.log(err)
        }

        // let expenseSerialised = JSON.stringify(expenseDetails);

        // localStorage.setItem(expenseDetails.Category,expenseSerialised);
        // showexpenseonScreen(expenseDetails);
        
        expenseAmt.value = '';
        description.value = '';
        category.value = '';
    }
}

window.addEventListener('DOMContentLoaded', async function() {
    try {
        const res = await axios.get('https://crudcrud.com/api/7bfd895115f74b469e03286eecce97f4/expenseData');
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

async function deleteExpense(expenseId){
    try {
        const res = await axios.delete(`https://crudcrud.com/api/7bfd895115f74b469e03286eecce97f4/expenseData/${expenseId}`) 
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
