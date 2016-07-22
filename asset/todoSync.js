var TODOSync = {

  sync: navigator.onLine? true:false,
  init : function(){
    window.addEventListener("online", this.onofflineListener);
    window.addEventListener("offline", this.onofflineListener);
  },

  onofflineListener : function(){
    document.getElementById("header").classList[navigator.onLine?"remove":"add"]("offline");
    if(navigator.onLine){
      console.log("현재 온라인 작업 중");
      TODOSyncOnline.onlineListener();
    }else{
      console.log("현재 오프라인 작업 중");
      TODOSyncOffline.offlineListener();
    }
  },

  get : function(callback){
     TODOSyncOnline.getAjax(callback);
  },

  add : function(todo, callback){
    if(navigator.onLine){
      TODOSyncOnline.addAjax(todo, callback);
    }else{
      TODOSyncOffline.add(todo, callback);
    }
  },

  completed : function(todo, callback){
   if(navigator.onLine){
      TODOSyncOnline.completedAjax(todo, callback);
    }else{
      TODOSyncOffline.completed(todo, callback);
    }
  },

  remove : function(todo, callback){
     if(navigator.onLine){
       TODOSyncOnline.removeAjax(todo, callback);
     }else{
      TODOSyncOffline.remove(todo);
     }
  },


}
TODOSync.init();
