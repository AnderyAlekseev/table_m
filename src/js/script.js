import {Table, TableFillFromArray } from './modules/table_m.js'

document.addEventListener('DOMContentLoaded', function(){
    const content = document.getElementById('content');
    const headers = ['', 'Столбец 1', 'Столбец 2', 'Столбец 3', 'Столбец 4', 'Кнопки'];
            const tbl = new Table({
                row: 5,
                col: 6,
                head: headers,
                classes: ['main_table']
            }).create();

            content.appendChild(tbl);
});
