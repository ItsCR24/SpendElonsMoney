const items = {}; 

function buy(price, name, button) {
    const h2 = document.getElementById("money");
    let moneyValue = parseInt(h2.textContent.replace("$", ""), 10);
    if (moneyValue >= price) {
        
        if (button.classList.contains('disabled')) {
            button.classList.remove('disabled');
        }

        let newValue = moneyValue - price;

        if (newValue <= 0) {
            newValue = 0;
        }

        new Audio("assets/sounds/buy.wav").play();
        h2.textContent = "$" + newValue;

        if (!items[name]) items[name] = { count: 0, price: price };
            items[name].count++;
            updateReceipt();
    }
    else if (moneyValue < price) {
        button.classList.add('disabled');
    }
}

function sell(price, name, button) {
    const h2 = document.getElementById("money");
    
    if (button.classList.contains('disabled')) {
        button.classList.remove('disabled');
    }
    
    let moneyValue = parseInt(h2.textContent.replace("$", ""), 10);
    if (items[name] && items[name].count > 0) {
        items[name].count--;
        h2.textContent = "$" + (moneyValue + price);
        updateReceipt();
    }
    else {
        button.classList.add('disabled');
    }
}

    function updateReceipt() {
        const container = document.getElementById("receipt-table");
        container.innerHTML = '';
        let totalValue = 0;
        let hasItems = false;

        const table = document.createElement("table");

        for (const [name, data] of Object.entries(items)) {
            if (data.count > 0) {
                hasItems = true;
                const row = document.createElement("tr");
                row.innerHTML = `<td>${name}</td> <td>${data.count}x</td> <td>$${data.price * data.count}</td>`;
                table.appendChild(row);
                totalValue += data.price * data.count;
            }
        }

        if (hasItems) {
            container.appendChild(table);
            container.appendChild(document.createElement("hr"));
            container.innerHTML += `<table><tr><td><h3 class="total_price">TOTAL</h3></td><td> <h3 class="total_price">$${totalValue}</h3> </td></tr></table>`;
            container.appendChild(document.createElement("hr"));
            container.innerHTML += `<p class="message2">Thank you for shopping.</p>`;
            container.innerHTML += `<p class="message2">See you soon!</p>`;
        } else {
            container.innerHTML = `<div class="message">Buy an Item first</div>`;
        }
    }
