import Doc from './userscript-modules/doc';

(function () {
   'use strict';
   const params: IParams = { choice: '', url: window.location.href };
   Doc.setEventListener(params);
})();
