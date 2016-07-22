var TODOSyncOffline = {
  offlineID: 0,
  offlineListener : function(){
    if(!localStorage.getItem('removed')) {
        localStorage.setItem('removed', '[]');
      }
      this.offlineID = document.getElementById("todo-list").lastChild.getAttribute('data-id');
      this.offlineID += 1;
  },

  add : function(todo, callback){
    TODOSync.sync = false;
    callback({todo:todo, insertId:this.offlineID});
    var offlineTodoObj = {    //local Storage에 저장
      'id': this.offlineID,
      'content': todo,
      'completed':"0",
      'sync': TODOSync.sync
    };
    localStorage.setItem(this.offlineID, JSON.stringify(offlineTodoObj));
    this.offlineID++;
  },

  completed : function(todo, callback){
    var offlineTodo = JSON.parse(localStorage.getItem(todo.id));
    offlineTodo.completed = offlineTodo.completed == "0" ? "1" : "0";
    localStorage.setItem(offlineTodo.id, JSON.stringify(offlineTodo));
    console.log(localStorage.getItem(todo.id));
    callback({completed:offlineTodo.completed});
  },

  remove : function(todo){
    //localStorage의 removed에 키 넣기
     var removedArr = JSON.parse(localStorage.getItem('removed'));
     removedArr.push(todo.id);
     localStorage.setItem('removed', JSON.stringify(removedArr));
     console.log(localStorage.getItem('removed'));

  },
}
