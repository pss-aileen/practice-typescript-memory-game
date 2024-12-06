import './style.css';
import { GameManager } from './classes/GameManaget';

const cardNumber = document.getElementById('card-number') as HTMLInputElement;
new GameManager(parseInt(cardNumber.value));

const btn = document.getElementById('set-card-number');
btn &&
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    new GameManager(parseInt(cardNumber.value));
  });
