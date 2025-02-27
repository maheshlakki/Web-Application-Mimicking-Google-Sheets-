const initialCellState = {
    fontFamily_data: 'monospace',
    fontSize_data: '14',
    isBold: false,
    isItalic: false,
    textAlign: 'start',
    isUnderlined: false,
    color: '#000000',
    backgroundColor: '#ffffff',
    content: ''
};

let sheetsArray = [];
let activeSheetIndex = -1;
let activeSheetObject = {};
let activeCell = null;

let fontFamilyBtn = document.querySelector('.font-family');
let fontSizeBtn = document.querySelector('.font-size');
let boldBtn = document.querySelector('.bold');
let italicBtn = document.querySelector('.italic');
let underlineBtn = document.querySelector('.underline');
let leftBtn = document.querySelector('.start');
let centerBtn = document.querySelector('.center');
let rightBtn = document.querySelector('.end');
let colorBtn = document.querySelector('.font-color-prop');
let bgColorBtn = document.querySelector('.BGcolor-prop');
let addressBar = document.querySelector('.address-bar');
let formula = document.querySelector('.formula-bar');
let downloadBtn = document.querySelector(".download");
let openBtn = document.querySelector(".open");

let gridHeader = document.querySelector('.grid-header');
gridHeader.appendChild(createHeaderCell('SL. NO.'));
for (let i = 65; i <= 90; i++) {
    gridHeader.appendChild(createHeaderCell(String.fromCharCode(i)));
}

function createHeaderCell(text) {
    let cell = document.createElement('div');
    cell.className = 'grid-header-col';
    cell.innerText = text;
    return cell;
}

let grid = document.querySelector('.grid');
for (let i = 1; i <= 100; i++) {
    let newRow = document.createElement('div');
    newRow.className = 'row';
    grid.appendChild(newRow);

    let rowHeader = document.createElement('div');
    rowHeader.className = 'grid-cell';
    rowHeader.innerText = i;
    newRow.appendChild(rowHeader);

    for (let j = 65; j <= 90; j++) {
        let cell = document.createElement('div');
        cell.className = 'grid-cell cell-focus';
        cell.id = String.fromCharCode(j) + i;
        cell.contentEditable = true;
        cell.addEventListener('focus', cellFocus);
        cell.addEventListener('input', cellInput);
        newRow.appendChild(cell);
    }
}

function cellFocus(event) {
    let key = event.target.id;
    addressBar.innerHTML = key;
    activeCell = event.target;

    fontFamilyBtn.value = activeSheetObject[key]?.fontFamily_data || 'monospace';
    fontSizeBtn.value = activeSheetObject[key]?.fontSize_data || '14';
    colorBtn.value = activeSheetObject[key]?.color || '#000000';
    bgColorBtn.value = activeSheetObject[key]?.backgroundColor || '#ffffff';
    formula.value = activeCell.innerText;
}

function cellInput() {
    let key = activeCell.id;
    formula.value = activeCell.innerText;
    activeSheetObject[key].content = activeCell.innerText;
}

downloadBtn.addEventListener("click", () => {
    let jsonData = JSON.stringify(sheetsArray);
    let file = new Blob([jsonData], { type: "application/json" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();
});

openBtn.addEventListener("click", () => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    input.addEventListener("change", (e) => {
        let fr = new FileReader();
        let fileObj = e.target.files[0];
        fr.readAsText(fileObj);
        fr.addEventListener("load", () => {
            let readSheetData = JSON.parse(fr.result);
            sheetsArray = readSheetData;
            activeSheetObject = sheetsArray[0];
            changeSheet();
        });
    });
});

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
}
