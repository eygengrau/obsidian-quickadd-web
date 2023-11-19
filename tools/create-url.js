const url = 'https://developer.mozilla.org/en-US/docs/Web/CSS/:has';
const selection = '';
const params = serialize({ url, selection });
const start = 'obsidian://quickadd-web?';
console.log(start + params);

function serialize(obj, prefix) {
   var str = [],
      p;
   for (p in obj) {
      if (obj.hasOwnProperty(p)) {
         var k = prefix ? prefix + '[' + p + ']' : p,
            v = obj[p];
         str.push(
            v !== null && typeof v === 'object'
               ? serialize(v, k)
               : encodeURIComponent(k) + '=' + encodeURIComponent(v)
         );
      }
   }
   return str.join('&');
}
