export abstract class PhysicObject {
  position: Vector2;
  radius: number;
  moveVector: Vector2;

  constructor(position: Vector2, radius: number) {
    this.position = position;
    this.radius = radius;
    this.moveVector = { x: 0, y: 0 };
  }

  abstract addForce(force: Vector2): void;
  abstract updatePosition(): void;
  abstract checkBorders(bounceForce: number): void;
}
