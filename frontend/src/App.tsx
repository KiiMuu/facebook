function App() {
	const getMessage = async () => {
		const res = await fetch('http:localhost:5000/welcome');

		console.log('Data', res);
	};

	getMessage();
	return <div>App</div>;
}

export default App;
