import { Scene, Math } from 'phaser';

export class Game extends Scene
{
  // camera: Phaser.Cameras.Scene2D.Camera;
  // background: Phaser.GameObjects.Image;

  public platforms: Phaser.GameObjects.Group;
  public player
  public cursor
  public stars
  score = 0;
  scoreText : Phaser.GameObjects.Text

  constructor ()  {
    super('Game');
  }

  preload() {
    this.load.image('background', 'assets/bg.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48})
  }

  create() {
    this.cursor = this.input.keyboard?.createCursorKeys();
    this.add.sprite(400, 300, 'background')
    this.scoreText = this.add.text(16, 16, `SCORE ${this.score}`, { fontSize: '32px', fill: '#ffffff'})

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(600, 400, 'platform');
    this.platforms.create(50, 250, 'platform');
    this.platforms.create(750, 220, 'platform');

    let platform = this.platforms.create(400, 570, 'platform').setScale(2).refreshBody()
    platform.body.immovable = true

    this.player = this.physics.add.sprite(100, 514, 'dude')
    this.player.body.gravity.y = 300;
    this.player.body.bounce.y = 0.2; // event kick
    this.player.body.collideWorldBounds = true;
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10, // velocidade
      repeat: -1 // loop repeat
    })
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10, // velocidade
      repeat: -1 // loop repeat
    })
    this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 20, y: 10, stepX: 70 },
    })

    this.stars.children.iterate(child => {
      child.body.gravity.y = 300
      child.setBounceY(Math.FloatBetween(0.4, 0.8))
    })
  }

  update(time: number, delta: number) {
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.stars, this.platforms)
    this.physics.add.overlap(this.player, this.stars, this.collectStart, null, this) // se corpos se colidir porém não faz bloqueio

    this.player.setVelocityX(0)
    if (this.cursor.left.isDown) {
      this.player.setVelocityX(-150)
      this.player.anims.play('left', true)
    }
    else if (this.cursor.right.isDown) {
      this.player.setVelocityX(150)
      this.player.anims.play('right', true)
    } else {
      this.player.anims.play('turn', true)
    }

    if (this.cursor.up.isDown && this.player.body.touching.down) { // if play if contact is platform
      this.player.setVelocityY(-350)
    }
  }

  protected collectStart(player, star) {
    star.disableBody(true, true)
    this.score += 10;
    this.scoreText.setText(`SCORE ${this.score}`)

    if (this.score === 120) {
      // next fase :todo implementation
      setTimeout(() => {
        this.score = 0
        this.scene.restart()
      }, 1000)
    }
  }
}
