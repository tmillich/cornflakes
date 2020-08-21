export class Cornflakes {
  id: string;
  name: string;
  age_group: number;
  type: number;
  producer: string;
  created: string;
  updated: string;
  about: string;

  public constructor(init?: Partial<Cornflakes >) {
    Object.assign(this, init);
  }
}
