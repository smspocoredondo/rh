document.getElementById('form-protocolo').addEventListener('submit', function (e) {
    e.preventDefault();

    // Coleta os dados do formulário
    const numeroProtocolo = document.getElementById('numeroProtocolo').value;
    const tipoDocumento = document.getElementById('tipoDocumento').value;
    const descricao = document.getElementById('descricao').value;
    const setorOrigem = document.getElementById('setorOrigem').value;
    const setorDestino = document.getElementById('setorDestino').value;

    // Coleta o arquivo
    const arquivoInput = document.getElementById('arquivoDocumento');
    const arquivo = arquivoInput.files[0];

    // Verifica se um arquivo foi selecionado
    if (!arquivo) {
        alert('Por favor, anexe um documento.');
        return;
    }

    // Converte o arquivo em base64
    const reader = new FileReader();
    reader.onloadend = function () {
        const base64Arquivo = reader.result;

        // Cria um objeto para o documento
        const documento = {
            numeroProtocolo,
            tipoDocumento,
            descricao,
            setorOrigem,
            setorDestino,
            arquivo: base64Arquivo, // Armazena o arquivo em base64
            status: 'Pendente' // Status inicial
        };

        // Obtém documentos do Local Storage
        let documentos = JSON.parse(localStorage.getItem('documentos')) || [];

        // Adiciona o novo documento à lista
        documentos.push(documento);

        // Salva a lista atualizada no Local Storage
        localStorage.setItem('documentos', JSON.stringify(documentos));

        // Limpa o formulário após a submissão
        document.getElementById('form-protocolo').reset();

        alert('Documento cadastrado com sucesso!');
    };

    // Lê o arquivo como base64
    reader.readAsDataURL(arquivo);
});

// Função para converter o texto de um campo de input para maiúsculas
function converterParaMaiusculas(event) {
    event.target.value = event.target.value.toUpperCase();
}

// Aplica a função de conversão a todos os inputs e textareas
function aplicarMaiusculas() {
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => {
        input.addEventListener('input', converterParaMaiusculas);
    });
}

// Aplica a função ao carregar a página
document.addEventListener('DOMContentLoaded', aplicarMaiusculas);
