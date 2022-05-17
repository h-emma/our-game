import {
  Application,
  filters,
  Loader,
  Container,
  Text,
  Sprite,
  TextStyle,
} from 'pixi.js';
import { PhysicObject } from './src/classes/PhysicObject';
import { Player } from './src/classes/Player';
import { Duck } from './src/classes/Duck';
import { SpringCircle } from './src/classes/SpringCircle';
import { sound } from '@pixi/sound';
import { StartMenu } from './src/classes/StartMenu';

const app = new Application({ backgroundColor: 0x000000 });
const physicsObjs: PhysicObject[] = [];
const menuContainer = new Container();
const winWidth = 1200;
const winHeight = 640;
let levelWasLoaded = false;

document.body.appendChild(app.view);

const startMenu = new StartMenu();

app.stage.addChild(menuContainer);
menuContainer.addChild(startMenu.menuTextWelcome);
menuContainer.addChild(startMenu.menuTextStart);
menuContainer.addChild(startMenu.menuTextHowToPlay);
menuContainer.addChild(startMenu.menuImageYrgonaut);
menuContainer.addChild(startMenu.menuImageDuck);

app.renderer.resize(winWidth, winHeight);

const loader = new Loader();
loader.add('gameTune', './assets/audio/The-Lone-Wolf.mp3');
loader.load(function (loader, resources) {
  sound; //??!
  window.addEventListener('keydown', (e) => {
    if (!levelWasLoaded && e.code === 'Space') {
      // resources.gameTune.sound.resume();
      resources.gameTune.sound.play();
      resources.gameTune.sound.loop = true;

      levelWasLoaded = true;
      menuContainer.parent.removeChild(menuContainer);
      loadLevel();
    }
  });
});

function loadLevel() {
  physicsObjs.push(
    new Player(
      { x: 100, y: 100 },
      50,
      './assets/images/YrgonautInBubble.png',
      2
    )
  );

  physicsObjs.push(
    new Duck({ x: 900, y: 550 }, 30, './assets/images/Duck.png', 2)
  );

  physicsObjs[1].addForce({ x: 100, y: 0 });

  for (let i = 0; i < 20; i++) {
    physicsObjs.push(
      new SpringCircle(
        { x: 600 + i, y: 400 + Math.random() * 2 },
        40,
        './assets/images/Bubble.png',
        0.2,
        0.001,
        0.99
      )
    );
  }

  physicsObjs.forEach((obj) => {
    app.stage.addChild(obj.sprite);
  });

  //mute sound sprite
  const icon = Sprite.from('./assets/images/VolumeMuted.png');
  app.stage.addChild(icon);
  icon.width = 40;
  icon.height = 40;
  icon.interactive = true;
  icon.buttonMode = true;

  let muteAreaX = (window.innerWidth - winWidth) / 2;
  let muteAreaY = (window.innerHeight - winHeight) / 2;
  window.addEventListener('resize', () => {
    muteAreaX = (window.innerWidth - winWidth) / 2;
    muteAreaY = (window.innerHeight - winHeight) / 2;
  });

  window.addEventListener('click', (e) => {
    if (
      e.clientX < icon.width + muteAreaX &&
      e.clientY < icon.height + muteAreaY
    ) {
      sound.toggleMuteAll();
    }
  });
}

app.ticker.add(() => {
  physicsObjs.forEach((obj) => {
    obj.checkBorders(0.6, winWidth, winHeight);
    obj.updatePosition();
    if (obj.tintCounter > 0) {
      obj.tintCounter -= 0.02;
    } else {
      obj.tintCounter = 0;
    }
    obj.collisionTint();
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
        const massInfluence = physicsObjs[j].mass / physicsObjs[i].mass;
        physicsObjs[i].addForce({
          x: dirV.x * collideDistance * massInfluence * 0.1,
          y: dirV.y * collideDistance * massInfluence * 0.1,
        });
        physicsObjs[i].moveVector.x *= 0.96;
        physicsObjs[i].moveVector.y *= 0.96;
        if (collideDistance < -16) {
          physicsObjs[i].tintCounter = 1;
        }
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

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

function lerp(from, to, value) {
  from * (1 - value) + to * value;
}
