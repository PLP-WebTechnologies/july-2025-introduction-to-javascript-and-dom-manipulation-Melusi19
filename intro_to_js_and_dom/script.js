let userIncome = 0;
let userExpenses = 0;
let expenseList = [];
let currentTheme = 'light';

function analyzeBudget() {
    userIncome = parseFloat(document.getElementById('income').value) || 0;
    userExpenses = parseFloat(document.getElementById('expenses').value) || 0;
    
    const remainingBudget = userIncome - userExpenses;
    const savingsRate = (remainingBudget / userIncome) * 100;
    
    let budgetStatus, advice, statusColor;
    
    if (remainingBudget > 0) {
        if (savingsRate >= 20) {
            budgetStatus = "Excellent!";
            advice = "You're saving " + savingsRate.toFixed(1) + "% of your income. Keep it up!";
            statusColor = "green";
        } else if (savingsRate >= 10) {
            budgetStatus = "Good!";
            advice = "You're saving " + savingsRate.toFixed(1) + "%. Try to reach 20% if possible.";
            statusColor = "orange";
        } else {
            budgetStatus = "Needs Improvement";
            advice = "You're only saving " + savingsRate.toFixed(1) + "%. Consider reducing expenses.";
            statusColor = "red";
        }
    } else {
        budgetStatus = "Budget Deficit!";
        advice = "You're overspending by $" + Math.abs(remainingBudget).toFixed(2) + ". Review your expenses immediately.";
        statusColor = "red";
    }
    
    const resultHTML = `
        <h3 style="color: ${statusColor}">${budgetStatus}</h3>
        <p><strong>Monthly Income:</strong> $${userIncome.toFixed(2)}</p>
        <p><strong>Monthly Expenses:</strong> $${userExpenses.toFixed(2)}</p>
        <p><strong>Remaining Budget:</strong> $${remainingBudget.toFixed(2)}</p>
        <p><strong>Advice:</strong> ${advice}</p>
    `;
    
    document.getElementById('budgetResult').innerHTML = resultHTML;
}

function calculateCompoundInterest() {
    const principal = parseFloat(document.getElementById('principal').value) || 0;
    const rate = parseFloat(document.getElementById('interest').value) || 0;
    const time = parseFloat(document.getElementById('time').value) || 0;

    const amount = principal * Math.pow((1 + rate / 100), time);
    const interest = amount - principal;
    
    displayCalculatorResult(principal, amount, interest, time);
}

function formatCurrency(amount) {
    const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
    
    document.getElementById('calculatorResult').innerHTML += `
        <p><strong>Currency Formatter Demo:</strong> ${amount} becomes ${formatted}</p>
    `;
    
    return formatted;
}

function displayCalculatorResult(principal, amount, interest, time) {
    const resultHTML = `
        <h3>Investment Growth Projection</h3>
        <p><strong>Initial Investment:</strong> ${formatCurrency(principal)}</p>
        <p><strong>Final Amount after ${time} years:</strong> ${formatCurrency(amount)}</p>
        <p><strong>Interest Earned:</strong> ${formatCurrency(interest)}</p>
        <p><strong>Growth Rate:</strong> ${((amount/principal - 1) * 100).toFixed(2)}%</p>
    `;
    document.getElementById('calculatorResult').innerHTML = resultHTML;
}

function addExpense() {
    const name = document.getElementById('expenseName').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    
    if (name && amount > 0) {
        expenseList.push({
            name: name,
            amount: amount,
            date: new Date().toLocaleDateString()
        });
        
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
        
        displayExpenses();
    } else {
        alert('Please enter valid expense name and amount!');
    }
}

function displayExpenses() {
    const expensesContainer = document.getElementById('expensesList');
    let expensesHTML = '<h3>Your Expenses:</h3>';
    
    expenseList.forEach((expense, index) => {
        const isHighExpense = expense.amount > 100;
        expensesHTML += `
            <div class="expense-item ${isHighExpense ? 'high-expense' : ''}">
                <span><strong>${expense.name}</strong> - ${expense.date}</span>
                <span>$${expense.amount.toFixed(2)}</span>
            </div>
        `;
    });
    
    expensesContainer.innerHTML = expensesHTML;
}

function generateMonthlyReport() {
    if (expenseList.length === 0) {
        document.getElementById('monthlyReport').innerHTML = '<p>No expenses to report. Add some expenses first!</p>';
        return;
    }
    
    let totalExpenses = 0;
    let highestExpense = expenseList[0];
    let categoryCount = {};

    for (let i = 0; i < expenseList.length; i++) {
        const expense = expenseList[i];

        totalExpenses += expense.amount;

        if (expense.amount > highestExpense.amount) {
            highestExpense = expense;
        }

        const category = expense.name.charAt(0).toUpperCase();
        categoryCount[category] = (categoryCount[category] || 0) + 1;
    }
    
    const averageExpense = totalExpenses / expenseList.length;
    
    let reportHTML = `
        <h3>Monthly Expense Report</h3>
        <p><strong>Total Expenses:</strong> $${totalExpenses.toFixed(2)}</p>
        <p><strong>Average Expense:</strong> $${averageExpense.toFixed(2)}</p>
        <p><strong>Highest Expense:</strong> ${highestExpense.name} ($${highestExpense.amount.toFixed(2)})</p>
        <p><strong>Total Number of Expenses:</strong> ${expenseList.length}</p>
    `;
    
    document.getElementById('monthlyReport').innerHTML = reportHTML;
}

function startCountdown() {
    let counter = 10;
    const countdownElement = document.getElementById('countdown');

    if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
    }
    
    window.countdownInterval = setInterval(() => {
        countdownElement.innerHTML = `Countdown: ${counter} seconds`;
        
        counter--;
        
        if (counter < 0) {
            clearInterval(window.countdownInterval);
            countdownElement.innerHTML = 'Time\'s up! Great job learning loops!';
        }
    }, 1000);
}

function toggleFinancialTips() {
    const tipsElement = document.getElementById('financialTips');
    tipsElement.classList.toggle('active');
    
    const button = event.target;
    if (tipsElement.classList.contains('active')) {
        button.textContent = 'Hide Financial Tips';
    } else {
        button.textContent = 'Show Financial Tips';
    }
}

function changeTheme() {
    const container = document.querySelector('.container');
    
    if (currentTheme === 'light') {
        container.style.background = '#2c3e50';
        container.style.color = '#ecf0f1';
        document.body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
        currentTheme = 'dark';
        event.target.textContent = 'Switch to Light Theme';
    } else {
        container.style.background = 'white';
        container.style.color = '#333';
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        currentTheme = 'light';
        event.target.textContent = 'Switch to Dark Theme';
    }
    
    document.getElementById('domDemoResult').innerHTML = 
        `<p>Theme changed to: <strong>${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}</strong></p>`;
}

function createSavingsGoal() {
    const goalName = prompt('Enter your savings goal name:') || 'New Savings Goal';
    const goalAmount = parseFloat(prompt('Enter target amount:')) || 1000;
    
    const goalContainer = document.getElementById('savingsGoals');
    const goalElement = document.createElement('div');
    goalElement.className = 'expense-item';
    goalElement.style.background = '#e8f5e8';
    goalElement.style.borderLeft = '4px solid #4caf50';
    
    const progress = Math.floor(Math.random() * 100); 
    goalElement.innerHTML = `
        <div>
            <strong>🎯 ${goalName}</strong><br>
            <small>Target: $${goalAmount.toFixed(2)} | Progress: ${progress}%</small>
            <div style="background: #ddd; height: 10px; border-radius: 5px; margin-top: 5px;">
                <div style="background: #4caf50; height: 100%; width: ${progress}%; border-radius: 5px;"></div>
            </div>
        </div>
        <button onclick="this.parentElement.remove()" style="background: #f44336; padding: 5px 10px;">Delete</button>
    `;
    
    goalContainer.appendChild(goalElement);
    
    const goalCount = goalContainer.children.length;
    document.getElementById('domDemoResult').innerHTML = 
        `<p>Created new savings goal! You now have ${goalCount} active goal(s).</p>`;
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Personal Finance Dashboard loaded successfully!');
    console.log('This project demonstrates:');
    console.log('Variables, data types, operators, and conditionals');
    console.log('Custom functions for reusability');
    console.log('Loops for repetitive tasks');
    console.log('DOM manipulation for interactivity');
    
    document.getElementById('domDemoResult').innerHTML = 
        '<p>Welcome! Try out all the features to see JavaScript in action!</p>';
});

document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.id === 'income' || activeElement.id === 'expenses') {
            analyzeBudget();
        } else if (activeElement.id === 'expenseName' || activeElement.id === 'expenseAmount') {
            addExpense();
        }
    }
});
