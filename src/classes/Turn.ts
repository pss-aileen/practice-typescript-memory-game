import { TurnType } from "../types/types";

export class Turn {
  static turns: TurnType[] = [];
  id: string;
  element: HTMLButtonElement;
  order: 'first' | 'second';
  constructor(id: string, element: HTMLButtonElement, order: "first" | "second") {
    this.id = id;
    this.element = element;
    this.order = order;
  }

  

}
