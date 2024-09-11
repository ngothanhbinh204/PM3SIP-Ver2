const { src, dest, task, watch, series, parallel } = require("gulp");
const del = require("del"); //For Cleaning build/dist for fresh export
const options = require("./config"); //paths and other options from config.js
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

const pug = require("gulp-pug"); //For Compiling PUG files
const sass = require("gulp-sass")(require('node-sass')); //For Compiling SASS files
const postcss = require("gulp-postcss"); //For Compiling tailwind utilities with tailwind config
const cssSort = require("css-declaration-sorter"); //For Sorting CSS properties
const concat = require("gulp-concat"); //For Concatinating js,css files
const uglify = require("gulp-terser"); //To Minify JS files
const imagemin = require("gulp-imagemin"); //To Optimize Images
const cleanCSS = require("gulp-clean-css"); //To Minify CSS files
const purgecss = require("gulp-purgecss"); // Remove Unused CSS from Styles
const cssnano = require("cssnano"); //For Compiling reduce its size Css
const sourcemaps = require("gulp-sourcemaps"); //For Compiling build maps

//Note : Webp still not supported in major browsers including forefox
//const webp = require('gulp-webp'); //For converting images to WebP format
//const replace = require('gulp-replace'); //For Replacing img formats to webp in html
const logSymbols = require("log-symbols"); //For Symbolic Console logs :) :P

//Load Previews on Browser on dev
function livePreview(done) {
	browserSync.init({
		notify: true,
		server: {
			baseDir: options.paths.dist.base,
		},
		port: options.config.port || 8888,
	});
	done();
}

// Triggers Browser reload
function previewReload(done) {
	console.log("\n\t" + logSymbols.success, "Reloading Browser Preview.\n");
	browserSync.reload();
	done();
}

//Development Tasks
function devHTML() {
	return src([
		`${options.paths.src.pages}/*.pug`,
		`!${options.paths.src.pages}/{**/\_*,**/\_*/**}.pug`,
	])
		.pipe(pug({ pretty: "\t" }))
		.pipe(dest([options.paths.dist.base]));
}

function devGlobalStyles() {
	return src(options.config.globalCss, { allowEmpty: true })
		.pipe(concat({ path: "global.min.css" }))
		.pipe(dest([options.paths.dist.css]));
}

function devStyles() {
	const tailwindcss = require("tailwindcss");
	return (src([
		`${options.paths.src.sass}/_tailwind/directives_tailwind.sass`,
		`${options.paths.src.sass}/_core/index.sass`,
		`${options.paths.src.sass}/_**/**.sass`,
		`${options.paths.src.sass}/**/**.sass`,
	])
		.pipe(sourcemaps.init())
		.pipe(concat("main.min.sass"))
		.pipe(sass().on("error", sass.logError))
		.pipe(postcss([
			tailwindcss(options.config.tailwind_js),
			require("autoprefixer"),
			cssSort({
				order: "concentric-css",
			})
		]))
		.pipe(sourcemaps.write("."))
		.pipe(dest(options.paths.dist.css))
		.pipe(reload({ stream: true }))
	);
}

function devGlobalScripts() {
	return src(options.config.globalJs, { allowEmpty: true })
		.pipe(concat({ path: "global.min.js" }))
		.pipe(dest(options.paths.dist.js));
}

function devScripts() {
	return src([`${options.paths.src.js}/**/*.js`])
		.pipe(sourcemaps.init())
		.pipe(concat({ path: "main.min.js" }))
		.pipe(uglify())
		.pipe(sourcemaps.write("."))
		.pipe(dest([options.paths.dist.js]));
}

function devImages() {
	return src([`${options.paths.src.img}/**/*.{svg,png,jpg,gif,jpeg,mp4}`])
		// .pipe(imagemin())
		.pipe(dest([options.paths.dist.img]));
}

function devFonts() {
	return src([`${options.paths.src.fonts}/**`])
		.pipe(dest([options.paths.dist.fonts]));
}

function watchFiles() {
	watch(`${options.paths.src.base}/**/*.pug`, series(devHTML, devStyles, previewReload));
	watch(`${options.config.config_js}`, series(devGlobalStyles, devGlobalScripts, devFonts, previewReload));
	watch([
		`${options.config.tailwind_js}`,
		`${options.paths.src.sass}/_tailwind/directives_tailwind.sass`,
		`${options.paths.src.sass}/_core/index.sass`,
		`${options.paths.src.sass}/**/**.sass`,
	], series(devStyles));
	watch(`${options.paths.src.js}/**/*.js`, series(devScripts, previewReload));
	watch(`${options.paths.src.img}/**/*.{svg,png,jpg,gif,jpeg,mp4}`, series(devImages, previewReload));
	watch(`${options.paths.src.fonts}/**/*`, series(devFonts, previewReload));
	watch(`${options.paths.base}`).on("change", browserSync.reload);
	console.log("\n\t" + logSymbols.success, "Watching for Changes..\n");
}

function devClean() {
	console.log("\n\t" + logSymbols.success, "Cleaning dist folder for fresh start.\n");
	return del([options.paths.dist.base]);
}

//Production Tasks (Optimized Build for Live/Production Sites)
function prodHTML() {
	return src([
		`${options.paths.src.pages}/*.pug`,
		`!${options.paths.src.pages}/{**/\_*,**/\_*/**}.pug`,
	])
		.pipe(pug({ pretty: "\t" }))
		.pipe(dest(options.paths.build.base));
}

function prodGlobalStyles() {
	return src(options.config.globalCss, { allowEmpty: true })
		.pipe(concat({ path: "global.min.css" }))
		.pipe(dest([options.paths.build.css]));
}

function prodStyles() {
	const tailwindcss = require("tailwindcss");
	return (src([
		`${options.paths.src.sass}/_tailwind/directives_tailwind.sass`,
		`${options.paths.src.sass}/_core/index.sass`,
		`${options.paths.src.sass}/_**/**.sass`,
		`${options.paths.src.sass}/**/**.sass`,
	])
		.pipe(sourcemaps.init())
		.pipe(concat("main.min.sass"))
		.pipe(sass().on("error", sass.logError))
		.pipe(postcss([
			tailwindcss(options.config.tailwind_js),
			require("autoprefixer"),
			cssnano(),
		]))
		.pipe(concat({ path: "main.min.css" }))
		.pipe(sourcemaps.write("."))
		.pipe(dest(options.paths.build.css))
	);
}

function prodGlobalScripts() {
	return src(options.config.globalJs, { allowEmpty: true })
		.pipe(concat({ path: "global.min.js" }))
		.pipe(dest(options.paths.build.js));
}

function prodScripts() {
	return src([`${options.paths.src.js}/**/*.js`])
		.pipe(sourcemaps.init())
		.pipe(concat({ path: "main.min.js" }))
		.pipe(uglify())
		.pipe(sourcemaps.write("."))
		.pipe(dest([options.paths.build.js]));
}

function prodImages() {
	return src([`${options.paths.src.img}/**/*.{svg,png,jpg,gif,jpeg,mp4}`])
		.pipe(imagemin())
		.pipe(dest(options.paths.build.img));
}

function prodFonts() {
	return src([`${options.paths.src.fonts}/**`])
		.pipe(dest([options.paths.build.fonts]));
}

function prodClean() {
	console.log("\n\t" + logSymbols.success, "Cleaning build folder for fresh start.\n");
	return del([options.paths.build.base]);
}

function buildFinish(done) {
	console.log("\n\t" + logSymbols.success, `Production build is complete. Files are located at ${options.paths.build.base}\n`);
	done();
}

exports.default = series(
	devClean, // Clean Dist Folder
	parallel(
		devGlobalStyles,
		devStyles,
		devGlobalScripts,
		devScripts,
		devImages,
		devFonts,
		devHTML
	), //Run All tasks in parallel
	livePreview, // Live Preview Build
	watchFiles // Watch for Live Changes
);

exports.prod = series(
	prodClean, // Clean Build Folder
	parallel(
		prodGlobalStyles,
		prodStyles,
		prodGlobalScripts,
		prodScripts,
		prodImages,
		prodFonts,
		prodHTML
	), //Run All tasks in parallel
	buildFinish
);
