// window.onload = () => {
//   init();
// }
//
// export default class addTodo {
//   constructor() {
//
//   }
// }
//
// const init = () => {
//   const ENTER_KEY_CODE = 13;
//   const todoTemplate = Handlebars.compile(document.querySelector("#todo-template").innerHTML);
//   document.querySelector("#new-todo").addEventListener("keypress", e => {
//     if(e.which == ENTER_KEY_CODE) {
//       postTodo(e);
//     }
//   });
//   const todoTemplate = Handlebars.compile(document.querySelector("#todo-template").innerHTML);
//   const nowStep = todoTemplate({
//     "todo": "aaaa"
//   });
//   console.log("NOW STEP: ", nowStep);
// }
//
// const postTodo = e => {
//   console.log("NEW-TODO: ", document.querySelector("#new-todo").value);
// }

export default class AddTodo {
  constructor() {
    console.log("asdf");
    this.test = "TEST";
  }

  // init = () => {
  //   document.querySelector("#new-todo").addEventListener("keypress", e => {
  //   if (e.which == this.ENTER_KEY_CODE) {
  //     this.postTodo(e);
  //   }
  //   });
  // }
  //
  // postTodo = e => {
  //   console.log("CLICK!");
  // }
}