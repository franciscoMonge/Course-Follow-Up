-- STORED PROCEDURES

DELIMITER //

-- Permite actualizar la información de un curso para un grupo específico, SI NO EXISTE, crea un nuevo registro
CREATE PROCEDURE updateCursoGrupo (
    IN p_idGrupo INT,
    IN p_idCurso INT,
    IN p_fechaInicio VARCHAR(20),
    IN p_fechaFinal varchar(20),
    IN p_profesor VARCHAR(200),
    IN p_horario VARCHAR(45)
)
BEGIN
    DECLARE curso_existente INT;
    -- DECLARE fechaInicioDate DATE;
    -- DECLARE fechaFinalDate DATE;

    -- Convertir las cadenas de fecha en objetos de fecha
    -- SET fechaInicioDate = STR_TO_DATE(p_fechaInicio, '%Y-%m-%d');
    -- SET fechaFinalDate = STR_TO_DATE(p_fechaFinal, '%Y-%m-%d');
    -- VERIFICAR SI EXISTE EL CURSO PARA ESE GRUPO
    SELECT COUNT(*) INTO curso_existente 
    FROM grupoxcurso 
    WHERE idGrupo = p_idGrupo AND idcurso = p_idCurso;

    IF curso_existente > 0 THEN
        -- Si el curso existe para ese grupo, se ACTUALIZAN los datos
        UPDATE grupoxcurso SET
            -- fechaInicio = IF(fechaInicioDate IS NOT NULL AND fechaInicioDate <> '', fechaInicioDate, fechaInicio),
            -- fechaFinal = IF(fechaFinalDate IS NOT NULL AND fechaFinalDate <> '', fechaFinalDate, fechaFinal),
            fechaInicio = IF(p_fechaInicio IS NOT NULL AND p_fechaInicio <> '', p_fechaInicio, fechaInicio),
            fechaFinal = IF(p_fechaFinal IS NOT NULL AND p_fechaFinal <> '', p_fechaFinal, fechaFinal),
            profesor = IF(p_profesor IS NOT NULL AND p_profesor <> '', p_profesor, profesor),
            horario = IF(p_horario IS NOT NULL AND p_horario <> '', p_horario, horario)
        WHERE idGrupo = p_idGrupo AND idcurso = p_idCurso;
    ELSE
        -- Si el curso NO existe para ese grupo, se CREA un nuevo registro
        INSERT INTO grupoxcurso (idGrupo, idcurso, fechaInicio, fechaFinal, profesor, horario)
        VALUES (p_idGrupo, p_idCurso, p_fechaInicio, p_fechaFinal, p_profesor, p_horario);
    END IF;
END //

CREATE PROCEDURE getGrupos ()
BEGIN
    SELECT idgrupo, numero, horario FROM grupo;
END //

CREATE PROCEDURE getHorarioGrupo (p_idGrupo int)
BEGIN
    SELECT horario FROM grupo WHERE idGrupo = p_idGrupo;
END //

CREATE PROCEDURE GetCursos ()
BEGIN
    SELECT nombre FROM Curso;
END //

CREATE PROCEDURE GetCursosxGrupo(p_idGrupo INT)
BEGIN
	-- Obtengo la información de los cursos para ese grupo, si está disponible
	SELECT
		
		COALESCE(curso.nombre) AS nombre_curso,
        (curso.idcurso) AS idCurso,
		IFNULL(grupoxcurso.fechaInicio, '') AS fechaInicio,
		IFNULL(grupoxcurso.fechaFinal, '') AS fechaFinal,
		IFNULL(grupoxcurso.horario, '') AS horario,
		IFNULL(grupoxcurso.profesor, '') AS profesor
	FROM Curso 
	LEFT JOIN GrupoxCurso ON curso.idCurso = grupoxcurso.idCurso AND grupoxcurso.idGrupo = p_idGrupo;
END //

-- Este procedimiento revisa que entre cursos del MISMO TIPO haya distancia de 2 MESES
-- Si se dio el "Curso A" en Mayo para el "Grupo 40", para cualquier otro grupo el "Curso A" debe darse hasta Agosto
CREATE PROCEDURE VerificarDistanciaCursos(
    IN p_nombreCurso VARCHAR(60),
    IN p_fechaInicio DATE,
    IN p_fechaFinal DATE
)
BEGIN
    DECLARE cursoExistente INT;
    DECLARE fechaFinalExistente DATE;
    DECLARE cumpleDistancia BOOLEAN; -- Variable local para almacenar el resultado
	DECLARE mesesDiferencia INT;
    -- Verificar si ya hay un curso del mismo tipo registrado
    SELECT idgrupo INTO cursoExistente
    FROM grupoxcurso
    WHERE idcurso = (SELECT idcurso FROM curso WHERE nombre = p_nombreCurso);
    
    -- Si no hay cursos previos del mismo tipo, entonces no hay restricciones
    IF cursoExistente IS NULL THEN
        SET cumpleDistancia = TRUE;
    END IF;
    
    -- Obtener la fecha de finalización del curso existente más reciente
    SELECT MAX(fechaFinal) INTO fechaFinalExistente
    FROM grupoxcurso
    WHERE idcurso = (SELECT idcurso FROM curso WHERE nombre = p_nombreCurso);
    
    -- Calcular la diferencia en meses entre las fechas

    SET mesesDiferencia = TIMESTAMPDIFF(MONTH, fechaFinalExistente, p_fechaInicio);
    
    -- Verificar si la distancia entre cursos es de al menos dos meses
    IF mesesDiferencia >= 2 THEN
        SET cumpleDistancia = TRUE;
    ELSE
        SET cumpleDistancia = FALSE;
    END IF;
    
    -- Devolver el resultado
    SELECT cumpleDistancia;
END//


-- Este procedimiento revisa que entre cursos de UN MISMO GRUPO haya distancia de 1 semana
CREATE PROCEDURE VerificarDistanciaUnaSemana(
    IN p_idGrupo INT,
    IN p_fechaInicio DATE
)
BEGIN
    DECLARE ultimaFechaFinal DATE;
    DECLARE cumpleDistancia BOOLEAN;

    -- Obtener la fecha final del último curso agregado para el grupo
    SELECT MAX(fechaFinal) INTO ultimaFechaFinal 
    FROM grupoxcurso 
    WHERE idgrupo = p_idGrupo;

    -- Verificar la distancia de una semana entre la fecha de inicio del nuevo curso y la fecha final del último curso
    IF DATEDIFF(p_fechaInicio, ultimaFechaFinal) >= 7 THEN
        -- Si la distancia es de al menos una semana, se cumple la restricción
        SET cumpleDistancia = TRUE;
    ELSE
        -- Si la distancia no es de al menos una semana, no se cumple la restricción
        SET cumpleDistancia = FALSE;
    END IF;

    -- Devolver el resultado
    SELECT cumpleDistancia;
END;//

DELIMITER ;


-- select * from usuario
 -- CALL GetCursosxGrupo(1)
 -- CALL getHorarioGrupo(2) 
 -- call VerificarDistanciaCursos("Introducción a la Logística",'2024-05-07','2024-06-11')
 -- select * from grupoxcurso 

--call VerificarDistanciaUnaSemana(1, '2024-05-07')