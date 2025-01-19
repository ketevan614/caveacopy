import React from 'react';
import './App.css';
import { router } from './routes/Routes';
import { RouterProvider } from 'react-router-dom';
import { useMovies } from './services/Api';
import { useEffect } from 'react';
function App() {

  return <RouterProvider router={router} />

    
}

export default App;
