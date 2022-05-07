import { Sprite } from 'pixi.js';
import { PhysicObject } from './PhysicObject';

export class SpringCircle extends PhysicObject {
  anchorPos: Vector2;
  springForceMultiplier: number;
  damp: number;

  constructor(
    position: Vector2,
    radius: number,
    img: string,
    springForceMultiplier: number,
    damp: number
  ) {
    super(position, radius, img);
    this.sprite = Sprite.from(img);
    this.sprite.width = radius * 2;
    this.sprite.height = radius * 2;
    this.anchorPos = { x: position.x, y: position.y };
    this.springForceMultiplier = springForceMultiplier;
    this.damp = damp;
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

  spring() {
    const deltaV: Vector2 = {
      x: this.anchorPos.x - this.position.x,
      y: this.anchorPos.y - this.position.y,
    };
    const magnitude: number = Math.sqrt(
      deltaV.x * deltaV.x + deltaV.y * deltaV.y
    );
    const dir: Vector2 = { x: deltaV.x / magnitude, y: deltaV.y / magnitude };
    const forceV = {
      x: dir.x * magnitude * this.springForceMultiplier * this.damp,
      y: dir.y * magnitude * this.springForceMultiplier * this.damp,
    };
    if (magnitude !== 0) {
      this.addForce(forceV);
    }
  }

  addForce(force: Vector2) {
    this.moveVector.x += force.x;
    this.moveVector.y += force.y;
  }

  updatePosition() {
    this.spring(this.springForceMultiplier);
    this.moveVector.x *= this.damp;
    this.moveVector.y *= this.damp;
    this.position.x += this.moveVector.x;
    this.position.y += this.moveVector.y;
    this.sprite.position.x = this.position.x;
    this.sprite.position.y = this.position.y;
  }
}
