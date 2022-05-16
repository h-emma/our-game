import { Sprite } from 'pixi.js';
import { PhysicObject } from './PhysicObject';

export class Duck extends PhysicObject {
  constructor(position: Vector2, radius: number, img: string, mass: number) {
    super(position, radius, img, mass);
    this.sprite = Sprite.from(img);
    this.sprite.width = radius * 2;
    this.sprite.height = radius * 2;
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
