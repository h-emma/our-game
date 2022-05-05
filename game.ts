import { Application, Sprite } from 'pixi.js';
import { Player } from './src/classes/Player';

const app = new Application();
document.body.appendChild(app.view);

app.renderer.resize(1200, 800);

const player: Player = new Player(
  { x: 0, y: 0 },
  './assets/images/Yrgonaut.png',
  50
);
app.stage.addChild(player.sprite);

player.addForce({ x: 1, y: 2 });
app.ticker.add(() => {
  player.updatePosition();
});
