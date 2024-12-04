document.getElementById('addRow').addEventListener('click', function() {
    const tableBody = document.querySelector('tbody');
    const newTableRow = document.createElement('tr');
    newTableRow.innerHTML = `
        <td><input type="text" placeholder="Имя"></td>
        <td><input type="text" placeholder="Значение"></td>
        <td>
            <button class="shift-up">↑</button><!--
            --><button class="shift-down">↓</button><!--
            --><button class="delete-row">x</button>
        </td>
    `;
    tableBody.appendChild(newTableRow);
});

document.getElementById('exportData').addEventListener('click', function() {
    const tableRows = document.querySelectorAll('tbody tr');
    const collectedData = {};

    tableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const key = cells[0].querySelector('input').value;
        const value = cells[1].querySelector('input').value;
        if (key && value) {
            if (!collectedData[key]) {
                collectedData[key] = [];
            }
            collectedData[key].push(value);
        }
    });
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.textContent = JSON.stringify(collectedData, null, 2);
});

document.querySelector('tbody').addEventListener('click', function(event) {
    if (event.target.classList.contains('shift-up')) {
        const currentRow = event.target.closest('tr');
        const previousRow = currentRow.previousElementSibling;
        if (previousRow) {
            currentRow.parentNode.insertBefore(currentRow, previousRow);
        }
    } else if (event.target.classList.contains('shift-down')) {
        const currentRow = event.target.closest('tr');
        const nextRow = currentRow.nextElementSibling;
        if (nextRow) {
            currentRow.parentNode.insertBefore(nextRow, currentRow);
        }
    } else if (event.target.classList.contains('delete-row')) {
        const currentRow = event.target.closest('tr');
        currentRow.remove();
    }
});
