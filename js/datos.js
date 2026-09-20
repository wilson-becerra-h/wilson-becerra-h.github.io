/* ==========================================================================
   DATOS DE LA WEB: aquí se edita todo el contenido.
   Para añadir algo: copia un bloque { ... }, pégalo debajo (con su coma)
   y cambia los textos. Lo que dejes vacío ('') no se muestra.
   Pon lo más nuevo primero: Home muestra los 3 primeros recursos.
   ========================================================================== */
const DATA = {

  nombre: 'Wilson Alexis Becerra Herrera',
  rol:    'Psicólogo interesado en psicometría, ciencia de datos e inteligencia artificial.',
  intro:  'Análisis estadístico, modelado de datos y evaluación psicométrica con R y Python.',

  enlaces: {
    email:     'wilsonbe@ucm.es',
    github:    'https://github.com/wilson-becerra-h',
    linkedin:  'https://www.linkedin.com/in/wilson-becerra-h',
    ubicacion: 'Madrid, España'
  },

  // Tres áreas en la portada (puedes cambiar o quitar)
  areas: [
    { titulo: 'Psicometría',            texto: 'Teoría de respuesta al ítem, ecuaciones estructurales y confiabilidad.' },
    { titulo: 'Detección de señales',   texto: 'Sensibilidad, criterio de respuesta y curvas ROC.' },
    { titulo: 'Datos e IA',             texto: 'Análisis estadístico y modelado con R y Python.' }
  ],

  // PROYECTOS. Campos: titulo, desc, tags, fecha, repo, demo
  // Mientras esté vacío, la página muestra un aviso.
  proyectos: [
    // { titulo: 'Nombre del proyecto', desc: 'Qué hace, en una o dos frases.', tags: ['Python'], fecha: '2026', repo: 'https://github.com/wilson-becerra-h/mi-repo', demo: '' }
  ],

  // RECURSOS. Campos: titulo, desc, tipo ('R', 'LaTeX' o 'Python'), tags, fecha,
  // codigo (clave de la lista CODIGO de abajo), url (enlace externo), repo
  recursos: [
    {
      titulo: 'Sensibilidad y criterio en detección de señales',
      desc:   'Función en R que calcula d′, c y β a partir de aciertos y falsas alarmas, con corrección para proporciones extremas.',
      tipo: 'R', tags: ['Detección de señales'], codigo: 'tds'
    },
    {
      titulo: 'Curva ROC y AUC con intervalo de confianza',
      desc:   'Curva ROC con pROC y área bajo la curva con intervalo de confianza por bootstrap, sobre datos simulados.',
      tipo: 'R', tags: ['Detección de señales'], codigo: 'roc'
    },
    {
      titulo: 'Calibración de un modelo 2PL con mirt',
      desc:   'Ajuste de un modelo de respuesta al ítem de dos parámetros: discriminación, dificultad y curvas características.',
      tipo: 'R', tags: ['TRI'], codigo: 'tri'
    },
    {
      titulo: 'Confiabilidad con omega de McDonald',
      desc:   'Estimación del coeficiente omega con lavaan a partir de un análisis factorial confirmatorio unidimensional.',
      tipo: 'R', tags: ['Confiabilidad'], codigo: 'omega'
    },
    {
      titulo: 'Procesamiento de respuestas tipo Likert',
      desc:   'Recodificación de ítems invertidos, filtro por tiempo de respuesta y puntaje total con tidyverse.',
      tipo: 'R', tags: ['Datos'], codigo: 'limpieza'
    },
    {
      titulo: 'Plantilla LaTeX para informes',
      desc:   'Plantilla mínima compilable con pdflatex para informes con fórmulas.',
      tipo: 'LaTeX', tags: ['Informes'], codigo: 'latex'
    }
  ]
};
