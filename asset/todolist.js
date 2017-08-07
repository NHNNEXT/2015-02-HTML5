//online, offline 이벤트를 할당을 하고
//offline일 때 header 엘리먼트에 offline 클래스 추가하고
//online일 때 header엘리먼트에 offline 클래스를 삭제하기.

// 동적으로 UI를 변경후 히스토리 추가 
    // history.pushState({"method":"complete"},null,"active")
// 뒤로 가기 할 때 이벤트를 받아서 변경
    // window.addEventListener("popstate", callback)

var TODO = {
    ENTER_KEYCODE : 13,
    URL : "http://128.199.76.9:8002/bbq923/todo",
    selectedIndex : 0,

    init : function() {
        window.addEventListener("online", this.onofflineListener);
        window.addEventListener("offline", this.onofflineListener);
        document.getElementById("new-todo").addEventListener("keydown", this.add.bind(this));
        document.getElementById("todo-list").addEventListener("click", this.complete.bind(this));
        document.getElementById("todo-list").addEventListener("click", this.destroy.bind(this));
        document.getElementById("todo-list").addEventListener("animationend", this.remove);
        document.getElementById("filters").addEventListener("click", this.changeStateFilter.bind(this));
        window.addEventListener("popstate", this.changeURLFilter.bind(this));
    },
    changeURLFilter : function(e) {
        if(e.state) {
            var method = e.state.method;
            this[method+"View"]();
        } else {
            this.allView();
        }
    },
    changeStateFilter : function(e) {
        e.preventDefault();
        var target = e.target;
        var tagName = target.tagName.toLowerCase();
        if(tagName == "a") {
            var href = target.getAttribute("href");
            if(href === "index.html") {
                this.allView();
                history.pushState({"method":"all"},null,"index.html")
            } else if (href === "active") {
                this.activeView();
                history.pushState({"method":"active"},null,"all-active")
            } else if (href === "completed") {
                this.completedView();
                history.pushState({"method":"completed"},null,"all-completed")
            }
        }
    },
    allView : function() {
        document.getElementById("todo-list").className = "";
        this.selectNavigator(0);
    },
    activeView : function() {
        document.getElementById("todo-list").className = "all-active";
        this.selectNavigator(1);
    },
    completedView : function() {
        document.getElementById("todo-list").className = "all-completed";
        this.selectNavigator(2);
    },
    selectNavigator : function(index) {
        var navigatorList = document.querySelectorAll("#filters a");
        navigatorList[this.selectedIndex].classList.remove("selected");
        navigatorList[index].classList.add("selected");
        this.selectedIndex = index;
    },
    onofflineListener : function() {
        console.log("event");
        document.getElementById("header").classList[navigator.onLine?"remove":"add"]("offline");
    },
    add : function(e) {
        if(e.keyCode === this.ENTER_KEYCODE && e.target.value !== "") {
            var todoList = document.getElementById("todo-list");
            var todo = e.target.value;

            var myAdd = {
                method: 'POST',
                headers: new Headers({"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"}),
                mode: 'cors',
                body: 'todo=' + todo
            }

            if (navigator.onLine) {
                fetch(this.make_req(this.URL, myAdd)).then(function(response) {
                    return response.json();
                }).then(function(data) {
                    todoList.insertAdjacentHTML("afterbegin", template([{
                        id: data.insertId,
                        todo: todo
                    }]));
                    e.target.value = "";
                }).catch(function(err) {
                    // Error :(
                });
            } else {
                //data를 클라이언트에 저장. -> localStorage, indexedDB, websql
            }
        }
    },
    complete : function(e) {
        if(e.target.classList.contains("toggle")) {
            var targetTODO = e.target.parentNode.parentNode;
            var url = this.URL + "/" + targetTODO.dataset.id;

            var myComp = {
                method: 'PUT',
                headers: new Headers({"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"}),
                mode: 'cors',
                body: 'completed=' + (targetTODO.classList.contains("completed") ? 0 : 1)
            }

            fetch(this.make_req(url, myComp)).then(function(response) {
                return response.json();
            }).then(function(data) {
                targetTODO.classList.toggle("completed");
            }).catch(function(err) {
                // Error :(
            });
        }
    },
    destroy : function(e) {
        if(e.target.classList.contains("destroy")) {
            var targetTODO = e.target.parentNode.parentNode;
            var url = this.URL + "/" + targetTODO.dataset.id;

            var myDel = {
                method: 'DELETE',
                headers: new Headers({"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"}),
                mode: 'cors'
            }

            fetch(this.make_req(url, myDel)).then(function(response) {
                return response.json();
            }).then(function(data) {
                targetTODO.classList = "delete";
            }).catch(function(err) {
                // Error :(
            });
        }
    },
    remove : function(e) {
        if(e.animationName === "slideout" && e.target.classList.contains("delete")) {
            e.currentTarget.removeChild(e.target);
        }
    },
    make_req : function(url, options) {
        return new Request(url, options);
    }
}


document.addEventListener("DOMContentLoaded", function() {
    TODO.init();
});