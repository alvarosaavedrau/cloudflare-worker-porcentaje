/**
 * Template HTML para la calculadora de porcentajes
 */
export function getHTML() {
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
            max-width: 500px;
            width: 100%;
        }
        h1 {
            color: #fff;
            margin-bottom: 30px;
            font-size: 24px;
            text-align: center;
            font-weight: 400;
        }
        .tabs {
            display: flex;
            gap: 8px;
            margin-bottom: 25px;
            border-bottom: 1px solid #444;
        }
        .tab {
            flex: 1;
            padding: 10px;
            background: transparent;
            color: #999;
            border: none;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 14px;
        }
        .tab:hover {
            color: #ccc;
        }
        .tab.active {
            color: #fff;
            border-bottom-color: #fff;
        }
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }
        .input-group {
            display: flex;
            gap: 12px;
            align-items: center;
            margin-bottom: 20px;
            justify-content: center;
        }
        .input-group-vertical {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 20px;
        }
        .input-row {
            display: flex;
            gap: 12px;
            align-items: center;
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
        input[type="number"].wide {
            width: 150px;
        }
        input[type="number"]:focus {
            outline: none;
            border-color: #666;
        }
        .label {
            font-size: 16px;
            color: #999;
        }
        .label-fixed {
            min-width: 100px;
            text-align: left;
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
        .radio-group {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-bottom: 20px;
        }
        .radio-option {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #999;
            cursor: pointer;
        }
        .radio-option input[type="radio"] {
            width: auto;
            cursor: pointer;
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
            line-height: 1.5;
        }
        .result-details {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #333;
            color: #888;
            font-size: 13px;
        }
        .result-detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
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
    </style>
</head>
<body>
    <div class="container">
        <h1>Calculadora de Porcentajes</h1>
        
        <div class="tabs">
            <button class="tab active" onclick="switchTab('percentage')">Porcentaje</button>
            <button class="tab" onclick="switchTab('discount')">Descuento</button>
            <button class="tab" onclick="switchTab('vat')">IVA</button>
        </div>

        <!-- Tab Porcentaje -->
        <div id="tab-percentage" class="tab-content active">
            <div class="input-group">
                <input type="number" id="percentage" placeholder="%">
                <span class="label">% de</span>
                <input type="number" id="value" placeholder="Valor">
            </div>
            <div class="button-group">
                <button onclick="calculatePercentage()">Calcular</button>
                <button class="clear-btn" onclick="clearPercentage()">Limpiar</button>
            </div>
        </div>

        <!-- Tab Descuento -->
        <div id="tab-discount" class="tab-content">
            <div class="input-group-vertical">
                <div class="input-row">
                    <span class="label label-fixed">Precio original:</span>
                    <input type="number" id="originalPrice" class="wide" placeholder="Precio">
                </div>
                <div class="input-row">
                    <span class="label label-fixed">Descuento:</span>
                    <input type="number" id="discount" class="wide" placeholder="%">
                    <span class="label">%</span>
                </div>
            </div>
            <div class="button-group">
                <button onclick="calculateDiscount()">Calcular</button>
                <button class="clear-btn" onclick="clearDiscount()">Limpiar</button>
            </div>
        </div>

        <!-- Tab IVA -->
        <div id="tab-vat" class="tab-content">
            <div class="radio-group">
                <label class="radio-option">
                    <input type="radio" name="vatOperation" value="add" checked>
                    <span>Añadir IVA</span>
                </label>
                <label class="radio-option">
                    <input type="radio" name="vatOperation" value="remove">
                    <span>Quitar IVA</span>
                </label>
            </div>
            <div class="input-group-vertical">
                <div class="input-row">
                    <span class="label label-fixed">Precio:</span>
                    <input type="number" id="vatPrice" class="wide" placeholder="Precio">
                </div>
                <div class="input-row">
                    <span class="label label-fixed">IVA:</span>
                    <input type="number" id="vatPercentage" class="wide" placeholder="%" value="21">
                    <span class="label">%</span>
                </div>
            </div>
            <div class="button-group">
                <button onclick="calculateVAT()">Calcular</button>
                <button class="clear-btn" onclick="clearVAT()">Limpiar</button>
            </div>
        </div>

        <div class="result" id="result">
            <div class="result-value" id="resultValue"></div>
            <div class="result-explanation" id="resultExplanation"></div>
            <div class="result-details" id="resultDetails"></div>
            <button class="copy-btn" id="copyBtn" onclick="copyResult()">Copiar resultado</button>
        </div>
    </div>

    <script>
        let currentTab = 'percentage';
        let currentResult = null;

        function switchTab(tab) {
            // Update tabs
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            
            event.target.classList.add('active');
            document.getElementById('tab-' + tab).classList.add('active');
            
            currentTab = tab;
            
            // Hide result when switching tabs
            document.getElementById('result').classList.remove('show');
        }

        async function calculatePercentage() {
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
                    currentResult = data.result;
                    const formattedResult = data.result % 1 === 0 ? data.result.toString() : data.result.toFixed(2);
                    document.getElementById('resultValue').textContent = formattedResult;
                    document.getElementById('resultExplanation').textContent = data.explanation;
                    document.getElementById('resultDetails').innerHTML = '';
                    document.getElementById('result').classList.add('show');
                } else {
                    alert('Error: ' + data.error);
                }
            } catch (error) {
                alert('Error al calcular: ' + error.message);
            }
        }

        async function calculateDiscount() {
            const originalPrice = document.getElementById('originalPrice').value;
            const discount = document.getElementById('discount').value;
            
            const params = new URLSearchParams({
                originalPrice: originalPrice,
                discount: discount
            });

            try {
                const response = await fetch('/api/discount?' + params.toString());
                const data = await response.json();

                if (data.success) {
                    currentResult = data.finalPrice;
                    const formattedResult = data.finalPrice.toFixed(2);
                    document.getElementById('resultValue').textContent = formattedResult;
                    document.getElementById('resultExplanation').textContent = '';
                    
                    const details = \`
                        <div class="result-detail-row">
                            <span>Precio original:</span>
                            <span>\${data.originalPrice.toFixed(2)}</span>
                        </div>
                        <div class="result-detail-row">
                            <span>Descuento (\${data.discount}%):</span>
                            <span>-\${data.discountAmount.toFixed(2)}</span>
                        </div>
                        <div class="result-detail-row">
                            <strong>Precio final:</strong>
                            <strong>\${data.finalPrice.toFixed(2)}</strong>
                        </div>
                    \`;
                    document.getElementById('resultDetails').innerHTML = details;
                    document.getElementById('result').classList.add('show');
                } else {
                    alert('Error: ' + data.error);
                }
            } catch (error) {
                alert('Error al calcular: ' + error.message);
            }
        }

        async function calculateVAT() {
            const price = document.getElementById('vatPrice').value;
            const vat = document.getElementById('vatPercentage').value;
            const operation = document.querySelector('input[name="vatOperation"]:checked').value;
            
            const params = new URLSearchParams({
                price: price,
                vat: vat,
                operation: operation
            });

            try {
                const response = await fetch('/api/vat?' + params.toString());
                const data = await response.json();

                if (data.success) {
                    currentResult = data.result;
                    const formattedResult = data.result.toFixed(2);
                    document.getElementById('resultValue').textContent = formattedResult;
                    document.getElementById('resultExplanation').textContent = '';
                    
                    let details = '';
                    if (operation === 'add') {
                        details = \`
                            <div class="result-detail-row">
                                <span>Precio base:</span>
                                <span>\${data.price.toFixed(2)}</span>
                            </div>
                            <div class="result-detail-row">
                                <span>IVA (\${data.vat}%):</span>
                                <span>+\${data.vatAmount.toFixed(2)}</span>
                            </div>
                            <div class="result-detail-row">
                                <strong>Precio con IVA:</strong>
                                <strong>\${data.result.toFixed(2)}</strong>
                            </div>
                        \`;
                    } else {
                        details = \`
                            <div class="result-detail-row">
                                <span>Precio con IVA:</span>
                                <span>\${data.price.toFixed(2)}</span>
                            </div>
                            <div class="result-detail-row">
                                <span>IVA (\${data.vat}%):</span>
                                <span>-\${data.vatAmount.toFixed(2)}</span>
                            </div>
                            <div class="result-detail-row">
                                <strong>Precio base:</strong>
                                <strong>\${data.result.toFixed(2)}</strong>
                            </div>
                        \`;
                    }
                    document.getElementById('resultDetails').innerHTML = details;
                    document.getElementById('result').classList.add('show');
                } else {
                    alert('Error: ' + data.error);
                }
            } catch (error) {
                alert('Error al calcular: ' + error.message);
            }
        }

        async function copyResult() {
            const copyBtn = document.getElementById('copyBtn');
            
            try {
                await navigator.clipboard.writeText(currentResult.toString());
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

        function clearPercentage() {
            document.getElementById('percentage').value = '';
            document.getElementById('value').value = '';
            document.getElementById('result').classList.remove('show');
            document.getElementById('percentage').focus();
        }

        function clearDiscount() {
            document.getElementById('originalPrice').value = '';
            document.getElementById('discount').value = '';
            document.getElementById('result').classList.remove('show');
            document.getElementById('originalPrice').focus();
        }

        function clearVAT() {
            document.getElementById('vatPrice').value = '';
            document.getElementById('vatPercentage').value = '21';
            document.getElementById('result').classList.remove('show');
            document.getElementById('vatPrice').focus();
        }

        // Add Enter key support for all inputs
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    if (currentTab === 'percentage') calculatePercentage();
                    else if (currentTab === 'discount') calculateDiscount();
                    else if (currentTab === 'vat') calculateVAT();
                }
            });
        });
    </script>
</body>
</html>`;
}
