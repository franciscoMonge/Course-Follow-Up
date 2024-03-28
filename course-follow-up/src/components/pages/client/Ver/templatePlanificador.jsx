

const App1 = () => {
  const courses = [
    {
      groupId: '#11',
      color: '#ffc107', // Amarillo
      courses: [
        {
          id: 1,
          name: 'Introducción a Logística',
          startDate: new Date(2024, 4, 20),
          endDate: new Date(2024, 6, 13),
        },
        {
          id: 2,
          name: 'Aéreo por Transporte',
          startDate: new Date(2024, 4, 25),
          endDate: new Date(2024, 7, 9),
        },
      ],
    },
    {
      groupId: '#12',
      color: '#28a745', // Verde
      courses: [
        {
          id: 3,
          name: 'Adm. Bodega e Inventarios I',
          startDate: new Date(2024, 1, 12),
          endDate: new Date(2024, 2, 6),
        },
      ],
    },
    {
      groupId: '#13',
      color: '#007bff', // Azul
      courses: [
        {
          id: 4,
          name: 'Introducción a logística',
          startDate: new Date(2024, 2, 23),
          endDate: new Date(2024, 3, 15),
        },
        {
          id: 5,
          name: 'Infraestructura de Almacenes',
          startDate: new Date(2024, 4, 28),
          endDate: new Date(2024, 5, 20),
        },
      ],
    },
    {
      groupId: '#14',
      color: '#dc3545', // Rojo
      courses: [],
    },
  ];

  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  return (
    <div>
      <h1>Planificador de Cursos 2024</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Grupo</th>
            {months.map((month) => (
              <th key={month}>{month}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {courses.map((group) => (
            <tr key={group.groupId}>
              <td style={{ backgroundColor: group.color, color: 'white', fontWeight: 'bold' }}>{group.groupId}</td>
              {months.map((month, index) => (
                <td key={`${group.groupId}-${index}`}>
                  {group.courses
                    .filter(
                      (course) =>
                        new Date(course.startDate).getMonth() === index ||
                        new Date(course.endDate).getMonth() === index
                    )
                    .map((course) => (
                      <div key={course.id} style={{ backgroundColor: group.color, color: 'white', padding: '5px' }}>
                        <hr />
                        {course.name}
                        <br />
                        Inicio: {new Date(course.startDate).getDate()} {months[new Date(course.startDate).getMonth()]}
                        <br />
                        Fin: {new Date(course.endDate).getDate()} {months[new Date(course.endDate).getMonth()]}
                        <hr />
                      </div>
                    ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App1