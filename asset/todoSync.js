var TODOSync = {
  offlineID: -1,
  sync: navigator.onLine? true:false,
  url : "http://128.199.76.9:8002/:Junnie-Jobs/",
  contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  init : function(){
    console.log("TodoSync init");
    window.addEventListener("online", this.onofflineListener);
    window.addEventListener("offline", this.onofflineListener);
  },

  onofflineListener : function(){
    document.getElementById("header").classList[navigator.onLine?"remove":"add"]("offline");
    if(navigator.onLine){
      console.log("현재 온라인 작업 중");
      /************오프라인에서 삭제했던 리스트들 서버에서도 삭제************/
      var removedList = JSON.parse(localStorage.getItem('removed'));
      if(removedList.length > 0){
        for(i in removedList) {
              TODOSync.remove({
                 "id": removedList[i]
             }, function() {
                 console.log('remove finished!');
             });
          }
      }
      localStorage.removeItem('removed');
      /***************************************************************/

      /************오프라인에서 completed한 리스트들 서버에서도 동기화************/
      var keys = Object.keys(localStorage);
      for(var i=0; i<keys.length; i++){
          var localObjects = JSON.parse(localStorage.getItem(keys[i]));
          if(data.sync == false){ //
              TODOSync.add(data.content, function(json){});
              if(data.completed == "1"){
                  TODOSync.completed(localObjects, function(){
                      console.log("completed success");
                  });
              }
          }
      }
      localStorage.clear();
      /***************************************************************/
    }else{
      console.log("현재 오프라인 작업 중");
      //removed된 TODOList id가 들어갈 localStorage 생성
      if(!localStorage.getItem('removed')) {
          localStorage.setItem('removed', '[]');
      }
      TODOSync.offlineID = document.getElementById("todo-list").lastChild.getAttribute('data-id');
      TODOSync.offlineID += 1;
    }
  },

  get : function(callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.url, true);
    xhr.setRequestHeader("Content-type", this.contentType)
    xhr.addEventListener("load", function(e){
      if(this.status == 200){
        callback(JSON.parse(xhr.responseText));
      }
    })
    xhr.send(null);
  },

  add : function(todo, callback){

    if(navigator.onLine){
      var xhr = new XMLHttpRequest();
      xhr.open("POST", this.url, true);
      xhr.setRequestHeader("Content-type", this.contentType);
      xhr.addEventListener("load", function(e){
        if(this.status == 200){
          callback(JSON.parse(xhr.responseText));
        }
      });
      xhr.send("todo="+todo);
    }else{
      TODOSync.sync = false;
      callback({todo:todo, insertId:TODOSync.offlineID});
      var offlineTodoObj = {    //local Storage에 저장
        'id': TODOSync.offlineID,
        'content': todo,
        'completed':"0",
        'sync': TODOSync.sync
      };
      localStorage.setItem(TODOSync.offlineID, JSON.stringify(offlineTodoObj));
      TODOSync.offlineID++;
    }
  },


  completed : function(todo, callback){

   if(navigator.onLine){
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", this.url+todo.id, true);
      xhr.setRequestHeader("Content-type", this.contentType);
      xhr.addEventListener("load", function(e){
        if(this.status == 200){
          callback(JSON.parse(xhr.responseText));
        }
      });
      xhr.send("completed="+todo.completed);
    }else{
       var offlineTodo = JSON.parse(localStorage.getItem(todo.id));
       offlineTodo.completed = offlineTodo.completed == "0" ? "1" : "0";
       localStorage.setItem(offlineTodo.id, JSON.stringify(offlineTodo));
       callback({completed:offlineTodo.completed});
    }
  },

  remove : function(todo, callback){
     if(navigator.onLine){
      var xhr = new XMLHttpRequest();
      xhr.open("DELETE", this.url+todo.id, true);
      xhr.setRequestHeader("Content-type", this.contentType);
      xhr.addEventListener("load", function(e){
        if(this.status == 200){
            console.log("remove success");
        }
      });
      xhr.send(null);
     }else{
       //localStorage의 removed에 키 넣기
       //ls의 removed에 키 넣기
        var removedArr = JSON.parse(localStorage.getItem('removed'));
        removedArr.push(todo.id);
        localStorage.setItem('removed', JSON.stringify(removedArr));
        console.log(localStorage.getItem('removed'));
     }
  }
}
TODOSync.init();
