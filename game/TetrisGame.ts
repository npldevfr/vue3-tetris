import {Board} from "~/game/Board";
import {Tetromino} from "~/game/Tetromino";
import {IPoint, TetrominoType} from "~/game/Tetris";

export class TetrisGame {
    board: Board;
    currentTetromino: Tetromino;
    interval: number;
    isGameOver: boolean;
    isPaused: boolean;
    nextTetromino: Tetromino;
    elapsedTime: number;

    constructor(board: Board) {
        this.board = board;
        this.currentTetromino = this.generateRandomTetromino();
        this.nextTetromino = this.generateRandomTetromino();
        this.interval = 1000;
        this.elapsedTime = 0;
        this.isPaused = false;
        this.isGameOver = false;
    }

    start(): void {
        this.gameLoop();
    }

    gameLoop(): void {
        if (this.isGameOver) {
            return;
        }

        setTimeout(() => {
            if (!this.isPaused) {
                this.elapsedTime += this.interval / 1000;

                if (!this.moveTetromino({x: 0, y: 1})) {
                    this.board.merge(this.currentTetromino);
                    this.board.clearFullRows(); // Ajoutez cette ligne
                    this.currentTetromino = this.nextTetromino;
                    this.nextTetromino = this.generateRandomTetromino();

                    if (!this.board.isValidMove(this.currentTetromino, this.currentTetromino.position)) {
                        this.isGameOver = true;
                        return;
                    }
                }
            }

            this.gameLoop();
        }, this.interval);
    }

    togglePause(): void {
        this.isPaused = !this.isPaused;
    }

    moveTetromino(offset: IPoint): boolean {
        const newPosition = {
            x: this.currentTetromino.position.x + offset.x,
            y: this.currentTetromino.position.y + offset.y,
        };

        if (this.board.isValidMove(this.currentTetromino, newPosition)) {
            this.currentTetromino.position = newPosition;
            return true;
        }

        return false;
    }

    rotateTetromino(): void {
        this.currentTetromino.rotate();
        if (!this.board.isValidMove(this.currentTetromino, this.currentTetromino.position)) {
            this.currentTetromino.rotate(); // Revert back if the rotation is not valid
        }
    }

    generateRandomTetromino(): Tetromino {
        const randomType = Math.floor(Math.random() * Object.keys(TetrominoType).length / 2);
        return new Tetromino(randomType);
    }
}
