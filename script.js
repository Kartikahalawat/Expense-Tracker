document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    // Load expenses from local storage
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Render expenses
    function renderExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach(function(expense, index) {
            const div = document.createElement('div');
            div.classList.add('expense');
            div.innerHTML = `
                <span><strong>Amount:</strong> ${expense.amount}</span><br>
                <span><strong>Description:</strong> ${expense.description}</span><br>
                <span><strong>Category:</strong> ${expense.category}</span>
                <button class="delete-btn" data-index="${index}">X</button>
            `;
            expenseList.appendChild(div);
        });
    }

    // Add new expense
    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const description = document.getElementById('description').value.trim();
        const category = document.getElementById('category').value.trim();

        if (!amount || !description || !category) {
            alert('Please fill in all fields');
            return;
        }

        const expense = {
            amount: amount,
            description: description,
            category: category
        };

        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
        expenseForm.reset();
    });

    // Delete expense
    expenseList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = parseInt(event.target.dataset.index);
            expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
        }
    });

    // Initial rendering
    renderExpenses();
});
