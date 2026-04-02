const plugin = require('tailwindcss/plugin');
const calcTW = function (size) {
	return `calc(${size}/1920*100rem)`;
};
const calcFzTW = function (size) {
	return `calc(${size}/1920*100rem)`;
};
// console.log(defaultTheme);
module.exports = {
	content: [
		'./dist/**/*.{html,js}',
		'./pages/**/*.{html,pug}',
		'./components/**/*.{html,pug,sass,js}',
	],
	theme: {
		aspectRatio: {
			auto: 'auto',
			square: '1 / 1',
			video: '16 / 9',
			1: '1',
			2: '2',
			3: '3',
			4: '4',
			5: '5',
			6: '6',
			7: '7',
			8: '8',
			9: '9',
			10: '10',
			11: '11',
			12: '12',
			13: '13',
			14: '14',
			15: '15',
			16: '16',
		},
		borderWidth: {
			DEFAULT: "1px",
			0: "0px",
			2: calcTW(2),
			3: calcTW(3),
			4: calcTW(4),
			5: calcTW(5),
			8: calcTW(8),
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '16px /* 16px */',
				xl: calcTW(20),
			},
		},
		fontFamily: {
			'awesome': ['"Font Awesome 6 Pro"'],
			'sans': ['Plus Jakarta Sans', 'sans-serif'],
			'saira': ['Saira', 'sans-serif'],
		},
		fontSize: {
			sm: calcFzTW(14),
			base: calcFzTW(16),
			lg: calcFzTW(18),
			xl: calcFzTW(20),
			'2xl': calcFzTW(24),
			'3xl': calcFzTW(30),
			'4xl': calcFzTW(36),
			'5xl': calcFzTW(48),
			'6xl': calcFzTW(60),
			'7xl': calcFzTW(72),
			'8xl': calcFzTW(84),
			'9xl': calcFzTW(96),
			'0': 0,
			'32': calcFzTW(32),
			'40': calcFzTW(40),
			'56': calcFzTW(56),
			'64': calcFzTW(64),
		},
		screens: {
			xs: '400px',
			sm: '576px',
			md: '768px',
			lg: '1024px',
			xl: '1200px',
			'2xl': '1440px',
			'3xl': '1600px',
		},
		spacing: {
			0: '0 /* 0px */',
			px: '1px',
			1: calcTW(4),
			2: calcTW(8),
			3: calcTW(12),
			4: calcTW(16),
			5: calcTW(20),
			6: calcTW(24),
			7: calcTW(28),
			8: calcTW(32),
			9: calcTW(36),
			10: calcTW(40),
			11: calcTW(44),
			12: calcTW(48),
			13: calcTW(52),
			14: calcTW(56),
			15: calcTW(60),
			16: calcTW(64),
			17: calcTW(68),
			18: calcTW(72),
			19: calcTW(76),
			20: calcTW(80),
			21: calcTW(84),
			22: calcTW(88),
			23: calcTW(92),
			24: calcTW(96),
			25: calcTW(100),
			26: calcTW(104),
			27: calcTW(108),
			28: calcTW(112),
			29: calcTW(116),
			30: calcTW(120),
			32: calcTW(128),
			40: calcTW(160),
			100: calcTW(400),
			full: '100%',
		},
		scale: {
			0: '0',
			50: '.5',
			70: '.70',
			75: '.75',
			80: '.8',
			85: '.85',
			90: '.9',
			95: '.95',
			100: '1',
			105: '1.05',
			110: '1.1',
			115: '1.15',
			120: '1.2',
			125: '1.25',
			150: '1.5',
		},
		opacity: {
			0: '0',
			5: '5',
			10: '0.1',
			15: '0.15',
			20: '0.2',
			25: '0.25',
			30: '0.3',
			35: '0.35',
			40: '0.4',
			45: '0.45',
			50: '0.5',
			55: '0.55',
			60: '0.6',
			65: '0.65',
			70: '0.7',
			75: '0.75',
			80: '0.8',
			85: '0.85',
			90: '0.9',
			95: '0.95',
			100: '1',
		},
		outlineOffset: {
			0: '0px',
			px: '1px',
			1: calcTW(1),
			2: calcTW(2),
			3: calcTW(3),
			4: calcTW(4),
			5: calcTW(5),
			8: calcTW(8),
		},
		extend: {
			animation: {
				'left-bar': 'leftBar 2s linear infinite',
				'top-bar': 'topBar 2s linear infinite',
				'right-bar': 'rightBar 2s linear infinite',
				'bottom-bar': 'bottomBar 2s linear infinite',
				'spin-circle': 'rotateCircle 20s linear infinite',
				'fade-in': 'fadeIn 2s linear infinite',
				'spin': 'spin 2s linear infinite',
				'hex-float': 'hexFloat 3s ease-in-out infinite',
			},
			backgroundImage: {
				"gradient": `linear-gradient(180deg, #EF4444 0%, #DC2626 100%)`,
				"gradient-dark-blue": `radial-gradient(294.79% 141.42% at 0% 0%, rgba(233, 167, 21, 0.60) 0%, #293993 100%)`,
				"gradient-light-blue": `radial-gradient(1603.12% 141.42% at 0% 0%, #00A8DF 0%, #FFF 100%)`,
				"gradient-dark": `linear-gradient(180deg, #202020 0%, #494949 100%)`,
				"gradient-light": `linear-gradient(180deg, #EDEAF4 0%, rgba(237, 234, 245, 0.20) 100%)`,
				"gradient-gray": `linear-gradient(180deg, #E5E5E5 0%, #C6C6C6 100%)`,
				"gradient-1": `linear-gradient(153deg, #C5DEE9 0%, #E3F8FF 40.63%, #8EC1E5 100%)`,
				"gradient-2": `linear-gradient(153deg, #EDE6CC 0%, #FBF9E4 40.63%, #E6CC9A 100%)`,
				"gradient-3": `linear-gradient(153deg, #E9C5C5 0%, #FFEBE4 40.63%, #E5948E 100%)`,
				"gradient-4": `linear-gradient(129deg, #00A8DF 0%, #5CB3E6 51.04%, #00427A 100%)`,
			},
			backgroundSize: {
				'size-2-1': '200% 100%',
				'size-1-2': '100% 200%',
			},
			backgroundPosition: {
				'pos-1-0': '100% 0',
				'pos-0-1': '0 100%',
				'pos-0': '0',
				'pos-0-0': '0 0',
			},
			blur: {
				DEFAULT: "6px",
			},
			borderRadius: {
				1: calcTW(4),
				2: calcTW(8),
				3: calcTW(12),
				4: calcTW(16),
				5: calcTW(20),
				6: calcTW(24),
				8: calcTW(32),
				10: calcTW(40),
				15: calcTW(60),
				20: calcTW(80),
				25: calcTW(100),
				30: calcTW(120),
			},
			boxShadow: {
				DEFAULT: "0px 4px 4px rgba(0, 0, 0, 0.1)",
				bar: `0 0 0 theme('colors.primary.1'), 0 0 1px theme('colors.primary.1'), 0 0 8px theme('colors.primary.1'), 0 0 16px theme('colors.primary.1')`,
				'drop-shadow-light': '4px 4px 32px 16px rgba(0, 0, 0, 0.08)',
				'drop-shadow-medium': '4px 4px 8px 4px rgba(0, 0, 0, 0.24)',
				'drop-shadow-hard': '8px 8px 16px 8px rgba(0, 0, 0, 0.40)',
			},
			colors: {
				primary: {
					'1': '#2B46A0',
					'2': '#ED1D24',
					'3': '#949494',
					'50': '#fef2f2',
					'100': '#fee2e2',
					'200': '#fecaca',
					'300': '#fca5a5',
					'400': '#f87171',
					'500': '#ef4444',
					'600': '#dc2626',
					'700': '#b91c1c',
					'800': '#991b1b',
					'900': '#7f1d1d',
					'950': '#450a0a',
				},
				secondary: {
					'1': '#F8F1E4',
					'2': '#F1EBEB',
					'3': '#E7E5F0',
					'4': '#1F3B83',
					'50': '#f0fdf4',
					'100': '#dcfce7',
					'200': '#bbf7d0',
					'300': '#86efac',
					'400': '#4ade80',
					'500': '#22c55e',
					'600': '#16a34a',
					'700': '#15803d',
					'800': '#166534',
					'900': '#14532d',
					'950': '#052e16',
				},
				neutral: {
					'50': '#F6F6F6',
					'100': '#EFEFEF',
					'200': '#DCDCDC',
					'300': '#BDBDBD',
					'400': '#989898',
					'500': '#818181',
					'600': '#656565',
					'700': '#525252',
					'800': '#464646',
					'900': '#3D3D3D',
					'950': '#292929',
				},
				black: '#000000',
				white: '#ffffff',
				'base-background': '#0f0f0f',
				dark: '#111111',
				main: '#333333',
				light: '#eeeeee',
				translucentDark: "rgba(0, 0, 0, 0.63)",
				translucentLight: "rgba(255, 255, 255, 0.63)",
			},
			lineClamp: {
				6: '6',
				7: '7',
				8: '8',
				9: '9',
				10: '10',
			},
			lineHeight: {
				1.125: '1.125',
				1.2: '1.2',
				1.3: '1.3',
				1.33: '1.33',
				1.4: '1.4',
				1.44: '1.44',
			},
			keyframes: {
				leftBar: {
					'0%': { height: 0, top: '100%', left: 0 },
					'20%': { height: '100%', top: 0, left: 0 },
					'40%': { height: 0, top: 0, left: 0 },
				},
				topBar: {
					'0%, 20%': { width: 0, top: 0, left: 0 },
					'40%': { width: '100%', top: 0, left: 0 },
					'60%': { width: 0, top: 0, left: 'calc(100% - 1px)' },
				},
				rightBar: {
					'0%, 40%': { height: 0, top: 0, left: 'calc(100% - 1px)' },
					'60%': { height: '100%', top: 0, left: 'calc(100% - 1px)' },
					'80%': { height: 0, top: '100%', left: 'calc(100% - 1px)' },
				},
				bottomBar: {
					'0%, 60%': { width: 0, top: '100%', left: '100%' },
					'80%': { width: '100%', top: '100%', left: 0 },
					'100%': { width: 0, top: '100%', left: 0 },
				},
				rotateCircle: {
					'0%': { transform: 'translate(-50%, -50%) rotate(0)' },
					'100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'50%': { opacity: '1' },
					'100%': { opacity: '0' },
				},
				spin: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				hexFloat: {
					'0%, 100%': { transform: 'translateY(0px) scale(1)' },
					'50%': { transform: 'translateY(-10px) scale(1.02)' },
				}
			},
			zIndex: {
				'1': '1',
				'2': '2',
				'11': '11',
				'12': '12',
				'21': '21',
				'100': '100',
				'998': '998',
				'999': '999',
				'1000': '1000',
				'1001': '1001',
			}
		},
	},
	corePlugins: {
		aspectRatio: true,
	},
	variants: {
		aspectRatio: ['responsive', 'hover'],
		lineClamp: ['responsive', 'hover']
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/typography'),
		require('tailwindcss-animation-delay'),
		plugin(function ({ addBase, addComponents, addVariant, e }) {
			addBase({
			})
			addComponents({
				'.flex-center': {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				},
				'.flex-between': {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				},
				'.overflow-y-overlay': {
					overflowY: 'overlay',
				},
				'.overflow-x-overlay': {
					overflowX: 'overlay',
				},
				'.overflow-overlay': {
					overflow: 'overlay',
				},
			})
			addVariant('optional', '&:optional')
			addVariant('hocus', ['&:hover', '&:focus'])
			addVariant('supports-grid', '@supports (display: grid)')
			addVariant("rem", ({ container, separator }) => {
				const rootFontSize = 19.2; // This is your HTML root font-size
				container.walkRules((rule) => {
					rule.selector = `.${e(`rem${separator}`)}${rule.selector.slice(1)}`;
					rule.walkDecls((decl) => {
						if (decl.value.includes("px")) {
							// Convert the pixel number to rem
							const value = decl.value.replace(/(\d+)px/g, (match, p1) => `${p1 / rootFontSize}rem`);
							decl.value = value;
						}
					});
				});
			});

			addVariant("ratio", ({ container, separator }) => {
				container.walkRules((rule) => {
					rule.selector = `.${e(`ratio${separator}`)}${rule.selector.slice(1)}`;
					rule.walkDecls((decl) => {
						const ratioValues = decl.value.split(" ");
						if (ratioValues.length === 2) {
							const num1 = parseInt(ratioValues[0]);
							const num2 = parseInt(ratioValues[1]);
							if (!isNaN(num1) && !isNaN(num2) && num2 !== 0) {
								const percentage = `${(num1 / num2) * 100}%`;
								decl.value = `${percentage}`;
							}
						}
					});
				});
			});
		})
	],
}
