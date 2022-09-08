import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state/store';
import App from './App';
import GlobalCSS from './styles/Global';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			{GlobalCSS()}
			<App />
		</Provider>
	</React.StrictMode>
);
