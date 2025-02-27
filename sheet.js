
document.querySelector('.new-sheet').addEventListener('click', createNewSheet);

function createNewSheet() {
    let newCellStateObject = {};
    for (let i = 1; i <= 100; i++) {
        for (let j = 65; j <= 90; j++) {
            let key = String.fromCharCode(j) + i;
            newCellStateObject[key] = { ...initialCellState };
        }
    }

    if (activeSheetIndex !== -1) {
        document.getElementById('s' + (activeSheetIndex + 1)).classList.remove('active-sheet');
    }

    sheetsArray.push(newCellStateObject);
    let n = sheetsArray.length;
    activeSheetIndex = n - 1;
    activeSheetObject = sheetsArray[activeSheetIndex];

    let sheetMenu = document.createElement('div');
    sheetMenu.className = 'sheet-menu active-sheet';
    sheetMenu.id = 's' + n;
    sheetMenu.innerText = 'Sheet ' + n;

    sheetMenu.addEventListener('click', (event) => {
        event.stopPropagation();
        document.getElementById('s' + (activeSheetIndex + 1)).classList.remove('active-sheet');
        sheetMenu.classList.add('active-sheet');
        activeSheetIndex = Number(event.target.id.slice(1)) - 1;
        activeSheetObject = sheetsArray[activeSheetIndex];
        changeSheet();
    });

    document.querySelector('.footer').append(sheetMenu);
    changeSheet();
}

function changeSheet() {
    for (let key in activeSheetObject) {
        let cell = document.getElementById(key);
        let thisCell = activeSheetObject[key];
        if (cell) {
            cell.innerText = thisCell.content;
            cell.style.fontFamily = thisCell.fontFamily_data;
            cell.style.fontSize = thisCell.fontSize_data;
            cell.style.fontWeight = thisCell.isBold ? '600' : '400';
            cell.style.fontStyle = thisCell.isItalic ? 'italic' : 'normal';
            cell.style.textDecoration = thisCell.isUnderlined ? 'underline' : 'none';
            cell.style.textAlign = thisCell.textAlign;
            cell.style.color = thisCell.color;
            cell.style.backgroundColor = thisCell.backgroundColor;
        }
    }
    resetFunctionality();
}

function resetFunctionality() {
    let activeBg = '#c9c8c8';
    let inactiveBg = '#ecf0f1';
    activeCell = null;
    addressBar.innerHTML = 'Null';
    fontFamilyBtn.value = initialCellState.fontFamily_data;
    fontSizeBtn.value = initialCellState.fontSize_data;
    boldBtn.style.backgroundColor = inactiveBg;
    italicBtn.style.backgroundColor = inactiveBg;
    underlineBtn.style.backgroundColor = inactiveBg;
    leftBtn.style.backgroundColor = inactiveBg;
    centerBtn.style.backgroundColor = inactiveBg;
    rightBtn.style.backgroundColor = inactiveBg;
    colorBtn.value = initialCellState.color;
    bgColorBtn.value = initialCellState.backgroundColor;
    formula.value = '';
}
createNewSheet();
