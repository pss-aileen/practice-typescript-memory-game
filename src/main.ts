import './style.css';
import { GameManager } from './classes/GameManaget';

const cardNumber = document.getElementById('card-number') as HTMLInputElement;
const gameManager = new GameManager(parseInt(cardNumber.value));

const btn = document.getElementById('set-card-number');
btn &&
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const gameManager = new GameManager(parseInt(cardNumber.value));
  });
