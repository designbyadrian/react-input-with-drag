import React from 'react';
import { createRoot } from 'react-dom/client';
import Input from './index';
const v = 42;
function App() {
  const [value, setValue] = React.useState<number | string>(v);
  const handleChange = (
    newValue: React.ChangeEvent<HTMLInputElement> | number
  ) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    } else {
      setValue(newValue.target.value);
    }
  };
  const resetValue = () => {
    setValue(v);
  };
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>:supervillain: Input with drag</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
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
            <Input value={value} onChange={handleChange} />
          </div>
          <p style={{ fontSize: '0.8rem', textAlign: 'center', color: '#555' }}>
            Hold <em>Shift</em> for increments of 0.1
          </p>
          <div style={{ marginTop: '1em', marginBottom: '2rem' }}>
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
              Input without drag
            </p>
            <div
              style={{
                padding: '1rem',
                border: '2px solid gray',
                borderRadius: '1em',
              }}
            >
              <input value={value} onChange={handleChange} />
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
