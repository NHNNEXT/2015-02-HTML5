/**
 * Created by Naver on 2017. 7. 17..
 */
class Todo {
  constructor() {
    this.ENTER_KEY_CODE = 13;

    this.selectedIndex = 0;
    this.newTodo = document.querySelector("#todo-template").innerHTML;
    this.todoTemplate = Handlebars.compile(this.newTodo);
    this.HTTP_STATUS = {
      OK: 200
    }
    this.date = new Date();
    this.init();
  }

  init() {
    window.addEventListener("online", this.onoffListner);
    window.addEventListener("offline", this.onoffListner);

    document.querySelector("#new-todo").addEventListener("keydown", e => {
      this.postTodo(e);
    });

    document.querySelector("#todo-list").addEventListener("click", e => {
      this.toggleCompleteTodo(e);
      this.deleteTodo(e);
    });

    //onoffListner에 넣을 수 없을까?
    if(navigator.onLine) {
      fetch("http://128.199.76.9:8002/wkddngus5/todo", {
      }).then(response => {
        return response.json();
      }).then(json => {
        json.forEach(entry => {
          let toInsert = this.makeTodo(entry.todo, entry.id);
          document.querySelector("#todo-list").insertAdjacentHTML("beforeend", toInsert);
          if (entry.completed === 1) {
            document.getElementById(entry.id).classList.add("completed");
            document.getElementById(entry.id).querySelector(".toggle").checked = true;
          }
        });
      });
    }

    document.querySelector("#filters").addEventListener("click", e => {
      this.changeFilterStatus(e);
    });

    window.addEventListener("popstate", e => {
      this.changeURLFilter(e);
    })
  }

  onoffListner() {
    document.getElementById("header").classList[navigator.onLine?"remove":"add"]("offline");
    if(navigator.onLine) {
      for (let i = 0, len = localStorage.length ; i < len ; ++i) {
        console.log(localStorage.getItem(localStorage.key(i)));
        fetch("http://128.199.76.9:8002/wkddngus5/todo", {
          method: "POST",
          headers: {
            "Accept": "application/json, application/xml, text/plain, text/html, *.*",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          body: `todo=${localStorage.getItem(localStorage.key(i))}`
        }).then(response => {
          console.log("res arrived!", response);
          return response.json();
        }).then(json => {
          document.getElementById(localStorage.key(i)).id = json.insertId;
        });
      }
    } else {
      localStorage.clear();
    }
  }

  postTodo(e) {
    if(e.keyCode === this.ENTER_KEY_CODE && document.querySelector("#new-todo").value !== "") {
      let tmpId = this.date.getMilliseconds();
      let inputValue = document.querySelector("#new-todo").value;
      let toInsert = this.makeTodo(inputValue, tmpId);

      document.querySelector("#todo-list").insertAdjacentHTML("afterbegin", toInsert);
      document.querySelector('#new-todo').value = "";
      this.fadeIn(document.getElementById(tmpId));

      if(navigator.onLine) {
        fetch("http://128.199.76.9:8002/wkddngus5/todo", {
          method: "POST",
          headers: {
            "Accept": "application/json, application/xml, text/plain, text/html, *.*",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          body: `todo=${inputValue}`
        }).then(response => {
          return response.json();
        }).then(json => {
          document.getElementById(tmpId).id = json.insertId;
        });
      }else {
        localStorage.setItem(tmpId, inputValue);
        console.log(localStorage.getItem(tmpId));
      }

      // let xhr = new XMLHttpRequest();
      // xhr.open("POST", "http://128.199.76.9:8002/wkddngus5/todo", true);
      // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
      //
      // xhr.addEventListener("load", e => {
      //   if(e.currentTarget.status === this.HTTP_STATUS.OK) {
      //     document.getElementById(tmpId).id = JSON.parse(e.currentTarget.response).insertId;
      //   } else {
      //     console.log("ERROR: ", e.currentTarget.status);
      //     document.querySelector(".todo-block").remove();
      //   }
      // });
      //
      // xhr.send(`todo=${inputValue}`);
    }
  }

  makeTodo(inputContents, id) {
    let data = {
      todo: {
        title: inputContents,
        id: id
      }
    }
    return this.todoTemplate(data);
  }

  putTodo(id, completed) {
    fetch("http://128.199.76.9:8002/wkddngus5/todo/" + id, {
      method: "PUT",
      headers: {
        "Accept": "application/json, application/xml, text/plain, text/html, *.*",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: `completed=${completed}`
    }).then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
    });
  }

  toggleCompleteTodo(e) {
    if(e.target.className === "toggle") {
      if(e.target.closest("li").classList.contains("completed")) {
        e.target.closest("li").classList.remove("completed");
        this.putTodo(e.target.closest("li").id, 0);
      } else {
        e.target.closest("li").classList.add("completed");
        this.putTodo(e.target.closest("li").id, 1);
      }
    }
  }

  deleteTodo(e) {
    if(e.target.className === "destroy") {
      let toDelete = e.target.closest("li");
      let id = toDelete.id;
      this.fadeOut(toDelete);

      fetch("http://128.199.76.9:8002/wkddngus5/todo/" + id, {
        method: "DELETE",
        headers: {
          "Accept": "application/json, application/xml, text/plain, text/html, *.*",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
      }).then(response => {
        return response.json();
      }).then(json => {
        console.log(json);
      });
    }
  }

  changeFilterStatus(e) {
    e.preventDefault();
    let target = e.target;
    if(target.tagName.toLowerCase() == "a") {
      let href = target.getAttribute("href");
      switch (href) {
        case "index.html":
          this.allView();
          history.pushState({"method":"all"}, null, "index.html");
          break;
        case "active":
          this.activeView();
          history.pushState({"method":"active"}, null, "all-active");
          break;
        case "completed":
          this.completedView();
          history.pushState({"method":"completed"}, null, "completed");
          break;
      }
    }
  }

  allView() {
    document.querySelector("#todo-list").className = "";
    this.selectedNavigator(0);
  }

  activeView() {
    document.querySelector("#todo-list").className = "all-active";
    this.selectedNavigator(1);
  }

  completedView() {
    document.querySelector("#todo-list").className = "all-completed";
    this.selectedNavigator(2);
  }

  selectedNavigator(index) {
    let navigatorList = document.querySelectorAll("#filters a");
    navigatorList[this.selectedIndex].classList.remove("selected");
    navigatorList[index].classList.remove("selected");
    navigatorList[index].classList.add("selected");
    this.selectedIndex = index;
  }

  changeURLFilter(e) {
    if(!e.state) {
      this.activeView();
      return;
    }
    let method = e.state.method;
    this[method+"View"]();
  }

  fadeOut(toDelete) {
    toDelete.style.transition = "1s";
    toDelete.style.opacity = 0;
    setTimeout(() => {
      toDelete.remove();
    }, 900);
    // let i = 0;
    // let key = setInterval(() => {
    //   if(i === 50) {
    //     clearInterval(key);
    //     toDelete.remove();
    //   }else {
    //     toDelete.style.opacity = 1 - i * 0.02;
    //   }
    //   i++;
    // },16);
  }

  fadeIn(toInsert) {
    console.log(toInsert);
    toInsert.style.transition = "0s";
    toInsert.style.opacity = 0;
    setTimeout(() => {
      toInsert.style.transition = "1.5s";
      toInsert.style.opacity = 1;
    }, 100);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Todo();
});