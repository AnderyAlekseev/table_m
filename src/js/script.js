import { Table, TableFillFromArray } from './modules/table_m.js'

document.addEventListener('DOMContentLoaded', async function () {
  const content = document.querySelector('.content');

  const header = document.createElement('h1');
  const textHeader = document.createTextNode('10 лучших машин «24 часа Ле-Мана»');
  header.appendChild(textHeader);
  content.appendChild(header);

  const headersTable = ['Фирма', 'Модель', 'Год'];
  const url = 'http://localhost:3000/top10';
  let ArrData = [];
  const tbl = new Table({
    row: 10,
    col: 3,
    head: headersTable,
    classes: ['main_table']
  }).create();
  content.appendChild(tbl);

  const DB_Data = await getContentURL(url, 'json');

  DB_Data.forEach((ItemTop) => {
    const row = Object.values(ItemTop);
    ArrData.push(row);
  });
  
  let ReadyTbl = document.querySelector('.content table');
  TableFillFromArray(ArrData, ReadyTbl);
});


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
