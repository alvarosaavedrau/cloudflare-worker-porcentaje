# Calculadora de Porcentajes

Cloudflare Worker para calcular porcentajes con interfaz web minimalista y API REST.

## Características

- 🎨 Interfaz web en modo oscuro
- 🔢 Cálculo de porcentajes (X% de Y)
- 📋 Botón para copiar resultados
- 🧹 Función de limpiar campos
- 🚀 API REST sencilla
- ⚡ Desplegado en el edge con Cloudflare Workers

## Instalación

```bash
npm install
```

## Desarrollo

Ejecutar en local:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:8787`

## Desplegar

```bash
npm run deploy
```

## Uso

### Interfaz Web

Visita la URL de tu worker y usa la interfaz para calcular porcentajes:
- Ingresa el porcentaje (%)
- Ingresa el valor
- Haz clic en "Calcular"
- Copia el resultado con un clic

### API REST

Endpoint: `/api/calculate`

**Parámetros:**
- `value` (number): El valor sobre el cual calcular el porcentaje
- `percentage` (number): El porcentaje a aplicar

**Ejemplo de petición:**
```
GET /api/calculate?value=100&percentage=20
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "result": 20,
  "explanation": "20% de 100 = 20"
}
```

**Respuesta con error:**
```json
{
  "success": false,
  "error": "Se requieren los parámetros: value y percentage"
}
```

## Estructura del Proyecto

```
.
├── src/
│   ├── index.js      # Worker principal y lógica de la API
│   └── template.js   # Interfaz HTML
├── wrangler.toml     # Configuración de Cloudflare
└── package.json      # Dependencias
```

## Tecnologías

- Cloudflare Workers
- Wrangler CLI
- JavaScript ES Modules
