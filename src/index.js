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