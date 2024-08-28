// Função para gerar o número de protocolo
function gerarNumeroProtocolo() {
    // Obter o ano atual
    const anoAtual = new Date().getFullYear();

    // Obter o último ano e número de protocolo do localStorage
    let ultimoAno = localStorage.getItem('ultimoAnoProtocolo') || anoAtual;
    let ultimoProtocolo = localStorage.getItem('ultimoProtocolo') || 0;

    // Verificar se o ano atual é diferente do último ano salvo
    if (anoAtual !== parseInt(ultimoAno)) {
        // Se o ano mudou, reinicia o contador de protocolos
        ultimoProtocolo = 0;
    }

    // Incrementa o número de protocolo
    let novoProtocolo = parseInt(ultimoProtocolo) + 1;

    // Formatar o número de protocolo com o ano
    let numeroProtocoloFormatado = `${novoProtocolo}/${String(anoAtual).padStart(3, '0')}`;

    // Atualiza o campo de número de protocolo no formulário
    document.getElementById('numeroProtocolo').value = numeroProtocoloFormatado;

    // Salvar o novo número de protocolo e ano no localStorage
    localStorage.setItem('ultimoProtocolo', novoProtocolo);
    localStorage.setItem('ultimoAnoProtocolo', anoAtual);
}

// Função para salvar o documento
function salvarDocumento(documento) {
    let documentos = JSON.parse(localStorage.getItem('documentos')) || [];
    documentos.push(documento);
    localStorage.setItem('documentos', JSON.stringify(documentos));
    document.getElementById('form-protocolo').reset();
    alert('Documento cadastrado com sucesso!');

    // Gerar novo número de protocolo para a próxima submissão
    gerarNumeroProtocolo();
}

// Função para aplicar letras maiúsculas automaticamente
function aplicarMaiusculas() {
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => {
        input.addEventListener('input', converterParaMaiusculas);
    });
}

// Função auxiliar para converter texto para maiúsculas
function converterParaMaiusculas(event) {
    event.target.value = event.target.value.toUpperCase();
}

// Evento de submissão do formulário
document.getElementById('form-protocolo').addEventListener('submit', function (e) {
    e.preventDefault();

    const numeroProtocolo = document.getElementById('numeroProtocolo').value;
    const tipoDocumento = document.getElementById('tipoDocumento').value;
    const descricao = document.getElementById('descricao').value;
    const setorOrigem = document.getElementById('setorOrigem').value;
    const setorDestino = document.getElementById('setorDestino').value;

    const arquivoInput = document.getElementById('arquivoDocumento');
    const arquivo = arquivoInput.files[0];

    const documento = {
        numeroProtocolo,
        tipoDocumento,
        descricao,
        setorOrigem,
        setorDestino,
        status: 'Pendente'
    };

    if (arquivo) {
        const reader = new FileReader();
        reader.onloadend = function () {
            documento.arquivo = reader.result;
            salvarDocumento(documento);
        };
        reader.readAsDataURL(arquivo);
    } else {
        salvarDocumento(documento);
    }
});

// Chamar as funções ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    gerarNumeroProtocolo(); // Gerar o número de protocolo ao carregar a página
    aplicarMaiusculas(); // Aplicar letras maiúsculas aos inputs
});

document.getElementById('logout').addEventListener('click', function () {
    window.location.href = 'login.html'; // Redireciona para a página de login
});
