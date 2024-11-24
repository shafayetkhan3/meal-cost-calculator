document.addEventListener("DOMContentLoaded", () => {
    const mealTable = document.getElementById("mealTable");
    const addRowButton = document.getElementById("addRow");
    const addColumnButton = document.getElementById("addColumn");
    const calculateButton = document.getElementById("calculate");
    const totalMealsSpan = document.getElementById("totalMeals");
    const totalDepositsSpan = document.getElementById("totalDeposits");
    const perMealCostSpan = document.getElementById("perMealCost");

    // Add new row
    addRowButton.addEventListener("click", () => {
        const newRow = mealTable.insertRow();
        const rowCount = mealTable.rows.length;

        for (let i = 0; i < mealTable.rows[0].cells.length; i++) {
            const cell = newRow.insertCell();
            if (i === 0) {
                cell.textContent = rowCount - 1;
            } else if (i >= 1 && i <= 3 || i === 7) {
                cell.contentEditable = "true";
                //cell.textContent = "0";
            } else {
                //cell.textContent = "0";
            }
        }
    });

    // Add new column
    addColumnButton.addEventListener("click", () => {
        const columnName = prompt("Enter new column name:");
        if (columnName) {
            // Add to header
            const headerRow = mealTable.rows[0];
            const newHeader = headerRow.insertCell(-1);
            newHeader.textContent = columnName;
            newHeader.contentEditable = "true";

            // Add to all rows
            for (let i = 1; i < mealTable.rows.length; i++) {
                const newCell = mealTable.rows[i].insertCell(-1);
                newCell.contentEditable = "true";
                //newCell.textContent = "0";
            }
        }
    });

    // Perform calculations
    calculateButton.addEventListener("click", () => {
        let totalMeals = 0;
        let totalDeposits = 0;

        const rows = mealTable.rows;
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].cells;
            const meals = parseFloat(cells[2].textContent) || 0;
            const deposit = parseFloat(cells[3].textContent) || 0;

            totalMeals += meals;
            totalDeposits += deposit;
        }

        const perMealCost = totalDeposits / totalMeals || 0;

        totalMealsSpan.textContent = totalMeals.toFixed(2);
        totalDepositsSpan.textContent = totalDeposits.toFixed(2);
        perMealCostSpan.textContent = perMealCost.toFixed(2);

        // Calculate for each row
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].cells;
            const meals = parseFloat(cells[2].textContent) || 0;
            const deposit = parseFloat(cells[3].textContent) || 0;
            const cost = meals * perMealCost;

            cells[4].textContent = cost.toFixed(2);

            const balance = deposit - cost;
            if (balance > 0) {
                cells[5].textContent = balance.toFixed(2);
                cells[6].textContent = "0";
            } else {
                cells[5].textContent = "0";
                cells[6].textContent = Math.abs(balance).toFixed(2);
            }
        }
    });
});
