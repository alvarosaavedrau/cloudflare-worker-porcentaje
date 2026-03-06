# Calculadora de Porcentajes

Cloudflare Worker para calcular porcentajes con interfaz web minimalista y API REST.

## Características

- 🎨 Interfaz web en modo oscuro con tabs
- 🔢 Cálculo de porcentajes (X% de Y)
- 💰 Calculadora de descuentos con desglose detallado
- 🧾 Calculadora de IVA (añadir y quitar)
- 📋 Botón para copiar resultados
- 🧹 Función de limpiar campos
- ⚡ Soporte de tecla Enter en todos los campos
- 🚀 API REST completa
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

Visita la URL de tu worker y usa la interfaz para calcular:

**Tab Porcentaje:**
- Ingresa el porcentaje (%)
- Ingresa el valor
- Haz clic en "Calcular"

**Tab Descuento:**
- Ingresa el precio original
- Ingresa el porcentaje de descuento
- Obtén el precio final con desglose completo

**Tab IVA:**
- Selecciona "Añadir IVA" o "Quitar IVA"
- Ingresa el precio
- Ingresa el porcentaje de IVA (por defecto 21%)
- Obtén el resultado con desglose completo

Todos los resultados se pueden copiar con un solo clic.

### API REST

#### 1. Cálculo de Porcentajes

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

#### 2. Cálculo de Descuentos

Endpoint: `/api/discount`

**Parámetros:**
- `originalPrice` (number): Precio original del producto
- `discount` (number): Porcentaje de descuento a aplicar

**Ejemplo de petición:**
```
GET /api/discount?originalPrice=100&discount=20
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "originalPrice": 100,
  "discount": 20,
  "discountAmount": 20,
  "finalPrice": 80,
  "explanation": "Precio original: 100.00 | Descuento: 20% (20.00) | Precio final: 80.00"
}
```

#### 3. Cálculo de IVA

Endpoint: `/api/vat`

**Parámetros:**
- `price` (number): Precio base (para añadir IVA) o precio con IVA (para quitar)
- `vat` (number): Porcentaje de IVA
- `operation` (string): "add" para añadir IVA, "remove" para quitar IVA

**Ejemplo de petición (añadir IVA):**
```
GET /api/vat?price=100&vat=21&operation=add
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "price": 100,
  "vat": 21,
  "operation": "add",
  "vatAmount": 21,
  "result": 121,
  "explanation": "Precio base: 100.00 | IVA (21%): 21.00 | Precio final con IVA: 121.00"
}
```

**Ejemplo de petición (quitar IVA):**
```
GET /api/vat?price=121&vat=21&operation=remove
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "price": 121,
  "vat": 21,
  "operation": "remove",
  "vatAmount": 21,
  "result": 100,
  "explanation": "Precio con IVA: 121.00 | IVA (21%): 21.00 | Precio base sin IVA: 100.00"
}
```

**Respuesta con error:**
```json
{
  "success": false,
  "error": "Mensaje de error descriptivo"
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
