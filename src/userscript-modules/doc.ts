import Obsidian from './obsidian';

export default class Doc {
   private static callback: () => void;

   private static setCallback(params: IParams) {
      this.callback = () => {
         const uri = Obsidian.getUri(params);
         console.log(uri);
         location.href = uri;
      };
   }

   private static setShortcut() {
      document.addEventListener('keydown', (event: KeyboardEvent) => {
         if (event.altKey && event.key === 'ö') this.callback();
      });
   }

   public static setEventListener(params: IParams) {
      this.setCallback(params);
      this.setShortcut();
   }
}
