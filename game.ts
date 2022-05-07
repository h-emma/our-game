import { Application, Sprite } from 'pixi.js';
import { PhysicObject } from './src/classes/PhysicObject';
import { Player } from './src/classes/Player';
import { SpringCircle } from './src/classes/SpringCircle';

const app = new Application({ backgroundColor: 0x000000 });
document.body.appendChild(app.view);

app.renderer.resize(1200, 800);

const sceneObjs: PhysicObject[] = [];

sceneObjs.push(
  new Player({ x: 100, y: 100 }, 50, './assets/images/Yrgonaut.png')
);

sceneObjs.push(
  new SpringCircle(
    { x: 600, y: 400 },
    50,
    './assets/images/Yrgonaut.png',
    0.05,
    0.95
  )
);

sceneObjs.forEach((obj) => {
  app.stage.addChild(obj.sprite);
});

sceneObjs[0].addForce({ x: 1, y: 2 });
sceneObjs[1].addForce({ x: 100, y: 100 });
app.ticker.add(() => {
  sceneObjs.forEach((obj) => {
    obj.checkBorders(0.6);
    obj.updatePosition();
  });
});
