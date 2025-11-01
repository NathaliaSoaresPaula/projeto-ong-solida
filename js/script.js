// js/script.js - Funcionalidades Interativas e Máscaras de Input

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================================
    // 1. LÓGICA DO MENU HAMBÚRGUER (FECHAMENTO AO CLICAR)
    // ========================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.menu-nav a');

    if (menuToggle && navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Fechar o menu após o clique (apenas no mobile)
                if (window.innerWidth < 768) {
                    menuToggle.checked = false;
                }
            });
        });
    }

    // ========================================================
    // 2. MÁSCARAS DE INPUT
    // ========================================================
    
    function applyMask(input, mask) {
        if (!input) return;

        input.addEventListener('input', function(e) {
            // Remove todos os caracteres não numéricos
            let value = e.target.value.replace(/\D/g, ''); 

            let maskedValue = '';
            let valueIndex = 0;

            for (let i = 0; i < mask.length; i++) {
                if (valueIndex >= value.length) break;

                const maskChar = mask[i];
                if (maskChar === '#') {
                    maskedValue += value[valueIndex];
                    valueIndex++;
                } else {
                    maskedValue += maskChar;
                    // Se o caractere de máscara foi adicionado (como o '.'), pula a verificação do valor
                    if (valueIndex < value.length && mask[i + 1] !== '#') {
                         if (mask[i+1] === value[valueIndex]) valueIndex++; // Avança se o usuário digitou o caractere de máscara
                    }
                }
            }
            e.target.value = maskedValue;
        });
    }

    // Identificadores dos campos
    const inputCPF = document.getElementById('cpf');
    const inputTelefone = document.getElementById('telefone');
    const inputCEP = document.getElementById('cep');

    if (inputCPF) {
        applyMask(inputCPF, '###.###.###-##');
    }
    if (inputTelefone) {
        // Máscara para celular com 9 dígitos
        applyMask(inputTelefone, '(##) #####-####');
    }
    if (inputCEP) {
        applyMask(inputCEP, '#####-###');
    }

    // ========================================================
    // 3. SIMULAÇÃO DE MÉTRICAS (DASHBOARD)
    // ========================================================
    const doacaoMeta = 50000;
    const doacaoAtual = 35420;

    const progressoElement = document.getElementById('progresso-doacao');
    if (progressoElement) {
        const percentual = Math.round((doacaoAtual / doacaoMeta) * 100);
        progressoElement.textContent = `Meta: R$ ${doacaoMeta.toLocaleString('pt-BR')}. Progresso: ${percentual}% (R$ ${doacaoAtual.toLocaleString('pt-BR')} arrecadados)`;
    }

});