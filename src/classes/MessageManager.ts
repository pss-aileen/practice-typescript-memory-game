export class MessageManager {
  private static mainMessageElement: HTMLElement = document.getElementById('message') as HTMLElement;
  private static turnMessageElement: HTMLElement = document.getElementById('turn-count') as HTMLElement;
  constructor() {}

  static renderMessage(text: string) {
    MessageManager.mainMessageElement.textContent = text;
  }

  static renderTurnCount(turnCount: number) {
    MessageManager.turnMessageElement.textContent = String(turnCount);
  }
}
