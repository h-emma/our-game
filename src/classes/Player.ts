import { Sprite } from 'pixi.js';
import { PhysicObject } from './PhysicObject';

export class Player extends PhysicObject {
  constructor(position: Vector2, radius: number, img: string, mass: number) {
    super(position, radius, img, mass);
    this.sprite = Sprite.from(img);
    this.sprite.width = radius * 2;
    this.sprite.height = radius * 2;
    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('keydown', (e) => {
      this.motion(e.key, Math.random() * 0.05 + 0.5);
    });
  }

  motion(key: string, power: number): void {
    switch (key) {
      case 'ArrowUp':
        this.addForce({ x: 0, y: -power });
        break;
      case 'ArrowDown':
        this.addForce({ x: 0, y: power });
        break;
      case 'ArrowLeft':
        this.addForce({ x: -power, y: 0 });
        break;
      case 'ArrowRight':
        this.addForce({ x: power, y: 0 });
        break;
    }
  }

  checkBorders(bounceDamp: number) {
    let hitBorder = false;
    if (this.position.x <= 0) {
      this.moveVector.x = Math.abs(this.moveVector.x);
      hitBorder = true;
    } else if (this.position.x + this.radius * 2 >= 1200) {
      this.moveVector.x = -Math.abs(this.moveVector.x);
      hitBorder = true;
    } else if (this.position.y <= 0) {
      this.moveVector.y = Math.abs(this.moveVector.y);
      hitBorder = true;
    } else if (this.position.y + this.radius * 2 >= 800) {
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
