function field(cols_count, rows_count, mines) {
    let rows = [];

    for(i = 0; i < cols_count; i++) {
        rows[i] = [];
        for(j = 0; j < rows_count; j++){
            if (mines.map(x => JSON.stringify(x)).includes("["+i +","+j+"]")) {
                rows [i][j] = "*";
            } else {
                rows [i][j] = 0;
            }
        }
    }
    
    for(i = 0; i < rows_count; i++) {
        for (j = 0; j < cols_count ; j++) {
            if (rows[i][j] != '*') {
            if (rows[i - 1] !== undefined && rows[i - 1][j - 1] === '*') rows[i][j]++;
            if (rows[i - 1] !== undefined && rows[i - 1][j    ] === '*') rows[i][j]++;
            if (rows[i - 1] !== undefined && rows[i - 1][j + 1] === '*') rows[i][j]++;

            if (rows[i][j - 1] === '*') rows[i][j]++;
            if (rows[i][j + 1] === '*') rows[i][j]++;

            if (rows[i + 1] !== undefined && rows[i + 1][j - 1] === '*') rows[i][j]++;
            if (rows[i + 1] !== undefined && rows[i + 1][j    ] === '*') rows[i][j]++;
            if (rows[i + 1] !== undefined && rows[i + 1][j + 1] === '*') rows[i][j]++;
            }
        }
    } 
    return rows;
}

function clicou(event) {
    if (event.target.textContent === '*') {
        for (element of document.querySelectorAll('span')) {
            element.setAttribute('class', '');
        }
        alert('perdeu');
        window.location.reload();
    } else {
        event.target.childNodes[0].setAttribute('class', '');
    }
}

function drawTable(rows) {
    let table = document.getElementById('field');
    for (row of rows) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        for (col of row) {
            let td = document.createElement('td');
            let span = document.createElement('span')
            span.textContent = col;
            span.setAttribute('class', 'invisible');
            td.appendChild(span);
            tr.appendChild(td);
            td.addEventListener('click', clicou);
            }
    }
}

function randomMines(quantity, cols, rows) {
    mines = [];
    for (i = 0; i < quantity; i++) {
        let positionRow = parseInt(Math.random() * rows); 
        let positionCol = parseInt(Math.random() * cols);
        mines.push([positionRow, positionCol]);
    }
    return mines;
}

let mines = randomMines(10, 8, 8);
let myField = field (8, 8, mines);
drawTable(myField);