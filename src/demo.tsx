import React from 'react';
import ReactDOM from 'react-dom';
import Input from './index';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>💄 Input with drag</h1>
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
          <Input value={77} />
        </div>
        <p style={{ fontSize: '0.8rem', textAlign: 'center', color: '#555' }}>
          Hold <em>Shift</em> for increments of 0.1
        </p>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
