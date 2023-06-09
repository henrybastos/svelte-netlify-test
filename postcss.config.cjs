const postcssNested = require('postcss-nested');
const postcssNestedProps = require('postcss-nested-props');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const postcssMixin = require('postcss-mixins');
const postcssExtend = require('postcss-extend');

module.exports = {
   plugins: [
      postcssImport,
      postcssExtend,
      postcssNested,
      postcssNestedProps,
      // postcssMixin,
      autoprefixer,
   ]
}