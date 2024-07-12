import React, { useEffect, useRef, useCallback, useState } from 'react';
import './App.css'
const App = () => {
  const [length, setLength] = useState(8);
  const [number, setNumberAllowed] = useState(false);
  const [character, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const generatePassword = useCallback(() => {
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let pass = '';

    if (number) str += '0123456789';
    if (character) str += '!@#$%^&*-_+=~`';

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character]);

  const passwordRef = useRef(null);

  useEffect(() => {
    generatePassword();
  }, [length, number, character, generatePassword]);

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className='container'>
      <h1 className='heading'>Password Generator App</h1>
      <div className="box">
        <div className="upper">
          <input 
            type="text"
            value={password} 
            readOnly 
            ref={passwordRef} 
          />
          <button className='copyBtn' onClick={copyToClipBoard}>Copy</button>
        </div>
        
      <div className="lower">
      <input 
          type="range" 
          id='range' 
          min="8" 
          max="20"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <label htmlFor="range">Length: {length}</label>

        <input 
          type="checkbox" 
          id="numbers" 
          checked={number}
          onChange={() => setNumberAllowed((prev) => !prev)} 
        />
        <label htmlFor="numbers">Numbers</label>

        <input 
          type="checkbox" 
          id="characters" 
          checked={character}
          onChange={() => setCharacterAllowed((prev) => !prev)} 
        />
        <label htmlFor="characters">Characters</label>
      </div>

      </div>
    </div>
  );
};

export default App;
