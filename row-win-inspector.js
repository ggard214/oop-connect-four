export class RowWinInspector {
    constructor(columns) {
        this.columns = columns;
    }

    inspect () {
        for (let row = 0; row < 6; row++) {
            const token1 = this.columns[0].getTokenAt(row)
            const token2 = this.columns[1].getTokenAt(row)
            const token3 = this.columns[2].getTokenAt(row)
            const token4 = this.columns[3].getTokenAt(row)
            
            if (token1 === token2 && token2 === token3 && token3 === token4 && token1 !== null) {
                return token1;
            }
        }
        return 0;
    }
}