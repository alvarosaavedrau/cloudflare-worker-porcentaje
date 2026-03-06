/**
 * Cloudflare Worker - Calculadora de Porcentajes
 * Calcula el X% de un número
 */

import { getHTML } from './template.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // API REST - Cálculo con parámetros
    if (path === '/api/calculate') {
      return handleApiCalculate(url);
    }

    // API REST - Cálculo de descuentos
    if (path === '/api/discount') {
      return handleApiDiscount(url);
    }

    // API REST - Cálculo de IVA (añadir o quitar)
    if (path === '/api/vat') {
      return handleApiVAT(url);
    }

    // Interfaz web por defecto
    return new Response(getHTML(), {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  },
};

/**
 * Maneja el cálculo mediante API REST
 */
function handleApiCalculate(url) {
  try {
    const value = parseFloat(url.searchParams.get('value'));
    const percentage = parseFloat(url.searchParams.get('percentage'));

    if (isNaN(value) || isNaN(percentage)) {
      throw new Error('Se requieren los parámetros: value y percentage');
    }

    const result = (value * percentage) / 100;
    const explanation = `${percentage}% de ${value} = ${result}`;

    return new Response(JSON.stringify({
      success: true,
      result,
      explanation
    }), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 400,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
  }
}

/**
 * Maneja el cálculo de descuentos
 */
function handleApiDiscount(url) {
  try {
    const originalPrice = parseFloat(url.searchParams.get('originalPrice'));
    const discount = parseFloat(url.searchParams.get('discount'));

    if (isNaN(originalPrice) || isNaN(discount)) {
      throw new Error('Se requieren los parámetros: originalPrice y discount');
    }

    const discountAmount = (originalPrice * discount) / 100;
    const finalPrice = originalPrice - discountAmount;
    const explanation = `Precio original: ${originalPrice.toFixed(2)} | Descuento: ${discount}% (${discountAmount.toFixed(2)}) | Precio final: ${finalPrice.toFixed(2)}`;

    return new Response(JSON.stringify({
      success: true,
      originalPrice,
      discount,
      discountAmount,
      finalPrice,
      explanation
    }), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 400,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
  }
}

/**
 * Maneja el cálculo de IVA (añadir o quitar)
 */
function handleApiVAT(url) {
  try {
    const price = parseFloat(url.searchParams.get('price'));
    const vat = parseFloat(url.searchParams.get('vat'));
    const operation = url.searchParams.get('operation'); // 'add' o 'remove'

    if (isNaN(price) || isNaN(vat) || !operation) {
      throw new Error('Se requieren los parámetros: price, vat y operation');
    }

    let result, vatAmount, explanation;

    if (operation === 'add') {
      // Añadir IVA al precio base
      vatAmount = (price * vat) / 100;
      result = price + vatAmount;
      explanation = `Precio base: ${price.toFixed(2)} | IVA (${vat}%): ${vatAmount.toFixed(2)} | Precio final con IVA: ${result.toFixed(2)}`;
    } else if (operation === 'remove') {
      // Quitar IVA del precio que ya lo incluye
      const basePrice = price / (1 + vat / 100);
      vatAmount = price - basePrice;
      result = basePrice;
      explanation = `Precio con IVA: ${price.toFixed(2)} | IVA (${vat}%): ${vatAmount.toFixed(2)} | Precio base sin IVA: ${result.toFixed(2)}`;
    } else {
      throw new Error('El parámetro operation debe ser "add" o "remove"');
    }

    return new Response(JSON.stringify({
      success: true,
      price,
      vat,
      operation,
      vatAmount,
      result,
      explanation
    }), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 400,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
  }
}