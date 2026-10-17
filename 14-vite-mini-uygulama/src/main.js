
import './style.css';

const form = document.querySelector('#gorev-formu');
const input = document.querySelector('#gorev-input');
const liste = document.querySelector('#gorev-listesi');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const gorev = input.value.trim();

  if (gorev === '') {
    alert('Lütfen bir görev yaz!');
    return;
  }

  const li = document.createElement('li');
  li.textContent = gorev;

  const silButton = document.createElement('button');
  silButton.textContent = 'Sil';

  silButton.addEventListener('click', function () {
    li.remove();
  });

  li.appendChild(silButton);
  liste.appendChild(li);

  input.value = '';
});
