var TODO = {
    ENTER_KEYCODE : 13,
    URL : "http://128.199.76.9:8002/bbq923/todo",

    init : function() {
        document.addEventListener("DOMContentLoaded", function() {
            document.getElementById("new-todo").addEventListener("keydown", this.add.bind(this));
            document.getElementById("todo-list").addEventListener("click", this.complete.bind(this));
            document.getElementById("todo-list").addEventListener("click", this.delete.bind(this));
            document.getElementById("todo-list").addEventListener("animationend", this.remove);
        }.bind(this));
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
    delete : function(e) {
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

TODO.init();