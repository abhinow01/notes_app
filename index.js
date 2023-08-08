const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNote');
const notesDiv = document.getElementById('notes');

let notes = [];
let archivedNotes =[];
// localStorage.setItem('notes1',JSON.stringify(notesArray));
showNotes();
function addNotes(){
    // const title = addTitle.value;
    // const note = addText.value;

    let notes = localStorage.getItem('notes');
    if(notes === null){
        notes =[];
    }
    else{
        notes = JSON.parse(notes);
    }


    if (addText.value ==''){
        alert('add a note !');
        return;
    }
    // console.log(note);

    const notesObj = {
        title:addTitle.value,
        note:addText.value
    }

    addTitle.value = '';
    addText.value = '';
    notes.push(notesObj);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();

}

  function showNotes(){
    let notesHTML ="";
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    for(i=0;i<notes.length;i++){
        notesHTML +=`<div class="note">
                <button class="deleteNote" id =${i} onClick = "deleteNote(${i})">Delete</button>
                <button class="archiveButton" id =${i} onClick="archiveButton(${i})">Archive</button>
                <div class="title">${notes[i].title === " " ? "Note" : notes[i].title}</div>
                <div class="text">${notes[i].note}</div>
                </div>`
    }
    notesDiv.innerHTML = notesHTML;

    // notesDiv.addEventListener("click", function(event) {
    //     const target = event.target;
    //     if (target.classList.contains("deleteNote")) {
    //         deleteNote(parseInt(target.id));
    //     } else if (target.classList.contains("archiveButton")) {
    //         const index = parseInt(target.getAttribute("data-index"));
    //         archiveButton(index);
    //     }
    // });
}
// With this approach, you're attaching a single event listener to the notesDiv container, and then you use the event object to determine which button was clicked and take the appropriate action. This should help avoid the issues related to closures and unexpected values of i in your event handlers.





  

  function deleteNote(ind){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    notes.splice(ind, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function search (){
    let notesHTML ="";
    const searchInput = document.getElementById("search").value.toLowerCase();

    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    for (let i = 0;i<notes.length;i++){
    if (notes[i].title.toLowerCase().includes(searchInput)|| notes[i].note.toLowerCase().includes(searchInput)){
        notesHTML +=`<div class="note">
                <button class="deleteNote" id =${i} onClick = "deleteNote(${i})">Delete</button>
                <button class="archiveButton" id =${i} onClick="archiveButton(${i})">Archive</button>
                <div class="title">${notes[i].title === " " ? "Note" : notes[i].title}</div>
                <div class="text">${notes[i].note}</div>
                </div>`
    }
    notesDiv.innerHTML = notesHTML;

    }

}

function archiveButton(index){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    const notesToArchive = notes[index];
    notes.splice(index,1);
    archivedNotes.push(notesToArchive); 
    localStorage.setItem('notes',JSON.stringify(notes));
    localStorage.setItem('archivedNotes',JSON.stringify(archivedNotes));
    showNotes();

}
function unArchiveButton(){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    notes = notes.concat(archivedNotes);

    archivedNotes = [];
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('archivedNotes', JSON.stringify(archivedNotes));
    showNotes();

}

document.getElementById("search").addEventListener("input", search);
addNoteButton.addEventListener("click",addNotes);
