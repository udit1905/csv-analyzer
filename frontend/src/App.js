import logo from './logo.svg';
import './App.css';
import Uploader from './components/Uploader';
import Chatbot from './components/Chatbot';
import { useState } from 'react';

function App() {
  const [file, setFile] = useState(null)
  return (
    <div className="App" style={{ padding: "1rem 3rem" }}>
      <Uploader file={file} setFile={setFile} />
      <Chatbot file={file} />
    </div>
  );
}

export default App;
