/* ==========================================================================
   CÓDIGO de cada recurso (el que se ve con "Ver código").
   La clave (tds, roc, ...) debe coincidir con el campo "codigo" del recurso
   en datos.js. Dentro de las comillas invertidas ` ` se escribe el código tal
   cual; las barras invertidas del código se escriben dobles (\\ en vez de \).
   ========================================================================== */
const CODIGO = {

tds: { lang: 'R', archivo: 'tds.R', code: `# ==============================================================================
# Sensibilidad (d') y criterio en Teoría de Detección de Señales
# Autor: Wilson Alexis Becerra Herrera
# ==============================================================================

calcular_tds <- function(hits, fa, n_senal, n_ruido) {
  # Corrección de proporciones extremas (Snodgrass y Corwin)
  p_hit <- (hits + 0.5) / (n_senal + 1)
  p_fa  <- (fa   + 0.5) / (n_ruido + 1)

  z_hit <- qnorm(p_hit)
  z_fa  <- qnorm(p_fa)

  d_prime <- z_hit - z_fa             # sensibilidad
  c_crit  <- -0.5 * (z_hit + z_fa)    # criterio (0 = neutro)
  beta    <- exp(d_prime * c_crit)    # razón de verosimilitud en el punto de corte

  data.frame(
    Hit_Rate   = round(p_hit, 3),
    FA_Rate    = round(p_fa, 3),
    d_prime    = round(d_prime, 3),
    Criterio_C = round(c_crit, 3),
    Beta       = round(beta, 3)
  )
}

# Ejemplo: 85 aciertos en 100 ensayos con señal y 15 falsas alarmas en 100 con ruido
calcular_tds(hits = 85, fa = 15, n_senal = 100, n_ruido = 100)` },

roc: { lang: 'R', archivo: 'roc_auc.R', code: `# ==============================================================================
# Curva ROC y AUC con intervalo de confianza por bootstrap
# Autor: Wilson Alexis Becerra Herrera
# ==============================================================================

if (!require("pROC")) install.packages("pROC")
library(pROC)

# Datos simulados
set.seed(123)
estado_real  <- c(rep(1, 100), rep(0, 100))   # 1 = señal, 0 = ruido
puntaje_test <- c(rnorm(100, mean = 2.5, sd = 1),
                  rnorm(100, mean = 1.0, sd = 1))

# Objeto ROC
roc_obj <- roc(response = estado_real, predictor = puntaje_test, quiet = TRUE)

# AUC e intervalo de confianza al 95 % por bootstrap
cat("AUC estimado:", round(auc(roc_obj), 4), "\\n")
print(ci.auc(roc_obj, method = "bootstrap", boot.n = 2000))

# Gráfico
plot(roc_obj,
     main = "Curva ROC",
     col = "#1847B8",
     lwd = 3,
     legacy.axes = TRUE,
     print.auc = TRUE)
grid()` },

tri: { lang: 'R', archivo: 'modelo_2pl_mirt.R', code: `# ==============================================================================
# Calibración de un modelo 2PL con el paquete 'mirt'
# Autor: Wilson Alexis Becerra Herrera
# ==============================================================================

library(mirt)

# Simulación: 20 ítems dicotómicos, 500 personas
set.seed(123)
a <- runif(20, 0.8, 2.5)   # discriminación
b <- rnorm(20, 0, 1)       # dificultad
d <- -a * b                # intercepto que usa mirt: d = -a * b
datos <- simdata(a = a, d = d, N = 500, itemtype = "2PL")

# Ajuste del modelo 2PL
modelo_2pl <- mirt(datos, 1, itemtype = "2PL", verbose = FALSE)

# Parámetros en la parametrización clásica (a = discriminación, b = dificultad)
parametros <- coef(modelo_2pl, IRTpars = TRUE, simplify = TRUE)
head(parametros$items)

# Curvas características de los ítems
plot(modelo_2pl, type = "trace", facet_items = TRUE)` },

omega: { lang: 'R', archivo: 'omega_mcdonald.R', code: `# ==============================================================================
# Confiabilidad: omega de McDonald con lavaan
# Autor: Wilson Alexis Becerra Herrera
# ==============================================================================

library(lavaan)

# Modelo factorial unidimensional (cambia los nombres por los de tus ítems)
modelo <- ' factor =~ item1 + item2 + item3 + item4 + item5 '

# Análisis factorial confirmatorio
fit <- cfa(modelo, data = tus_datos)

# Cargas y varianzas de error estandarizadas
cargas    <- inspect(fit, "std")$lambda
error_var <- inspect(fit, "std")$theta

sum_cargas <- sum(cargas)^2
sum_error  <- sum(diag(error_var))

omega <- sum_cargas / (sum_cargas + sum_error)
cat("Omega de McDonald:", round(omega, 3), "\\n")` },

limpieza: { lang: 'R', archivo: 'limpieza_likert.R', code: `# ==============================================================================
# Limpieza y recodificación de ítems tipo Likert
# Autor: Wilson Alexis Becerra Herrera
# ==============================================================================

library(tidyverse)

datos_procesados <- datos_raw %>%
  # Recodificar ítems invertidos (escala Likert de 1 a 5)
  mutate(across(c(item2_inv, item5_inv), ~ 6 - .x)) %>%
  # Excluir respuestas con tiempo total menor de 30 segundos
  filter(tiempo_total >= 30) %>%
  # Puntaje total sumatorio
  mutate(puntaje_total = rowSums(select(., starts_with("item")), na.rm = TRUE))` },

latex: { lang: 'LaTeX', archivo: 'informe.tex', code: `\\documentclass[11pt,a4paper]{article}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage[spanish]{babel}
\\usepackage{amsmath,amsfonts,amssymb}
\\usepackage{graphicx}
\\usepackage{booktabs}
\\usepackage[hidelinks]{hyperref}

\\title{\\textbf{Informe de validación psicométrica}}
\\author{Wilson Alexis Becerra Herrera}
\\date{\\today}

\\begin{document}
\\maketitle

\\section{Resumen}
Este informe documenta las propiedades métricas del instrumento evaluado.

\\section{Detección de señales}
La sensibilidad se calcula como
\\begin{equation}
    d' = z(\\text{aciertos}) - z(\\text{falsas alarmas}).
\\end{equation}

\\section{Conclusiones}
Escribe aquí las conclusiones.

\\end{document}` }

};
