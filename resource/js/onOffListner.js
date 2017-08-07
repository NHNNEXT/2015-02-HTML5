import IndexedDB from './indexedDB';

export default class OnOffListner {
  constructor() {
    this.indexedDB = new IndexedDB();

    this.init();
  }

  init() {
    window.addEventListener('online', this.onoffListner.bind(this));
    window.addEventListener('offline', this.onoffListner.bind(this));
  }

  onoffListner() {
    document.getElementById('header').classList[navigator.onLine ? 'remove' : 'add']('offline');
    if (navigator.onLine) {
      this.a = this.indexedDB.getAllTodo();

      // const fetchList = [];
      //
      // for (let i = 0, len = localStorage.length; i < len; i += 1) {
      //   console.log('localStorage values: ', localStorage.getItem(localStorage.key(i)));
      //   fetchList[i] = fetch('http://128.199.76.9:8002/wkddngus5/todo', {
      //     method: 'POST',
      //     headers: {
      //       Accept: 'application/json, application/xml, text/plain, text/html, *.*',
      //       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //     },
      //     body: `todo=${localStorage.getItem(localStorage.key(i))}`,
      //   });
      // }
      //
      // Promise.all(fetchList)
      //   .then(responses => Promise.all(responses.map(response => response.json())))
      //   .then((jsonList) => {
      //     for (let i = 0, len = localStorage.length; i < len; i += 1) {
      //       console.log(jsonList);
      //       document.getElementById(localStorage.key(i)).id = jsonList[i].insertId;
      //     }
      //   });
    }
  }
}
