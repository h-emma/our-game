import { Sprite } from 'pixi.js';

export abstract class PhysicObject {
  position: Vector2;
  radius: number;
  moveVector: Vector2;
  sprite: Sprite;
  mass: number;
  tintCounter: number;

  constructor(position: Vector2, radius: number, img: string, mass: number) {
    this.position = position;
    this.radius = radius;
    this.moveVector = { x: 0, y: 0 };
    this.sprite = Sprite.from(img);
    this.mass = mass;
    this.tintCounter = 0;
  }

  abstract addForce(force: Vector2): void;
  abstract updatePosition(): void;
  abstract checkBorders(bounceDamp: number): void;
  abstract collisionTint(): void;
}
