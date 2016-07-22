var TODOListFilter = {

  selectedFilterIndex : 0,

  allList : function (){
      document.getElementById("todo-list").className = "";
      this.selectedFilter(0);
      history.pushState({"method":"all"}, null, "index.html"); //파라미터, 타이틀명, 페이지명
  },

  activeList : function (e){
      document.getElementById("todo-list").className = "all-active";
      this.selectedFilter(1);
      history.pushState({"method":"active"}, null, "/active");
  },

  completedList : function (){
      document.getElementById("todo-list").className = "all-completed";
      this.selectedFilter(2);
      history.pushState({"method":"completed"}, null, "#completed");
  },

  selectedFilter : function (index){
    var filterList = document.querySelectorAll("#filters a");
    filterList[this.selectedFilterIndex].classList.remove("selected");
    filterList[index].classList.add("selected");
    this.selectedFilterIndex = index;
  },

  showByFilter : function (e){
    e.preventDefault();
    var filter = e.target.getAttribute('href');
    if(filter == "index.html"){
        TODOListFilter.allList();
    }else if(filter == "active"){
        TODOListFilter.activeList();
    }else if(filter == "completed"){
        TODOListFilter.completedList();
    }
  },

  changeURLFilter : function (e){
    if(e.state){
      var method = e.state.method;
      if(method === "all"){
          this.allList();
      }else if(method === "active"){
          this.activeList();
      }else if(method === "completed"){
          this.completedList();
      }
    }else{
      this.allList();
    }
  }
}
