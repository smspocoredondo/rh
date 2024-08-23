// Função para carregar documentos concluídos da Local Storage e exibi-los na tabela
function carregarDocumentosConcluidos() {
    let documentosConcluidos = JSON.parse(localStorage.getItem('documentosConcluidos')) || [];
    const tabelaConcluidos = document.getElementById('tabelaConcluidos').getElementsByTagName('tbody')[0];
    tabelaConcluidos.innerHTML = ''; // Limpa a tabela antes de adicionar

    documentosConcluidos.forEach(doc => {
        const novaLinha = tabelaConcluidos.insertRow();

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
    });
}

// Função para limpar a tabela de documentos concluídos
function limparTabelaConcluidos() {
    localStorage.removeItem('documentosConcluidos');
    carregarDocumentosConcluidos(); // Atualiza a tabela para refletir a limpeza
}

// Evento para o link de limpar a tabela de concluídos
document.getElementById('limparConcluidos').addEventListener('click', function (e) {
    e.preventDefault(); // Previne o comportamento padrão do link
    limparTabelaConcluidos();
});

// Carrega os documentos concluídos ao abrir a página
document.addEventListener('DOMContentLoaded', carregarDocumentosConcluidos);

// Função para imprimir uma tabela específica
function imprimirTabela(tabelaId) {
    const tabela = document.getElementById(tabelaId).outerHTML;
    const novaJanela = window.open('', '', 'height=600,width=800');
    novaJanela.document.write('<html><head><title>Imprimir Tabela</title>');
    novaJanela.document.write('<style>body{font-family: Arial, sans-serif;} table{width: 100%; border-collapse: collapse;} table, th, td{border: 1px solid black; padding: 8px; text-align: left; font-size: 12px;} th{background-color: #f2f2f2;}</style>');
    novaJanela.document.write('</head><body>');

    // Adicionando uma imagem no topo da tabela
    novaJanela.document.write('<div style="text-align: left; margin-bottom: 20px;"><img src="logo_poco.png" alt="Logo" style="max-width: 160px;"></div>');

    novaJanela.document.write(tabela);
    novaJanela.document.write('</body></html>');
    novaJanela.document.close();
    novaJanela.print();
}

// Evento para o link de imprimir a tabela de concluídos
document.getElementById('imprimirConcluidos').addEventListener('click', function (e) {
    e.preventDefault(); // Previne o comportamento padrão do link
    imprimirTabela('tabelaConcluidos');
});

// Evento para o link de imprimir a tabela de recebimento
document.getElementById('imprimirRecebimento').addEventListener('click', function (e) {
    e.preventDefault(); // Previne o comportamento padrão do link
    imprimirTabela('tabelaDocumentos');
});
