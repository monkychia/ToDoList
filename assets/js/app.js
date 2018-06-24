  //  ============================= START CODING BELOW! =============================================

  var list = JSON.parse(localStorage.getItem('ToDoList'));

  var completedList = JSON.parse(localStorage.getItem('CompletedTasks'));
  if(!Array.isArray(completedList)){
    completedList = [];
  }
  if(!Array.isArray(list)){
    list = [];
  }


  $("#add-to-do").on("click", function (event) {
    event.preventDefault();

    var userInput = $('#to-do').val().trim();
    list.push(userInput);

    localStorage.clear();
    localStorage.setItem('ToDoList', JSON.stringify(list));
    
    AddElements(list, '#to-dos', 'to-do-item', true);      
    $('#to-do').val('');
  });

  $(document.body).on("click", ".checkbox", function () {
    var todolist = JSON.parse(localStorage.getItem('ToDoList'));
    
    var toDoNumber = $(this).attr('data-to-do');
    $("#item-" + toDoNumber).remove();
    var completedItem = list[toDoNumber];

    todolist.splice(toDoNumber, 1);
    list = todolist;      
    console.log(list);

    AddElements(list, '#to-dos', 'to-do-item', true);   
    
    

    var cList = JSON.parse(localStorage.getItem('CompletedTasks'));
    if(!Array.isArray(cList)){
      completedList.push(completedItem);
      console.log('First item in CList');
      localStorage.clear();
      localStorage.setItem('CompletedTasks', JSON.stringify(completedList));
    } else {
      cList.push(completedItem);
      completedList = cList;
      console.log('Added Another Item');
      localStorage.clear();
      localStorage.setItem('CompletedTasks', JSON.stringify(completedList));
    }
    
    AddElements(completedList, '#completed', 'completed', false); 
    localStorage.setItem('ToDoList', JSON.stringify(todolist));
    console.log(completedList);
    
  });

function AddElements(list, container, className, isButton){
    $(container).empty();
    for (var i = 0; i < list.length; i++) {
      var pTag = $('<p>');
      pTag.addClass(className);
      pTag.attr('id', 'item-' + i);
      pTag.text(" " + list[i]);

      if(isButton){
        var btn = $('<button>').attr('data-to-do', i);
        btn.addClass('checkbox');
        btn.append('X');
        pTag.prepend(btn);
      }
      $(container).append(pTag);
    }
  }

  var currentToDoList = JSON.parse(localStorage.getItem('ToDoList'));
  if(Array.isArray(currentToDoList)){
    AddElements(list, '#to-dos', 'to-do-item', true); 
  }
  
  var currentCompleted = JSON.parse(localStorage.getItem('CompletedTasks'));
  if(Array.isArray(currentCompleted)){
    AddElements(currentCompleted, '#completed', 'completed', false);
  }
