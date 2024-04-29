import React from 'react';

const Card = ({ curso }) => {
  // Función para formatear la fecha a DD/MM/YY
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
    const year = formattedDate.getFullYear().toString().slice(-2); // Obtener los últimos dos dígitos del año
  
    // Formatear el día y el mes con ceros a la izquierda si es necesario
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  };
  
  // Asigna las fechas formateadas a variables
  const formattedStartDate = formatDate(curso.startDate);
  const formattedEndDate = formatDate(curso.endDate);
  
  return (
    <div  className="card">
        <button style={{ background: '#092D4E'}}>Opciones</button>
        <h5>{curso.name}</h5>
        <h6>Profesor: {curso.profesor}</h6>
        <h6>Inicio: {formattedStartDate}</h6>
        <h6>Fin: {formattedEndDate}</h6>
    </div>
  );
};

export default Card;
