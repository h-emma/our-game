import { Application, Sprite } from 'pixi.js';
import { PhysicObject } from './src/classes/PhysicObject';
import { Player } from './src/classes/Player';
import { SpringCircle } from './src/classes/SpringCircle';

const app = new Application({ backgroundColor: 0x000000 });
document.body.appendChild(app.view);

app.renderer.resize(1200, 800);

const physicsObjs: PhysicObject[] = [];

physicsObjs.push(
  new Player({ x: 100, y: 100 }, 50, './assets/images/Yrgonaut.png')
);

for (let i = 0; i < 10; i++) {
  physicsObjs.push(
    new SpringCircle(
      { x: 600 + i * 10, y: 400 + Math.random() * 2 },
      50,
      './assets/images/Yrgonaut.png',
      0.001,
      0.99
    )
  );
}

physicsObjs.forEach((obj) => {
  app.stage.addChild(obj.sprite);
});

physicsObjs[0].addForce({ x: 1, y: 2 });
app.ticker.add(() => {
  physicsObjs.forEach((obj) => {
    obj.checkBorders(0.6);
    obj.updatePosition();
  });
  checkCollisions();
});

function checkCollisions(): void {
  for (let i = 0; i < physicsObjs.length; i++) {
    for (let j = 0; j < physicsObjs.length; j++) {
      if (physicsObjs[i] === physicsObjs[j]) {
        continue;
      }
      const betweenVector = getBetweenVector(
        physicsObjs[i].position,
        physicsObjs[j].position
      );
      const m = magnitude(betweenVector);
      const collideDistance =
        m - (physicsObjs[i].radius + physicsObjs[j].radius);
      if (collideDistance < 0) {
        const dirV = normalizeM(betweenVector, m);
        physicsObjs[i].addForce({
          x: dirV.x * collideDistance * 0.1,
          y: dirV.y * collideDistance * 0.1,
        });
        physicsObjs[i].moveVector.x *= 0.96;
        physicsObjs[i].moveVector.y *= 0.96;
      }
    }
  }
}

function magnitude(v: Vector2): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function getBetweenVector(fromV: Vector2, toV: Vector2) {
  return { x: toV.x - fromV.x, y: toV.y - fromV.y };
}

function normalizeM(v: Vector2, m: number): Vector2 {
  return { x: v.x / m, y: v.y / m };
}
