import { login, onUserChanged } from './firebase.js';

async function loadTasks() {
  const res = await fetch('./src/tasks.json');
  const data = await res.json();
  return data.courses;
}

function renderCourseList(courses) {
  const app = document.getElementById('app');
  app.innerHTML = '';
  courses.forEach(course => {
    const div = document.createElement('div');
    div.className = 'card-course p-4 bg-white rounded-lg shadow mb-4';
    div.innerHTML = `<h3 class="font-bold text-lg">${course.title}</h3>`;
    div.addEventListener('click', () => renderTasks(course));
    app.appendChild(div);
  });
}

function renderTasks(course) {
  const app = document.getElementById('app');
  app.innerHTML = `<h2 class="text-xl font-bold mb-2">${course.title}</h2>`;
  course.days.forEach((task, i) => {
    const div = document.createElement('div');
    div.className = 'card-task p-4 bg-white rounded-lg shadow mb-2 flex justify-between';
    div.innerHTML = `<span>Day ${i + 1}: ${task.text}</span>`;
    const btn = document.createElement('button');
    btn.className = 'btn-primary';
    btn.textContent = '完了';
    btn.onclick = () => alert('Good job!');
    div.appendChild(btn);
    app.appendChild(div);
  });
}

export async function initApp() {
  const courses = await loadTasks();
  renderCourseList(courses);
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
}

window.initApp = initApp;
window.login = login;
onUserChanged(user => {
  console.log('user', user);
});
