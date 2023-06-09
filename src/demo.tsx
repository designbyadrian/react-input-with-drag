import React from 'react';
import { createRoot } from 'react-dom/client';
import Input from './index';

function App() {
  const [value, setValue] = React.useState(42);

  const handleChange = (newValue: number) => {
    console.log('handleChange', newValue);
    setValue(newValue);
  };

  const handleInput = (newValue: number) => {
    console.log('handleInput', newValue);
    setValue(newValue);
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>🦹 Input with drag</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            padding: '1rem',
            border: '2px solid pink',
            borderRadius: '1em',
          }}
        >
          <Input value={value} onChange={handleChange} onInput={handleInput} />
        </div>
        <p style={{ fontSize: '0.8rem', textAlign: 'center', color: '#555' }}>
          Hold <em>Shift</em> for increments of 0.1
        </p>
      </div>
    </div>
  );
}

const container = document.getElementById('root');

const root = createRoot(container!);
root.render(<App />);
