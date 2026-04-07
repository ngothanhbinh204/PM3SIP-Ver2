module.exports = {
	config: {
		config_js: './config.js',
		tailwind_js: "./tailwind.config.js",
		fonts: [
			"./src/fonts/**/webfonts/**"
		],
		globalCss: [
			"./node_modules/swiper/swiper-bundle.min.css",
			"./src/_libs/Font-Awesome-642/css/all.css",
			"./node_modules/@fancyapps/ui/dist/fancybox/fancybox.css",
			"./node_modules/aos/dist/aos.css",
		],
		globalJs: [
			"./node_modules/jquery/dist/jquery.min.js",
			"./src/_libs/mapping/mapping.js",
			"./node_modules/swiper/swiper-bundle.min.js",
			"./node_modules/lozad/dist/lozad.min.js",
			"./node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js",
			"./src/_libs/tabslet/jquery.tabslet.min.js",
			"./src/_libs/countUp/waypoints.js",
			"./src/_libs/countUp/countUp.min.js",
			"./src/_libs/jquery.marquee/jquery.marquee.min.js",
			"./node_modules/aos/dist/aos.js",
		],
		port: 8000
	},
	paths: {
		root: "./",
		src: {
			base: "./src",
			pages: "./src/pages",
			sass: "./src/components",
			js: "./src/js",
			img: "./src/img",
			fonts: "./src/fonts",
		},
		dist: {
			base: "./dist",
			css: "./dist/css",
			js: "./dist/js",
			img: "./dist/img",
			fonts: "./dist/fonts",
		},
		build: {
			base: "./build",
			css: "./build/css",
			js: "./build/js",
			img: "./build/img",
			fonts: "./build/fonts",
		}
	}
}
