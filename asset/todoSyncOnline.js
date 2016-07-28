var TODOSyncOnline = {

  url : "http://128.199.76.9:8002/:Junnie-Jobs/",
  contentType: "application/x-www-form-urlencoded; charset=UTF-8",

  onlineListener : function(){
    this.sync_Offline_List_When_Change_To_Online();
    this.sync_Completed_Status_When_Cahnge_To_Online();
    localStorage.clear();  //localStorage관련 작업이 끝났기 때문에 clear를 해준다.
  },

  getAjax : function(callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.url, true);
    this.callbackFunction(xhr, callback);
    xhr.send(null);
  },

  addAjax : function(todo, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", this.url, true);
    this.callbackFunction(xhr, callback);
    xhr.send("todo="+todo);
  },

  completedAjax : function(todo, callback){
    var xhr = new XMLHttpRequest();
     xhr.open("PUT", this.url+todo.id, true);
     this.callbackFunction(xhr, callback);
     xhr.send("completed="+todo.completed);
  },

  removeAjax : function(todo, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", this.url+todo.id, true);
    xhr.setRequestHeader("Content-type", this.contentType);
    xhr.addEventListener("load", function(e){
      if(this.status == 200){
          console.log("remove success");
      }
    });
    xhr.send(null);
  },

  sync_Offline_List_When_Change_To_Online : function(){
    var removedList = JSON.parse(localStorage.getItem('removed'));
    if(removedList.length > 0){
      for(var i in removedList) {
            TODOSync.remove({
               "id": removedList[i]
           }, function() {
               console.log('remove finished!');
           });
        }
    }
    localStorage.removeItem('removed');
  },

  sync_Completed_Status_When_Cahnge_To_Online : function(){
    var keys = Object.keys(localStorage);
    for(var i=0; i<keys.length; i++){
        var localObjects = JSON.parse(localStorage.getItem(keys[i]));
        if(localObjects.sync == false){ //
            TODOSync.add(localObjects.content, function(json){});
            TODOSync.get(function(data){
                for(var j in data){
                  if(localObjects.completed == "1" && data[j].todo == localObjects.content){
                    data[j].completed = 1;
                    TODOSync.completed(data[j], function(){
                      console.log("completed success");
                    })
                  }
                }
            });
        }
    }
  },

  callbackFunction : function(xhr, callback){
    xhr.setRequestHeader("Content-type", this.contentType)
    xhr.addEventListener("load", function(e){
      if(this.status == 200){
        callback(JSON.parse(xhr.responseText));
      }
    })
  }

}
