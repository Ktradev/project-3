/* 
https://stackoverflow.com/questions/9901082/what-is-this-javascript-require
require() is not part of the standard JavaScript API. 
But in Node.js, it's a built-in function with a 
special purpose: to load modules.*/

const {src, dest, watch, series, parallel} = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');

const files = {
	csspath: './css/**/*.css',
}

function csstask(){
	const plugin = [
		autoprefixer(),
		cssnano(),
		tailwindcss(),
	];
	return src(files.csspath)
		.pipe(postcss(plugin))
		.pipe(dest('./dist'));
}

function watchtask(){
	watch([files.csspath],
		parallel(csstask));
}

exports.default = series(
	parallel(csstask),
	watchtask
);