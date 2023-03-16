import {IPoint, ITetromino} from "~/game/Tetris";

export class Board {
    grid: number[][];
    score: number;
    eventListeners: { [event: string]: Array<(data?: any) => void> } = {};


    constructor(public width: number, public height: number) {
        this.grid = Array.from({ length: height }, () => new Array(width).fill(0));
        this.score = 0;
    }

    on(event: string, callback: (data?: any) => void) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(callback);
    }

    emit(event: string, data?: any) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach((callback) => callback(data));
        }
    }


    isValidMove(tetromino: ITetromino, newPosition: IPoint): boolean {
        for (let y = 0; y < tetromino.shape.length; y++) {
            for (let x = 0; x < tetromino.shape[y].length; x++) {
                const newY = newPosition.y + y;
                const newX = newPosition.x + x;

                if (tetromino.shape[y][x] && (newY < 0 || newY >= this.height || newX < 0 || newX >= this.width || this.grid[newY][newX])) {
                    return false;
                }
            }
        }
        return true;
    }

    clearFullRows(): number {
        let fullRowCount = 0;
        for (let y = 0; y < this.height; y++) {
            let isRowFull = true;
            for (let x = 0; x < this.width; x++) {
                if (!this.grid[y][x]) {
                    isRowFull = false;
                    break;
                }
            }
            if (isRowFull) {
                this.grid.splice(y, 1);
                this.grid.unshift(new Array(this.width).fill(0));
                fullRowCount++;
                this.emit("lineCleared", { rowIndex: y });
            }
        }

        // Augmenter le score en fonction du nombre de lignes complètes supprimées
        this.score += fullRowCount * 100; // Vous pouvez ajuster la valeur des points ici

        return fullRowCount;
    }

    merge(tetromino: ITetromino): void {
        this.emit("tetrominoMerged", { tetromino });
        for (let y = 0; y < tetromino.shape.length; y++) {
            for (let x = 0; x < tetromino.shape[y].length; x++) {
                if (tetromino.shape[y][x]) {
                    this.grid[tetromino.position.y + y][tetromino.position.x + x] = 1;
                }
            }
        }
    }
}
