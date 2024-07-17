import { useEffect, useState } from 'react';
import './App.scss';

function App() {
	const [text, setText] = useState('');
	useEffect(() => {
		fetch('/api')
			.then((response) => response.text())
			.then((t) => setText(t));
	});
	return <>{text}</>;
}

export default App;
