export class Message {
  static messageElement: HTMLElement;
  static turnCountElement: HTMLElement;
  constructor() {
    Message.messageElement = document.getElementById('message') as HTMLElement;
    Message.turnCountElement = document.getElementById('turn-count') as HTMLElement;
  }

  static renderMessage(text: string) {
    this.messageElement.textContent = text;
  }

  static renderTurnCount(count: number) {
    this.turnCountElement.textContent = String(count);
  }

  // メッセージの種類はここに全て格納しておいて、キーワードを入れると表示されるようにしたいね
}
