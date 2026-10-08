import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Faq } from './pages/Faq';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import NotFound from './pages/NotFound' ;
import Blogs from "./pages/Blogs";
import './index.css';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='*' element={<NotFound />} />
        <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:slug" element={<Blogs />} />
        
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
