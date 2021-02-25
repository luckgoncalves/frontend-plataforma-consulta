import React from 'react';
import GlobalStyles from 'styles/GlobalStyles'
import Layout from 'pages/Layout'

import Header from 'pages/Header'
import Footer from 'pages/Footer'

function App() {
  return (
    <>
      <Header />
      <Layout />
      <Footer />
      
      <GlobalStyles />
    </>
  );
}

export default App;
