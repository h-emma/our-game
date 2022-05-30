import { Application, Loader, Container, Sprite } from 'pixi.js';
import { PhysicObject } from './src/classes/PhysicObject';
import { Player } from './src/classes/Player';
import { Duck } from './src/classes/Duck';
import { SpringCircle } from './src/classes/SpringCircle';
import { sound } from '@pixi/sound';
import { StartMenu } from './src/classes/StartMenu';

const app = new Application({ backgroundColor: 0x000000 });
let physicsObjs: PhysicObject[] = [];
const menuContainer = new Container();
const winWidth = 1200;
const winHeight = 640;
let winScaleFraction = 1; //The amount the canvas is scaled when smaller browser window
let marginXWidth = 1;
let marginYHeight = 1;
let levelWasLoaded = false;
let currentLevel = 1;
const nrOfLevels = 3; //OBS, don't forget to change!!!
let muteIcon: Sprite;

document.body.appendChild(app.view);

const startMenu = new StartMenu();

app.stage.addChild(menuContainer);
menuContainer.addChild(startMenu.menuTextWelcome);
menuContainer.addChild(startMenu.menuTextStart);
menuContainer.addChild(startMenu.menuTextHowToPlay);
menuContainer.addChild(startMenu.menuImageYrgonaut);
menuContainer.addChild(startMenu.menuImageDuck);

app.renderer.resize(winWidth, winHeight);

scaleCanvasToFitScreen();

window.addEventListener('resize', () => {
  scaleCanvasToFitScreen();
});

const loader = new Loader();
loader.add('gameTune', '/audio/The-Lone-Wolf.mp3');
loader.load(function (loader, resources) {
  loader.progress; //Use 'loader' not get an error on netlify.
  window.addEventListener('keydown', (e) => {
    if (!levelWasLoaded && e.code === 'Space') {
      if (resources.gameTune.sound) {
        resources.gameTune.sound.play();
        resources.gameTune.sound.loop = true;
      }

      levelWasLoaded = true;
      menuContainer.parent.removeChild(menuContainer);
      loadLevel(1);
    }
  });
});

function loadLevel(number: number) {
  for (let i = 0; i < physicsObjs.length; i++) {
    physicsObjs[i].sprite.parent.removeChild(physicsObjs[i].sprite);
  }
  physicsObjs = [];

  fetch(`/levels/level${number}.json`)
    .then((response) => response.json())
    .then((levelData) => {
      physicsObjs.push(
        new Player({ x: 100, y: 100 }, 40, '/images/YrgonautInBubble.png', 2)
      );

      physicsObjs.push(
        new Duck({ x: 900, y: 550 }, 30, '/images/Duck.png', 0.2)
      );
      physicsObjs[physicsObjs.length - 1].addForce({
        x: Math.random() * 4 - 2,
        y: Math.random() * 4 - 2,
      });

      for (let i = 0; i < Object.keys(levelData).length; i++) {
        physicsObjs.push(
          new SpringCircle(
            { x: levelData[i].x * winWidth, y: levelData[i].y * winHeight },
            30,
            '/images/Bubble.png',
            0.2,
            0.001,
            0.99
          )
        );
        physicsObjs[physicsObjs.length - 1].addForce({
          x: Math.random() * 4 - 2,
          y: Math.random() * 4 - 2,
        });
      }

      physicsObjs.forEach((obj) => {
        app.stage.addChild(obj.sprite);
      });

      calculateWinFractionAndMargins();

      //mute sound sprite
      if (!muteIcon) {
        muteIcon = Sprite.from('/images/VolumeMuted.png');
        app.stage.addChild(muteIcon);
        muteIcon.width = 40;
        muteIcon.height = 40;
        muteIcon.interactive = true;
        muteIcon.buttonMode = true;

        window.addEventListener('click', (e) => {
          if (
            e.clientX < muteIcon.width * winScaleFraction + marginXWidth &&
            e.clientY < muteIcon.height * winScaleFraction + marginYHeight
          ) {
            sound.toggleMuteAll();
          }
        });

        window.addEventListener('resize', () => {
          calculateWinFractionAndMargins();
        });
      }
    });
}

function calculateWinFractionAndMargins() {
  if (window.innerWidth < winWidth) {
    marginXWidth = 0;
    winScaleFraction = window.innerWidth / winWidth;
  } else {
    marginXWidth = (window.innerWidth - winWidth) / 2;
  }
  marginYHeight = (window.innerHeight - winHeight * winScaleFraction) / 2;
}

app.ticker.add(() => {
  if (physicsObjs.length > 0) {
    const player = physicsObjs[0] as Player;
    const moveMagnitude = Math.sqrt(
      player.inputHorizontal * player.inputHorizontal +
        player.inputVertical * player.inputVertical
    );
    if (moveMagnitude) {
      const moveDir = {
        x: player.inputHorizontal / moveMagnitude,
        y: player.inputVertical / moveMagnitude,
      };
      player.addForce({ x: moveDir.x * 0.2, y: moveDir.y * 0.2 });
    }

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
    checkPlayerDuckCollision();
    checkCollisions();
  }
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

function scaleCanvasToFitScreen() {
  if (window.innerWidth < winWidth) {
    app.view.style.transform = `scale(${window.innerWidth / winWidth})`;
  } else {
    app.view.style.transform = 'scale(1)';
  }
}

function checkPlayerDuckCollision(): void {
  const playerDuckVector = {
    x: physicsObjs[1].position.x - physicsObjs[0].position.x,
    y: physicsObjs[1].position.y - physicsObjs[0].position.y,
  };
  const playerDuckDist = Math.sqrt(
    playerDuckVector.x * playerDuckVector.x +
      playerDuckVector.y * playerDuckVector.y
  );
  if (playerDuckDist <= 80) {
    if (currentLevel < nrOfLevels) {
      currentLevel++;
      loadLevel(currentLevel);
    } else {
      currentLevel = 0;
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
