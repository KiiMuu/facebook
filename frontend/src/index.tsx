import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { store } from './state/store';
import './styles/global.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Toaster
			toastOptions={{
				style: {
					background: '#262626',
					color: '#f2f2f2',
					zIndex: 9991,
				},
				duration: 2000,
			}}
		/>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>
);
