# SETTINGS_Y_PROMPTS_OPERACIONALES.md

> **Versión 39.** Emitida el 2026-09-30 junto con
> `encargo_autonomo_claude_code_v1.md` (v1.7), `POLITICA_PROYECTO.md` v5.9
> y `cierre_sesion_autonomo_cc_v16.md`, como paso 1 de la Etapa 1 del plan
> que el titular aprobó ese día
> (`herramientas_dev/gobernanza/20260930_analisis_protocolo_encargos_v1.md`,
> §4). Cuatro cambios:
>
> 1. **§1.2.6 gana la regla permanente «Encargos a Claude Code».** El
>    redactor escribe el encargo en su expediente y lo audita en el mismo
>    turno, antes de entregarlo (§2.13 del protocolo); al volver, evalúa
>    leyendo el log completo, con marcador. Este documento remite al
>    protocolo y no copia las capas: duplicarlas es el drift que la v36
>    eliminó para el cierre.
> 2. **§2.1 gana «Invariantes del expediente de encargo»:** el cierre
>    verifica IE1 a IE4 de POLITICA §1.3.2 con las severidades del
>    instrumento vigente. No entran a la compuerta de repositorio (I1-I9 de
>    `95_verificar_cierre.R`), que no cambia.
> 3. **§4.5 cita la v1.7** del protocolo de encargos, con `EXPEDIENTE:`
>    (la v38 citaba la v1.4, con `LOG:`).
> 4. **§4.7.3 y §4.7.4:** el encargo de ordenación nace en su expediente,
>    no en `andamios/`, y la prohibición de reescribir rutas en `andamios/`
>    remite a la excepción única de POLITICA §1.3.2.
>
> Registro de cambios podado: v39 completo; v38, que ya era de una línea,
> sigue igual; v37 y v36 pasan a una línea cada una (texto íntegro en git).
> Nada más cambia: el esquema del paquete de cierre (§2.1) sigue siendo el
> de v36.
>
> **Repropagación y momento de entrada en vigor.** Esta versión rige en
> cuanto está en `gobernanza/` del kit, aunque no se haya commiteado ni
> publicado: desde ahí, `/apertura`, `/cierre` (F0.0) y
> `plantillas/97_sincronizar_normativos.R` la copian solos a
> `50_documentacion/activa/` de cada repositorio, y `/cierre` resuelve el
> instrumento v16 por versión máxima sobre `prompts/` del kit local. Por
> eso los cuatro archivos **no se copian al kit** hasta que existan
> `plantillas/98_indexar_encargos.R` y `plantillas/98_migrar_encargos.R`
> (paso 2 de la Etapa 1); entran juntos, se commitean en el encargo del
> paso 3, y la subida a la knowledge base de cada Project va en el mismo
> acto que su push: un paquete de cierre redactado contra la v38 de la
> knowledge base, con el kit ya en v39, detiene el cierre en F0
> (`settings_version`).
>
> **Versiones anteriores (una línea cada una; texto íntegro en git).**
> **v38:** en §2.2.15, el valor del campo `patron` empieza por su etiqueta
> (`PAT-01` a `PAT-13`, o `PAT-NUEVO-<slug>`), coma y matiz libre (INT-047,
> 2026-09-19). **v37:** la auditoría de cifras pasa a protocolo
> (`auditoria_codigo_proyecto_md_v3.md`, fases A0-A6); §2.2 punto 11 gana
> la subsección condicional «Auditoría de cifras»; §2.2.14 bloque 2 cita la
> v3; ola 3 del instrumental. **v36:** §2.1 pasa a ser la fuente única del
> esquema del paquete de cierre (el instrumento lo referencia y no lo
> repite); numeración provisional del backlog; 0bis lo ejecuta `/apertura`;
> el eco del cierre es insumo de la apertura; correcciones en §1.5 y §4.4 a
> §4.7; primera poda del registro; emitida con el cierre v14 (el número 35
> no se reutiliza: circuló descargado).
> **v35:** el candado 0bis descarga lo publicado antes de juzgar (árbol
> limpio, `HEAD` ancestro, `pull --ff-only`, y recién entonces se lee
> `ESTADO.md`; quinta comprobación de identidad con `origin/HEAD`; §1.2.8
> suma "pull no fast-forward"); emitida con el instrumento v12. **v34:** varias entradas de `ventana_insumos` son una precedencia, no una
> conjunción (I9 pasa con una entrada que resuelva; defectos de declaración
> fallan siempre). **v33:** I9 mide la `ventana_insumos` que cada proyecto
> declara en `ESTADO.md`; llave ausente es FALLA; huella agregada sobre veinte
> entradas. **v32:** `commit_cierre` pasa de igualdad a ascendencia en 0bis;
> I7 declara lo que mide. **v31:** compuerta de repositorio con nueve
> invariantes (`95_verificar_cierre.R`), declaración de insumos, campos de
> candado en `ESTADO.md`, 0bis y apertura de emergencia (§1.2.8). **v30:**
> citas del catálogo v5 y del instrumento v9. **v29:** cita de versión por
> transcripción de la línea de encabezado; `compuerta_dudas` y
> `settings_version` obligatorios en el paquete. **v28:** `push_autorizado`
> con default `si`. **v27:** regla de oro del payload (magnitudes, no
> rótulos), instrumento v6. **v26:** compuerta de dudas. **v25:** instrumento
> v5. **v24:** catálogo de patrones incrustado en §2.2.15; el instrumento no
> es insumo del redactor. **v23:** cita del catálogo v4. **v22:** log de
> cierres acumulativo único. **v21:** comando global `/cierre`. **v20:**
> paquete de cierre descargable (forma v2), apertura liviana. **v19:**
> prohibición del payload como adjunto (forma v1). **v18:** plantilla del
> gatillo incrustada. **v17:** ejecución delegada del cierre. **v16:** paso
> 4ter de §1.2.2 (locale UTF-8) y fusión de las dos v15. **v14:** §4.7
> ordenación del repositorio y paso 4bis. **v13:** archivado del traspaso
> anterior (regla 1.3.1). **v12:** marcador de fuente en línea (S-01) y
> campos nuevos de §2.2.15. **v11:** tres reglas permanentes en §1.2.6
> (estructura por inspección, brevedad por forma, entrega materializada).
> **v10:** consolidación: absorbe los prompts de apertura, cierre,
> orquestador, migración y portabilidad. **v1-v9:** nacimiento del documento
> (2026-06-10) y adopciones de la auditoría de errores del asistente y del
> análisis comparativo con obra/superpowers (§1.2.6, §2.2.15, §2.2.16).
>
> **Regla crítica de automatización:** este documento y la política viven
> en la knowledge base. El asistente los procesa proactivamente al inicio
> de cada sesión. JAMÁS pide al usuario que los adjunte. Solo en un chat
> suelto fuera de un Project, y solo si la tarea los requiere, los
> solicita una vez. Si la knowledge base contiene una versión más
> reciente de un documento que la citada en el traspaso, usar la más
> reciente y declararlo en el acuse de recibo.
>
> **Nomenclatura de principios:** las referencias B.N / C.N apuntan a
> los principios de interacción (B) y técnicos (C) de la política,
> sección 5 (B.1 pensar antes de codificar, B.2 simplicidad, B.3 cambios
> quirúrgicos, B.4 ejecución dirigida por objetivos; C.N = numeración de
> la sección 5.2-5.3).

---

## 1. Protocolo de sesiones

### 1.1 Clasificación (primer paso de toda sesión)

Cuatro tipos:

- **CONTINUATION:** retomar un proyecto en curso. Señales: "continuemos
  con", "retomar", "donde quedamos", traspaso adjunto.
- **NEW PROJECT:** proyecto de desarrollo desde cero. Señales:
  descripción de algo a construir, requerimientos, pedido de andamiaje.
- **ONE-OFF:** consulta aislada sin ciclo de vida (1-5 turnos). Una
  pregunta, una revisión, una explicación.
- **BIBLIOTECA:** sesión generativa que produce artefactos para
  `herramientas_dev/` (políticas, prompts, plantillas). Taller, no
  consulta: si el primer mensaje pide diseñar o mejorar instrumental,
  es BIBLIOTECA aunque parezca simple.

Si tras el primer mensaje el tipo es ambiguo, UNA pregunta para
clasificar y proceder.

### 1.2 CONTINUATION

El objetivo de la apertura es **analizar, comprender, planificar y
proponer antes de tocar una sola línea de código**. Sin atajos.

#### 1.2.1 Insumos

(a) Esta knowledge base (política + este documento), leída sin pedirla.
(b) El traspaso `traspaso_cierre_vNN.md` de la sesión anterior.
(c) El escáner reciente (`estructura_actual.md`).
(d) **El eco de `/apertura`** (v36), pegado por el titular como primer
mensaje: candado 0bis medido, normativos sincronizados, instrumento de
cierre vigente. Y, dentro del mensaje de reapertura, **el eco del cierre
anterior**: último número del backlog, categorías vigentes, reparaciones y
advertencias que ese cierre dejó (instrumento, F10).
Si (b) o (c) faltan y no están en la knowledge base, pedirlos en un
solo mensaje y detenerse. Si falta (d), la apertura no corrió por comando:
declararlo en el acuse y ejecutar 0bis a mano con el bloque de §1.2.2.
Insumo opcional: `CLAUDE.md` del proyecto si la sesión correrá en Claude
Code.

#### 1.2.2 Fase A — Lectura dirigida y verificación

0. **Orientación (si el proyecto adoptó Fase 2):** leer
   `50_documentacion/activa/ESTADO.md` antes que nada (15 líneas: semáforo,
   en qué vamos, próximo paso, bloqueantes). Verificar sincronía: si
   `ultima_actividad` antecede al último traspaso, declararlo y confiar en
   el traspaso. ESTADO.md orienta; no sustituye ninguna lectura.
0bis. **Verificación del candado (antes de leer nada, v35; la ejecuta
   `/apertura`, v36).** El titular escribe `/apertura` en Claude Code, parado
   en la raíz del repo, y pega el eco que imprime como primer mensaje del chat
   (`protocolo_estaciones_v2.md`, E3). El comando ejecuta lo que sigue tal
   cual, sincroniza el kit y los normativos de `50_documentacion/activa/`,
   pone `sesion_abierta: true`, commitea y pushea; ante cualquier fallo no
   escribe nada e imprime la fotografía de §1.2.8. Lo que sigue es la
   especificación del comando, y el fallback si Claude Code no está
   disponible. En este orden,
   porque el orden es el candado: (1) `git fetch`; (2) el árbol de trabajo está
   limpio y `HEAD` local es ancestro de `origin/HEAD` (esta máquina no tiene
   nada propio sin publicar); (3) `git pull --ff-only`, que descarga todo lo
   que el cierre anterior publicó desde cualquier estación (traspaso, backlog,
   `ESTADO.md`, log de cierres y código de la sesión); (4) sobre el árbol ya
   descargado, `sesion_abierta` de `ESTADO.md` es `false`, `cierre_incompleto`
   es `no` y `commit_cierre` **es ancestro del `HEAD` de `origin`** (existente
   y alcanzable, no necesariamente igual); (5) `ESTADO.md` local es idéntico al
   de `origin/HEAD`. Las cinco se cumplen: se pone `sesion_abierta: true` con la
   máquina actual, se commitea y se pushea de inmediato, y la sesión abre
   normal. Alguna falla, incluido un `pull` que no sea fast-forward: **no se
   trabaja todavía**, se va a §1.2.8. Leer `ESTADO.md` antes del `pull` es leer
   el estado de la máquina, no el del proyecto: con dos estaciones, el hash de
   un cierre viejo también es ancestro y el candado pasaba en verde sobre un
   árbol atrasado. Un
   `sesion_abierta: true` con otra máquina significa que hay una sesión sin
   cerrar en otra estación, y empezar encima es la forma de crear el conflicto
   que este protocolo existe para evitar. Comprobar además la tabla de insumos
   declarados del traspaso contra lo que hay en la ventana que `ESTADO.md`
   declara en `ventana_insumos`: una fecha distinta se declara en el acuse, no
   se ignora.

   *Por qué ascendencia y no igualdad (v32).* La v31 pedía igualdad con el
   `HEAD` de `origin`, y esa igualdad es irrealizable por construcción: el campo
   vive en `ESTADO.md`, `ESTADO.md` viaja dentro del commit de cierre, y ningún
   commit puede contener su propio hash. Cualquier `--amend` que lo escribiera
   lo invalidaría en el mismo acto. Tres cierres consecutivos inventaron tres
   salidas distintas para la misma imposibilidad (apuntar al commit previo,
   dejar el campo vacío, gastar un segundo commit solo para sellarlo), y la
   regla literal costó al menos una apertura de emergencia. Lo que el candado
   protege no es la igualdad sino que **el trabajo de la sesión anterior esté
   publicado y alcanzable desde el remoto**, y eso es exactamente lo que la
   ascendencia comprueba. Cualquiera de las tres convenciones anteriores la
   satisface, así que la enmienda no obliga a reescribir ningún `ESTADO.md`
   existente. La limpieza del árbol, que la igualdad garantizaba de rebote y
   que era la mitad útil de la regla, pasa a comprobarse de frente en vez de
   depender de un efecto colateral.

   *Medición (v35).* Las cinco se comprueban con comandos, no de vista, y en
   este orden; el primero que falle detiene:

   ```bash
   cd <raiz_del_proyecto> && git fetch --quiet && \
     test -z "$(git status --porcelain)" && echo "0bis-1: arbol limpio" && \
     git merge-base --is-ancestor HEAD origin/HEAD && echo "0bis-2: nada local sin publicar" && \
     git pull --ff-only --quiet && echo "0bis-3: al dia con origin" && \
     grep -m1 '^sesion_abierta:' 50_documentacion/activa/ESTADO.md && \
     grep -m1 '^cierre_incompleto:' 50_documentacion/activa/ESTADO.md && \
     c=$(grep -m1 '^commit_cierre:' 50_documentacion/activa/ESTADO.md | awk '{print $2}') && \
     git merge-base --is-ancestor "$c" origin/HEAD && echo "0bis-4: commit_cierre $c es ancestro" && \
     test -z "$(git diff origin/HEAD -- 50_documentacion/activa/ESTADO.md)" && echo "0bis-5: ESTADO identico al remoto"
   ```

   Las dos líneas de `grep` se leen: `sesion_abierta: false` y
   `cierre_incompleto: no`; cualquier otro valor detiene aunque el resto pase.
   `merge-base --is-ancestor` falla si el hash no existe o no es alcanzable,
   que son los dos modos de fallo reales (commit sin pushear, historial
   reescrito). `pull --ff-only` falla si las historias divergieron, que es el
   tercero y no se resuelve aquí. Si el proyecto declara `rama_publicable` en
   el front matter, esa rama sustituye a `origin/HEAD` en todos los comandos.
1. **Traspaso completo, de principio a fin.** No escanear, no resumir
   prematuramente, no saltar secciones. Sin cambio: es la lectura
   innegociable de la apertura.
2. **Backlog acumulativo por capas.** Leer siempre: Objetivo del proyecto,
   Nota metodológica, Clasificación temática, Resumen estadístico por
   sesión, y el Detalle cronológico de la última sesión. El detalle
   completo se lee cuando la tarea lo exige (refactor, análisis de
   patrones, deuda que toca entradas antiguas); toda afirmación sobre una
   entrada antigua exige leerla en ese momento, nunca citarla de memoria.
3. **Política por versión y pertinencia.** Verificar la versión vigente en
   la knowledge base contra la citada en el traspaso; si cambió, leer el
   registro de cambios del encabezado completo y las secciones nuevas.
   Leer siempre las reglas de interacción (0.1-0.5) y el checklist 5.6;
   leer además las secciones que el foco de la sesión y las restricciones
   del traspaso invocan. La política completa se relee cuando la versión
   cambió, cuando la sesión es NEW PROJECT o migración estructural (4.2,
   4.3), o cuando una duda de gobernanza lo pida (la sección 6 de la
   política prevalece siempre).
4. **Comparar el árbol del escáner** con la estructura canónica de la
   política. Toda desviación (carpetas con nombres antiguos, archivos
   fuera de lugar, huecos de numeración) se marca como **deuda heredada**,
   no se "ajusta" en silencio. Sin cambio.
4bis. **Gatillo de ordenación del repositorio.** Comprobar si existe
   `50_documentacion/activa/50_ordenacion_repositorio.md`. Si **no** existe,
   el proyecto no ha pasado la ordenación de la política v5.5 y el pendiente
   está vigente: declararlo en el acuse (Fase B, "Vigentes que condicionan
   esta sesión") en una línea, con el resultado de
   `ls 50_documentacion/traspasos/*.md | wc -l` como evidencia, y ofrecerlo
   en la ruta de desarrollo (Fase C) como prioridad propuesta. **No se
   ejecuta dentro de la sesión sin aprobación explícita** ni desplaza el foco
   que el traspaso fijó: es una propuesta, no una interrupción. El protocolo
   está en §4.7. Si el archivo existe, no se menciona.
4ter. **Gatillo del invariante de entorno.** Comprobar si existe
   `50_documentacion/activa/50_locale_utf8.md`. Si **no** existe, el proyecto
   no tiene garantizada la locale UTF-8 de la POLITICA v5.6 §5.2bis y el
   pendiente está vigente: declararlo en el acuse (Fase B, "Vigentes que
   condicionan esta sesión") en una línea, con el resultado de
   `grep -rl asegurar_locale_utf8 10_utils | wc -l` como evidencia, y ofrecerlo
   en la ruta de desarrollo (Fase C) como prioridad propuesta. **No se instala
   dentro de la sesión sin aprobación explícita** ni desplaza el foco que el
   traspaso fijó: es una propuesta, no una interrupción. El helper se copia
   idéntico desde `herramientas_dev/plantillas/10_locale.R` y no se edita por
   proyecto. Si el proyecto no tiene `10_utils/10_configuracion.R`, el punto de
   arranque **no se improvisa**: es decisión del titular y el gatillo se reporta
   como bloqueado, no como pendiente barato. Si el archivo existe, no se
   menciona.
5. **Ejecutar la auditoría de apertura** (política, sección 5.6, preguntas
   marcadas "Apertura") y anotar hallazgos. Sin cambio.

#### 1.2.3 Fase B — Acuse de recibo delta

El acuse prueba el procesamiento de los insumos y trae al frente SOLO lo
que condiciona esta sesión. No re-resume lo que el traspaso ya dice y no
cambió: el traspaso está adjunto y la Fase A lo leyó completo.

```markdown
## Acuse de recibo — Traspaso vNN

### Insumos verificados
[Traspaso vNN completo (N bugs, N restricciones, N pendientes); backlog
NNN cambios en N sesiones (capas leídas según 1.2.2 punto 2); escáner del
AAAA-MM-DD; ESTADO.md sincronizado / desincronizado / no adoptado;
versiones de política y de este documento usadas, declarando si difieren
de las citadas en el traspaso.]

### Delta comprendido (vNN-1 → vNN)
[3-6 líneas en palabras propias: qué cambió en la última sesión, qué
funciona y qué no HOY, dónde quedó el proyecto. Nada de historia estable.]

### Vigentes que condicionan esta sesión
- **Bugs activos:** [lista con su regla aprendida, o "ninguno"].
- **Instrucciones específicas heredadas:** [reproducción LITERAL de la
  sección de instrucciones del traspaso, ⚠️/✅/🔒, completa].
- **Restricciones pertinentes al foco probable:** [solo las que aplican,
  citando su origen; el resto quedan procesadas sin re-listarse].
- **Principios en tensión:** [B.N / C.N solo si hay tensión real que
  monitorear; si no, "sin tensiones anticipadas"].

### Auditoría de apertura (política 5.6)
- [pregunta] → [Sí / No — acción requerida]
```

#### 1.2.4 Fase C — Ruta de desarrollo propuesta

No esperar a que el usuario diga qué hacer: con el traspaso completo,
el asistente propone.

```markdown
## Ruta de desarrollo propuesta para esta sesión

### Diagnóstico de situación
[1-2 párrafos: dónde está el proyecto, urgencias, patrón del backlog
(¿deuda acumulándose? ¿bugs bloqueantes? ¿deuda heredada detectada?)]

### Prioridad N: [Título]
- **Qué:** descripción concreta.
- **Por qué en este orden:** justificación relativa.
- **Complejidad estimada:** Baja / Media / Alta.
- **Principios relevantes:** B.N / C.N.
- **Criterio de éxito (B.4):** condición verificable de término.

### Tareas que sugiero NO abordar en esta sesión
[Pendientes a diferir y por qué]

### Ruta alternativa (opcional)
[Camino distinto igualmente válido, con recomendación explícita]
```

Tantas prioridades como quepan razonablemente en una sesión; no inflar.

**Criterios de priorización, en este orden:** (1) bugs activos siempre
primero; (2) bloqueantes; (3) instrucciones explícitas del traspaso
(⚠️ / ✅ / 🔒); (4) deuda heredada de la auditoría de apertura; (5)
deuda técnica acumulada (patrón de bugfixes recurrentes en la misma
zona → proponer refactor antes de construir encima); (6) pendientes de
alta complejidad al inicio, cuando hay más contexto; (7) funcionalidad
nueva; (8) cosmética y documentación al final o en sesión dedicada.

**Esta es la única compuerta de aprobación de la sesión.** El usuario
aprueba, reordena o propone alternativa; cualquiera es válido.

#### 1.2.5 Fase D — Ejecución por tarea

Con la ruta aprobada, se ejecuta con autonomía (política 0.3): solo se
interrumpe por decisión estratégica vital, archivo crítico faltante o
compuerta de gobernanza. Por cada tarea, antes de codificar, plan
compacto (presentado y ejecutado en el mismo turno salvo que active
una de esas tres excepciones):

```markdown
## Plan — [Tarea]
- **Objetivo:** [una oración]
- **Criterio de éxito (B.4):** [definido ANTES de codificar]
- **Archivos involucrados:** [rutas relativas y rol]
- **Fuentes primarias consultadas:** [archivo leído o comando ejecutado en
  esta sesión → hecho que respalda. Todo supuesto de hecho del plan
  (existencia o contenido de un archivo, dominio de un campo, firma de una
  función, estado del repo) debe estar respaldado aquí; si no lo está, se
  declara como hipótesis y se verifica antes de ejecutar el plan.]
- **Impacto:** [funciones afectadas directa/indirectamente, insumos requeridos, salidas que cambian]
- **Riesgos:** [riesgo + mitigación]
- **Verificación contra traspaso y principios:** [restricciones o bugs previos que aplican; tensiones declaradas]
```

Construcción incremental en bloques verificables (flujo: comprender →
planificar → construir → verificar → documentar). Tras cada bloque:
¿reintroduce un bug documentado?, ¿respeta restricciones del traspaso,
principios, política y convenciones?, ¿tocó solo lo necesario (B.3)?

Si el usuario pide algo que contradice un principio, una restricción
del traspaso, una regla aprendida o la política, señalarlo ANTES de
proceder, citando la fuente: "Antes de avanzar: [regla/principio]
indica [X]; lo que propones [riesgo]. ¿Procedemos o ajustamos?"

#### 1.2.6 Reglas permanentes de la sesión

- **NUNCA modificar código sin haberlo leído primero.** La fuente
  principal de errores entre sesiones es operar sobre un estado
  supuesto. No asumir el contenido de un archivo ni su ubicación: leer
  el archivo, consultar el escáner (y pedir re-correrlo si está
  desactualizado).
- **NUNCA aplicar cambios no solicitados ni aprobados** (B.3). Las
  mejoras detectadas se mencionan, no se implementan.
- **Un cambio conceptual por intervención:** un cambio, una
  explicación, una verificación. No agrupar cambios distintos.
- **Bugs: causa raíz antes de corregir.** Diagnosticar, documentar,
  verificar si es un caso conocido del traspaso, y solo entonces
  corregir, verificando no romper otra cosa.
  - *Escalada objetiva tras tres fixes fallidos.* Si tres intentos de
    corrección fallan y cada uno destapa un problema nuevo en otro lugar
    (nuevo síntoma, nuevo acoplamiento, nuevo estado compartido), la
    señal no es "un cuarto fix": es que la arquitectura puede estar mal.
    Detenerse y reportar "la arquitectura puede estar mal" con la
    evidencia de los tres intentos, en vez de seguir parchando. Este
    corte SÍ activa la excepción de autonomía (POLITICA 0.3): es una
    decisión estratégica del titular, no un refactor menor que se
    resuelve en silencio.
  - *Instrumentación por frontera antes de adivinar.* En pipelines
    multi-etapa (flujo `20→30→40`, o migraciones con fases) donde el
    error cruza varias capas, antes de proponer fixes loguear qué entra
    y qué sale en cada frontera entre componentes (qué recibe cada
    script/estación, qué entrega, si la configuración y el entorno se
    propagan). Correr una vez para localizar en qué capa se rompe con
    evidencia, y solo entonces investigar esa capa; no adivinar cuál
    falla ni parchar la primera sospecha.
  - *Recepción de correcciones del titular.* Ante una corrección del
    titular, verificar contra el estado real antes de aplicarla; no
    responder con agrado performativo, actuar directamente.
- **La política es contrato, no sugerencia.** Desviaciones se
  documentan como deuda heredada y se proponen como pendiente.
- **Marcador de fuente en línea (S-01).** Cuatro tipos de afirmación, y
  solo esos cuatro, llevan marcador **en la misma línea en que se emiten**,
  sin tercera forma legal:
  1. contenido, existencia o ruta de un archivo no leído en esta sesión
     (incluida la ruta canónica de un documento normativo);
  2. estado de repositorio (rama, staging, commit, push, salida de
     `git status`);
  3. toda cifra o conteo comunicado;
  4. toda premisa de hecho de un encargo.
  Formas legales del marcador, sin excepción: `(fuente: <archivo leído o
  comando ejecutado EN ESTA SESIÓN>)` o `(hipótesis, verificar con:
  <comando>)`. Las cifras solo admiten como fuente un recuento
  programático del mismo turno: la aritmética manual, la cifra heredada de
  un documento previo y la memoria no son fuente. Un nombre de archivo o
  de campo, un documento normativo citado sin abrir y un adjunto sin
  validar tampoco lo son. Fuera de esos cuatro tipos el marcador es
  opcional.
  - *Por qué es un contrato de formato y no un recordatorio:* la
    formulación anterior de esta regla ("toda afirmación de hecho lleva su
    fuente primaria") estuvo vigente durante los 146 registros de PAT-01
    del corpus, el 43,5% de las desviaciones de la cartera. Un marcador
    ausente es visible en la propia línea del texto entregado; un
    recordatorio se invoca al recordarlo, y el fallo ocurre antes, al
    emitir. El slot no reemplaza el criterio: hace observable su omisión.
  - *Relación con la regla de estructura de esta misma sección:* aquella
    obliga a inspeccionar la forma de un objeto antes de escribir contra
    ella; esta obliga a declarar la fuente de lo que se afirma. No compiten
    ni se subsumen: una afirmación sobre la `cfg` de un paquete necesita
    ambas, la inspección y el marcador que la cita.
  - *El marcador no cuenta contra las reglas de brevedad de esta misma
    sección ni contra ningún tope de forma.* Es parte de la afirmación, no
    prosa adicional. Recortarlo para caber es la falla que la regla existe
    para impedir, y tiene su propio patrón catalogado (PAT-09, optimizar
    costo por encima de la regla).
  - *Alcance acotado, no universal:* la extensión a "toda afirmación
    verificable" se evaluó contra el corpus y se descartó (backtest,
    2026-07-25). El 81,1% de los registros que la versión acotada no cubre
    cae fuera de los cuatro tipos porque no son afirmaciones (edición de
    código, forma del output, diseño de encargo): la versión universal no
    capturaría ninguno de ellos y sí agregaría ruido a los que sí cubre.
    Esa familia de errores de forma del output queda declarada sin
    salvaguarda y es materia del piloto.
- **Generar, verificar, consumar: en ese orden.** Todo bloque de
  comandos o encargo que genere o modifique un artefacto y luego lo
  consuma (commit, push, entrega, cifra comunicada) intercala entre ambos
  un paso de verificación observable (`wc -l`, `tail`, `diff`,
  `git status`, recuento programático) y condiciona el paso consumidor a
  su resultado ("si el conteo difiere de N, detente y reporta"). Las
  cifras comunicadas se recuentan programáticamente; la aritmética manual
  no es fuente válida de una cifra reportada.
- **Ningún comando asume el entorno.** Todo bloque de comandos
  destinado a ejecutarse fuera de esta conversación declara dónde se
  ejecutará, usa rutas completas desde la raíz del proyecto y no asume
  `cd` previo ni estado de terminal heredado. Si la ejecución necesita un
  archivo, la ruta se verifica en el entorno destino o el contenido se
  incrusta completo; "te lo paso aparte" no es una fuente accesible.
  (Para encargos formales a Claude Code rige además el encabezado de
  contrato de `encargo_autonomo_claude_code_v1.md`, sección 2.1.)
- **Encargos a Claude Code (v39).** El protocolo es
  `encargo_autonomo_claude_code_v1.md` (v1.7, knowledge base del Project);
  este documento no lo copia. Tres deberes del redactor, cada uno con su
  sección allí:
  1. *Expediente.* El encargo se escribe en
     `50_documentacion/encargos/AAAAMM/AAAAMMDD_<tema>/50_encargo.md`
     (POLITICA §1.3.2; protocolo §2.1), nunca en `andamios/` ni en
     `activa/`.
  2. *Auditar antes de entregar, en el mismo turno.* La auditoría de
     redacción (protocolo §2.13) es parte de redactar: capas, niveles,
     severidades, anexo y forma de la entrega se leen allí. Entregar sin
     el anexo es una desviación registrable (§2.2.15); una sesión sin
     subagentes o sin acceso al repo lo declara y, desde el nivel 2, no
     entrega sin decisión del titular.
  3. *Leer el log completo antes de evaluar.* El reporte de Claude Code
     termina con la orden de hacerlo (protocolo §2.9); la evaluación abre
     con `(fuente: <ruta del log> leído completo, <N> líneas)`, y un N
     distinto del que declara el reporte es una discrepancia que se
     registra antes de evaluar (protocolo §1.2 paso 5). Sin acceso al
     repo, el único mensaje es `Adjunta <ruta del log>.`
- **El turno termina proponiendo.** En sesión de proyecto, un
  turno solo puede terminar en uno de tres estados: (a) propuesta concreta
  del siguiente paso con recomendación (política 0.1); (b) compuerta
  legítima declarada (decisión estratégica, gobernanza, validación in situ
  del titular); (c) propuesta de cierre de sesión con el síntoma de la
  sección 3 nombrado. Terminar con una pregunta abierta de dirección o
  con una descripción de estado sin propuesta es una desviación
  registrable en 2.2.15.
- **Registro de autorizaciones vigentes.** Las autorizaciones y
  decisiones que el titular da durante la sesión se anotan al recibirse y
  valen para toda la sesión. Antes de pedir cualquier confirmación,
  verificar contra ese registro: re-preguntar lo ya autorizado es una
  desviación registrable.
- **Entrega materializada con destino.** Todo entregable
  persistente (documento, script, encargo, parche) se entrega como archivo
  y con su destino declarado en la misma entrega, con la forma
  "→ destino: `<ruta completa desde la raíz>`". El contenido efímero
  (explicaciones, cálculos puntuales) no obliga a materializar.
  - *Corolario (GR-06b), añadido tras ERR-52-02.* Pegar el contenido en el
    chat y pedir al titular que cree, pegue, reemplace o ensamble el
    archivo **es una violación de esta regla, no un atajo**. La distinción
    operativa: el trabajo mecánico manual (mover, descargar, arrastrar) es
    del titular; la **autoría** del artefacto es del asistente, y la
    autoría termina en un archivo, no en un bloque de código. Predicado
    observable: si el turno está por escribir "reemplaza el bloque X por
    esto", detenerse y producir el archivo completo. Aplica también a
    ediciones de los propios archivos de gobernanza.

- **Brevedad por forma, no por cantidad.** Los topes por palabras no
  operan: no se cuentan palabras mientras se escribe. Los siguientes son
  verificables mirando el borrador antes de enviarlo.
  - *Forma por defecto:* **3 líneas de prosa.** No "unas tres": tres. Si la
    respuesta cabe en una línea, va en una línea.
  - *Topes duros por tipo* (solo prosa; código, tablas y archivos exentos):
    pregunta directa → 3 líneas; diagnóstico de error → 2 de causa + 1 de
    arreglo; reporte de tarea ejecutada → 4 líneas más la tabla o el
    archivo; alternativas → 1 línea por opción más la `Recomendación:`;
    todo lo demás → 6 líneas.
  - *Habilitación para superar el tope:* pedido explícito del titular
    ("detalla", "explícame", "por qué") en el mensaje **inmediatamente
    anterior**. Jamás inferido del tema. "Es un asunto complejo" no
    habilita.
  - *Construcciones prohibidas:* dos párrafos de prosa seguidos; un párrafo
    que anuncia lo que dirá el siguiente; repetir la pregunta antes de
    responderla; justificar lo que nadie cuestionó; anticipar objeciones no
    formuladas; recapitular lo ya dicho en la sesión; toda oración
    borrable sin pérdida de información; resumen de cierre de algo ya
    visible arriba.
  - *Qué previene:* la extensión se siente rigor al escribirla y se lee
    ruido al recibirla. La verborrea no es sinónimo de rigurosidad,
    inteligencia ni efectividad, y el titular jamás pidió *aparentar*
    rigor. Un párrafo agregado para parecer completo es exactamente el que
    sobra.

- **Fuente primaria de una ESTRUCTURA es su inspección, no su
  descripción.** Antes de escribir el primer campo de una estructura de
  datos que consume un componente externo (la `cfg` de un paquete, el
  esquema de un archivo, el retorno de una función), la sesión debe
  contener la **salida de una inspección** de esa estructura (`str()`,
  `names()`, `args()`, esquema). Si no la contiene, el primer entregable de
  la tarea es el comando que la produce.
  - Un documento normativo que **describe** la estructura (esta misma
    §4.6, un README, una especificación) es fuente primaria del
    **protocolo**, no de la **forma del objeto**. Conocer la firma de una
    función no es conocer la forma de lo que recibe.
  - Los insumos de entorno se piden **completos en un solo mensaje**:
    versión, firma **y** esquema. Nunca solo la firma.

#### 1.2.7 Registro continuo para el cierre

Durante toda la sesión, registrar mentalmente por cada cambio: qué y
por qué, categoría temática del backlog, causa raíz si hubo bug,
alternativas si hubo decisión de diseño, tensiones entre principios y
cómo se resolvieron. Es el insumo del traspaso (sección 2).

#### 1.2.8 Apertura de emergencia (sesión anterior sin cerrar)

Excepción declarada, no vía alternativa. Existe porque una máquina puede quedar
apagada, en otro país o simplemente fuera de alcance, y una regla inaplicable se
salta, que es peor que no tenerla. El hábito que el protocolo persigue es cerrar
seguido, de modo que este procedimiento casi nunca corra.

Se activa cuando el punto 0bis falla por cualquiera de sus causas: sesión
abierta en otra estación, cierre incompleto, `commit_cierre` no publicado,
árbol sucio, trabajo local sin publicar, o `pull` que no es fast-forward
(v35).

1. **No tocar el árbol.** Antes de escribir una línea, fotografiar el estado:
   `git log --oneline -10`, `git status`, `git log origin/main..HEAD --oneline`
   y la salida del verificador de cierre. Esa salida es la evidencia y va al
   acuse literal. `/apertura` la imprime por sí solo cuando 0bis falla (v36):
   el titular pega esa fotografía en el chat en vez del eco.
2. **Reconstruir qué quedó a medias**, desde los commits posteriores al
   `commit_cierre` declarado y desde el traspaso vigente. Lo que no esté en
   ninguno de los dos se declara perdido, no se supone.
3. **Declarar en el acuse de recibo (Fase B)** una sección
   `Apertura de emergencia`: causa detectada, último cierre válido, commits
   huérfanos si los hay, y qué se da por perdido.
4. **Cerrar el hueco antes de trabajar:** correr el verificador, resolver lo que
   falle, y dejar `ESTADO.md` coherente con la realidad. Recién entonces se
   marca `sesion_abierta: true` y se abre.
5. **Registrar la fricción** (§2.2.17) en una línea. Si el mismo proyecto entra
   dos veces en emergencia, el problema no es el olvido: es que las sesiones
   duran más de lo que el cierre puede cubrir, y eso se corrige acortándolas.

Nunca se resuelve una apertura de emergencia con `push --force` ni descartando
commits ajenos: si hay divergencia real entre estaciones, se detiene y se
consulta al titular.

### 1.3 NEW PROJECT

Sin traspaso. Primera acción obligatoria: la pregunta de bifurcación
por sensibilidad de datos (política, sección 8.1). Luego el plan:

```markdown
Comprensión del proyecto
[2-4 bullets en palabras propias]

Supuestos que estoy haciendo
[supuestos e inferencias declarados]

Ruta de trabajo propuesta
[3-6 pasos numerados; el paso 1 es siempre la inicialización según la
rama A o B de la política, sección 8]

Decisiones que necesito de ti antes de empezar
[solo bloqueantes; la sensibilidad de datos ya debe estar resuelta]

¿Avanzamos con el paso 1 o ajustamos la ruta?
```

Desde la aprobación de la ruta aplican las fases D y siguientes de
1.2, y el primer cierre genera el traspaso v01 con el backlog inicial
(objetivo del proyecto, nota metodológica y taxonomía inicial; ver
2.2.5).

### 1.4 ONE-OFF

Sin protocolo. Responder directo. Sin ritual de cierre.

### 1.5 BIBLIOTECA

Sin apertura formal. Responder directo. Si la sesión produce 3 o más
artefactos persistentes, ofrecer proactivamente un **cierre liviano**:

```markdown
Artefactos producidos
[lista de archivos con destino]

Decisiones clave
[2-4 decisiones de diseño que conviene recordar]

Próximos artefactos posibles
[ideas no materializadas]
```

Guardar como `herramientas_dev/_archivo/YYYYMMDD/logs/YYYYMMDD_sesion_<tema>.md`
previa confirmación del usuario (v36; `logs/` ya no existe en el árbol vivo
del kit: README, reglas de ciclo de vida 4 y 5). Antes de cerrar, correr
`Rscript plantillas/verificar_citas_kit.R` y, si la sesión tocó un
verificador, su arnés en `plantillas/tests/`.

### 1.6 Prohibido en cualquier tipo

Aperturas vagas ("¿en qué trabajamos hoy?"); acuses genéricos antes del
plan; empezar trabajo tangible antes de entregar el plan (cuando
aplica); planes no anclados en insumos reales.

---

## 2. Protocolo de cierre de sesión de proyecto

### 2.1 Generación

Al cerrar una sesión CONTINUATION o NEW PROJECT, generar
`traspaso_cierre_vNN.md` (correlativo global; dos dígitos hasta v99, tres
desde v100; snake_case
según la política, sección 2; unifica la grafía antigua con guiones)
en `50_documentacion/traspasos/`. El traspaso es el **único puente**
entre sesiones: todo lo que no quede ahí, se pierde. Antes de cerrar:
ejecutar el escáner y referenciarlo.

El traspaso se entrega SIEMPRE materializado como archivo `.md` en esa
ruta (nunca solo como texto plano en el chat), acompañado en el mensaje
de cierre del bloque de reapertura (2.2.14). Entregarlo sin archivo es
una desviación registrable en 2.2.15.

**Cita de versión de documento normativo (regla de forma, transversal).**
Toda mención a la versión de un documento normativo (`POLITICA_PROYECTO.md`,
este documento, catálogos, instrumentos) se hace **transcribiendo su línea de
encabezado leída en el turno**, no con el número suelto: `Versión 28.` como
aparece en el archivo, no "SETTINGS v28". Un número suelto es indistinguible
de un número recordado o leído de un fragmento del registro de cambios, que
es un modo de fallo observado: un registro de cambios menciona versiones
viejas por diseño, así que una búsqueda dentro del documento devuelve números
que no son el vigente. La transcripción hace visible la omisión; el número
suelto no. Aplica al acuse de apertura, al traspaso y a cualquier encargo que
dependa de la versión.

**Compuerta de repositorio (bloqueante, PRIMERA de las dos compuertas).**

*Qué es.* Antes de la compuerta de dudas y antes del paquete, se comprueba que
el proyecto quede en un estado que otra máquina u otro integrante pueda retomar
sin pedirle nada a quien cerró. Se ejecuta, no se recuerda:

```bash
Rscript "$HERRAMIENTAS_DEV_PATH/plantillas/95_verificar_cierre.R" <ruta_del_proyecto>
```

*Por qué existe.* El repositorio vive fuera de OneDrive y viaja solo por GitHub.
Lo que no está pusheado no existe para la otra estación. Hasta la v30 el
protocolo garantizaba la calidad del traspaso y nada más: el traspaso podía ser
impecable y el código quedar sin commitear, o commiteado sin push, y la sesión
siguiente lo descubría al abrir, en la otra máquina, sin forma de recuperarlo.

*Los nueve invariantes.*

| Id | Invariante | Falla significa |
|---|---|---|
| I1 | Árbol de trabajo limpio | Hay trabajo que no viajará |
| I2 | Sin stash pendiente | Hay trabajo escondido que ni siquiera se ve en `status` |
| I3 | `0 detrás, 0 adelante` contra `origin`, con `fetch` previo | Falta push, o falta integrar lo que otra estación ya subió |
| I4 | Rama publicable | El trabajo está en una rama que la otra estación no espera |
| I5 | Un solo traspaso vigente, versionado (POLITICA regla 1.3.1) | La otra sesión no sabrá cuál leer |
| I6 | `ESTADO.md` con los campos de candado | La apertura no puede verificar el candado |
| I7 | Escáner corrido en este cierre, con el retrato sellado idéntico a su alias | El retrato no se regeneró en este cierre, o el par sellado/alias divergió. **No** garantiza que el retrato describa el árbol: ver la nota de alcance |
| I8 | Ningún archivo de datos versionado | Gobernanza (POLITICA §6) |
| I9 | La ventana de insumos declarada en `ESTADO.md` resuelve por al menos una de sus entradas, que existe y tiene contenido | O el proyecto no declaró de dónde lee, o declaró una ventana que hoy no está donde dice por ninguna de sus entradas |

*Nota de alcance de I7 (v32).* Hasta la v31 la columna prometía que el árbol
documentado es el árbol real. No es lo que la comprobación evalúa: evalúa que el
sello del snapshot sea de hoy y que el par sellado/alias coincida byte a byte.
Las dos condiciones se cumplen sobre un retrato obsoleto, y eso ocurrió: un
renombrado posterior a la corrida del escáner dejó doce líneas de los retratos
citando archivos que ya no existen, e I7 siguió pasando. **Un invariante que
pasa mientras la condición que dice proteger está ausente es peor que un
invariante ausente, porque produce confianza.** Por eso el enunciado se corrige
aquí en vez de dejarse como estaba.

La brecha queda **abierta y declarada**, no cerrada: endurecer I7 para comparar
el retrato contra el árbol vivo es cambio de código en
`plantillas/95_verificar_cierre.R` y cambia el resultado de la compuerta en toda
la cartera, así que exige su propia decisión y su propia calibración. Mientras
tanto, la medida compensatoria es de **orden, no de comprobación**: el escáner
se regenera como **último acto que toca el árbol** antes del commit de cierre
(instrumento, F6), de modo que ningún cambio pueda quedar posterior al sello. Un
cierre que regenere el retrato y después renombre, mueva o edite archivos
trackeados rompe esa garantía sin que ningún invariante lo note, y por eso F6
fija el orden en vez de confiar en el cuidado de quien cierra. La comprobación
directa, para quien la quiera hacer a mano, es que ningún archivo trackeado
tenga `mtime` posterior al sello del snapshot.

*I9: la ventana la declara el proyecto (v33).* Hasta la v32 la ventana era una
suposición del kit (el primer nivel de `20_insumos/` del data root) y ningún
proyecto podía corregirla desde dentro. La suposición es falsa en al menos un
proyecto de la cartera, cuyas carpetas de establecimientos (el insumo real del
pipeline) viven fuera de esa ventana: I9 PASABA midiendo directorios auxiliares
y `insumos_verificados` certificaba un directorio sin planillas. **Un invariante
que pasa mientras la condición que dice proteger está ausente es peor que un
invariante ausente, porque produce confianza.**

Desde la v33 la ventana se declara en el front matter de `ESTADO.md`, llave
`ventana_insumos`, en una sola línea con entradas separadas por coma. Cada
entrada es `TOKEN[/subruta]`, donde `TOKEN` es o bien `.` (la raíz de código, es
decir el propio repositorio) o bien el **nombre** de una variable de entorno:

```
ventana_insumos: ./20_insumos
ventana_insumos: SLEP_X_DATA_ROOT/20_insumos, SLEP_X_CARPETAS_EE
ventana_insumos: WORKSPACE_DATA_ROOT/slep_x/20_insumos
```

El tercer ejemplo subsume el nivel 2 de la precedencia de `10_resolver_rutas.R`
sin código propio: la variable global es un nombre como cualquier otro y el slug
viaja en la subruta. Por eso el verificador no lleva rama de respaldo. Una
entrada con `..` se rechaza: una ventana no escapa hacia arriba.

**Varias entradas son una precedencia, no una conjunción.** Un proyecto puede
declarar su variable canónica y, detrás, el fallback global: son las dos vías
por las que `10_resolver_rutas.R` llega al mismo data root, y cuál de las dos
resuelve depende de la estación, no del proyecto. Por eso I9 pregunta si la
ventana resuelve, no si resuelven todas sus entradas: **basta una entrada que
resuelva y tenga contenido**. Las que no resolvieron se declaran en la
evidencia como información, con su causa, porque "OneDrive todavía no bajó la
carpeta" sigue siendo un hallazgo que la apertura siguiente debe ver. Exigir
que resuelvan todas hacía que declarar el respaldo empeorara el veredicto, que
es lo contrario del efecto que la precedencia busca.

**Qué hace fallar a I9, y por qué cada caso es distinto.** Hay dos familias, y
la diferencia entre ellas es de quién es el defecto.

*Defectos de la declaración.* La llave ausente, la llave vacía, una entrada con
`..` y una entrada cuyo primer token no es `.` ni un nombre de variable de
entorno válido. Son FALLA **siempre**, sin importar qué hagan las demás
entradas: la línea está mal escrita, viaja por git a las demás estaciones, y
ninguna entrada honesta al lado la redime.

*Defectos del estado de esta máquina.* Una variable que no resuelve, una
entrada que apunta a un directorio inexistente, y una entrada cuyo primer nivel
está vacío. La línea está bien escrita y hoy, aquí, esa entrada no rinde
huella. Son FALLA **solo si le ocurre a todas las entradas declaradas**: si
ninguna resuelve con contenido, el proyecto no puede acreditar de dónde lee y
la compuerta cierra. Si al menos una resuelve, I9 pasa y las demás se declaran
en la evidencia.

Los siete casos se distinguen en la evidencia, porque "no declaraste de dónde
lees", "escribiste mal la línea" y "declaraste bien pero OneDrive todavía no
bajó la carpeta" piden tres acciones distintas.

**La llave ausente es FALLA, no defecto por defecto.** Una versión que dejara la
compuerta verde en toda la cartera no corregiría nada. El costo es que el primer
cierre de cada proyecto después de esta ola falla en I9 hasta que alguien
escriba la línea; ese costo es la migración, y es de una línea por `ESTADO.md`.

**Huella agregada por encima de veinte entradas.** La ventana honesta del
proyecto que destapó el defecto son 97 carpetas, y una tabla de 97 filas en cada
traspaso deja de leerse. Por encima del límite, cada entrada declarada aporta
una fila agregada: número de entradas, `mtime` más reciente, y bytes de los
archivos de ese primer nivel. El agregado sigue distinguiendo una corrida de
otra, que es para lo que la huella existe. No se suman los tamaños de los
directorios: eso exigiría recorrerlos, y recorrer el data root sigue prohibido.

**Lo que queda fuera de la ventana se declara en el traspaso.** Un proyecto
puede declarar honestamente una ventana que no cubre todo lo que lee (una fuente
de red, un archivo que llega por correo). En ese caso la huella se declara
**parcial** en el traspaso, nombrando qué queda fuera. La declaración es
obligatoria y su ausencia es el defecto, no la huella parcial en sí. Lo que la
v33 elimina no es la posibilidad de una huella parcial: es que sea parcial sin
que nadie lo sepa.

*Salida única declarada.* Si algo impide cumplir un invariante (sin red al
cerrar, permiso pendiente, bloqueo del remoto), el cierre procede **declarándolo**
en `ESTADO.md`, campo `cierre_incompleto: <razón en una frase>`, y repitiéndolo
en el traspaso. No hay salida silenciosa: una compuerta que se puede ignorar sin
dejar rastro deja de medir a la segunda vez. La apertura siguiente trata ese
campo como bloqueante y lo resuelve antes de trabajar.

**Declaración de insumos (parte de la compuerta, I9).**

El repositorio viaja por git; el data root vive en la carpeta institucional
compartida de OneDrive y sincroniza por su cuenta, con su propio retraso. Es el
único punto donde un traspaso perfecto puede fallar en la otra estación sin que
nada lo advierta: el archivo puede estar bajándose todavía, o ser una versión
distinta de la que corrió esta sesión.

Por eso el cierre **declara** los insumos que la próxima sesión necesita
encontrar, con huella verificable (nombre, fecha de modificación, tamaño),
generada por el verificador en el mismo turno y nunca de memoria. No se copian
datos, no se versiona nada y no se recorre el data root completo: solo el primer
nivel de cada entrada de `ventana_insumos`, con el texto declarado como etiqueta
y jamás rutas absolutas ni valores de variables de entorno (POLITICA §7.2). La
apertura compara esa tabla contra lo que ve, y una diferencia de fecha es un
hallazgo declarable, no un detalle.

**Compuerta de dudas (obligatoria, PREVIA al paquete).**

*Qué es.* Antes de generar el paquete de cierre, el asistente revisa la sesión
completa (conversación, logs, tests, artefactos producidos) y enumera lo que
quedó sin verificar. No es un resumen de lo hecho ni una lista de tareas
futuras: es el inventario de lo que se dio por bueno sin medirlo.

*Por qué existe.* Durante la ejecución, cada turno evalúa sus dudas contra un
objetivo local, y los tramos están delimitados justamente para que así sea. Lo
que ningún tramo revisa son las brechas ENTRE tramos, que por construcción no
son responsabilidad de ninguno: superficies que ninguna tarea tenía asignadas,
y modos de fallo que solo aparecen al ejecutar la operación completa y no en
ninguna de sus partes probadas por separado. Esas brechas se vuelven visibles
al final, cuando la sesión entera está a la vista de una vez, y no antes.

*Cuándo corre (dos gatillos, un solo criterio).*

1. Antes de generar el paquete de cierre. Va antes y no después porque su
   salida puede cambiar el contenido del traspaso, y una compuerta que corre
   después del artefacto que debería modificar no sirve.
2. Antes de ejecutar cualquier operación irreversible o de efecto público:
   aquellas cuyo retroceso no es un `git revert` (reescritura de historial,
   `push --force`, escritura o sobreescritura en un canal compartido con
   terceros, borrado de datos, publicación de cifras hacia fuera del equipo).

Es la misma regla en ambos casos, con los mismos campos y el mismo criterio;
no se redactan dos reglas parecidas que después divergen.

*Forma de cada duda (filtro de tres campos, obligatorio).*

| Campo | Contenido |
|---|---|
| `supuesto` | Qué se dio por bueno sin medirlo, en una frase |
| `predicado` | El enunciado observable cuya verdad o falsedad lo decidiría |
| `medicion` | El comando, consulta o inspección concreta que lo evalúa |

Una duda que no puede escribirse con los tres campos **se descarta, no se
registra**: la compuerta existe para encontrar huecos medibles, no para
producir apariencia de escrutinio. Un `predicado` que no admite refutación
("el código quedó robusto") o una `medicion` que no es ejecutable ("revisar
con calma") invalidan la entrada.

*Qué hacer con cada duda que pasa el filtro.* Se cierra en la sesión **solo
si** descubrirla más tarde costaría una operación irreversible, una cifra ya
publicada, o un ciclo de re-trabajo mayor que la propia verificación. En
cualquier otro caso se registra como pendiente y el cierre continúa. El
criterio es estrecho a propósito: la salida por defecto es registrar, no
ejecutar.

*Dónde aterriza la salida.*

- Duda cerrada en sesión → registro detallado de cambios (2.2.4), como tramo
  ejecutado con su verificación.
- Duda registrada → inventario de pendientes (2.2 punto 11), con los tres
  campos escritos; el `predicado` ES el "criterio de éxito sugerido" que esa
  sección exige, y no se redacta de nuevo.
- Ninguna duda pasa el filtro → se declara explícitamente en el traspaso. El
  vacío es una afirmación verificable, igual que el de las secciones que ya
  valen por su vacío, y su ausencia es la señal de que la compuerta no corrió.

*Traza obligatoria (v29).* La declaración anterior no basta por sí sola: una
omisión de la compuerta solo la nota quien ya sabe que la compuerta existe, y
eso falló en la práctica. Por eso el paquete de cierre declara en su front
matter `compuerta_dudas: <N registradas | vacio declarado>` y `settings_version`
con la línea de encabezado transcrita, y el ejecutor verifica ambos contra el
traspaso y contra el archivo real antes de tocar nada: sin ellos, o con cifra
que no calza, el cierre se detiene. La compuerta deja así de depender de la
memoria de quien cierra.

*Lo que la compuerta NO hace (modos de degradación conocidos).*

- **No reabre trabajo cerrado.** Su salida por defecto es un pendiente
  registrado; el criterio de arriba es la única excepción.
- **No sustituye la auditoría de cierre** (política 5.6, preguntas "Cierre"):
  esa evalúa el proyecto contra una lista fija, esta busca lo que ninguna
  lista fija cubre. Conviven y se ejecutan ambas.
- **No genera dudas para llenar el casillero.** El filtro de tres campos es la
  guarda; relajarlo la convierte en ruido justo cuando encuentre algo real.
- **No depende de que el titular la pida.** Si dependiera, fallaría
  precisamente en las sesiones largas, que son donde más rinde y donde nadie
  se acuerda de preguntar.

*Evidencia de origen y período de observación.* La regla nace de un caso único
pero informativo: una sesión larga (del orden de nueve tramos autónomos) que
preparaba una operación irreversible sobre historial de git, con compuertas,
controles negativos y verificación adversaria en cada tramo. Una pregunta
equivalente a esta compuerta, hecha a mano por el titular con la preparación
ya declarada lista, destapó un defecto que abortaba la operación a mitad de
camino y que ningún tramo podía haber encontrado, porque solo se manifiesta al
ejecutar la operación completa. Repetida la pregunta, aparecieron cuatro
huecos más, tres de ellos sobre superficies sin tramo asignado. Un caso no
prueba rendimiento general: la regla nace obligatoria porque su costo con
salida vacía es una línea, y queda en observación por 30 cierres o 12 meses,
lo que ocurra primero. El juez es la tabla de errores del asistente (2.2.15)
junto con el destino de los pendientes que produzca: si se acumulan sin
resolverse, la compuerta degrada a recomendación y el cambio se registra aquí.

**Ejecución delegada del cierre (canal por defecto; forma v2 desde SETTINGS
v20).** Al recibir la instrucción de cierre, el asistente NO pide al titular
correr el escáner, adjuntar el backlog ni sobreescribir archivos, y TAMPOCO
pega el payload en el chat (la forma v1, de payload incrustado, queda
derogada: sus gatillos superaban las 1000 líneas). Entrega exactamente dos
cosas:

1. **El paquete de cierre**, un único archivo descargable
   `paquete_cierre_vNN.md` con el esquema de abajo. El titular lo guarda en
   `50_documentacion/andamios/` del repo. El paquete es un vehículo: Claude
   Code lo distribuye, verifica por diff y lo elimina (única eliminación
   sancionada del protocolo).
2. Nada más: el gatillo por sesión no existe. El titular escribe el comando
   global `/cierre` en Claude Code (abierto en la raíz del repo), que
   sincroniza el kit, resuelve el **instrumento de cierre vigente** en
   `herramientas_dev/prompts/` (`cierre_sesion_autonomo_cc_v*.md`, versión
   máxima) e imprime cuál corrió. Todos los parámetros salen del front matter
   del paquete. La guardia de repo (raíz declarada contra `pwd`) detiene el
   cierre lanzado en el proyecto equivocado.

**El paquete de cierre (esquema canónico; fuente única desde v36).** El
instrumento lo referencia y no lo repite: si ambos divergen, manda este
bloque.

```text
---
proyecto: <slug>
raiz_proyecto: <ruta absoluta de la raiz del repo en esta maquina>
traspaso_nuevo: v<NN>
sesion_nueva: <N>
fecha_cierre: <YYYY-MM-DD>
sello_escaner: regenerar
push_autorizado: si   # default si; `no` solo si el titular lo pide
escaner: 00_escanear_proyecto.R
# unica magnitud del backlog (v36): cuantas entradas trae el bloque. El
# ejecutor la verifica contando el bloque; el ultimo numero en disco, el
# tramo y el total nuevo los deriva el.
backlog_entradas_nuevas: <N>
# trazas obligatorias (el ejecutor las verifica; ausentes o falsas detienen)
settings_version: "<linea de encabezado de SETTINGS transcrita literal>"
compuerta_dudas: <N registradas | vacio declarado>
# recuento tematico. Ausente = vigente. `diferido` solo si la tabla de
# Clasificacion tematica declara una poblacion menor que la del archivo; el
# ejecutor lo comprueba contra disco y, si la tabla cuadra, aplica vigente
recuento_tematico: <vigente | diferido>
---

<<<TRASPASO destino: 50_documentacion/traspasos/traspaso_cierre_v<NN>.md
[traspaso completo, SETTINGS §2.2]
TRASPASO>>>

<<<BACKLOG_ENTRADAS destino: 50_documentacion/activa/backlog_acumulativo.md
[SOLO las entradas de la sesion nueva, en el formato de las entradas
existentes del Detalle cronologico, con NUMERACION PROVISIONAL contigua
desde el ultimo numero que el eco del cierre anterior entrego + 1 (o desde
1 si no se tiene): el ejecutor renumera desde disco. SIN encabezado de
sesion: lo compone el ejecutor. Sin pares buscar→reemplazar, sin fila del
resumen, sin fila del delta: los construye el ejecutor]
BACKLOG_ENTRADAS>>>

<<<BACKLOG_NARRATIVA destino: (Clasificacion tematica, fila del delta, lectura)
foco: [una linea: que hizo la sesion, para la columna narrativa del delta]
reparto:
  <numero provisional> -> <categoria>   # una linea por entrada nueva, sin excepcion
  ...
categorias_nuevas: [<nombre>: <descripcion con un ejemplo del proyecto>, o "ninguna"]
reclasificaciones: [<numero en disco>: <categoria previa> -> <categoria nueva>, o "ninguna"]
lectura: [1-3 lineas sobre el movimiento tematico, o "sin comentario"]
BACKLOG_NARRATIVA>>>

<<<ESTADO destino: 50_documentacion/activa/ESTADO.md
[archivo completo, SETTINGS §2.1bis, o `no adoptado`. Dos campos van SIEMPRE
con marcador y nunca con valor:
  commit_cierre: <<EJECUTOR>>
  maquina: <<EJECUTOR>>
El ejecutor los sustituye por el hash del commit del log y por `hostname`]
ESTADO>>>
```

**Regla de oro del payload (redactor).** El paquete lleva **solo lo que
únicamente un humano puede decidir**: las entradas nuevas del backlog, el
`reparto` entrada→categoría, el traspaso, `ESTADO.md` y los campos de
narrativa. Todo lo derivable de una magnitud lo calcula el ejecutor. En
consecuencia, el redactor **no** enumera rótulos stale, **no** escribe pares
buscar→reemplazar, **no** declara la unicidad de ninguna ancla, **no**
declara el último número del backlog en disco ni el tramo (v36), y **no**
escribe cifras que un script puede contar (cuántas correcciones aplica, el
total nuevo, las filas del resumen, la N por categoría). Declara una magnitud
del backlog (`backlog_entradas_nuevas`), la sesión y la fecha, y nada más; el
ejecutor las verifica, deriva de ellas los rótulos desde su catálogo canónico,
inserta por posición estructural (sección y tabla por encabezado, no por
cadena) y comprueba invariantes de coherencia sobre el resultado.

**Clases de campo: quién conoce el valor cuando se escribe.** Autoría (solo el
redactor: viaja tal cual y se distribuye byte a byte); magnitud (el redactor la
declara, el ejecutor la verifica); derivado (solo el ejecutor: no viaja con
valor, o viaja como `<<EJECUTOR>>`). Un derivado que viaje con valor es falso
por construcción. Los tres casos medidos (`taxonomia`, `commit_cierre`,
`backlog_total_previo`) fallaron por esto, y por eso el esquema de arriba no
tiene ninguno.

**Numeración provisional (v36).** El número de cada entrada nueva es la única
parte de un bloque de autoría que el ejecutor toca: la renumera desde el
último número real del Detalle cronológico en disco, conservando el orden, y
aplica el mismo desplazamiento a las líneas del `reparto`. El redactor numera
desde el `Backlog: ultima entrada <N>` que trae el eco del cierre anterior;
si no lo tiene, numera desde 1, y el resultado es el mismo. Lo que el
ejecutor **no** toca son las referencias cruzadas dentro del texto
("resuelve #212", "entradas 213-220" en el traspaso): son autoría, y si hubo
desplazamiento las lista como advertencia en el eco para que el redactor
siguiente las corrija con una entrada nueva, nunca reescribiendo la antigua
(§2.2.5).

**El `reparto` es autoría.** A qué categoría pertenece una entrada se decide
por intención primaria (§2.2.5) y no se deriva de ninguna magnitud. Una
línea por entrada nueva, con su número provisional; `sin cambios` no es un
valor legal en `reparto`, `categorias_nuevas` ni `reclasificaciones` (los dos
últimos admiten `ninguna`). Los nombres de las categorías vigentes los trae
el eco del cierre anterior (`Categorias vigentes`); si el redactor no lo
tiene, pide la tabla de Clasificación temática antes de emitir (§2.2.14: "se
pide ese dato puntual, no el archivo").

*Por qué la regla existe:* los defectos que hicieron falta tres emisiones de
un paquete y una reversión de árbol fueron todos de cómputo (ancla ambigua
porque el archivo repite colas de línea por diseño, rótulo omitido porque la
oración cruzaba el envoltorio de ~90 columnas, cifra del propio delta escrita
a mano y luego versionada, número inicial del tramo distinto del de disco), y
ninguno de autoría. Enumerar exhaustivamente una población dispersa o contar
desde un archivo que no se tiene delante es tarea que un script hace perfecto
y un redactor hace mal. El diagnóstico de una falla del cierre empieza por
esa pregunta: si el fallo fue de cómputo, la corrección va en el instrumento,
nunca en pedirle más cuidado al redactor.

**Qué hace el ejecutor (referencia, no descripción).** Claude Code ejecuta
las fases del instrumento vigente, que define su propio orden, sus
invariantes, sus severidades y su eco. Lo que este documento fija, porque es
contrato con el redactor y con la apertura siguiente: el instrumento verifica
el paquete contra disco antes de tocar nada y aplica todo en copia de trabajo;
detiene solo por lo que ni él ni el titular pueden reparar desde el paquete
(gobernanza, git, estructura del destino, autoría inconsistente) y declara
en el eco lo que reparó y lo que advierte; regenera el escáner como último
acto que toca el árbol antes de commitear (nota de alcance de I7); archiva el
traspaso anterior (regla 1.3.1); deja el árbol vacío y `HEAD` igual a la
punta del remoto, código de la sesión incluido; y termina imprimiendo el
mensaje de reapertura del traspaso seguido de las líneas de estado que el
redactor siguiente consume (instrumento que corrió, hashes, `Backlog: ultima
entrada`, `Categorias vigentes`, reparaciones, advertencias). El instrumento
**NO es insumo del redactor**: todo lo que él produce está aquí; sus fases son
de Claude Code, que lo lee del disco. El asistente nunca lo pide adjunto.

**Invariantes del expediente de encargo (v39).** El instrumento de cierre
verifica, además, los cuatro invariantes de POLITICA §1.3.2 (IE1 a IE4:
ningún encargo fuera de un expediente, fichas de log válidas, índice
regenerado idéntico al commiteado, raíz de `andamios/` sin encargos ni
logs de encargo). Lo que el cierre declare sobre ellos viaja en el eco,
línea `Encargos:`, y la Fase B de la apertura siguiente lo procesa. Las
severidades y el orden viven en el instrumento, no aquí; tampoco forman
parte de la compuerta de repositorio (I1-I9), que es código aparte y no
cambia. El redactor no escribe nada por estos invariantes en el paquete:
son derivados, y el paquete no los declara.

Reglas de autoría que este canal impone al redactor: `main` se cita en el
traspaso con el hash **previo** al cierre, rotulado "previo al commit de
cierre", y los hashes definitivos los agrega Claude Code al eco (no existen
cuando el traspaso se redacta); `commit_cierre` y `maquina` de `ESTADO.md`
viajan como `<<EJECUTOR>>`; y `sello_escaner` lleva el sello real de la
corrida de la sesión o la palabra `regenerar`, nunca un sello heredado.

Los pasos manuales del titular son exactamente cuatro: instruir el cierre
(con `push: no` si quiere retenerlo; sin declaración, `si`, y viaja en el
front matter), guardar la descarga en `andamios/`, escribir `/cierre`, copiar
la reapertura. El flujo manual del resto de esta sección queda como
**fallback** (Claude Code no disponible, repo fuera de la cartera,
emergencia) y toda la normativa de contenido sigue vigente para ambos canales.

*Prohibición (disciplina).* Sin tercera forma: ni payload pegado en el chat
(v1 derogada), ni más de un archivo de cierre, ni pedir al titular colocar
contenido destino por destino. Racionalizaciones que NO habilitan excepción:
"es más directo pegarlo", "son pocos cambios", "el paquete es muy corto para
justificar descarga". Un cierre corto usa el mismo canal que uno largo.

**Comandos `/apertura` y `/cierre` (fijos, globales, sin versión en su
texto; v36).** Sus copias canónicas viven en
`herramientas_dev/plantillas/claude_commands/`; los instala
`plantillas/90_instalar_estacion.sh` **una vez por máquina** en
`${CLAUDE_CONFIG_DIR:-~/.claude}/commands/`, y la compuerta de estación
(`plantillas/95_verificar_estacion.R`, E4) comprueba que los instalados sean
idénticos a los del kit (`protocolo_estaciones_v2.md`, E1). Una versión nueva
del instrumento de cierre **no obliga a reinstalar nada**: el comando la
resuelve en el kit que él mismo acaba de sincronizar. Hasta la v35 el comando
citaba la versión en su texto y se repegaba a mano por máquina; el resultado
medido fue un comando apuntando a un instrumento borrado. Si un comando no
está instalado, correr el instalador; el redactor no genera gatillos: su única
entrega de cierre es el paquete.

> **Convención de nombre — no negociable.** El separador es SIEMPRE
> guión bajo: `traspaso_cierre_vNN.md`. NUNCA con guión medio
> (`traspaso-cierre-vNN.md` es no-canónico y no se versiona). Esto
> aplica a todo archivo que Claude genere o nombre en el proyecto:
> snake_case, sin guiones medios, sin tildes, sin ñ, sin espacios
> (política, sección 2). Antes de entregar o commitear cualquier
> archivo nuevo, verificar que el nombre no contenga `-`, ` `, ni
> caracteres acentuados. Si el escáner muestra un archivo canónico
> existente con cierta grafía, esa grafía manda; no introducir una
> variante.

Incluir TODAS las secciones de 2.2; si una no aplica, incluirla con
"No aplica en esta sesión" y justificación breve. Tres secciones valen
por su vacío y son obligatorias incluso vacías, porque su vacío es una
afirmación verificable: Bugs de la sesión (2.2 punto 6), la auditoría de
cierre (dentro de 2.2 punto 11) y la tabla de errores del asistente
(2.2.15).

**Archivado del traspaso anterior (POLITICA 1.3.1) — paso obligatorio.**
`50_documentacion/traspasos/` contiene **un solo** archivo: el vigente.
Antes de depositar el traspaso nuevo, mover el anterior:

```bash
cd <raiz_del_proyecto> && \
  mkdir -p 50_documentacion/traspasos/archivo && \
  git mv 50_documentacion/traspasos/traspaso_cierre_v<NN-1>.md \
         50_documentacion/traspasos/archivo/
```

`git mv` siempre, nunca `cp` + `rm`: el historial de cada traspaso debe
seguir siendo rastreable con `git log --follow`. Nada se borra jamás de
`archivo/`.

**Comprobación de cierre**, junto con las demás:

```bash
cd <raiz_del_proyecto> && \
  n=$(ls 50_documentacion/traspasos/*.md | wc -l | tr -d ' ') && \
  echo "vigentes=$n" && [ "$n" = "1" ] || { echo "FALLA: cierre a medias"; exit 1; }
```

Si el proyecto todavía tiene todos sus traspasos planos, migrarlos a
`archivo/` es parte de ESTE cierre, no un pendiente que se hereda.

**Chequeo de cierre del backlog (2.2.5):** si este es el segundo cierre o
posterior y el backlog aún vive embebido en el traspaso, o en un archivo
de nombre no canónico, extraerlo o renombrarlo a
`50_documentacion/activa/backlog_acumulativo.md` es parte de ESTE cierre,
no un pendiente que se hereda.

### 2.1bis Generación de ESTADO.md (Fase 2 — PUSH)

Todo proyecto que adopte el estándar de Fase 2 genera o actualiza, en el
mismo cierre que produce el traspaso, un archivo
`50_documentacion/activa/ESTADO.md`. Es una **destilación** de campos que
el traspaso ya produce, no información nueva: front matter estructurado
(parseable de forma determinista) más tres secciones breves en prosa.

**Formato canónico:**

```
---
slug: <slug>
nombre_real: <nombre>
categoria: activo
semaforo: activo|pausa|bloqueado|cerrado
sesion_actual: vNN
ultima_actividad: AAAA-MM-DD
maneja_sensibles: true|false
tipo_pendiente: bug|bloqueante|deuda_heredada|deuda_tecnica|nuevo|cosmetica|ninguno
sesion_abierta: true|false
maquina: <hostname de la estacion que la abrio o cerro>
commit_cierre: <sha corto del commit de cierre>
traspaso_vigente: traspaso_cierre_vNN.md
cierre_incompleto: no|<razon en una frase>
insumos_verificados: AAAA-MM-DD
ventana_insumos: <entradas separadas por coma; ver seccion 2.1, I9>
---
## En que vamos
<2-3 oraciones>
## Proximo paso
<1 oracion>
## Bloqueantes
<lista o "ninguno">
```

**Campos de candado (obligatorios en todo proyecto trabajado desde más de una
máquina).** `sesion_abierta` se pone en `true` al abrir, en un commit propio que
se pushea de inmediato (`chore(estado): abre sesion vNN en <maquina>`), y vuelve
a `false` en el cierre. Ese flag es lo único que hace visible desde la otra
estación que alguien está trabajando: sin él, el trabajo local sin commitear es
indetectable de forma remota, y esa limitación es inherente, no un defecto del
diseño. `commit_cierre` permite a la apertura comprobar que el remoto está en el
punto donde el traspaso dice que quedó.

**`ventana_insumos` NO es campo de candado (v33).** Es obligatorio (I9 falla sin
él) pero deliberadamente fuera de la lista que I6 comprueba: si estuviera en
ambas, un proyecto que no lo declara vería fallar I6 e I9 a la vez, y dos
invariantes que fallan por una sola causa vuelven ilegible el veredicto. Su
contenido se documenta en §2.1, I9; a diferencia del resto del front matter no
se destila del traspaso, porque describe la arquitectura de datos del proyecto y
no el estado de la sesión: se escribe una vez y cambia solo si cambian las rutas.

**Origen de cada campo (mapeo de destilación):**

| Campo `ESTADO.md` | Se toma de (traspaso, por significado, no por número de sección — la numeración varía entre proyectos) |
|---|---|
| `slug`, `nombre_real` | Identificación del proyecto |
| `semaforo` | Inferido del estado al cierre: **bloqueado** solo si hay un bug bloqueante activo del propio pipeline; **pausa** si el proyecto completo está parado a la espera de un tercero externo (aprobación, dato de otra área) sin acción ejecutable de parte del titular; **activo** en cualquier otro caso, incluido cuando solo un ítem puntual del backlog (no el proyecto completo) está marcado como a la espera de algo. Ante duda entre activo y pausa, el criterio decisivo es: ¿hay trabajo ejecutable por el titular ahora mismo, aunque sea parcial? Si sí, activo. |
| `sesion_actual` | Versión vNN del traspaso usado como fuente |
| `ultima_actividad` | Fecha de cierre del traspaso fuente |
| `maneja_sensibles` | Gobernanza del proyecto (`gobernanza_datos.md` si existe, o POLITICA §6.1) |
| `tipo_pendiente` | Ver regla de mapeo abajo — **NO se copia literal**, se traduce |
| `## En que vamos` | Resumen ejecutivo del traspaso, condensado a 2-3 oraciones |
| `## Proximo paso` | Pendientes y ruta sugerida, la prioridad 1 |
| `## Bloqueantes` | Pendientes marcados tipo "bloqueante"; "ninguno" si no hay |

**Regla de mapeo de `tipo_pendiente` (dos taxonomías distintas, no
confundir):**

`tipo_pendiente` usa el enum de **prioridad de sesión** de §1.2.4
(`bug | bloqueante | deuda_heredada | deuda_tecnica | nuevo | cosmetica |
ninguno`). Responde la pregunta "¿qué tipo de trabajo encabeza el próximo
arranque de este proyecto?". Es **distinto** de la **clasificación
temática** del `backlog_acumulativo.md` de cada proyecto (POLITICA §10),
que es una taxonomía orgánica y propia de cada hermano (categorías como
"administrativo", "contenido", "documentación", "deuda de datos", libres
por proyecto) que responde "¿de qué trata esta entrada del backlog?".

Cuando el pendiente de prioridad 1 del traspaso esté etiquetado con
vocabulario temático del backlog (no con el enum de §1.2.4), **tradúcelo
por significado al enum de prioridad**; no lo copies literal y no
amplíes el enum para acomodarlo. Si la traducción no es evidente, usa
`nuevo` como default conservador y dilo explícitamente en el reporte de
la sesión que generó ese `ESTADO.md` (no es un error silencioso
aceptable; es una ambigüedad a revisar por el titular).

**Regla de generación:** `ESTADO.md` se escribe DESPUÉS del traspaso,
nunca antes (el traspaso es la fuente; `ESTADO.md` es su destilación). En
el canal delegado (§2.1), la destilación la redacta el asistente dentro
del paquete, con `commit_cierre: <<EJECUTOR>>` y `maquina: <<EJECUTOR>>`, y
la escritura en disco la ejecuta Claude Code después del traspaso,
sustituyendo ambos marcadores en un commit propio que es la punta del cierre
(instrumento vigente, v12 en adelante). Si
el cierre no alcanza a generarlo, no bloquea el cierre de sesión: el
orquestador de cartera cae a PULL (lectura del traspaso/backlog) para ese
proyecto, sin error.

**Consumidores:** el orquestador de cartera (corrida diaria) y la apertura
CONTINUATION del propio proyecto (1.2.2, paso 0), que lo usa como
orientación inicial antes de la lectura completa del traspaso.

**Detección de desincronización (consumida por el orquestador, no por
este protocolo):** si `ultima_actividad` de `ESTADO.md` antecede al mtime
real del último `traspaso_cierre_vNN.md`, el `ESTADO.md` se considera
desactualizado y el orquestador prioriza PULL para ese proyecto en esa
corrida.

**Adopción:** no retroactiva por defecto. Un proyecto adopta Fase 2
generando su primer `ESTADO.md`; hasta entonces, el orquestador lo lee
por PULL (Fase 1, sin cambios). No hay plazo obligatorio de migración. Un
proyecto sin ningún traspaso aún no puede adoptar Fase 2 (no hay fuente
de la cual destilar): queda en PULL hasta su primer cierre formal.

### 2.2 Estructura del traspaso

1. **Identificación:** proyecto, versión vNN, fecha, sesión N con foco
   en 1-2 oraciones, entorno, archivos principales modificados.
2. **Resumen ejecutivo:** un párrafo de 5-8 oraciones (qué se propuso,
   qué se logró, qué quedó pendiente, estado general). Suficiente por
   sí solo para entender la situación.
3. **Estado al cierre:** qué funciona (con última ejecución exitosa),
   qué no funciona (síntoma observable), delta respecto a vNN-1.
4. **Registro detallado de cambios:** un bloque por cambio
   conceptualmente independiente (no agrupar aunque compartan archivo):
   archivo(s), categoría temática, qué se hizo, por qué (C.11), cómo se
   verificó (B.4), líneas o secciones clave, dependencias afectadas,
   tensiones entre principios si las hubo.
5. **Backlog acumulativo** (ver 2.2.5).
6. **Bugs de la sesión:** síntoma observable, causa raíz, solución
   exacta (archivo/línea), criterio de verificación, **patrón general
   aprendido** como regla aplicable, principios violados o aplicados,
   estado (resuelto / parcial / pendiente).
7. **Aprendizajes y restricciones descubiertas:** cada uno como regla
   concreta con principio relacionado, contexto (qué pasa si se viola)
   y ejemplo de la sesión.
8. **Decisiones de diseño:** decisión, alternativas consideradas,
   justificación, tensiones resueltas, implicancia. Las de peso
   arquitectónico se replican como archivo en
   `50_documentacion/activa/decisiones/YYYYMMDD_decision_<tema>.md`.
9. **Constantes y parámetros:** tabla SOLO de las que cambiaron en la
   sesión (constante / valor anterior / valor nuevo / archivo / motivo),
   más una línea que nombre la fuente canónica de las vigentes
   (`10_utils/10_configuracion.R`, `documentacion_tecnica_vN.md` o el
   script que las declara). Si ninguna cambió: "Sin cambios; vigentes en
   `<fuente>`". Las constantes decididas en la sesión que aún no viven en
   código se listan completas (el traspaso es su única fuente hasta que
   aterricen).
10. **Arquitectura de archivos:** referencia al escáner al cierre; si
    la estructura cambió, resumen del cambio y verificación contra la
    política.
11. **Pendientes y ruta sugerida:**
    - Inventario: por pendiente, descripción, contexto, tipo (bug
      activo / bloqueante / funcionalidad / deuda técnica / mejora
      visual / documentación), impacto, dependencias, complejidad,
      principios relevantes, precauciones, sugerencia de enfoque y
      criterio de éxito sugerido. Campos obligatorios: son el insumo
      de la Fase C de la próxima apertura.
    - Evaluación de deuda técnica: zonas frágiles (qué principio se
      viola) y oportunidades de mejora.
    - Auditoría de cierre (política 5.6, preguntas "Cierre"); toda
      respuesta "no" se agrega como pendiente.
    - Salida de la compuerta de dudas (2.1): las dudas registradas, con
      sus tres campos, o la declaración explícita de vacío.
    - **Auditoría de cifras (v37; condicional).** Si existe
      `50_documentacion/andamios/logs/auditorias_log.md` en el proyecto, esta
      subsección es obligatoria: trae el bloque A6 que imprime el orquestador
      de `auditoria_codigo_proyecto_md_v3.md` (corrida, cobertura n/N,
      familias por veredicto, cifras sin familia), copiado tal cual y sin
      recalcular cifras a mano; si la sesión no corrió la auditoría, la línea
      "sin corrida en esta sesión; última corrida: <fecha del log>". Cada
      `DIFERENCIA` y cada cifra `sin_familia` entra además al inventario de
      pendientes con su `id_cifra`. Si el archivo no existe, la subsección se
      omite: el gatillo es el archivo, no la memoria de quien cierra.
    - Ruta sugerida para la próxima sesión aplicando los criterios de
      priorización de 1.2.4, con justificación y criterio de éxito por
      ítem, más lo que conviene diferir.
12. **Instrucciones específicas para la próxima sesión:** formato
    ⚠️ NO [acción] sin [condición] / ✅ ANTES de [acción], verificar
    [precondición] / 🔒 [invariante intocable].
13. **Fragmentos de código de referencia:** SOLO los patrones nuevos o
    modificados en esta sesión, ejecutables tal cual, comentados. Los
    patrones estables del proyecto viven en una fuente única
    (`documentacion_tecnica_vN.md` o `CLAUDE.md` del proyecto) y el
    traspaso los referencia por nombre, no los re-copia. Si la sesión no
    aportó patrones nuevos: "Sin patrones nuevos; los estables viven en
    `<fuente>`".
14. **Reapertura** (ver 2.2.14).
15. **Errores del asistente** (ver 2.2.15): tabla obligatoria, registro
    exhaustivo de desviaciones de regla canónica (POLITICA 0.5).

#### 2.2.5 Backlog acumulativo (memoria de largo plazo)

**Archivo canónico:** `50_documentacion/activa/backlog_acumulativo.md`.
Nombre y ubicación no negociables (ver política §10). En el primer
cierre el backlog puede vivir embebido en el traspaso; a partir del
segundo cierre debe existir como archivo independiente en esta ruta.

Registro histórico vivo. En cada cierre se **copia íntegro** el backlog
del traspaso anterior y se agregan los cambios nuevos al final. Jamás
se reescriben, resumen ni renumeran entradas anteriores; un error se
corrige con una entrada nueva.

- **Objetivo del proyecto:** párrafo permanente (qué es, qué produce,
  con qué herramientas, para quién, desde cuándo). Se redacta en la
  sesión 1.
- **Nota metodológica:** párrafo permanente que define qué cuenta como
  "cambio" (una solicitud distinguible del usuario, no las acciones
  técnicas que la implementan), qué no (errores del asistente
  corregidos de inmediato; sí cuentan los bugfixes reportados por el
  usuario), que la clasificación es por intención primaria, y cuáles
  son las fuentes del conteo.
- **Clasificación temática:** tabla categoría / N° / % / descripción
  con ejemplos concretos del proyecto. Taxonomía orgánica: se propone
  en la sesión 1 y se refina después. Categorías mutuamente
  excluyentes por intención primaria; entre 8 y 15; subdividir si una
  supera el 25%; absorber si una queda bajo el 2% tras varias sesiones.
- **Resumen estadístico por sesión:** tabla sesión / traspasos
  generados / N° de cambios / modelo / foco (3-6 palabras), con fila
  final separada para refinamientos menores no atribuibles, y total.
- **Detalle cronológico:** todos los cambios por sesión, con
  **numeración correlativa global y permanente** (nunca se reinicia ni
  renumera), descripciones autocontenidas, referencia cuando un cambio
  resuelve un pendiente anterior, y subtítulos temáticos en sesiones
  largas.
- **Delta del backlog:** cambios respecto a la versión anterior (N
  entradas nuevas, refinamientos de taxonomía, reclasificaciones).

#### 2.2.14 Reapertura (una copia en el traspaso, replicada solo en el chat)

Esta sección aparece UNA sola vez dentro del traspaso (su sección final) y
se replica **textualmente** al final del mensaje de chat con el que el
asistente cierra la sesión, para copiar todo sin abrir el archivo. En el
canal delegado (§2.1) esa réplica la imprime Claude Code como último acto
de su turno, extrayéndola del traspaso recién escrito y agregando debajo
las líneas de estado que el instrumento vigente define (instrumento que
corrió, hashes de los commits del cierre, push, `Backlog: ultima entrada`,
`Categorias vigentes`, reparaciones y advertencias), que por eso el traspaso
nunca cita; el asistente no la duplica en su propio mensaje, que termina en
la entrega del paquete. No se duplica dentro del propio traspaso. Con
**valores reales, jamás placeholders**. El asistente no propone nombre para
la nueva sesión. El titular copia el eco completo al chat siguiente: las
líneas de estado son insumo de la apertura (§1.2.1 d).

- **Mensaje de apertura pre-armado:** declara tipo CONTINUATION, indica
  que el protocolo (política + este documento) vive en la knowledge base
  y se lee desde ahí, lista qué se adjunta, y cierra con una línea de
  estado y el foco propuesto (la prioridad 1 de la ruta sugerida del
  traspaso), para que la próxima apertura entre a la Fase C con la
  propuesta ya sembrada. Variante para chat suelto: "Adjunto los
  documentos de protocolo y los específicos de la sesión."
- **Documentos para la próxima sesión, en tres bloques:**
  1. *Protocolo en knowledge base* (NO se adjuntan; se listan con
     nombre exacto solo para verificar que la knowledge base esté al
     día): `POLITICA_PROYECTO.md`,
     `SETTINGS_Y_PROMPTS_OPERACIONALES.md`.
  2. *Opcionales según el foco real de la próxima sesión* (solo los
     que apliquen, no todos): `CLAUDE.md` si correrá en Claude Code;
     protocolos 4.1-4.6 de este documento según la tarea;
     `auditoria_codigo_proyecto_md_v3.md` si habrá auditoría de cifras.
  3. *Específicos de la sesión* (SÍ se adjuntan): el traspaso
     `traspaso_cierre_vNN.md`; los
     archivos críticos para retomar (solo los que la próxima sesión
     necesita, priorizando los del pendiente foco; los voluminosos
     pero críticos se mantienen anotados como tales); datos o
     referencias externas si aplica, con su porqué. El backlog NO se
     adjunta (su último número y sus categorías vigentes viajan en el
     eco del cierre, y el ejecutor renumera desde disco de todos modos);
     el escáner NO se adjunta por defecto (el
     traspaso §10 trae su resumen) y se lista solo si la próxima
     sesión trabajará estructura. Si la apertura necesita un dato de
     cualquiera de los dos, se pide ese dato puntual, no el archivo.
- **Nota final obligatoria:** si algún archivo listado cambió entre
  sesiones, adjuntar la versión más actualizada al abrir y avisarlo en
  el mensaje de apertura.

#### 2.2.15 Errores del asistente (registro obligatorio, POLITICA 0.5)

Sección obligatoria del traspaso, distinta de "Bugs de la sesión" (§2.2.6,
que registra bugs de CÓDIGO) y de "Aprendizajes y restricciones" (§2.2.7,
que registra reglas técnicas DESCUBIERTAS). Esta sección registra errores
del **asistente mismo**: desviaciones de una regla canónica ya existente
(POLITICA, este documento, `CLAUDE.md`, `userPreferences`, o una
instrucción explícita ya dada en la sesión), detectadas por el asistente o
señaladas por el usuario, se hayan nombrado como "error" o no (POLITICA
0.5, disparador exhaustivo).

**Por qué es una sección separada y no se mezcla con bugs/aprendizajes:**
un bug de código se corrige editando el código; un error del asistente se
corrige ajustando el comportamiento del asistente, y su valor está en ser
**comparable entre sesiones y entre los 16 proyectos de la cartera** para
detectar patrones que ninguna sesión aislada vería. Mezclarlo con bugs de
código diluiría esa comparabilidad.

**Tabla obligatoria (campos fijos, una fila por error):**

| Campo | Contenido |
|---|---|
| `momento` | En qué punto de la sesión ocurrió (referencia al turno o tarea) |
| `disparador` | Cómo se detectó: "asistente lo señaló espontáneamente" / "usuario lo corrigió" / "usuario lo señaló sin nombrarlo error" |
| `que_paso` | Descripción concreta de la desviación, una oración |
| `regla_violada` | Documento + sección exacta de la regla que existía y no se siguió (p.ej. "userPreferences, edición de archivos: entregar completo, no fragmentos") |
| `causa_raiz` | Por qué ocurrió pese a que la regla estaba disponible (nunca "no lo sabía": la regla existía; el análisis es de por qué no se aplicó en el momento) |
| `salvaguarda_presente` | Qué documento(s) ya contenían la regla violada (POLITICA / SETTINGS / CLAUDE.md / userPreferences / más de uno) |
| `patron` | El valor empieza por la etiqueta, `PAT-01` a `PAT-13` de la tabla de abajo o `PAT-NUEVO-<slug>`, seguida de coma y el matiz libre (`PAT-01, sobre firma de función`); antes de la etiqueta no va nada. Razón: así el campo se lee sin interpretar prosa, y `PAT-NUEVO` deja de contar etiquetas que el catálogo ya cubre. Conjunto válido vigente: `PAT-01` a `PAT-13`. `PAT-NUEVO-<slug>` se reserva para mecanismos que ningún `PAT-NN` cubre y obliga a proponer la entrada nueva del catálogo en el mismo traspaso |
| `gatillo_observable` | El predicado que era observable en el momento del error, escrito como condición verificable y no como narración. Empieza con una etiqueta del vocabulario controlado, dos puntos, y la precisión libre del caso. Vocabulario: `afirmar-sin-leer`, `estado-git`, `cifras-datos`, `encargos-premisas`, `ausencia-adjuntos`, `comando-entorno`, `restriccion-no-propagada`, `confirmacion-redundante`, `entrega-sin-destino-o-nombre`, `costo-sobre-regla`, `iteracion-sin-criterio`, `otro`. Existe para que los grupos de gatillo sean un campo del registro y no una reconstrucción por expresión regular sobre prosa libre (el catálogo v2 documenta esa brecha en PAT-01) |
| `intentos_previos` | Número de intentos fallidos contra el mismo objetivo antes del error (`0` si ocurrió al primer intento), más una frase de qué falló en cada uno. Es el dato que el retrospectivo no tenía y sin el cual las salvaguardas de escalada (dos fallos, segundo rechazo) no son medibles |
| `costo` | Consecuencia real en unidad observable (turnos perdidos, ciclos de copy-paste, artefactos rehechos, fases detenidas, cifra publicada incorrecta) o `ninguno`. Nunca adjetivos. Existe porque la frecuencia sola no ordena las salvaguardas: hay patrones de un registro con costo alto por evento y patrones frecuentes de costo bajo |

**Catálogo de patrones vigente (incrustado; el asistente clasifica desde
aquí y NO necesita adjunto).** Trece patrones activos. Las fichas completas
(evidencia, subfamilias, guardrails, salvaguardas) viven en
`herramientas_dev/gobernanza/catalogo_patrones_errores_v5.md`, que es insumo
de Claude Code y de las auditorías, no del registro de errores en sesión:
para clasificar basta esta tabla.

| ID | Patrón |
|---|---|
| `PAT-01` | Afirmar o emitir sin fuente primaria |
| `PAT-02` | Consumar sin verificación intermedia |
| `PAT-03` | Supuesto sobre el entorno de ejecución ajeno |
| `PAT-04` | Ceder iniciativa o re-preguntar lo resuelto |
| `PAT-05` | Clasificar mal la división titular/asistente |
| `PAT-06` | Entregar sin archivo materializado, sin destino o con identidad no canónica |
| `PAT-07` | Restricción leída no propagada al diseño |
| `PAT-08` | Verbosidad sobre el requisito de brevedad |
| `PAT-09` | Optimizar costo o esfuerzo por encima de regla o rigor |
| `PAT-10` | Iteración a ciegas en cambios convergentes |
| `PAT-11` | Ejecución mecánica por chat existiendo vía de encargo |
| `PAT-12` | Encargo desfasado por contexto |
| `PAT-13` | Precondición o criterio de aceptación que mide un proxy y no el riesgo |

Si el patrón del caso no calza en ninguno, se usa `PAT-NUEVO-<slug>` y se
propone la entrada en el mismo traspaso; no se pide el catálogo adjunto para
decidirlo.


**Regla de registro:** el error se anota en el momento en que se
identifica dentro de la sesión (no se reconstruye de memoria al cerrar).
Si la sesión no llega a un cierre formal, el registro provisional debe
quedar localizable en el historial de la conversación.

**Regla de formato:** la tabla usa los **diez** campos fijos sin excepción,
en cualquiera de los layouts equivalentes (tabla de diez columnas, tabla
transpuesta o bloque campo/contenido por error). Omitir campos o sustituir la
tabla por un formato propio degrada la comparabilidad entre proyectos, que es
el propósito de esta sección. Los registros anteriores a esta versión con
siete campos siguen siendo válidos y no se re-registran: la ampliación rige
hacia adelante.

**Consumo entre proyectos:** esta tabla es, junto al backlog, uno de los
pocos artefactos pensados explícitamente para análisis CRUZADO entre los
16 proyectos de la cartera (no solo memoria de un proyecto individual).
Si en una sesión de `slep_estado_proyectos_monitoreo` (o cualquier sesión
BIBLIOTECA dedicada) se detecta que el mismo `patron` aparece en tablas de
errores de 2 o más proyectos, eso es evidencia de que la salvaguarda
actual (la regla tal como está escrita) no es suficiente y debe
reformularse, no solo repetirse con más énfasis.

#### 2.2.16 Validación empírica antes de reformular una regla reincidente

Cuando §2.2.15 dispara ("el mismo `patron` aparece en tablas de errores
de 2 o más proyectos"), la regla violada debe reformularse, no repetirse
con más énfasis. Pero **antes de reescribirla**, clasificar de qué tipo
de falla se trata: la forma de la corrección depende del tipo de falla, y
elegir mal la forma es lo que hace que una regla reincida pese a
reformularse. En particular, endurecer una prohibición es la herramienta
correcta solo cuando la falla es de disciplina; si la falla es de forma
del output, de omisión o de condición ambigua, una prohibición más
enfática no corrige y a veces empeora (bajo un incentivo en competencia,
el asistente "negocia" con el "no X").

**Tabla de clasificación (cuatro categorías, elegir una):**

| Tipo de falla | Cómo se reconoce | Forma correcta del arreglo |
|---|---|---|
| **Disciplina** | El asistente conocía la regla y la saltó bajo presión (prisa, costo hundido, "solo esta vez") | Prohibición explícita + tabla de racionalizaciones + lista de red flags |
| **Forma del output** | El asistente cumplió, pero el producto salió con forma equivocada (fragmento en vez de archivo completo, cifra sin recuento, veredicto enterrado) | Receta positiva o contrato: declarar qué ES el output correcto, sus partes y su orden |
| **Omisión** | Falta un elemento de algo que el asistente ya produce (campo ausente de una tabla o plantilla) | Campo/slot obligatorio en la plantilla que rellena, no un recordatorio en prosa |
| **Condición ambigua** | La conducta correcta dependía de una condición que la regla no ató a un disparador observable | Condicional explícito sobre un predicado observable ("si existe X, entonces Y") |

**Regla de elección:** una prohibición NO es la herramienta correcta si
la falla es de forma, de omisión o de condición, aunque el patrón
reincida. Reformular en la forma equivocada (más prohibición para una
falla de forma) cuenta como reformulación fallida y se registra como tal
en el próximo ciclo. La reformulación elegida se documenta junto al
`patron` correspondiente, nombrando la categoría usada.

**Alcance de esta subsección:** cubre la *elección de la forma* de la
regla reformulada. La validación de que la nueva redacción efectivamente
cambia la conducta (micro-test empírico contra un control sin la regla)
queda fuera de alcance por ahora: requiere infraestructura de testing de
prompts que hoy no existe en `herramientas_dev`. Cuando esa
infraestructura exista, esta subsección es el punto natural de enganche.

#### 2.2.17 Registro de fricciones (una línea, sin tabla)

Una **fricción** es una molestia expresada por el titular que no llega a
desviación de regla canónica: verbosidad sobre el techo de prosa, un matiz no
pedido, una pregunta de más, un formato que obligó a releer. No entra a la
tabla de §2.2.15 (no hay regla violada que citar) y hoy no deja rastro
alguno, lo que subregistra el problema: el catálogo v2 clasifica PAT-08
(verbosidad) con 5 registros formales y declara ese número como artefacto del
subregistro, no como frecuencia real.

**Forma:** una línea por fricción en el traspaso, en su propia sección al
final de §2.2.15, con el formato `friccion: <qué molestó> → <qué se ajustó>`.
Sin tabla, sin campos, sin análisis. El costo de registrar debe ser menor que
el costo de la fricción, o no se registra.

**Para qué:** una fricción que reaparece en dos o más proyectos se promueve a
patrón con entrada de catálogo, y recién ahí recibe el tratamiento de
§2.2.16. Antes de eso no se legisla sobre ella.

### 2.3 Reglas de redacción del traspaso

1. Exhaustividad sobre brevedad: ante la duda, incluir (la información
   faltante cuesta una sesión repitiendo errores).
2. Especificidad sobre generalidad: causa raíz exacta con archivo y
   línea, no "tenía un bug".
3. Causa raíz, no solo síntoma (C.11).
4. Cada aprendizaje como regla concreta vinculada a su principio.
5. Sin supuestos implícitos: la próxima instancia no "lo sabrá" (B.1).
6. Todo fragmento de código incluido debe ser copiable y ejecutable.
7. El backlog es la única fuente de verdad del conteo histórico.
8. Los pendientes son el mapa de la próxima ruta: sus campos son
   obligatorios.
9. La auditoría de cierre es obligatoria: la sesión no deja deuda sin
   documentar.
10. Valores reales en la reapertura, sin placeholders.
11. La tabla de errores del asistente (§2.2.15) es obligatoria incluso si
    está vacía: una fila "sin errores registrados en esta sesión" es una
    afirmación verificable; omitir la sección entera no lo es.

---

## 3. Higiene de sesión

Recomendar cierre proactivo ante: muchas vueltas con fatiga de
contexto; múltiples archivos largos cargados con confusión de
versiones; síntomas de degradación (mezclar versiones, repetir código
ya entregado, respuestas vagas, perder acuerdos); pivote a otro
dominio. Formato:

> Sugiero cerrar esta sesión. Razón: [síntoma concreto]. ¿Cerramos con
> el protocolo de cierre (proyecto) o con cierre liviano (BIBLIOTECA)?

Cerrar temprano es más barato que un traspaso corrupto.

---

## 4. Protocolos bajo demanda

Se activan cuando la tarea de la sesión lo requiere. El asistente los
consulta solo; no espera que el usuario los invoque por nombre.

### 4.1 Generar orquestador `00_run_all.R`

Especificación completa: política, sección 4. Protocolo:

1. Obtener el inventario real de ejecutables (escáner o
   `estructura_actual.md`). No deducir nombres ni rutas.
2. Generar el archivo completo cumpliendo la sección 4 de la política
   (raíz vía `rprojroot`, `PASOS`, `run_all(from/to/only/skip)`,
   validación de rutas al inicio, logging, `.qmd` vía
   `quarto::quarto_render()`).
3. Incluir al final ejemplos de uso comentados (`run_all()`,
   `run_all(skip = c(1, 2))`, `run_all(from = 5)`, `run_all(only = 8)`).
4. Prohibido: modificar scripts de estación, asumir scripts no
   inventariados, caché automático por timestamp, lógica de negocio.

### 4.2 Migrar estructura a la convención canónica

Motor: `herramientas_dev/plantillas/99_reorganizar_estructura_PLANTILLA.R`
copiado al proyecto. Reglas no negociables: política, sección 9.
Secuencia exacta:

1. **Escaneo** del proyecto (pedirlo si no está).
2. **Diagnóstico de referencias:** buscar TODAS las referencias
   literales a las carpetas actuales en `.R`/`.qmd` (entrecomilladas,
   en `file.path()`, `test_path()`, comentarios, tests), excluyendo
   `.Rproj.user`, `renv/`, `.bak`. Sin este diagnóstico los regex de
   reescritura fallan en silencio.
3. **Mapeo justificado:** carpetas vieja → nueva contra los principios
   de la política sección 1; renombres de archivos; reorganización de
   documentación; patrones de reemplazo derivados del diagnóstico;
   exclusiones explícitas (`andamios/`). Confirmación del usuario antes
   de generar el script (decisión estratégica: excepción válida a la
   regla de autonomía).
4. **Adaptar la plantilla** con `DRY_RUN <- TRUE` y registro en
   `_archivo/log_reorganizacion.csv`.
5. **Ciclo DRY_RUN → real:** verificar que los conteos del DRY_RUN
   cuadren con el diagnóstico (Fase 3 con 0 reemplazos = regex malos);
   commit limpio; `DRY_RUN <- FALSE`; verificar integridad de copias.
6. **Validación:** reiniciar R, tests, orquestador end-to-end,
   verificación visual. Solo entonces borrar `.bak`.

No ceder a presión por saltar el DRY_RUN, aunque el usuario lo pida.

### 4.3 Migrar proyecto local a GitHub privado (dos raíces)

Arquitectura objetivo: política, sección 6.2. Contexto a confirmar al
inicio: `nombre_proyecto`, `nombre_repo_github`, ruta local actual,
ruta de código destino (`~/Projects/...`), ruta de datos destino
(OneDrive). Visibilidad: privado, no negociable sin justificación.

- **Fase 0 — Escaneo estructural.** Si la estructura está fuera de
  norma, primero migrar estructura (4.2). No se sube a GitHub un
  proyecto desordenado.
- **Fase 1 — Auditoría de seguridad pre-migración.** Script
  `diagnostico_migracion_github.R` que reporte: datos personales
  hardcodeados (regex RUT `\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]`, correos,
  nombres); credenciales; rutas absolutas con información personal
  (OneDrive, `Users/<nombre>/`); archivos de datos en carpetas
  versionables; nombres con tildes/ñ/espacios; historial Git sucio si
  ya es repo. Output: `diagnostico_migracion_github.md` con hallazgo,
  severidad, norma aplicable y recomendación. **Esperar revisión del
  usuario** (compuerta de gobernanza, no interrupción trivial).
- **Fase 2 — Separación código / datos.** Mover código a la raíz de
  código, datos a la raíz de datos; configurar variable de entorno,
  `10_configuracion.R`, `.Renviron.example` y `.gitignore` blindado
  según política 6.2-6.3 y 8.3. Regla de movimiento físico: **copiar,
  no mover**; verificar que OneDrive terminó de sincronizar antes de
  borrar las carpetas de datos del origen (o moverlas a `_archivo/`
  como respaldo local). Generar `gobernanza_datos.md` y `LICENSE`
  (política, sección 10). Validar con el bloque 8.3.7 en sesión R
  limpia ANTES del primer push; si falla, diagnosticar, no continuar.
- **Fase 3 — Repo remoto.** Verificar con el usuario que es PRIVADO;
  branch protection en `main` (PR obligatorio, sin force push, sin
  borrado). **Matiz de plan:** en GitHub Free los repos privados NO
  tienen branch protection; sustituir con el workflow de validación
  del punto siguiente más autodisciplina de PR documentada en el
  README. Secret Scanning (detección básica activa por defecto en
  privados) y Dependabot; workflow de Actions que valide en cada push
  ausencia de extensiones de datos, de patrones RUT y de tokens.
- **Fase 4 — Primer push.** `git status` completo mostrado al usuario;
  confirmación de cualquier archivo sospechoso; recién entonces push.
- **Fase 5 — Despliegue (si aplica).** Secretos como variables de
  entorno del servidor; autenticación (SSO institucional preferido);
  logs sin datos personales; recordar que shinyapps.io aloja en AWS US
  (si los datos no pueden salir de Chile, Posit Connect on-premise o
  servidor institucional). Infraestructura SLEP: preguntar qué existe,
  no asumir.
- **Cierre.** Mover `diagnostico_migracion_github.md` a
  `50_documentacion/activa/decisiones/` como evidencia histórica;
  copiar `CLAUDE.md` a la raíz si las próximas sesiones serán en
  Claude Code; documentar en el traspaso la configuración pendiente
  para otras máquinas (protocolo 4.4).

### 4.4 Setup de máquina nueva (proyecto ya migrado a dos raíces)

La forma ejecutable de este protocolo es `herramientas_dev/prompts/protocolo_estaciones_v2.md`
(v36): **E1** instala la estación una vez por máquina
(`bash <kit>/plantillas/90_instalar_estacion.sh`, macOS o Git Bash) y termina
en la compuerta `95_verificar_estacion.R`; **E2** habilita cada proyecto en
esa máquina. Lo que sigue es lo que E2 hace, para el fallback sin kit:

1. Clonar el repo en la raíz de trabajo de la máquina (`~/Projects/` en
   macOS, `C:\GitHub` en Windows).
2. Verificar que OneDrive institucional esté sincronizado y localizar
   la raíz de datos del proyecto.
3. Copiar la línea `<SLUG_MAYUS>_DATA_ROOT` de `.Renviron.example` al
   `.Renviron` que R lee en esa máquina (`~/.Renviron` en macOS;
   `Documents/.Renviron` en Windows, porque R resuelve `~` a `R_USER`),
   con la ruta de OneDrive de **esa** máquina.
4. Reiniciar R y validar (política 8.3.7); con el kit,
   `Rscript "$HERRAMIENTAS_DEV_PATH/plantillas/95_verificar_estacion.R" <ruta_del_proyecto>`
   (E9 en verde).
5. Correr `run_all()` o el subconjunto mínimo para confirmar pipeline
   operativo.

No es un refactor: no se toca código del proyecto. Los normativos de
`50_documentacion/activa/` y el comando `/cierre` no se copian a mano: los
sincronizan `/apertura` y `/cierre` desde el kit (§1.2.2 0bis, §2.1).

### 4.5 Auditoría de cifras publicadas

Vive como instrumento independiente en `herramientas_dev/prompts/`
(`auditoria_codigo_proyecto_md_v*.md`, versión máxima; hoy
`auditoria_codigo_proyecto_md_v3.md`, protocolo con fases A0-A6), y este
documento no duplica su núcleo: cada cifra publicada se calcula por dos
caminos independientes y se compara con tolerancias nombradas; el
inventario de cifras del entregable se extrae por comando
(`plantillas/auditoria_inventario_cifras.R`), nunca se transcribe; cada
familia demuestra en la misma corrida que detecta una diferencia plantada
(control positivo); la matriz de cobertura cifra → familia → hoja es la
salida principal ("cobertura n/N, k sin familia" es un resultado, "todo OK"
no); y cada corrida deja una sección en
`50_documentacion/andamios/logs/auditorias_log.md`. Los helpers
(`plantillas/auditoria_helpers.R`) se copian idénticos al proyecto y el
orquestador se rellena desde `plantillas/auditoria_orquestador_PLANTILLA.R`;
ambos llegan con arnés en `plantillas/tests/`. Se ejecuta como encargo
autónomo (`encargo_autonomo_claude_code_v1.md`, v1.7, con `EXPEDIENTE:` y
FASE L; su log es `<EXPEDIENTE>/50_log.md`, distinto del acumulativo
`auditorias_log.md`);
su bloque A6 se copia tal cual a la subsección "Auditoría de cifras" del
traspaso (§2.2 punto 11, v37).

### 4.6 Generar la documentación de un proyecto con `suitedoc`

Produce los 4 documentos HTML de la suite (`arquitectura_*`,
`documentacion_proyecto_*`, `arquitectura_general_*`,
`documentacion_general_*`) para un proyecto, llenando su `cfg` a partir
del material existente del proyecto, sin que el usuario edite la
configuración a mano. El motor genérico vive en el paquete `suitedoc`;
este protocolo cubre cómo se arma el `documentar.R` de un proyecto
concreto.

**Tipo de sesión:** BIBLIOTECA (produce un artefacto reutilizable, el
`documentar.R` del proyecto), no CONTINUATION del proyecto documentado.
Sin acuse de recibo ni ruta de desarrollo: se entra directo al guion de
insumos. Si produce el `documentar.R` más los 4 HTML, ofrecer el cierre
liviano de 1.5.

**Regla de automatización:** el asistente NO pide al usuario que llene la
`cfg`. Pide los insumos del proyecto (abajo), extrae de ellos todo lo
inferible, y solo pregunta por lo que ningún archivo contiene (la prosa
de comunidad). El producto es un `documentar.R` completo, no una
plantilla con huecos para que el usuario rellene.

#### 4.6.1 Insumos a solicitar (en un solo mensaje)

El asistente pide estos archivos del proyecto a documentar. Los que
existan en la knowledge base del Project no se piden; se leen desde ahí.

| Insumo | Qué aporta a la `cfg` |
|---|---|
| `estructura_actual.md` (escáner) | Diagrama técnico: `insumos`, `etapas`, `intermedios`, rutas reales de los `rotulos`. **Imprescindible:** sin él, las rutas del diagrama se inventan. |
| `README.md` | Identidad (`slug`, `area`, `fuente`); `prosa$doc_que`; origen de los datos. |
| `CLAUDE.md` (si existe) | Convenciones técnicas → `glosario_tec`, flags de `etapas`. |
| Traspaso `traspaso_cierre_vNN.md` (el último) | `decisiones`, `anomalias`, `reglas_calculo`, restricciones técnicas. **Imprescindible:** es la fuente principal de las decisiones metodológicas. |
| Decisiones (`50_documentacion/activa/decisiones/`) | `decisiones` con su porqué; `gobernanza`. |
| Scripts del pipeline (los del flujo, no los utils) | Diccionario de datos (`dic_crudos`, `dic_intermedios`); detalle de `etapas`. |
| `gobernanza_datos.md` (si el proyecto tiene datos sensibles) | `cfg$gobernanza`; qué NO publicar. |

Si faltan los dos imprescindibles (escáner y traspaso), pedirlos y
detenerse: sin ellos el diagrama y las decisiones se inventarían,
violando B.1 (sin supuestos implícitos).

#### 4.6.2 Procedimiento

1. **Leer todos los insumos** de principio a fin. No resumir
   prematuramente.
2. **Verificar la versión del paquete.** Confirmar que el `suitedoc`
   instalado expone los campos que el `documentar.R` va a llenar
   (`rotulos`, `reglas_calculo`, `leyenda`, `textos`, `pie_extra`,
   `gobernanza`, `prosa$etapas_pipeline`). Si el paquete es una versión
   anterior sin esos campos, declararlo: el `documentar.R` generado los
   incluirá igual (caen al fallback del motor), pero conviene actualizar
   el paquete.
3. **Extraer lo inferible** y mapearlo a la `cfg`:
   - Del escáner: el `slug` (nombre de la carpeta raíz), las etapas del
     pipeline (los ejecutables de `30_procesamiento/` en orden), los
     insumos (`20_insumos/`), los intermedios (`40_salidas/`), y los
     `rotulos` con las rutas reales (`31_<...>.R`, etc.).
   - Del README y los scripts: identidad, diccionario de datos, origen.
   - Del traspaso y las decisiones: `decisiones` (cada una con `id`,
     `titulo`, `cuerpo`, `por_que`), `anomalias`, `reglas_calculo`, y
     `gobernanza`.
4. **Determinar la gobernanza.** Si el proyecto trata datos personales o
   de NNA, fijar `cfg$gobernanza` con la categoría (p. ej. "Datos
   personales de NNA") y aplicar la regla de no incluir nombres reales de
   establecimientos, estudiantes ni funcionarios en ningún documento (los
   generales se publican). Describir universos en abstracto.
5. **Redactar la prosa de comunidad.** Lo que ningún archivo contiene:
   `faq`, `garantias`, `notas`, `prosa$gen_porque`, hero-notes de los
   documentos generales. El asistente la redacta desde lo que el proyecto
   hace, en el registro de la audiencia (directivos / comunidad). Si el
   usuario tiene un texto de referencia de voz (un documento ejecutivo,
   un correo tipo), se pide y se usa como base del tono; si no, se redacta
   y se marca para revisión.
6. **Entregar el `documentar.R` completo**, con todos los bloques llenos.
   Las zonas redactadas sin fuente directa (prosa de comunidad) se marcan
   con un comentario `# REVISAR (voz): ...` para que el usuario afine el
   tono, pero el contenido va completo, no en blanco.
7. **No ejecutar por el usuario.** Generar los 4 HTML es tarea del
   usuario (correr `source("documentar.R")` desde su máquina, donde está
   R y el paquete instalado). El asistente entrega el `documentar.R` y la
   instrucción de una línea para generarlo y revisarlo.

#### 4.6.3 Reglas no negociables

1. **Sobrescribir todos los bloques que los builders consumen.** Un
   bloque sin personalizar saldría con el fallback genérico del motor o,
   peor, con residuo del ejemplo. `generar_suite(verificar = TRUE)` (el
   default) aborta si detecta texto del ejemplo de fábrica; el
   `documentar.R` se entrega de modo que pase esa verificación.
2. **Gobernanza prevalece.** En proyectos con datos sensibles, ningún
   nombre real de EE/estudiante/funcionario entra a la `cfg`, porque los
   documentos generales se publican (política, sección 6).
3. **No inventar metodología.** Las `decisiones` y `anomalias` salen del
   traspaso y de los archivos de decisión, nunca de la deducción del
   asistente. Si una decisión no consta, se pregunta; no se fabrica un
   porqué (B.1).
4. **La prosa de comunidad se redacta, no se extrae** — y se marca como
   revisable, porque el tono es del usuario.
5. **Ubicación canónica de la salida:** `50_documentacion/suite/`
   (`documentar.R` + tema + los 4 HTML). Versionar el tema solo si los
   HTML se publican desde el repo; si no, `fonts/` y `assets/` al
   `.gitignore`.
6. **Terminología institucional del SLEP.** El término genérico para
   referirse a escuelas, liceos, jardines infantiles, centros de
   educación de adultos y similares es **"establecimiento educacional"**
   (plural "establecimientos educacionales"). Se despliega completo en
   la **primera mención de cada párrafo**; en las repeticiones siguientes
   del mismo párrafo se usa **"establecimiento(s)"** a secas, para no
   recargar la prosa. La regla aplica a prosa técnica y de comunidad por
   igual. Nunca usar la abreviatura "EE" en texto visible al usuario (sí
   se conserva en notación técnica de fórmulas, p. ej. `conteo de EE`,
   `n_EE`). No usar "colegio" como sustantivo genérico. Excepciones: (a)
   la voz simulada del lector en una FAQ puede usar lenguaje coloquial;
   (b) "escuela/liceo/jardín" se usan deliberadamente cuando se
   ejemplifica el universo que el término genérico engloba; (c) nombres
   propios de productos externos se conservan literalmente (p. ej.
   "Localiza tu colegio" de la Agencia de Calidad).

#### 4.6.4 Suite standalone offline (propagar a cualquier proyecto)

Genera la suite en formato **standalone offline**: embebe CSS, fuentes,
logos e iconos dentro de cada HTML, de modo que los 4 documentos no
dependan del tema en disco ni de CDN para los iconos. Es el formato
canónico para archivar o compartir la documentación como unidad
autónoma, alineado con el principio de HTML autocontenido del proyecto
(igual que el motor). La capacidad vive en `suitedoc` (HEAD `c8b3bd7` en
adelante); **no** requiere tocar el paquete, solo invocarlo bien.

**Cuándo aplica:** cualquier proyecto con suite (`documentar.R` +
`generar_suite()`) que aún produzca los HTML en modo enlazado. Activar
standalone es un cambio acotado en el `documentar.R` del proyecto, no en
`suitedoc`.

**Procedimiento (por proyecto):**

1. **Verificar la versión del paquete.** Confirmar que el `suitedoc`
   instalado expone `generar_suite(..., standalone=)`. Firma real:
   `generar_suite(cfg, salida_dir = ".", copiar_tema = TRUE,
   verificar = TRUE, standalone = FALSE, verbose = TRUE)`. Si la versión
   instalada no la expone, reinstalar desde el kit, resuelto por variable de
   entorno y nunca por ruta de usuario (POLITICA §7.2, PAT-03):
   `devtools::install(file.path(Sys.getenv("HERRAMIENTAS_DEV_PATH"), "suitedoc"))`.
2. **API real (no asumir otra).** `standalone = TRUE` hace que
   `generar_suite` llame **internamente** a
   `inlinar_suite(salida_dir, limpiar_enlazados = TRUE)`: escribe los 4
   `*_standalone.html` y borra los enlazados intermedios. **Nunca** se
   llama `inlinar_suite()` por separado en el flujo normal.
3. **Cambiar la llamada del `documentar.R`** del proyecto: añadir
   `standalone = TRUE`. Mantener el `verificar` que ese proyecto ya use
   (no cambiarlo sin razón declarada).
4. **Precondición de entorno (🔴).** `inlinar_suite()` descarga
   lucide-static (versión fijada, p. ej. 1.21.0) vía `npm pack`. Requiere
   `npm` en el PATH y red al registro npm **en tiempo de generación** (la
   suite resultante sí es 100% offline; generarla no). Verificar antes de
   regenerar lo que el riesgo es, no un proxy (PAT-13, v36):
   `npm view lucide-static@<version fijada> version` debe imprimir esa
   versión (mide `npm` **y** el alcance al registro; `npm --version` solo
   medía lo primero). Si falla, detenerse y reportarlo (el titular instala
   npm o resuelve la red), no improvisar.
5. **Validación de iconos (A17-2 / R3).** `inlinar_suite()` valida todos
   los `data-lucide` de la cfg y **aborta sin escribir nada** si alguno
   no existe en la versión fijada de lucide-static, listando los
   faltantes. Si un icono no resuelve (caso vivido: `sitemap`→`network`),
   sustituirlo en la cfg por el equivalente lucide más cercano y
   registrarlo; si no hay equivalente obvio, detenerse y reportar.
6. **Verificación empírica sobre los `*_standalone.html` reales** (no
   sobre supuestos, R1): `grep` de referencias de red por archivo = 0
   (`http://`, `https://`, `src=`/`href=` a CDN, `<link rel="stylesheet"
   href="http`); iconos como `<svg>` embebido (no `<i data-lucide>` ni
   `<script>` de lucide); fuentes como `data:` URIs. Reportar el conteo
   de red por archivo.
7. **Ajuste de versionado.** Con standalone, el tema (`fonts/`,
   `assets/`) ya viaja embebido en el HTML y **no** se versiona. Cada
   proyecto versiona los 4 `*_standalone.html` + `documentar.R` + el CSS;
   `fonts/` y `assets/` al `.gitignore`. `git status` antes de
   `git add`; nunca `git add .`; confirmar con `git ls-files` (no con el
   escáner, A20) que el tema no entra.

**Separación de responsabilidades (importante).** Activar standalone es
**solo** lo anterior. Si la `cfg` de un proyecto además necesita
actualizaciones de contenido (decisiones formales, gobernanza), eso es
trabajo aparte que se decide explícitamente; no se mezcla con la
activación del modo offline (un cambio conceptual por intervención).

**Llamada canónica:**

```r
# setwd("<raiz_proyecto>") si se corre por Rscript (here::i_am lo exige).
suitedoc::generar_suite(
  cfg,
  salida_dir  = here::here("50_documentacion", "suite"),
  copiar_tema = TRUE,
  verificar   = FALSE,   # o TRUE si ese proyecto no dispara falsos positivos
  standalone  = TRUE,    # produce *_standalone.html offline; limpia los enlazados
  verbose     = TRUE
)
# Requiere npm + red en tiempo de generación (descarga lucide-static fijado).
```

### 4.7 Ordenación del repositorio

Pone el árbol de un proyecto al día con la política v5.5. **No toca el
pipeline:** mueve, renombra y archiva documentación. Nada se borra: todo lo
que sale del árbol vivo va a `_archivo/YYYYMMDD/` conservando su ruta
relativa (política 1.5). El protocolo se ejecuta una vez por proyecto; el
mantenimiento posterior lo hace el cierre de sesión (§2.1, `vigentes=1`).

**Cuándo aplica.** Cuando el gatillo de §1.2.2 punto 4bis se enciende (no
existe `50_documentacion/activa/50_ordenacion_repositorio.md`) y el usuario
aprueba abordarlo. También bajo demanda, invocando "ordenación del
repositorio".

**Tipo de sesión.** Se ejecuta como tarea dentro de una CONTINUATION del
propio proyecto, no como sesión aparte: necesita el traspaso leído para saber
qué documento está superado y cuál no.

**Reparto de instancias.** El asistente conversacional redacta el encargo y
decide los grados de certeza; Claude Code ejecuta los movimientos, los greps
y los commits. El asistente no propone que el usuario mueva archivos a mano.

#### 4.7.1 Precondiciones bloqueantes

Se verifican **antes de tocar nada**. Si alguna falla, detenerse y reportar;
no se "resuelve de paso".

```bash
cd <raiz_proyecto>
git status --porcelain            # debe salir vacío (índice y árbol limpios)
git stash list                    # debe salir vacío
git rev-list --left-right --count @{u}...HEAD   # debe ser "0	0"
git rev-parse --abbrev-ref HEAD   # NO debe ser main/master
```

Rama de trabajo propia: `ordenacion/<AAAAMMDD>`. El merge lo decide el
titular; el protocolo termina en PR, nunca en merge.

#### 4.7.2 Alcance (cuatro bloques, un commit por bloque)

**Bloque 1 — Traspasos.** `50_documentacion/traspasos/` queda con un solo
archivo, el de la última sesión cerrada; el resto va a `traspasos/archivo/`
con `git mv` (nunca `cp` + `rm`, que rompe `git log --follow`). Es la regla
1.3.1 de la política v5.5 y el paso de cierre de §2.1 de este documento. Si
la línea de encabezado de la copia local de `POLITICA_PROYECTO.md` o de
`SETTINGS_Y_PROMPTS_OPERACIONALES.md` en `50_documentacion/activa/` difiere de
la del kit (`$HERRAMIENTAS_DEV_PATH/gobernanza/`), actualizarla **desde el
kit** es parte de este bloque (v36; `/apertura` ya lo hizo al abrir la sesión,
así que aquí es una comprobación, no un paso); si la copia del proyecto es
más nueva que el kit, detenerse: un normativo se editó fuera del kit.
Aserción de cierre: `ls 50_documentacion/traspasos/*.md` devuelve una línea.

**Bloque 2 — Obsoletos y duplicados.** Proponer candidatos a
`_archivo/YYYYMMDD/`: documentos superados por una versión posterior, specs
de arquitecturas abandonadas, salidas regenerables, residuos de sesión. Cada
candidato lleva **grado de certeza** declarado:

| Grado | Criterio | Tratamiento |
|---|---|---|
| Alto | Existe la versión posterior en el árbol, o el traspaso declara la arquitectura abandonada | Se mueve |
| Medio | Parece superado pero nada lo declara | Grep obligatorio antes de mover |
| Bajo | Solo el nombre o la fecha lo sugieren | No se mueve; se lista como duda en el encargo |

El grep de referencias vivas es `grep -rn --exclude-dir=_archivo
--exclude-dir=.git "<nombre_archivo>" .`. **Si devuelve una referencia viva,
la fila se cancela y se reporta**; no se mueve y no se "arregla la
referencia" en el mismo paso. `andamios/` está congelado (política 1.2): sus
archivos nunca son candidatos, y una referencia dentro de `andamios/` es
registro histórico, no referencia viva (se anota, no cancela la fila).

**Bloque 3 — Nomenclatura.** Los archivos de las subcarpetas de `50_*` llevan
el prefijo de su decena, en minúsculas y snake_case (política §2). **Antes de
renombrar cualquier archivo, grep de su nombre en `POLITICA_PROYECTO.md` y en
`SETTINGS_Y_PROMPTS_OPERACIONALES.md`.** Si aparece fijado por nombre, no se
renombra, por muy fuera de patrón que se vea: su nombre es un contrato que
excede al proyecto. Las excepciones ya declaradas por la política (`ESTADO.md`,
`gobernanza_datos.md`, `backlog_acumulativo.md`, `POLITICA_PROYECTO.md`,
`SETTINGS_Y_PROMPTS_OPERACIONALES.md`) se dan por verificadas; el grep cubre
las no anticipadas. Origen de la regla: sesión v103 de
`slep_aprendizajes_ep`, donde el renombre de `ESTADO.md` se ejecutó y hubo que
revertirlo. Todo renombre que sí proceda **actualiza sus referencias en el
mismo commit**.

**Bloque 4 — Escáner.** Verificar que `00_escanear_proyecto.R` excluya del
barrido `node_modules/`, `packrat/` y `venv/` (política §7.2). Si no lo hace,
los totales que declaran los traspasos están midiendo una dependencia y no el
proyecto: corregir el script y declarar en el manifiesto el total antes y
después.

#### 4.7.3 Entrega

1. **Encargo previo** en su expediente
   (`50_documentacion/encargos/AAAAMM/AAAAMMDD_ordenacion_repositorio/`,
   POLITICA §1.3.2; v39), con la lista concreta de movimientos y el grado de
   certeza de cada uno. Se entrega y se aprueba **antes** de ejecutar.
2. **Manifiesto** con hashes (`git hash-object`) de cada archivo movido,
   origen y destino.
3. **Log de greps** con el resultado de cada uno, **incluidas las filas
   canceladas**. Una ejecución sin filas canceladas no es una ejecución
   limpia por definición: si no hubo ninguna, se declara.
4. **Commits selectivos**, uno por bloque, con rutas explícitas. Nunca
   `git add -A` ni `git add .`.
5. **Grep de privacidad y de coautoría** antes de cada commit de
   documentación (política §6): sin RUT, sin nombres de personas, sin
   atribución de coautoría a la herramienta.
6. **Escáner al final** y **PR**. El merge lo decide el titular.
7. **Marcador:** el último commit crea
   `50_documentacion/activa/50_ordenacion_repositorio.md` con la fecha, la
   rama, el hash del PR y el conteo de archivos movidos por bloque. Ese
   archivo apaga el gatillo de §1.2.2 punto 4bis. Sin él, la ordenación se
   volvería a proponer en cada apertura.

#### 4.7.4 Prohibido

- Borrar cualquier archivo (todo va a `_archivo/`).
- `cp` + `rm` donde corresponde `git mv`.
- Mover un candidato de grado medio o bajo sin grep previo.
- Renombrar un archivo citado por nombre en la política o en este documento.
- Tocar `30_procesamiento/` o cualquier script del pipeline.
- Reescribir rutas dentro de `andamios/` (política 1.2). La única excepción,
  la migración del legado de encargos (POLITICA §1.3.2 punto 8), corre como
  encargo propio y nunca dentro de una ordenación (v39).
- Mezclar la ordenación con cambios de contenido: un cambio conceptual por
  intervención.
