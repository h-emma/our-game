import { Sprite } from 'pixi.js';
import { PhysicObject } from './PhysicObject';

export class Player extends PhysicObject {
  position: Vector2;
  sprite: Sprite;

  constructor(position: Vector2, img: string, radius: number) {
    super(position);
    this.position = position;
    this.moveVector = { x: 0, y: 0 };
    this.sprite = Sprite.from(img);
    this.sprite.width = radius * 2;
    this.sprite.height = radius * 2;
    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('keydown', (e) => {
      this.motion(e.key, 0.5);
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
}
