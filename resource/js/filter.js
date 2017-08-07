/**
 * Created by Naver on 2017. 8. 2..
 */
export default class Filter {
  constructor() {
    this.selectedIndex = 0;
    this.init();
  }

  init() {
    history.pushState({ method: 'all' }, null, 'index.html');
    document.querySelector('#filters').addEventListener('click', (e) => {
      e.preventDefault();
      this.changeFilterStatus(e);
    });

    window.addEventListener('popstate', (e) => {
      this.changeURLFilter(e);
    });
  }

  changeFilterStatus(e) {
    e.preventDefault();
    const target = e.target;
    if (target.tagName.toLowerCase() === 'a') {
      const href = target.getAttribute('href');
      switch (href) {
        case 'index.html':
          this.allView();
          history.pushState({ method: 'all' }, null, 'index.html');
          break;
        case 'active':
          this.activeView();
          history.pushState({ method: 'active' }, null, 'all-active');
          break;
        case 'completed':
          this.completedView();
          history.pushState({ method: 'completed' }, null, 'completed');
          break;
        default:
      }
    }
  }

  allView() {
    document.querySelector('#todo-list').className = '';
    this.selectedNavigator(0);
  }

  activeView() {
    document.querySelector('#todo-list').className = 'all-active';
    this.selectedNavigator(1);
  }

  completedView() {
    document.querySelector('#todo-list').className = 'all-completed';
    this.selectedNavigator(2);
  }

  selectedNavigator(index) {
    const navigatorList = document.querySelectorAll('#filters a');
    navigatorList[this.selectedIndex].classList.remove('selected');
    navigatorList[index].classList.remove('selected');
    navigatorList[index].classList.add('selected');
    this.selectedIndex = index;
  }

  changeURLFilter(e) {
    if (!e.state) {
      this.activeView();
      return;
    }
    const method = e.state.method;
    this[`${method}View`]();
  }
}
