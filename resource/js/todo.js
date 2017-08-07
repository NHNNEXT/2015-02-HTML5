/**
 * Created by Naver on 2017. 7. 17..
 */
import IndexedDB from './indexedDB';
import Animation from './animation';

export default class Todo {
  constructor() {
    this.ENTER_KEY_CODE = 13;

    this.newTodo = document.querySelector('#todo-template').innerHTML;
    this.todoTemplate = Handlebars.compile(this.newTodo);
    this.HTTP_STATUS = {
      OK: 200,
    };

    this.indexedDB = new IndexedDB();
    this.animation = new Animation();
    this.init();
  }

  init() {
    localStorage.clear();

    document.querySelector('#new-todo').addEventListener('keydown', this.postTodo);
    document.querySelector('#new-todo').addEventListener('keydown', (e) => {
      this.postTodo(e);
    });

    document.querySelector('#todo-list').addEventListener('click', (e) => {
      Todo.toggleCompleteTodo(e);
      this.deleteTodo(e);
    });

    // onoffListner에 넣을 수 없을까?
    if (navigator.onLine) {
      fetch('http://128.199.76.9:8002/wkddngus5/todo', {}).then(response => response.json()).then((json) => {
        json.forEach((entry) => {
          const toInsert = this.makeTodo(entry.todo, entry.id);
          document.querySelector('#todo-list').insertAdjacentHTML('beforeend', toInsert);
          if (entry.completed === 1) {
            document.getElementById(entry.id).classList.add('completed');
            document.getElementById(entry.id).querySelector('.toggle').checked = true;
          }
        });
      });
    }
  }

  //   Promise.all([fetch(), fetch()]).then(results => {
  //   return Promise.all(results.map(response => response.json()));
  // }).then(jsonList => {
  //   jsonList; // fetch의 결과 리스트
  // });

  postTodo(e) {
    if (e.keyCode === this.ENTER_KEY_CODE && document.querySelector('#new-todo').value !== '') {
      const tmpId = new Date().getMilliseconds();
      const inputValue = document.querySelector('#new-todo').value;
      const toInsert = this.makeTodo(inputValue, tmpId);

      document.querySelector('#todo-list').insertAdjacentHTML('afterbegin', toInsert);
      document.querySelector('#new-todo').value = '';
      this.animation.fadeIn(document.getElementById(tmpId));

      if (navigator.onLine) {
        fetch('http://128.199.76.9:8002/wkddngus5/todo', {
          method: 'POST',
          headers: {
            Accept: 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: `todo=${inputValue}`,
        }).then(response => response.json()).then((json) => {
          document.getElementById(tmpId).id = json.insertId;
        }).catch((error) => {
          console.log(error);
          location.reload();
        });
      } else {
        console.log(this.indexedDB);
        this.indexedDB.saveTodo(tmpId, inputValue);
        localStorage.setItem(tmpId, inputValue);
        console.log(`${localStorage.getItem(tmpId)} + '/' + ${localStorage.length}`);
      }
    }
  }

  makeTodo(inputContents, id) {
    const data = {
      todo: {
        title: inputContents,
        id,
      },
    };
    return this.todoTemplate(data);
  }

  static putTodo(id, completed) {
    fetch(`http://128.199.76.9:8002/wkddngus5/todo/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: `completed=${completed}`,
    }).then(response => response.json()).then((json) => {
      console.log(json);
    }).catch((error) => {
      console.log(error);
      location.reload();
    });
  }

  static toggleCompleteTodo(e) {
    if (e.target.className === 'toggle') {
      if (e.target.closest('li').classList.contains('completed')) {
        e.target.closest('li').classList.remove('completed');
        Todo.putTodo(e.target.closest('li').id, 0);
      } else {
        e.target.closest('li').classList.add('completed');
        Todo.putTodo(e.target.closest('li').id, 1);
      }
    }
  }

  deleteTodo(e) {
    if (e.target.className === 'destroy') {
      const toDelete = e.target.closest('li');
      const id = toDelete.id;
      this.animation.fadeOut(toDelete);

      fetch(`http://128.199.76.9:8002/wkddngus5/todo/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      }).then(response => response.json()).then((json) => {
        console.log(json);
      }).catch((error) => {
        console.log(error);
        location.reload();
      });
    }
  }
}
