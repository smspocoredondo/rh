// concluidos.js

// Função para carregar documentos concluídos da Local Storage e exibi-los na tabela
function carregarDocumentosConcluidos() {
    let documentos = JSON.parse(localStorage.getItem('documentos')) || [];
    const tabela = document.getElementById('tabelaDocumentosConcluidos').getElementsByTagName('tbody')[0];
    tabela.innerHTML = ''; // Limpa a tabela antes de adicionar

    documentos.forEach(doc => {
        if (doc.status === 'Concluído') {
            const novaLinha = tabela.insertRow();

            const celulaNumero = novaLinha.insertCell(0);
            const celulaTipo = novaLinha.insertCell(1);
            const celulaDescricao = novaLinha.insertCell(2);
            const celulaOrigem = novaLinha.insertCell(3);
            const celulaDestino = novaLinha.insertCell(4);
            const celulaStatus = novaLinha.insertCell(5);

            celulaNumero.textContent = doc.numeroProtocolo;
            celulaTipo.textContent = doc.tipoDocumento;
            celulaDescricao.textContent = doc.descricao;
            celulaOrigem.textContent = doc.setorOrigem;
            celulaDestino.textContent = doc.setorDestino;
            celulaStatus.textContent = doc.status;
        }
    });
}

// Carrega os documentos concluídos ao abrir a página
document.addEventListener('DOMContentLoaded', carregarDocumentosConcluidos);
