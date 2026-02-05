
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './components/Landing';
import Editor from './components/Editor';
import Settings from './components/Settings';
import Assistant from './components/Assistant';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/config" element={<Settings />} />
          <Route path="/asistente" element={<Assistant />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
