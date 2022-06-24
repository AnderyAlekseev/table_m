class Table {
    constructor({ row, col, head, classes }) {
        this.row = row;
        this.col = col;
        this.head = head;
        this.class = classes;
    }
    create() {
        let tbl = document.createElement("table");
        let tblBody = document.createElement("tbody");
        let tblHead = document.createElement("thead");
        let row = 0, cell = 0, textNod = 0;
        // THEAD
        if (this.head.length != 0) {
            if (this.head.length != this.col) {
                console.log('Table.create > The number of headers does not correspond to the number of columns');
            }
            else {
                row = document.createElement("tr");
                for (let colIndx = 0; colIndx < this.col; colIndx++) {
                    cell = document.createElement("th");
                    textNod = document.createTextNode(this.head[colIndx]);
                    cell.appendChild(textNod);
                    row.appendChild(cell);
                }
                tblHead.appendChild(row);
                tbl.appendChild(tblHead);
                this.row -= 1;
            }
        }
        // TBODY        
        for (let rowIndx = 0; rowIndx < this.row; rowIndx++) {
            row = document.createElement("tr");
            for (let colIndx = 0; colIndx < this.col; colIndx++) {
                cell = document.createElement("td");
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);

        if (this.class && this.class.length != 0) {
            (this.class).forEach(cl => {
                tbl.classList.add(cl);
            });
        }

        console.log('Table.create > Success!');
        return tbl;
    }
}



/*****************************************************************
 * Количество строк в теле таблицы <tbody></tbody> и в массиве с данными должно совпадать
 * количество всех столбцов в таблице, включая пустые, и в массиве с данными должно совпадать
 * В таблице не должно быть объединения ячеек
 ****************************************************************/
function TableFillFromArray(DataArr, htmlTable) {
    let tableRows = htmlTable.querySelector('tbody').childNodes;

    if (tableRows.length != DataArr.length) {
        return console.log(`TableFillFromArray > The number of rows - ${tableRows.length}, does not correspond to the number of row DataArr - ${DataArr.length}.`);
    }
    DataArr.forEach((RowArr, indxRow) => {
        if (tableRows[indxRow].childNodes.length != RowArr.length) {
            return console.log(`TableFillFromArray > the number of cells in a table row - ${tableRows[indxRow].childNodes.length}, does not correspond to the number of columns in the data array - ${RowArr.length}.`);
        }
        RowArr.forEach((Datacell, indxCel) => {
            if (Datacell) {
                if (typeof (Datacell) != "object") {
                    let textNod = document.createTextNode(Datacell);
                    tableRows[indxRow].childNodes[indxCel].appendChild(textNod);
                } else {
                    tableRows[indxRow].childNodes[indxCel].appendChild(Datacell);
                }
            }else{
                console.log('TableFillFromArray > Datacell - ', Datacell, 'type - ', typeof(Datacell));
            }
        });
    });
    console.log('TableFillFromArray > Success!');
}

/********************************************
 * 
 * 
 ********************************************/
class testForm {
    constructor({idForm, idInput, nameInput, typeInput, labelBegin, labelAfter} )
    {
        this.idForm     = idForm,
        this.idInput    = idInput,
        this.nameInput  = nameInput,
        this.typeInput  = typeInput,
        this.labelBegin = labelBegin,
        this.labelAfter = labelAfter
    }
    create(){
        let wrapp   = document.createElement('div');
        let form    = document.createElement('form');
        let input   = document.createElement('input');
        let textNod = 0 ;

        if( this.idForm ){
            form.setAttribute('id', this.idForm);
        }
       
        // input  внутри формы
        if( this.idInput ){
            input.setAttribute('id', this.idInput);
        }
        if( this.nameInput ){
            input.setAttribute('name', this.nameInput);
        }
        if( this.typeInput ){
            input.setAttribute('type', this.typeInput);
        }
       
        form.appendChild(input);
        if( this.labelBegin){
            const labelBegin = document.createElement('label');
            // labelBegin.innerHTML = this.labelBegin;
            textNod = document.createTextNode(this.labelBegin);
            labelBegin.appendChild(textNod);
            input.insertAdjacentHTML("beforebegin", labelBegin);
        }
        if( this.labelAfter){
            const labelAfter = document.createElement('label');
            textNod = document.createTextNode(this.labelAfter);
            labelAfter.appendChild(textNod);
            input.insertAdjacentHTML("afterend", labelAfter);
        }
        
        wrapp.appendChild(form);
        return wrapp;
    }
}
export { testForm, Table, TableFillFromArray };


