import { Application, Sprite } from 'pixi.js';
import { Player } from './src/classes/Player';

const app = new Application({ backgroundColor: 0x000000 });
document.body.appendChild(app.view);

app.renderer.resize(1200, 800);

const player: Player = new Player(
  { x: 100, y: 100 },
  50,
  './assets/images/Yrgonaut.png'
);
app.stage.addChild(player.sprite);

player.addForce({ x: 1, y: 2 });
app.ticker.add(() => {
  player.checkBorders(1);
  player.updatePosition();
});
