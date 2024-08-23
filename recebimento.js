// Função para carregar documentos da Local Storage e exibi-los na tabela de recebimento
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
        const celulaArquivo = novaLinha.insertCell(6);
        const celulaAcoes = novaLinha.insertCell(7);

        celulaNumero.textContent = doc.numeroProtocolo;
        celulaTipo.textContent = doc.tipoDocumento;
        celulaDescricao.textContent = doc.descricao;
        celulaOrigem.textContent = doc.setorOrigem;
        celulaDestino.textContent = doc.setorDestino;
        celulaStatus.textContent = doc.status;

        // Link para download do arquivo
        if (doc.arquivo) {
            const linkDownload = document.createElement('a');
            linkDownload.href = doc.arquivo;
            linkDownload.download = `documento_${doc.numeroProtocolo}.pdf`; // Nome sugerido para o arquivo
            linkDownload.textContent = 'Baixar Documento';
            celulaArquivo.appendChild(linkDownload);
        } else {
            celulaArquivo.textContent = 'Nenhum arquivo anexado';
        }

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
            // Remove o documento da lista de recebimento
            documentos.splice(index, 1);

            // Adiciona o documento à lista de concluídos
            let documentosConcluidos = JSON.parse(localStorage.getItem('documentosConcluidos')) || [];
            doc.status = 'Concluído';
            documentosConcluidos.push(doc);

            // Salva as listas atualizadas
            salvarDocumentos(documentos);
            salvarDocumentosConcluidos(documentosConcluidos);

            // Recarrega a tabela para atualizar a lista
            carregarDocumentos();
        });

        celulaAcoes.appendChild(btnRecebido);
        celulaAcoes.appendChild(btnConcluir);
    });
}

// Função para salvar documentos na Local Storage
function salvarDocumentos(documentos) {
    localStorage.setItem('documentos', JSON.stringify(documentos));
}

// Função para salvar documentos concluídos na Local Storage
function salvarDocumentosConcluidos(documentosConcluidos) {
    localStorage.setItem('documentosConcluidos', JSON.stringify(documentosConcluidos));
}

// Função para limpar a tabela de recebimento e a lista de documentos
function limparTabelaRecebimento() {
    localStorage.removeItem('documentos');
    carregarDocumentos(); // Atualiza a tabela para refletir a limpeza
}

// Evento para o link de limpar a tabela de recebimento
document.getElementById('limparDocumentos').addEventListener('click', function (e) {
    e.preventDefault(); // Previne o comportamento padrão do link
    limparTabelaRecebimento();
});

// Carrega os documentos ao abrir a página
document.addEventListener('DOMContentLoaded', carregarDocumentos);

// Função para imprimir uma tabela específica
function imprimirTabela(tabelaId) {
    const tabela = document.getElementById(tabelaId).outerHTML;
    const novaJanela = window.open('', '', 'height=600,width=800');
    novaJanela.document.write('<html><head><title>Imprimir Tabela</title>');
    novaJanela.document.write('<style>body{font-family: Arial, sans-serif;} table{width: 100%; border-collapse: collapse;} table, th, td{border: 1px solid black; padding: 8px; text-align: left;} th{background-color: #f2f2f2;}</style>');
    novaJanela.document.write('</head><body>');

    // Adicionando uma imagem no topo da tabela
    novaJanela.document.write('<div style="text-align: left; margin-bottom: 20px;"><img src="logo_poco.png" alt="Logo" style="max-width: 160px;"></div>');

    novaJanela.document.write(tabela);
    novaJanela.document.write('</body></html>');
    novaJanela.document.close();
    novaJanela.print();
}

// Evento para o link de imprimir a tabela de recebimento
document.getElementById('imprimirRecebimento').addEventListener('click', function (e) {
    e.preventDefault(); // Previne o comportamento padrão do link
    imprimirTabela('tabelaDocumentos');
});

// Evento para o link de imprimir a tabela de concluídos
document.getElementById('imprimirConcluidos').addEventListener('click', function (e) {
    e.preventDefault(); // Previne o comportamento padrão do link
    imprimirTabela('tabelaDocumentosConcluidos');
});
