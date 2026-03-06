/**
 * Cloudflare Worker - Calculadora de Porcentajes
 * Calcula el X% de un número
 */

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

/**
 * Retorna el HTML de la interfaz web
 */
function getHTML() {
  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de Porcentajes</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: #1a1a1a;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .container {
            background: #2d2d2d;
            border-radius: 12px;
            padding: 30px;
            max-width: 400px;
            width: 100%;
        }
        h1 {
            color: #fff;
            margin-bottom: 30px;
            font-size: 24px;
            text-align: center;
            font-weight: 400;
        }
        .input-group {
            display: flex;
            gap: 12px;
            align-items: center;
            margin-bottom: 20px;
            justify-content: center;
        }
        input[type="number"] {
            width: 100px;
            padding: 12px;
            border: 1px solid #444;
            border-radius: 6px;
            font-size: 16px;
            text-align: center;
            background: #1a1a1a;
            color: #fff;
        }
        input[type="number"]:focus {
            outline: none;
            border-color: #666;
        }
        .label {
            font-size: 16px;
            color: #999;
        }
        button {
            width: 100%;
            background: #444;
            color: #fff;
            border: none;
            padding: 12px;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.2s;
        }
        button:hover {
            background: #555;
        }
        .button-group {
            display: flex;
            gap: 10px;
        }
        .clear-btn {
            background: #333;
        }
        .clear-btn:hover {
            background: #3a3a3a;
        }
        .result {
            margin-top: 20px;
            padding: 20px;
            background: #1a1a1a;
            border-radius: 6px;
            text-align: center;
            display: none;
        }
        .result.show {
            display: block;
        }
        .result-value {
            font-size: 36px;
            font-weight: 300;
            color: #fff;
            margin-bottom: 8px;
        }
        .result-explanation {
            color: #999;
            font-size: 14px;
        }
        .copy-btn {
            margin-top: 12px;
            padding: 8px 16px;
            background: #444;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .copy-btn:hover {
            background: #555;
        }
        .copy-btn.copied {
            background: #4a9d5f;
        }
        .api-info {
            margin-top: 25px;
            padding: 12px;
            background: #1a1a1a;
            border-radius: 6px;
            font-size: 11px;
            color: #666;
            text-align: center;
        }
        .api-info code {
            color: #888;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Calculadora de Porcentajes</h1>
        
        <div class="input-group">
            <input type="number" id="percentage" placeholder="%">
            <span class="label">% de</span>
            <input type="number" id="value" placeholder="Valor">
        </div>
        <div class="button-group">
            <button onclick="calculate()">Calcular</button>
            <button class="clear-btn" onclick="clearInputs()">Limpiar</button>
        </div>

        <div class="result" id="result">
            <div class="result-value" id="resultValue"></div>
            <div class="result-explanation" id="resultExplanation"></div>
            <button class="copy-btn" id="copyBtn" onclick="copyResult()">Copiar resultado</button>
        </div>

    </div>

    <script>
        async function calculate() {
            const percentage = document.getElementById('percentage').value;
            const value = document.getElementById('value').value;
            
            const params = new URLSearchParams({
                value: value,
                percentage: percentage
            });

            try {
                const response = await fetch('/api/calculate?' + params.toString());
                const data = await response.json();

                if (data.success) {
                    // Formatear el resultado sin decimales si son .00
                    const formattedResult = data.result % 1 === 0 ? data.result.toString() : data.result.toFixed(2);
                    document.getElementById('resultValue').textContent = formattedResult;
                    document.getElementById('resultValue').dataset.value = data.result;
                    document.getElementById('resultExplanation').textContent = data.explanation;
                    document.getElementById('result').classList.add('show');
                } else {
                    alert('Error: ' + data.error);
                }
            } catch (error) {
                alert('Error al calcular: ' + error.message);
            }
        }

        async function copyResult() {
            const resultValue = document.getElementById('resultValue').dataset.value;
            const copyBtn = document.getElementById('copyBtn');
            
            try {
                await navigator.clipboard.writeText(resultValue);
                copyBtn.textContent = '¡Copiado!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.textContent = 'Copiar resultado';
                    copyBtn.classList.remove('copied');
                }, 1000);
            } catch (error) {
                alert('Error al copiar: ' + error.message);
            }
        }

        function clearInputs() {
            document.getElementById('percentage').value = '';
            document.getElementById('value').value = '';
            document.getElementById('result').classList.remove('show');
            document.getElementById('percentage').focus();
        }

        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    calculate();
                }
            });
        });
    </script>
</body>
</html>`;
}
