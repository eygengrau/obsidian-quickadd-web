export default class Obsidian {
   private static uriStart = 'obsidian://quickadd-web?';

   private static serialize(obj: IParams, prefix: string): string {
      const str = [];
      let p: keyof IParams;
      for (p in obj) {
         if (obj.hasOwnProperty(p)) {
            const k = prefix ? prefix + '[' + p + ']' : p;
            const v = obj[p];
            if (v === undefined || v === null) continue;
            str.push(
               typeof v === 'object'
                  ? this.serialize(v, k)
                  : encodeURIComponent(k) + '=' + encodeURIComponent(v)
            );
         }
      }
      return str.join('&');
   }

   public static getUri(params: IParams) {
      return this.uriStart + this.serialize(params, '');
   }
}
