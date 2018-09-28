var counter = 1;

function contentLoadedHandler() {
    let list = document.querySelector('.list'),
        listControl = document.querySelector('.list-control');
        // newListItem = createListElement(listControl); 
    
    list.addEventListener('click', function(event) {
        if (!event.target.matches('button')) {
            return;
        }

        let action = event.target.dataset.action,
            currentLi = event.target.parentNode.parentNode;

        if (action === 'add') {
            let newListItem = createListElement(listControl); 
            list.insertBefore(newListItem.cloneNode(true), currentLi.nextSibling);
        }

        if (action === 'remove') {
            list.removeChild(currentLi);
        }
    })
};

function createListElement(liControl) {
    let li = document.createElement('li'),
        liInfo = document.createElement('div'),
        liTitle = document.createElement('h2'),
        liSubtitle = document.createElement('h3');

    liTitle.innerText = 'item ' + counter;
    liSubtitle.innerText = 'desc ' + counter;

    liInfo.appendChild(liTitle);
    liInfo.appendChild(liSubtitle);
    li.appendChild(liInfo);
    li.appendChild(liControl.cloneNode(true));

    counter++;
    return li;
}
  
document.addEventListener("DOMContentLoaded", contentLoadedHandler);
