// envio.js

document.getElementById('form-protocolo').addEventListener('submit', function (e) {
    e.preventDefault();

    // Coleta os dados do formulário
    const numeroProtocolo = document.getElementById('numeroProtocolo').value;
    const tipoDocumento = document.getElementById('tipoDocumento').value;
    const descricao = document.getElementById('descricao').value;
    const setorOrigem = document.getElementById('setorOrigem').value;
    const setorDestino = document.getElementById('setorDestino').value;

    // Cria um objeto para o documento
    const documento = {
        numeroProtocolo,
        tipoDocumento,
        descricao,
        setorOrigem,
        setorDestino,
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
});
