export default function convert (_amount) {
   let [_amountLeft, _amountRight] = _amount.toString().split('.');

   if (!_amountRight) { _amountRight = '00' };

   _amountRight = Array.from(_amountRight + '0').splice(0,2).join('');

   let _left = Array.from(_amountLeft).reverse().map((num, i, this_arr) => {
      if ((i + 1) % 3 === 0 && (i + 1) !== this_arr.length) {
         return [num, ','];
      }
      return num
   });

   return `${_left.flat().reverse().join('')}.${_amountRight}`;
}