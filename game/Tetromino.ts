import {IPoint, ITetromino, TETROMINOES, TetrominoType} from "~/game/Tetris";

export class Tetromino implements ITetromino {
    shape: number[][];
    rotation: number;
    position: IPoint;

    constructor(public type: TetrominoType) {
        this.shape = TETROMINOES[type][0];
        this.rotation = 0;
        this.position = { x: 3, y: 0 }; // Position initiale du tétrimino
    }

    getColor(): string {
        return `tetromino-${TetrominoType[this.type].toLowerCase()}`;
    }

    rotate(): void {
        this.rotation = (this.rotation + 1) % TETROMINOES[this.type].length;
        this.shape = TETROMINOES[this.type][this.rotation];
    }
}
