const COURSE_DATA = {
  title: "Ciencia de Datos desde Cero",
  subtitle: "Domina el análisis de datos, Python y Machine Learning paso a paso",
  modules: [
    {
      id: "mod-1",
      title: "Introducción a la Ciencia de Datos",
      description: "Descubre qué es la ciencia de datos, su impacto en el mundo real y configura tu entorno de trabajo.",
      icon: "📊",
      lessons: [
        {
          id: "les-1-1",
          title: "¿Qué es la Ciencia de Datos?",
          type: "video",
          duration: "15 min",
          videoId: "ll1S9qvNsOQ",
          description: "Una introducción al campo de la ciencia de datos: qué es, por qué importa y qué habilidades necesitas para empezar.",
          reading: "La ciencia de datos combina estadística, programación y conocimiento del dominio para extraer insights de los datos. En esta lección exploraremos los fundamentos del campo, las herramientas más utilizadas y las oportunidades profesionales que ofrece.\n\n**Conceptos clave:**\n- Diferencia entre ciencia de datos, análisis de datos e ingeniería de datos\n- El proceso de ciencia de datos: pregunta → datos → análisis → comunicación\n- Casos de uso en la industria: salud, finanzas, marketing, tecnología",
          resources: [
            { title: "¿Qué hace un Data Scientist?", url: "#", type: "article" },
            { title: "Roadmap de Ciencia de Datos 2024", url: "#", type: "link" }
          ]
        },
        {
          id: "les-1-2",
          title: "Herramientas y entorno de trabajo",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Configura tu entorno de desarrollo: instala Python, Jupyter Notebook y las librerías esenciales.",
          reading: "Para trabajar en ciencia de datos necesitas un entorno de desarrollo adecuado. En esta lección instalaremos y configuraremos las herramientas fundamentales.\n\n**Herramientas que instalaremos:**\n- Python 3.x (Anaconda)\n- Jupyter Notebook / JupyterLab\n- VS Code como editor de código\n- Git para control de versiones",
          resources: [
            { title: "Descargar Anaconda", url: "https://www.anaconda.com/download", type: "download" },
            { title: "Google Colab (alternativa online)", url: "https://colab.research.google.com/", type: "link" },
            { title: "Guía de instalación paso a paso", url: "#", type: "article" }
          ]
        },
        {
          id: "les-1-3",
          title: "Tu primer análisis de datos",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Realiza tu primer análisis de datos completo usando un dataset real. Desde la carga hasta las conclusiones.",
          reading: "En esta lección práctica realizarás tu primer análisis de datos de principio a fin. Usaremos un dataset real para responder preguntas concretas.\n\n**Lo que aprenderás:**\n- Cargar datos desde un archivo CSV\n- Explorar la estructura de un dataset\n- Calcular estadísticas básicas\n- Crear tu primera visualización\n- Sacar conclusiones de los datos",
          resources: [
            { title: "Notebook: Primer Análisis", url: "#", type: "notebook" },
            { title: "Dataset de ejemplo (CSV)", url: "#", type: "download" },
            { title: "Repositorio del módulo en GitHub", url: "#", type: "github" }
          ]
        }
      ],
      quiz: {
        id: "quiz-1",
        title: "Quiz — Módulo 1",
        passingScore: 70,
        questions: [
          {
            question: "¿Cuál es el proceso correcto en ciencia de datos?",
            options: [
              "Código → Datos → Visualización → Reporte",
              "Pregunta → Datos → Análisis → Comunicación",
              "Datos → Modelo → Producción → Monitoreo",
              "Idea → Programa → Resultado → Publicación"
            ],
            correct: 1,
            explanation: "El proceso estándar de ciencia de datos comienza con una pregunta, seguida de la obtención de datos, análisis y comunicación de resultados."
          },
          {
            question: "¿Qué herramienta permite escribir código y ver resultados de forma interactiva?",
            options: [
              "Microsoft Word",
              "Terminal de comandos",
              "Jupyter Notebook",
              "Photoshop"
            ],
            correct: 2,
            explanation: "Jupyter Notebook es un entorno interactivo que permite combinar código, texto y visualizaciones en un solo documento."
          },
          {
            question: "¿Qué lenguaje de programación es el más usado en ciencia de datos?",
            options: [
              "JavaScript",
              "Java",
              "Python",
              "C++"
            ],
            correct: 2,
            explanation: "Python es el lenguaje más popular en ciencia de datos gracias a sus librerías especializadas como Pandas, NumPy y Scikit-learn."
          }
        ]
      }
    },
    {
      id: "mod-2",
      title: "Python para Ciencia de Datos",
      description: "Aprende los fundamentos de Python y las librerías esenciales: NumPy, Pandas y Matplotlib.",
      icon: "🐍",
      lessons: [
        {
          id: "les-2-1",
          title: "Fundamentos de Python",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Variables, tipos de datos, estructuras de control, funciones y las bases que necesitas para ciencia de datos.",
          reading: "Python es un lenguaje de programación versátil y fácil de aprender. En esta lección cubriremos los fundamentos que necesitas para ciencia de datos.\n\n**Temas:**\n- Variables y tipos de datos (int, float, str, bool)\n- Listas, tuplas y diccionarios\n- Condicionales (if/elif/else) y bucles (for/while)\n- Funciones y módulos\n- List comprehensions",
          resources: [
            { title: "Notebook: Python Básico", url: "#", type: "notebook" },
            { title: "Documentación oficial de Python", url: "https://docs.python.org/3/", type: "link" },
            { title: "Ejercicios de práctica", url: "#", type: "link" }
          ]
        },
        {
          id: "les-2-2",
          title: "NumPy y Pandas",
          type: "video",
          duration: "35 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Manipulación de datos con las dos librerías más importantes: arrays con NumPy y DataFrames con Pandas.",
          reading: "NumPy y Pandas son las piedras angulares de la ciencia de datos en Python.\n\n**NumPy:**\n- Arrays multidimensionales\n- Operaciones vectorizadas\n- Funciones matemáticas y estadísticas\n\n**Pandas:**\n- Series y DataFrames\n- Lectura de archivos (CSV, Excel, JSON)\n- Filtrado, agrupación y transformación de datos\n- Manejo de datos faltantes",
          resources: [
            { title: "Notebook: NumPy y Pandas", url: "#", type: "notebook" },
            { title: "Cheat Sheet de Pandas", url: "#", type: "download" },
            { title: "Documentación de Pandas", url: "https://pandas.pydata.org/docs/", type: "link" }
          ]
        },
        {
          id: "les-2-3",
          title: "Visualización con Matplotlib",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Crea gráficos profesionales para comunicar insights: líneas, barras, dispersión, histogramas y más.",
          reading: "La visualización es fundamental para explorar datos y comunicar resultados.\n\n**Tipos de gráficos:**\n- Gráficos de línea (tendencias)\n- Gráficos de barras (comparaciones)\n- Diagramas de dispersión (relaciones)\n- Histogramas (distribuciones)\n- Gráficos de caja (outliers)\n\n**También veremos:**\n- Seaborn para visualizaciones estadísticas\n- Personalización de estilos y colores",
          resources: [
            { title: "Notebook: Visualización", url: "#", type: "notebook" },
            { title: "Galería de Matplotlib", url: "https://matplotlib.org/stable/gallery/", type: "link" },
            { title: "Guía de Seaborn", url: "https://seaborn.pydata.org/", type: "link" }
          ]
        }
      ],
      quiz: {
        id: "quiz-2",
        title: "Quiz — Módulo 2",
        passingScore: 70,
        questions: [
          {
            question: "¿Qué estructura de Pandas es ideal para datos tabulares con filas y columnas?",
            options: [
              "Array",
              "Lista",
              "DataFrame",
              "Diccionario"
            ],
            correct: 2,
            explanation: "Un DataFrame de Pandas es una estructura bidimensional similar a una tabla de Excel, ideal para datos tabulares."
          },
          {
            question: "¿Qué función de Pandas se usa para leer un archivo CSV?",
            options: [
              "pd.open_csv()",
              "pd.read_csv()",
              "pd.load_csv()",
              "pd.import_csv()"
            ],
            correct: 1,
            explanation: "pd.read_csv() es la función estándar de Pandas para cargar datos desde archivos CSV."
          },
          {
            question: "¿Qué tipo de gráfico es mejor para mostrar la distribución de una variable numérica?",
            options: [
              "Gráfico de barras",
              "Gráfico de línea",
              "Histograma",
              "Gráfico de pastel"
            ],
            correct: 2,
            explanation: "Los histogramas muestran la distribución de frecuencias de una variable numérica, permitiendo ver su forma y dispersión."
          },
          {
            question: "¿Cuál es la principal ventaja de NumPy sobre las listas de Python?",
            options: [
              "Es más fácil de instalar",
              "Tiene más funciones de texto",
              "Operaciones vectorizadas mucho más rápidas",
              "Funciona sin Python instalado"
            ],
            correct: 2,
            explanation: "NumPy realiza operaciones vectorizadas sobre arrays completos sin necesidad de bucles, siendo mucho más eficiente que las listas de Python."
          }
        ]
      }
    },
    {
      id: "mod-3",
      title: "Análisis Exploratorio de Datos",
      description: "Aprende a limpiar, explorar y visualizar datos para descubrir patrones e insights ocultos.",
      icon: "🔍",
      lessons: [
        {
          id: "les-3-1",
          title: "Limpieza de datos",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Técnicas para manejar datos faltantes, duplicados, outliers y formatos inconsistentes.",
          reading: "Los datos del mundo real rara vez están limpios. Aprender a limpiarlos es una habilidad fundamental.\n\n**Problemas comunes:**\n- Valores faltantes (NaN, null)\n- Datos duplicados\n- Formatos inconsistentes (fechas, texto)\n- Outliers y valores atípicos\n- Tipos de datos incorrectos\n\n**Técnicas:**\n- Imputación de valores faltantes\n- Detección y eliminación de duplicados\n- Estandarización de formatos\n- Métodos para detectar outliers (IQR, Z-score)",
          resources: [
            { title: "Notebook: Limpieza de Datos", url: "#", type: "notebook" },
            { title: "Dataset con datos sucios (práctica)", url: "#", type: "download" },
            { title: "Guía de Data Cleaning", url: "#", type: "article" }
          ]
        },
        {
          id: "les-3-2",
          title: "Estadística descriptiva",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Medidas de tendencia central, dispersión y correlación para describir tus datos cuantitativamente.",
          reading: "La estadística descriptiva te permite resumir y describir las características principales de un dataset.\n\n**Medidas de tendencia central:**\n- Media, mediana y moda\n\n**Medidas de dispersión:**\n- Varianza, desviación estándar, rango\n- Cuartiles y rango intercuartílico\n\n**Relaciones entre variables:**\n- Correlación de Pearson\n- Correlación de Spearman\n- Matrices de correlación",
          resources: [
            { title: "Notebook: Estadística Descriptiva", url: "#", type: "notebook" },
            { title: "Resumen de fórmulas estadísticas", url: "#", type: "download" },
            { title: "Khan Academy: Estadística", url: "https://es.khanacademy.org/math/statistics-probability", type: "link" }
          ]
        },
        {
          id: "les-3-3",
          title: "Visualización avanzada",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Técnicas avanzadas de visualización: heatmaps, pairplots, gráficos interactivos con Plotly.",
          reading: "Más allá de los gráficos básicos, existen visualizaciones que revelan patrones complejos.\n\n**Visualizaciones avanzadas:**\n- Heatmaps de correlación\n- Pair plots (relaciones entre múltiples variables)\n- Violin plots y swarm plots\n- Gráficos interactivos con Plotly\n\n**Buenas prácticas:**\n- Elegir el gráfico adecuado para cada tipo de dato\n- Principios de diseño: claridad, precisión, eficiencia\n- Storytelling con datos",
          resources: [
            { title: "Notebook: Visualización Avanzada", url: "#", type: "notebook" },
            { title: "Documentación de Plotly", url: "https://plotly.com/python/", type: "link" },
            { title: "Galería de Seaborn", url: "https://seaborn.pydata.org/examples/", type: "link" }
          ]
        }
      ],
      quiz: {
        id: "quiz-3",
        title: "Quiz — Módulo 3",
        passingScore: 70,
        questions: [
          {
            question: "¿Qué técnica se usa para manejar valores faltantes reemplazándolos con la media?",
            options: [
              "Eliminación",
              "Imputación",
              "Normalización",
              "Estandarización"
            ],
            correct: 1,
            explanation: "La imputación consiste en reemplazar valores faltantes con estimaciones como la media, mediana o moda de la variable."
          },
          {
            question: "¿Qué medida estadística es menos sensible a valores atípicos (outliers)?",
            options: [
              "Media",
              "Varianza",
              "Mediana",
              "Rango"
            ],
            correct: 2,
            explanation: "La mediana es el valor central de los datos ordenados y no se ve afectada por valores extremos, a diferencia de la media."
          },
          {
            question: "¿Qué tipo de visualización muestra la correlación entre múltiples variables a la vez?",
            options: [
              "Histograma",
              "Gráfico de barras",
              "Heatmap de correlación",
              "Gráfico de línea"
            ],
            correct: 2,
            explanation: "Un heatmap de correlación muestra la fuerza y dirección de las relaciones entre todas las variables numéricas usando colores."
          }
        ]
      }
    },
    {
      id: "mod-4",
      title: "Machine Learning Básico",
      description: "Construye tus primeros modelos de Machine Learning: regresión, clasificación y evaluación.",
      icon: "🤖",
      lessons: [
        {
          id: "les-4-1",
          title: "Conceptos de Machine Learning",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprendizaje supervisado vs no supervisado, overfitting, train/test split y el flujo de trabajo de ML.",
          reading: "Machine Learning es el campo que permite a las computadoras aprender de los datos sin ser programadas explícitamente.\n\n**Tipos de aprendizaje:**\n- Supervisado: con etiquetas (regresión, clasificación)\n- No supervisado: sin etiquetas (clustering, reducción dimensional)\n- Por refuerzo: aprendizaje por recompensas\n\n**Conceptos clave:**\n- Features (variables independientes) vs Target (variable objetivo)\n- Train/Test split: dividir datos para entrenar y evaluar\n- Overfitting vs Underfitting\n- Validación cruzada (Cross-validation)",
          resources: [
            { title: "Notebook: Intro a ML", url: "#", type: "notebook" },
            { title: "Documentación de Scikit-learn", url: "https://scikit-learn.org/stable/", type: "link" },
            { title: "Visual: Bias vs Variance", url: "#", type: "article" }
          ]
        },
        {
          id: "les-4-2",
          title: "Regresión y Clasificación",
          type: "video",
          duration: "35 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Implementa modelos de regresión lineal, logística y árboles de decisión con Scikit-learn.",
          reading: "Los modelos supervisados son los más utilizados en la industria.\n\n**Regresión (predecir valores continuos):**\n- Regresión Lineal\n- Regresión Polinomial\n- Random Forest Regressor\n\n**Clasificación (predecir categorías):**\n- Regresión Logística\n- Árboles de Decisión\n- Random Forest Classifier\n- K-Nearest Neighbors (KNN)\n\n**Con Scikit-learn:**\n- fit() para entrenar\n- predict() para predecir\n- score() para evaluar",
          resources: [
            { title: "Notebook: Regresión y Clasificación", url: "#", type: "notebook" },
            { title: "Dataset: House Prices", url: "#", type: "download" },
            { title: "Guía de Scikit-learn", url: "https://scikit-learn.org/stable/user_guide.html", type: "link" }
          ]
        },
        {
          id: "les-4-3",
          title: "Evaluación de modelos",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Métricas de evaluación, matrices de confusión, curvas ROC y cómo elegir el mejor modelo.",
          reading: "Evaluar correctamente un modelo es tan importante como construirlo.\n\n**Métricas de regresión:**\n- MAE (Mean Absolute Error)\n- MSE (Mean Squared Error)\n- R² Score\n\n**Métricas de clasificación:**\n- Accuracy, Precision, Recall, F1-Score\n- Matriz de confusión\n- Curva ROC y AUC\n\n**Selección de modelos:**\n- Grid Search para hiperparámetros\n- Cross-validation\n- Comparación entre modelos",
          resources: [
            { title: "Notebook: Evaluación de Modelos", url: "#", type: "notebook" },
            { title: "Guía visual de métricas", url: "#", type: "article" },
            { title: "Scikit-learn: Model Evaluation", url: "https://scikit-learn.org/stable/modules/model_evaluation.html", type: "link" }
          ]
        }
      ],
      quiz: {
        id: "quiz-4",
        title: "Quiz — Módulo 4",
        passingScore: 70,
        questions: [
          {
            question: "¿Qué tipo de problema de ML predice una categoría (sí/no, spam/no spam)?",
            options: [
              "Regresión",
              "Clasificación",
              "Clustering",
              "Reducción dimensional"
            ],
            correct: 1,
            explanation: "La clasificación es un tipo de aprendizaje supervisado que predice categorías o clases discretas."
          },
          {
            question: "¿Qué ocurre cuando un modelo tiene overfitting?",
            options: [
              "Funciona mal en entrenamiento y en test",
              "Funciona bien en entrenamiento pero mal en datos nuevos",
              "Funciona mal en entrenamiento pero bien en test",
              "Funciona perfecto en todos los escenarios"
            ],
            correct: 1,
            explanation: "El overfitting ocurre cuando el modelo memoriza los datos de entrenamiento pero no puede generalizar a datos nuevos."
          },
          {
            question: "¿Para qué sirve dividir los datos en train y test?",
            options: [
              "Para tener más datos de entrenamiento",
              "Para reducir el tiempo de procesamiento",
              "Para evaluar cómo generaliza el modelo con datos no vistos",
              "Para eliminar outliers del dataset"
            ],
            correct: 2,
            explanation: "El train/test split permite evaluar el rendimiento del modelo con datos que no ha visto durante el entrenamiento."
          },
          {
            question: "¿Qué métrica es más adecuada cuando las clases están desbalanceadas?",
            options: [
              "Accuracy",
              "F1-Score",
              "R² Score",
              "MAE"
            ],
            correct: 1,
            explanation: "El F1-Score combina Precision y Recall, siendo más informativo que el Accuracy cuando hay desbalance de clases."
          }
        ]
      }
    },
    {
      id: "mod-5",
      title: "Proyecto Final",
      description: "Aplica todo lo aprendido en un proyecto completo de ciencia de datos de principio a fin.",
      icon: "🚀",
      lessons: [
        {
          id: "les-5-1",
          title: "Definición del proyecto",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Define el problema, selecciona los datos y planifica tu proyecto de ciencia de datos.",
          reading: "Un buen proyecto de ciencia de datos comienza con una pregunta clara y un plan bien definido.\n\n**Pasos para definir tu proyecto:**\n1. Elegir un problema que te interese\n2. Encontrar un dataset relevante (Kaggle, datos abiertos)\n3. Definir las preguntas que quieres responder\n4. Planificar el enfoque (EDA, modelos, visualizaciones)\n5. Establecer métricas de éxito\n\n**Fuentes de datasets:**\n- Kaggle Datasets\n- UCI Machine Learning Repository\n- Datos abiertos de gobiernos\n- APIs públicas",
          resources: [
            { title: "Kaggle Datasets", url: "https://www.kaggle.com/datasets", type: "link" },
            { title: "Plantilla de proyecto", url: "#", type: "notebook" },
            { title: "Ideas de proyectos", url: "#", type: "article" }
          ]
        },
        {
          id: "les-5-2",
          title: "Desarrollo guiado",
          type: "video",
          duration: "40 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Desarrollo paso a paso de un proyecto completo: desde los datos crudos hasta el modelo final.",
          reading: "En esta lección desarrollaremos un proyecto completo juntos, aplicando todo lo aprendido.\n\n**Flujo del proyecto:**\n1. Carga y exploración inicial de datos\n2. Limpieza y preprocesamiento\n3. Análisis exploratorio con visualizaciones\n4. Selección e ingeniería de features\n5. Entrenamiento de modelos\n6. Evaluación y comparación\n7. Selección del mejor modelo\n\n**Herramientas utilizadas:**\n- Pandas para manipulación de datos\n- Matplotlib/Seaborn para visualización\n- Scikit-learn para modelos de ML",
          resources: [
            { title: "Notebook: Proyecto Completo", url: "#", type: "notebook" },
            { title: "Dataset del proyecto", url: "#", type: "download" },
            { title: "Repositorio GitHub del proyecto", url: "#", type: "github" }
          ]
        },
        {
          id: "les-5-3",
          title: "Presentación de resultados",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprende a comunicar tus hallazgos de manera efectiva: reportes, dashboards y storytelling.",
          reading: "Comunicar resultados es tan importante como obtenerlos. Un gran análisis pierde valor si no se comunica bien.\n\n**Elementos de una buena presentación:**\n- Contexto del problema\n- Metodología clara y replicable\n- Visualizaciones que cuenten una historia\n- Insights accionables\n- Limitaciones y próximos pasos\n\n**Herramientas de presentación:**\n- Jupyter Notebook como reporte\n- Dashboards con Streamlit\n- Presentaciones con visualizaciones interactivas",
          resources: [
            { title: "Notebook: Reporte Final", url: "#", type: "notebook" },
            { title: "Guía de Streamlit", url: "https://streamlit.io/", type: "link" },
            { title: "Tips de presentación de datos", url: "#", type: "article" }
          ]
        }
      ],
      quiz: {
        id: "quiz-5",
        title: "Quiz Final",
        passingScore: 70,
        questions: [
          {
            question: "¿Cuál es el primer paso en un proyecto de ciencia de datos?",
            options: [
              "Entrenar un modelo de Machine Learning",
              "Definir el problema y las preguntas a responder",
              "Limpiar los datos",
              "Crear visualizaciones"
            ],
            correct: 1,
            explanation: "Todo proyecto debe comenzar definiendo claramente el problema y las preguntas que se buscan responder con los datos."
          },
          {
            question: "¿Qué herramienta es útil para crear dashboards interactivos en Python?",
            options: [
              "NumPy",
              "Scikit-learn",
              "Streamlit",
              "BeautifulSoup"
            ],
            correct: 2,
            explanation: "Streamlit es un framework de Python que permite crear dashboards y aplicaciones web interactivas de manera sencilla."
          },
          {
            question: "¿Qué es lo MÁS importante al presentar resultados de un análisis?",
            options: [
              "Usar muchos colores y animaciones",
              "Mostrar todo el código utilizado",
              "Comunicar insights claros y accionables",
              "Incluir la mayor cantidad de gráficos posible"
            ],
            correct: 2,
            explanation: "Lo más importante es comunicar insights claros que permitan tomar decisiones, no la cantidad de gráficos o la complejidad del análisis."
          }
        ]
      }
    }
  ]
};
