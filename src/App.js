import React, { useState, useEffect } from 'react';
import Buscador from './components/Buscador';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [ busqueda, setBusqueda ] = useState('');
  const [ imagenes, setImagenes ] = useState([]);

  useEffect(
    () => {
      // Consultar API de Pixabay
      const consultaApi = async () => {

        if(busqueda === '') return;


        const key = '2808211-7a2ab8e4ccc07d263d02f9aa6';
        const imagenesPorPagina = 30;

        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setImagenes(resultado.hits);
      }

      consultaApi();
    }, [busqueda]
  );

  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Buscador setBusqueda={setBusqueda} />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />
      </div>
    </div>
  );
}

export default App;
