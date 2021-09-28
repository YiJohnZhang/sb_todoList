//Global Variables
let localToDoList = {};
let todoListParent;

function appendToDoEntry(todoListEntry, completed = 0){
    
    let newToDoItem = document.createElement('li');
    newToDoItem.classList.add('todoItemUlLi');
    newToDoItem.innerHTML = todoListEntry+" [<i class='removeItem'>rm item</i>]";

    if(completed){   //only relevant if loading from localStorage.localList => localToDoList is not null
        newToDoItem.classList.toggle('completedToDo');
    }
    todoListParent.appendChild(newToDoItem);

}

function updateToDoLocalStorage(todoListEntry, updateOperation){
    switch(updateOperation){
        case 0:
            //delete entry
            delete localToDoList[todoListEntry];
            break;
        case 1:
            //add entry
            localToDoList[todoListEntry] = 0;
            break;
        case 2:
            //toggle entry completion status
            localToDoList[todoListEntry] = 1-localToDoList[todoListEntry];
            break;
        //for future development
        default:            
            break;
    }
    localStorage.setItem('localList',JSON.stringify(localToDoList));
}


function createToDoEvent(){

    const addToDoItemButton = document.getElementById('appendToDoItemButton');
    
    addToDoItemButton.addEventListener('click',function(evt){
        let todoTextEntry = document.getElementById('todoItemEntryInput').value; //some string entered
        appendToDoEntry(todoTextEntry);
        updateToDoLocalStorage(todoTextEntry, 1);

        document.getElementById('todoItemEntryInput').value = '';
        
    });

}

function createCheckListEvent(){

    //const todoListParent = document.getElementById('todoListContainerUl');
    todoListParent.addEventListener('click', function(evt){

        let evtTargetKey = evt.target.innerText.substring(0,evt.target.innerText.length-"[rm item]".length).trim();

        if(evt.target.classList.contains('removeItem')){
            let index = Array.prototype.indexOf.call(todoListParent.children, evt.target.parentNode);
            todoListParent.removeChild(todoListParent.children[index]);
            //remove from local storage
            evtTargetKey = evt.target.parentNode.innerText.substring(0,evt.target.parentNode.innerText.length-"[rm item]".length).trim();
            updateToDoLocalStorage(evtTargetKey, 0);
        }else if(evt.target.classList.contains('todoItemUlLi')){
            evt.target.classList.toggle('completedToDo');
            updateToDoLocalStorage(evtTargetKey, 2);
        }
    });
}


document.addEventListener('DOMContentLoaded',function(){

    //Startup
    todoListParent = document.getElementById('todoListUl');
    if(localStorage.localList){
        localToDoList = JSON.parse(localStorage.getItem('localList'));  //overwrite if local storage exists
        for(let key in localToDoList){
            appendToDoEntry(key,localToDoList[key]);
        }
    }

    createToDoEvent();
    createCheckListEvent();

});