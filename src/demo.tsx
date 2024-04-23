import React from 'react';
import { createRoot } from 'react-dom/client';
import Input, { InputWithDragChangeHandler } from './index';

const v = 42;
function App() {
  const [value, setValue] = React.useState<number>(v);

  const handleChange: InputWithDragChangeHandler = newValue => {
    setValue(newValue);
  };

  const resetValue = () => {
    setValue(v);
  };

  const handleInputWithoutDragChange: React.ChangeEventHandler<
    HTMLInputElement
  > = e => {
    setValue(Number(e.target.value));
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
          <div
            style={{
              padding: '1rem',
              border: '2px solid pink',
              borderRadius: '1em',
            }}
          >
            <Input value={value} onChange={handleChange} />
          </div>
          <p style={{ fontSize: '0.8rem', textAlign: 'center', color: '#555' }}>
            Hold <em>Shift</em> for increments of 0.1
          </p>
          <div
            style={{
              marginTop: '1em',
              marginBottom: '2rem ',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button type="button" onClick={resetValue}>
              Reset
            </button>
          </div>
        </div>
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                fontSize: '0.8rem',
                textAlign: 'center',
                color: '#555',
              }}
            >
              Input without drag (for reference)
            </p>
            <div
              style={{
                padding: '1rem',
                border: '2px solid gray',
                borderRadius: '1em',
              }}
            >
              <input value={value} onChange={handleInputWithoutDragChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
