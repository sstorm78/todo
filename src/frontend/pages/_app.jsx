import React from 'react';

const MyApp = function createApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
};

process.title = 'ToDo';

export default MyApp;
