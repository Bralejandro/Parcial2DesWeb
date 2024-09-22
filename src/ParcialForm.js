import React, { useState } from 'react';
import './Formulario.css'; // Asegúrate de que este archivo de estilos esté disponible

const ParcialForm = () => {
  // Estado para almacenar los valores del formulario
  const [curso, setCurso] = useState({
    nombre: '',
    creditos: '',
    descripcion: ''
  });

  // Función para manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurso({
      ...curso,
      [name]: value
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://test-deploy-12.onrender.com/cursos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: curso.nombre,
          creditos: parseInt(curso.creditos),
          descripcion: curso.descripcion,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Curso creado con éxito:', data);
        // Mostrar datos en un formato más claro
        console.log('Datos recibidos del servidor:', JSON.stringify(data, null, 2));
      } else {
        const errorData = await response.text(); 
        console.error('Error en la respuesta del servidor:', errorData);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  // Función para limpiar los inputs
  const handleReset = () => {
    setCurso({
      nombre: '',
      creditos: '',
      descripcion: ''
    });
  };

  return (
    <div className="form-container">
      <h1>Crear Curso Parcial</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre curso:</label>
          <input
            type="text"
            name="nombre"
            value={curso.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Créditos:</label>
          <input
            type="number"
            name="creditos"
            value={curso.creditos}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={curso.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit">Guardar</button>
          <button type="button" onClick={handleReset}>Limpiar</button>
        </div>
      </form>
    </div>
  );
};

export default ParcialForm;
