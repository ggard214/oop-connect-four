export class DiagonalWinInspector {
    constructor(columns) {
        this.columns = columns;
    }

    inspect () {
        for (let row = 0; row < 3; row++) {
            let token1 = this.columns[0].getTokenAt(row)
            let token2 = this.columns[1].getTokenAt(row + 1)
            let token3 = this.columns[2].getTokenAt(row + 2)
            let token4 = this.columns[3].getTokenAt(row + 3)
            if (token1 === token2 && token2 === token3 && token3 === token4 && token1 !== null) {
                return token1;
            }

            token1 = this.columns[0].getTokenAt(row + 3)
            token2 = this.columns[1].getTokenAt(row + 2)
            token3 = this.columns[2].getTokenAt(row + 1)
            token4 = this.columns[3].getTokenAt(row)
            if (token1 === token2 && token2 === token3 && token3 === token4 && token1 !== null) {
                return token1;
            }

        }
        return 0;
    }
}