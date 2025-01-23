import './style.css'
import { createTodoitem } from './util';

document.addEventListener('DOMContentLoaded', () => {
  const localStorageKey = 'todoList';
  const list = document.querySelector('.todo-list') as HTMLUListElement;
  const input = document.querySelector('.todo-input') as HTMLInputElement;

  /* Add a todo item */
  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const text = input.value;
      if (text) {
        const itemTodo = createTodoitem(text, false
        );
        list.innerHTML += itemTodo;
        input.value = '';
      }
      saveTodoList();
    }
  })

  /* Delete a todo item */
  list.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.nodeName === 'svg' && target.parentElement?.classList.contains('delete')) {
      const todoItem = target.parentElement.parentElement as HTMLElement;
      list.removeChild(todoItem);
    }
    saveTodoList();
  })

  /* Make a todo item completed */
  list.addEventListener('dblclick', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.nodeName === 'LI') {
      target.classList.toggle('completed');
    }
    saveTodoList();
  });

  /* Load todo list from local storage */
  const loadTodoList = () => {
    const todoList = localStorage.getItem(localStorageKey)
    if (todoList) {
      const todoItems = JSON.parse(todoList) as {text: string, completed: boolean}[];
      todoItems.forEach(({text, completed}) => {
        const itemTodo = createTodoitem( text, completed);
        list.innerHTML += itemTodo;
      })
    }
  }

  /* Save todo list to local storage */
  const saveTodoList = () => {
    const todoItems = list.querySelectorAll('.todo-item') as NodeListOf<HTMLLIElement>;
    const todoList: {
      text: string;
      completed: boolean;
    }[] = [];
    todoItems.forEach((item) => {
      const text = item.querySelector('.text')?.textContent;
      text && todoList.push({ text, completed: item.classList.contains('completed') });
    });
    localStorage.setItem(localStorageKey, JSON.stringify(todoList));
  }

  loadTodoList();
})