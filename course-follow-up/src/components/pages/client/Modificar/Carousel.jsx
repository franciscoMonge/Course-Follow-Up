// Importación de librerías y clases
import React, { useState } from 'react';
import Card from './Card';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/css';
import 'swiper/css/scrollbar'

// Función para manejar los grupos por separado
const CustomCarousel = ({ grupos }) => {
  return (
    <div>
      {grupos.map((grupo, indexGrupo) => (
        <GroupCarousel key={indexGrupo} grupo={grupo} />
      ))}
    </div>
  );
};

// Función para manejar los cursos de cada grupo
const GroupCarousel = ({ grupo }) => {
  const [currentPage, setCurrentPage] = useState(0); // Estado para almacenar la página actual
  const itemsPerPage = 3; // Número de tarjetas por página

  // Calcular el número total de páginas para este grupo
  const totalPages = Math.ceil(grupo.cursos.length / itemsPerPage);

  // Función para cambiar a la página anterior
  const goToPrevPage = () => {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 0));
  };

  // Función para cambiar a la página siguiente
  const goToNextPage = () => {
    setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages - 1));
  };

  return (
    <div style={{ marginBottom: '40px'}}>
      <h2>Grupo {grupo.grupoId} Horario {grupo.horario}</h2>
      <Swiper  
        spaceBetween={20} // Espacio entre las tarjetas
        slidesPerView={3} // Número de tarjetas visibles en una fila
        style={{ width: '900px', overflowX: 'auto' }} // Fijar el ancho de los carruseles

      >
        {/* Filtrar los cursos para mostrar solo los de la página actual */}
        {grupo.cursos
          .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
          .map((curso, indexCurso) => (
            <div key={indexCurso}>
              <SwiperSlide>
                <Card curso={curso}/>
              </SwiperSlide>
            </div>
          ))}
      </Swiper>

      {/* Botones de paginación */}
      <div style={{ marginTop: '10px' }}>
        <button 
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          style={{ marginRight: '10px', cursor: 'pointer', backgroundColor: '#E65C19' }}
        >
          Anterior
        </button>
        <button 
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          style={{ cursor: 'pointer', backgroundColor: '#E65C19' }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CustomCarousel;
