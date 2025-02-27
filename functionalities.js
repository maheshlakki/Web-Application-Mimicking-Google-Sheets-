
function setFont(target){
    if(activeCell){
        let fontInput = target.value;
        activeSheetObject[activeCell.id].fontFamily_data = fontInput;
        activeCell.style.fontFamily = fontInput;
        activeCell.focus();
    }
}

function setSize(target){
    if(activeCell){
        let sizeInput = target.value;
        activeSheetObject[activeCell.id].fontSize_data = sizeInput;
        activeCell.style.fontSize = sizeInput+'px';
        activeCell.focus();
    }
}

function toggleBold(){
    if(activeCell){
        activeCell.style.fontWeight = activeSheetObject[activeCell.id].isBold ? '400' : '600';
        activeSheetObject[activeCell.id].isBold = !activeSheetObject[activeCell.id].isBold;
        activeCell.focus();
    }
}

function toggleItalic(){
    if(activeCell){
        activeCell.style.fontStyle = activeSheetObject[activeCell.id].isItalic ? 'normal' : 'italic';
        activeSheetObject[activeCell.id].isItalic = !activeSheetObject[activeCell.id].isItalic;
        activeCell.focus();
    }
}

function toggleUnderline(){
    if(activeCell){
        activeCell.style.textDecoration = activeSheetObject[activeCell.id].isUnderlined ? 'none' : 'underline';
        activeSheetObject[activeCell.id].isUnderlined = !activeSheetObject[activeCell.id].isUnderlined;
        activeCell.focus();
    }
}

function textColor(target){
    if(activeCell){
        let colorInput = target.value;
        activeSheetObject[activeCell.id].color = colorInput;
        activeCell.style.color = colorInput;
        activeCell.focus();
    }
}

function backgroundColor(target){
    if(activeCell){
        let colorInput = target.value;
        activeSheetObject[activeCell.id].backgroundColor = colorInput;
        activeCell.style.backgroundColor = colorInput;
        activeCell.focus();
    }
}

function evaluateFormula(formulaString) {
    if (!formulaString.startsWith("=")) return formulaString;
    let formula = formulaString.substring(1).toUpperCase();
    let match = formula.match(/(SUM|AVERAGE|MAX|MIN|COUNT)\((.*?)\)/);
    if (!match) return "ERROR";
    let operation = match[1];
    let range = match[2];
    let values = extractCellValues(range);
    switch (operation) {
        case "SUM": return values.reduce((a, b) => a + b, 0);
        case "AVERAGE": return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
        case "MAX": return Math.max(...values);
        case "MIN": return Math.min(...values);
        case "COUNT": return values.length;
        default: return "ERROR";
    }
}

function extractCellValues(range) {
    let [start, end] = range.split(":");
    let values = [];
    let startRow = parseInt(start.slice(1));
    let endRow = parseInt(end.slice(1));
    let column = start.charAt(0);
    for (let i = startRow; i <= endRow; i++) {
        let cellId = column + i;
        let cellValue = parseFloat(activeSheetObject[cellId]?.content || 0);
        values.push(cellValue);
    }
    return values;
}

formula.addEventListener('input', (event) => {
    let formulaInput = event.target.value;
    let computedValue = evaluateFormula(formulaInput);
    activeSheetObject[activeCell.id].content = formulaInput;
    activeCell.innerText = computedValue;
});