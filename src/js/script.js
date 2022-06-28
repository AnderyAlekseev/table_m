import { Table, TableFillFromArray } from './modules/table_m.js'
import {Button} from './modules/buttons_m.js'

document.addEventListener('DOMContentLoaded', async function () {
  const content = document.querySelector('.content');

  const header = document.createElement('h1');
  const textHeader = document.createTextNode('10 лучших машин «24 часа Ле-Мана»');
  header.appendChild(textHeader);
  content.appendChild(header);

  const headersTable = ['Фирма', 'Модель', 'Год'];

  /** <i class="fa-regular fa-arrow-down-a-z"></i> */
  const url = 'http://localhost:3000/top10';
  let ArrData = [];
  // создаем новую пустую таблицу с заголовками
  const tbl = new Table({
    row: 10,
    col: 3,
    head: headersTable,
    classes: ['main_table']
  }).create();
  content.appendChild(tbl); 
 
  // получаем данные в JSON с сервера
  const DB_Data = await getContentURL(url, 'json');
  // копируем value в массив
  DB_Data.forEach((ItemTop) => {
    const row = Object.values(ItemTop);
    ArrData.push(row);
  });
  // находим на странице только что созданную таблицу
  let ReadyTbl = document.querySelector('.content table');
  // заполняем таблицу данными из массива
  TableFillFromArray(ArrData, ReadyTbl);
    // создаем кнопки
    const btnSortABC = new Button ({
      name: 'SortABC',
      type: 'button',
      handlers: [SortABC],
      classes:['btn_SortABC', 'btn']
    }).create();

    const btnSort19 = new Button ({
      name: 'Sort19',
      type: 'button',
      handlers: [Sort19] ,
      classes:['btn_Sort19', 'btn']
    }).create();


const icon91 = document.createElement('I');
icon91.classList.add('fa-regular', 'fa-arrow-down-9-1');
btnSort19.appendChild(icon91); 

const iconABC = document.createElement('I');
iconABC.classList.add('fa-regular', 'fa-arrow-down-a-z');
btnSortABC.appendChild(iconABC); 

let tblHeader = document.querySelectorAll('.content th');
tblHeader[0].appendChild(btnSortABC); 
tblHeader[2].appendChild(btnSort19); 

});




function SortABC(){
console.log('SortABC');

}

function Sort19(){
  console.log('Sort19');

}
async function getContentURL(url, format, e) {
  try{
    let resultPromise = await fetch(url, {
      headers: { 'Content-Type': 'application/json' }
    })
  
    if (!resultPromise.ok) {
      return console.log(resultPromise.statusText)
    }
    if (format === 'html') {
      return await resultPromise.text();
    } else if (format === 'json') {
      return await resultPromise.json();
    }
  }catch (e){
    console.error(e);
  }
  

}
