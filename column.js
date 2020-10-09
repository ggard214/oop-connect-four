export class Column {
  constructor() {
    this.tokenManagement = [null, null, null, null, null, null];
  }

  add(currentPlayer) {
      for(let i = 0; i < this.tokenManagement.length; i++) {
          let token = this.getTokenAt(i);
          if (token !== null) {
              this.tokenManagement[i - 1] = currentPlayer;
              break;
          }
          if (i === this.tokenManagement.length - 1) {
              this.tokenManagement[this.tokenManagement.length - 1] = currentPlayer;
          }
      }
  }

  getTokenAt(index) {
      return this.tokenManagement[index];
  }

  isFull() {
      return this.tokenManagement[0] !== null;
  }
}