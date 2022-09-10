import { globalCss } from '@stitches/react';

const GlobalCSS = globalCss({
	':root': {
		'--bg-primary': '#fff',
		'--bg-secondary': '#f0f2f5',
		'--bg-third': '#e4e6eb',
		'--bg-forth': '#f0f2f5',
		'--color-primary': '#050505',
		'--color-secondary': '#65676b',
		'--divider': '#ced0d4',
		'--dark-bg-primary': '#18191a',
		'--dark-bg-secondary': '#242526',
		'--dark-bg-third': '#3a3b3c',
		'--dark-color-primary': '#242526',
		'--dark-color-secondary': '#b0b3b8',
		'--blue-color': '#1876f2',
		'--green-color': '#42b72a',
		'--light-blue-color': '#e7f3ff',
		'--border-color': '#ccced2',
		'--shadow-1': 'rgba(0, 0, 0, 0.2)',
		'--shadow-2': 'rgba(0, 0, 0, 0.1)',
		'--shadow-3': 'rgba(0, 0, 0, 0.3)',
		'--shadow-inset': 'rgba(255, 255, 255, 0.5)',
	},
	html: {
		fontSize: '62.5%',
	},
	body: {
		fontFamily: ['Montserrat', 'Roboto', 'sans-serif'].join(','),
		boxSizing: 'border-box',
		scrollBehavior: 'smooth',
		fontSize: '1.6rem',
		padding: '0',
		margin: '0',
	},
	'&*, &*::before, &*::after': {
		boxSizing: 'inherit',
		padding: '0',
		margin: '0',
	},
});

export default GlobalCSS;