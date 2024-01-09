import { isBefore, format } from "date-fns";

function condition(todo){
    let today = format( new Date(), "dd-MM-yyyy");
    if(todo.do == true){
        return 'Complete'
    }
    else if(isBefore(todo.date, today)){
        return 'Missed the deadline'
    }
    else if(isBefore(today, todo.date)){
        return "Haven't passed the deadline yet"
    }
}

function reset(parent){
    parent.textContent = ''
}




let displayList = (list, id, obj) => {
    let index = id

    let toDoBox = document.createElement('div');
    toDoBox.classList.add('toDoBox');
    let listDiv = document.createElement('div');
    listDiv.classList.add('list')
    //Create form DOM
    let form = document.createElement('form')
    form.classList.add('toDo');
    let main = document.querySelector('.main')
    
    //create the input
    let input = document.createElement('input');
    input.type = 'checkbox'
    input.classList.add('do');
    input.id = 'do'
    input.name = 'do'
    input.checked = list.do
    //create the label
    let label = document.createElement('label');
    label.setAttribute('for', 'do');
    label.textContent = list.name;
    //create div for date and delete button
    let ket = document.createElement('div');
    ket.classList.add('ket');
    let date = document.createElement('div');
    date.textContent = list.date;
    let status = document.createElement('div');
    status.classList.add('status');
    status.textContent = 'Status';
    let statusDiv = document.createElement('div');
    statusDiv.textContent = condition(list)
    status.appendChild(statusDiv);


    input.addEventListener('click',()=>{
        if(input.checked === true){
            list.do = true
        }
        else if (input.checked === false){
            list.do = false
        }
        reset(main)
        renderList(obj)
    })

    let delet =document.createElement('div');
    delet.classList.add('delete');
    delet.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>';
    delet.addEventListener('click', () =>{
        list.splice(index, 1);
        renderList(obj);
    })

    form.appendChild(input);
    form.appendChild(label);
    ket.appendChild(date);
    listDiv.appendChild(form);
    listDiv.appendChild(ket);
    toDoBox.appendChild(listDiv);
    toDoBox.appendChild(status);
    toDoBox.appendChild(delet);

    

    


    return toDoBox;
}

let renderList = (obj)=>{
    let add = document.createElement('button');
    add.id = 'add';
    add.textContent = 'Add To Do'
    add.addEventListener('click',() =>{
        let formBox2 = document.querySelector('#listForm');
        let formBG = document.querySelector('.formBG')
        formBox2.classList.remove('hidden');
        formBG.classList.remove('hidden');
    })
    let main = document.querySelector('.main');
    let projectTitle = document.createElement('div');
    projectTitle.id = 'projectTitle'
    let desc = document.createElement('div');
    desc.id = 'desc'

    projectTitle.textContent = obj.Name;
    desc.textContent = obj.desc;
    main.appendChild(projectTitle);
    main.appendChild(desc)
    main.appendChild(add);
    for(let i = 0; i < obj.list.length; i++){
        main.appendChild(displayList(obj.list[i], i, obj));
    }

}


let index = ''


function displayProject(list, no){
    let main = document.querySelector('.main')
    let projectBox = document.createElement('div')
    projectBox.classList.add('ProjectBox');
    projectBox.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="currentColor" d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>';
    let p = document.createElement('p');
    p.textContent = list.Name;

    projectBox.appendChild(p);
    projectBox.addEventListener('click', ()=>{
        reset(main)
        renderList(list);
        index = no;
    })

    return projectBox;
}

function renderProject(folder){
    let project = document.querySelector('#project');
    for(let i = 1; i<folder.length; i++){
        let dis = displayProject(folder[i], i)
        project.appendChild(dis)
    }
}


export {displayList, displayProject, renderList, index, reset, renderProject}