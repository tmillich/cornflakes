export class Alert {
  open: boolean;
  titel: string;
  message: string;

  public constructor(open: boolean, titel?: string, message?: string) {
    this.open = open;
    if(titel) this.titel = titel;
    if(message) this.message = message;
  }
}
