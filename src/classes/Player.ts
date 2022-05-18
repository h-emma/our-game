import { Sprite } from 'pixi.js';
import { PhysicObject } from './PhysicObject';

export class Player extends PhysicObject {
  inputArray: string[] = [];
  inputHorizontal = 0;
  inputVertical = 0;

  constructor(position: Vector2, radius: number, img: string, mass: number) {
    super(position, radius, img, mass);
    this.sprite = Sprite.from(img);
    this.sprite.width = radius * 2;
    this.sprite.height = radius * 2;
    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('keydown', (e) => {
      let isInArray = false;
      for (let i = 0; i < this.inputArray.length; i++) {
        if (this.inputArray[i] === e.key) {
          isInArray = true;
          break;
        }
      }
      if (!isInArray) {
        this.inputArray.push(e.key);
      }
      this.inputHorizontal = 0;
      this.inputVertical = 0;
      this.inputArray.forEach((key) => {
        this.setInputAxis(key);
      });
    });
    window.addEventListener('keyup', (e) => {
      for (let i = 0; i < this.inputArray.length; i++) {
        if (this.inputArray[i] === e.key) {
          this.inputArray.splice(i);
          break;
        }
      }
      if (this.inputArray.length === 0) {
        this.inputHorizontal = 0;
        this.inputVertical = 0;
      }
    });
  }

  setInputAxis(key: string): void {
    switch (key) {
      case 'ArrowUp':
        this.inputVertical--;
        break;
      case 'ArrowDown':
        this.inputVertical++;
        break;
      case 'ArrowLeft':
        this.inputHorizontal--;
        break;
      case 'ArrowRight':
        this.inputHorizontal++;
        break;
    }
  }

  checkBorders(bounceDamp: number, winWidth: number, winHeight: number) {
    let hitBorder = false;
    if (this.position.x <= 0) {
      this.moveVector.x = Math.abs(this.moveVector.x);
      hitBorder = true;
    } else if (this.position.x + this.radius * 2 >= winWidth) {
      this.moveVector.x = -Math.abs(this.moveVector.x);
      hitBorder = true;
    } else if (this.position.y <= 0) {
      this.moveVector.y = Math.abs(this.moveVector.y);
      hitBorder = true;
    } else if (this.position.y + this.radius * 2 >= winHeight) {
      this.moveVector.y = -Math.abs(this.moveVector.y);

      hitBorder = true;
    }
    if (hitBorder) {
      this.moveVector.x *= bounceDamp;
      this.moveVector.y *= bounceDamp;
    }
  }

  addForce(force: Vector2) {
    this.moveVector.x += force.x;
    this.moveVector.y += force.y;
  }

  updatePosition() {
    this.position.x += this.moveVector.x;
    this.position.y += this.moveVector.y;
    this.sprite.position.x = this.position.x;
    this.sprite.position.y = this.position.y;
  }

  collisionTint(): void {
    this.tintCounter = 1;
  }
}
