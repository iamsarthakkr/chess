export class Coord extends String {
   constructor(x: number, y: number) {
      super(String.fromCharCode(x + "a".charCodeAt(0)) + (y + 1));
   }

   public get x() {
      return this.charCodeAt(0) - "a".charCodeAt(0);
   }

   public get y() {
      return parseInt(this[1]) - 1;
   }
}
