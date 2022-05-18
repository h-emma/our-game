import { Text, Sprite, TextStyle } from 'pixi.js';

export class StartMenu {
  style: TextStyle;
  menuTextWelcome: Text;
  menuTextHowToPlay: Text;
  menuTextStart: Text;
  menuImageYrgonaut: Sprite;
  menuImageDuck: Sprite;

  constructor() {
    this.style = new TextStyle({
      fontFamily: 'Courier New',
      fontSize: 40,
      fill: 0xffffff,
      align: 'center',
      lineHeight: 42,
      fontVariant: 'small-caps',
    });
    this.menuTextWelcome = new Text('Welcome fellow Yrgonaut', this.style);
    this.menuTextWelcome.position.x = 413;
    this.menuTextWelcome.position.y = 180;

    this.menuTextHowToPlay = new Text(
      'Help the Yrgonaut to catch the duck\n Use the arrow keys to move the Yrgonaut',
      this.style
    );
    this.menuTextHowToPlay.position.x = 240;
    this.menuTextHowToPlay.position.y = 280;

    this.menuTextStart = new Text(
      'Press the spacebar to start the game',
      this.style
    );
    this.menuTextStart.position.x = 290;
    this.menuTextStart.position.y = 440;

    this.menuImageYrgonaut = Sprite.from('/images/Yrgonaut.png');
    this.menuImageYrgonaut.height = 150;
    this.menuImageYrgonaut.width = 214;
    this.menuImageYrgonaut.anchor.x = 0;
    this.menuImageYrgonaut.anchor.y = 0;
    this.menuImageYrgonaut.position.x = 930;
    this.menuImageYrgonaut.position.y = 480;

    this.menuImageDuck = Sprite.from('/images/Duck.png');
    this.menuImageDuck.height = 50;
    this.menuImageDuck.width = 50;
    this.menuImageDuck.anchor.x = 0;
    this.menuImageDuck.anchor.y = 0;
    this.menuImageDuck.position.x = 30;
    this.menuImageDuck.position.y = 30;
  }
}
