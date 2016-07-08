var TODOSync = {

  url : "http://128.199.76.9:8002/:Junnie-Jobs/",

  get : function(callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8")
    xhr.addEventListener("load", function(e){
      callback(JSON.parse(xhr.responseText));
    })
    xhr.send(null);
  },

  add : function(todo, callback){

      var xhr = new XMLHttpRequest();
      xhr.open("POST", this.url, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8")
      xhr.addEventListener("load", function(e){
        callback(JSON.parse(xhr.responseText));
      })
      xhr.send("todo="+todo);
  },

  completed : function(todo, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", this.url+todo.id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
    xhr.addEventListener("load", function(e){
      callback(JSON.parse(xhr.responseText));
    });
    xhr.send("completed="+todo.completed);

  },

  remove : function(todo, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", this.url+todo.id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
    xhr.addEventListener("load", function(e){
      callback();
    });
    xhr.send(null);
  }
}
