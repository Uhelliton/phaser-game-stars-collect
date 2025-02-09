import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    scene: [
        Boot,
        MainGame,
    ]
};

export default new Game(config);
