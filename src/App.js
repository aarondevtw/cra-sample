import { useEffect, useState } from 'react';
import axios from 'axios';

import logo from './assets/logo.svg';
import './assets/App.css';
import './assets/all.scss';
import Input from './components/Input';

function App() {
  const [text, setText] = useState('');
  const onChangeHandler = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      // console.log(process.env.REACT_APP_PATH);
      try {
        // 從環境變數取得api path
        //
        const path = process.env.REACT_APP_PATH;
        const result = await axios.get(path, {
          signal: controller.signal,
        });
        // const result = await axios.get('https://randomuser.me/api/');
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    })();

    // clear funtion
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button type="button" className="btn btn-primary">
          Primary
        </button>

        {text}
        <Input
          id="sampleText"
          text="這是一個input"
          value={text}
          onChangeHandler={onChangeHandler}
        ></Input>
      </header>
    </div>
  );
}

export default App;
