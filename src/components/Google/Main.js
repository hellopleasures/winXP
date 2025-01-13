/* eslint-disable prettier/prettier */
import React from 'react';

const Main = () => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <iframe
        title="eliza"
        src="https://my.eliza.finance"
        style={{
        height: '100%',
        width: '100%',
        border: 'none',
        }}
      />
    </div>
  );
};

export default Main;
