import React, { useState, useEffect } from 'react';
import Buscador from './components/Buscador';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [ busqueda, setBusqueda ] = useState('');
  const [ imagenes, setImagenes ] = useState([]);
  const [ paginaActual, setPaginaActual] = useState(1);
  const [ totalPaginas, setTotalPaginas ] = useState(1);

  useEffect(
    () => {
      // Consultar API de Pixabay
      const consultaApi = async () => {

        if(busqueda === '') return;


        const key = '2808211-7a2ab8e4ccc07d263d02f9aa6';
        const imagenesPorPagina = 30;

        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setImagenes(resultado.hits);

        // Calcular el total de pagians

        const totalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
        setTotalPaginas(totalPaginas);

        // Ir a la parte superior de la pagina
        const jumbotron = document.querySelector('.jumbotron');
        jumbotron.scrollIntoView({block: 'start', behavior: 'smooth'}); 
        
      }

      consultaApi();
    }, [busqueda, paginaActual]
  );

  const paginaAnterior = () => {
    let anterior = paginaActual - 1; 

    // Actualizar pagina actual
    setPaginaActual(anterior);
  }

  const paginaSiguiente = () => {
    let siguiente = paginaActual + 1;
    
    setPaginaActual(siguiente);
  }

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

        { (paginaActual === 1) ? null : (
          <button onClick={paginaAnterior} type="button" className="btn btn-info mr-1">&laquo; Anterior</button>
        ) }

        { (paginaActual === totalPaginas) ? null : (
          <button onClick={paginaSiguiente} type="button" className="btn btn-info mr-1">Siguiente &raquo;</button>
        ) }

        
        
      </div>
    </div>
  );
}

export default App;
