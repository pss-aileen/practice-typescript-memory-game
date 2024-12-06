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

const audio = new Audio('./src/sound/finish.mp3');
const audio2 = new Audio('./src/sound/flip.mp3');

document.addEventListener(
  'click',
  () => {
    if (audio.readyState === 0) {
      audio.load();
      audio2.load();
      console.log('test');
    }
  },
  {
    once: true,
  }
);

document.getElementById('test')?.addEventListener('click', () => {
  audio.currentTime = 0; // 再生位置をリセット
  audio2.currentTime = 0; // 再生位置をリセット
  audio.play().catch((err) => {
    console.error('Audio playback failed:', err);
  });
  audio2.play().catch((err) => {
    console.error('Audio playback failed:', err);
  });
});
