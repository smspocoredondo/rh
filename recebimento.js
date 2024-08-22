// recebimento.js

// Função para carregar documentos da Local Storage e exibi-los na tabela
function carregarDocumentos() {
    let documentos = JSON.parse(localStorage.getItem('documentos')) || [];
    const tabela = document.getElementById('tabelaDocumentos').getElementsByTagName('tbody')[0];
    tabela.innerHTML = ''; // Limpa a tabela antes de adicionar

    documentos.forEach((doc, index) => {
        const novaLinha = tabela.insertRow();

        const celulaNumero = novaLinha.insertCell(0);
        const celulaTipo = novaLinha.insertCell(1);
        const celulaDescricao = novaLinha.insertCell(2);
        const celulaOrigem = novaLinha.insertCell(3);
        const celulaDestino = novaLinha.insertCell(4);
        const celulaStatus = novaLinha.insertCell(5);
        const celulaAcoes = novaLinha.insertCell(6);

        celulaNumero.textContent = doc.numeroProtocolo;
        celulaTipo.textContent = doc.tipoDocumento;
        celulaDescricao.textContent = doc.descricao;
        celulaOrigem.textContent = doc.setorOrigem;
        celulaDestino.textContent = doc.setorDestino;
        celulaStatus.textContent = doc.status;

        // Botões de Ação
        const btnRecebido = document.createElement('button');
        btnRecebido.textContent = 'Receber';
        btnRecebido.className = 'acao recebido';
        btnRecebido.disabled = doc.status !== 'Pendente'; // Desativa se já recebido/concluído
        btnRecebido.addEventListener('click', function () {
            doc.status = 'Recebido';
            salvarDocumentos(documentos);
            carregarDocumentos(); // Recarrega a tabela para atualizar status
        });

        const btnConcluir = document.createElement('button');
        btnConcluir.textContent = 'Concluir';
        btnConcluir.className = 'acao concluir';
        btnConcluir.disabled = doc.status === 'Concluído'; // Desativa se já concluído
        btnConcluir.addEventListener('click', function () {
            doc.status = 'Concluído';
            salvarDocumentos(documentos);
            carregarDocumentos(); // Recarrega a tabela para atualizar status
        });

        celulaAcoes.appendChild(btnRecebido);
        celulaAcoes.appendChild(btnConcluir);
    });
}

// Função para salvar documentos na Local Storage
function salvarDocumentos(documentos) {
    localStorage.setItem('documentos', JSON.stringify(documentos));
}

// Carrega os documentos ao abrir a página
document.addEventListener('DOMContentLoaded', carregarDocumentos);
