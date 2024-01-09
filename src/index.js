import {format, parseISO} from "date-fns";
import sorting from './sortByDate';
import {displayList, displayProject, renderList, index, renderProject} from './display';

let folder = [];

const makeFolder = (name, Desc) =>{
    let Name = name;
    let desc = Desc;
    let list = [];


    return {Name, desc, list};
}

let dailyName = 'Daily'
let dailyDesc = 'List for daily routines'

folderToFolder(folder, makeFolder(dailyName, dailyDesc));

class toDo{
    constructor(name, tanggal){
        this.name = name;
        this.date = format(parseISO(tanggal), "dd-MM-yyyy");
        this.do = false;
    }
}

function folderToFolder(folder, list){
    folder.push(list);
}



function reset(parent){
    parent.textContent = ''
}



//DOM control
let menu = document.querySelector('#menu');
let projectAdd = document.querySelector('#projectAdd');
let save1 = document.querySelector('#save1')
let save2 = document.querySelector('#save2');
let project = document.querySelector('#project');
let daily = document.querySelector('#daily');
let sidebar = document.querySelector('.sidebar');
let close = document.querySelector('.close');
let cancelList = document.querySelectorAll('.cancel');

cancelList.forEach(cancel => {
    cancel.addEventListener('click', () =>{
        let formBG = document.querySelector('.formBG');
        parent = cancel.parentNode;
        let old = parent.parentNode;
        old.classList.add('hidden');
        formBG.classList.add('hidden')
    })
})

projectAdd.addEventListener('click', ()=>{
    let formBox1 = document.querySelector('#projectForm');
    let formBG = document.querySelector('.formBG')
    formBox1.classList.remove('hidden');
    formBG.classList.remove('hidden');
})


function hideSidebar(){
    if(sidebar.classList.contains('full')){
        return
    }
    else{
        sidebar.classList.add('full')
        close.classList.add('full')
    }
}

save2.addEventListener('click', ()=>{
    let formBG = document.querySelector('.formBG')
    let form2 = document.querySelector('#listForm')
    let main  = document.querySelector('.main')
    let act = document.querySelector('#act');
    let date = document.querySelector('#date');
    folder[index].list.push(new toDo(act.value, date.value))
    reset(main)
    renderList(folder[index]);
    formBG.classList.add('hidden');
    form2.classList.add('hidden')
    saveData()
})

save1.addEventListener('click', ()=>{
    let formBG = document.querySelector('.formBG')
    let form1 = document.querySelector('#projectForm')
    let projectDiv = document.querySelector('#project');
    let name = document.querySelector('#Name');
    let ket = document.querySelector('#ket');
    folderToFolder(folder, makeFolder(name.value, ket.value));
    reset(projectDiv);
    renderProject(folder);
    formBG.classList.add('hidden');
    form1.classList.add('hidden');
    saveData()
})


close.addEventListener('click', hideSidebar)


menu.addEventListener('click', () =>{
    sidebar.classList.remove('full')
    close.classList.remove('full')
})

daily.addEventListener('click',() =>{
    let main = document.querySelector('.main');
    reset(main)
    index = 0
    renderList(folder[0]);
})

renderProject(folder)

function saveData (){
    localStorage.setItem(`folder`, JSON.stringify(folder));
}

function reload(){
    if(!localStorage.folder){
        renderProject(folder)
    }
    else{
        let file = localStorage.getItem('folder');
        file = JSON.parse(file);
        folder = file
        renderProject(folder)
    }
}
reload()







