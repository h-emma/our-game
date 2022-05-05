export abstract class PhysicObject {
  position: Vector2;
  moveVector: Vector2;

  constructor(position: Vector2) {
    this.position = position;
    this.moveVector = { x: 0, y: 0 };
  }

  abstract addForce(force: Vector2): void;
  abstract updatePosition(): void;
}
