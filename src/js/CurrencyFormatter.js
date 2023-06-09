const amount = 352540.20;
console.log(amount.toString().match(/\d+/g));

export default class CurrencyFormatter {
   constructor () {
      this._decimals_regex = /\d+\.?\d{0,2}/g;
      this._buffer = [];
      this._segment_buffer = [];
   }
   
   convert(_amount, _formatRegion) {
      _amount = _amount.toString().match( this._decimals_regex );
      console.log(_amount);
      
      Array.from( _amount ).reverse().forEach((_number, _index, _this_array) => {
         if (_number !== '.' && _number !== ',') {
            this._segment_buffer.push(_number);

            /* Divisible by 3 || Last number */
            if ((_index + 1) % 3 === 0 || _index === _this_array.length - 1) {

               /* Segment buffer not empty */
               if (this._segment_buffer.length !== 0) {
                  this._buffer.push(this._segment_buffer);
                  this._segment_buffer = [];
   
                  /* Last number */
                  if (_index !== _this_array.length - 1) {
                     this._buffer.push([_formatRegion[1]]);
                  }
               }
            }
         } else if (this._segment_buffer.length > 0) {
            this._buffer.push(this._segment_buffer);
            this._buffer.push([_formatRegion[0]]);
            this._segment_buffer = [];
         }
         // console.log(this._buffer);
      });

      this._buffer.map(_segment => {
         return _segment.reverse();
      });

      let result = this.reduceBuffer( this.reduceSegmentsBuffer( this._buffer.reverse() ) );
      console.log(result);
      return result;
   }

   reduceSegmentsBuffer (_buffer) {
      return _buffer.map(segment => {
         return segment?.reduce((previous_number, current_number) => previous_number + current_number);
      });
   }

   reduceBuffer (_buffer) {
      return _buffer?.reduce((previous_segment, current_segment) => previous_segment + current_segment);
   }
}

let moneyConverter = new CurrencyFormatter();
moneyConverter.convert(amount, ['.', ',']);
