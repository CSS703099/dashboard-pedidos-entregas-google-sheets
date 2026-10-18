/** @OnlyCurrentDoc */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Qualidade dos dados")
    .addItem("Verificar pedidos", "verificarPedidos")
    .addToUi();
}

function verificarPedidos() {
  const arquivo = SpreadsheetApp.getActiveSpreadsheet();
  const pedidos = arquivo.getSheetByName("Pedidos");
  const qualidade = arquivo.getSheetByName("Qualidade");

  if (!pedidos || !qualidade) {
    throw new Error("Confira se existem as abas Pedidos e Qualidade.");
  }

  const dados = pedidos.getRange("A2:H1000").getValues();
  const agora = new Date();
  const problemas = [];
  const codigos = new Map();
  let quantidade = 0;

  const vazio = valor => String(valor).trim() === "";
  const dataValida = valor =>
    valor instanceof Date && !isNaN(valor.getTime());

  dados.forEach((linha, indice) => {
    if (linha.every(vazio)) return;

    quantidade++;
    const numeroLinha = indice + 2;
    const [pedido, dataPedido, cliente, regiao,
      valor, prevista, entrega, status] = linha;

    const registrar = (tipo, detalhe) => {
      problemas.push([
        agora, numeroLinha, pedido, tipo, detalhe
      ]);
    };

    const obrigatorios = [
      [pedido, "Pedido"],
      [dataPedido, "Data_Pedido"],
      [cliente, "Cliente"],
      [regiao, "Regiao"],
      [valor, "Valor_Pedido"],
      [prevista, "Data_Prevista"],
      [status, "Status"]
    ];

    obrigatorios.forEach(([conteudo, campo]) => {
      if (vazio(conteudo)) {
        registrar("Campo vazio", campo + " não foi preenchido.");
      }
    });

    if (!vazio(pedido)) {
      const codigo = String(pedido).trim();
      if (codigos.has(codigo)) {
        registrar(
          "Pedido duplicado",
          "Código também encontrado na linha " + codigos.get(codigo)
        );
      } else {
        codigos.set(codigo, numeroLinha);
      }
    }

    if (!vazio(valor) &&
        (typeof valor !== "number" || !Number.isFinite(valor) || valor <= 0)) {
      registrar("Valor inválido", "O valor deve ser um número maior que zero.");
    }

    const datas = [
      [dataPedido, "Data_Pedido"],
      [prevista, "Data_Prevista"],
      [entrega, "Data_Entrega"]
    ];

    datas.forEach(([conteudo, campo]) => {
      if (!vazio(conteudo) && !dataValida(conteudo)) {
        registrar("Data inválida", campo + " não contém uma data válida.");
      }
    });

    if (dataValida(dataPedido) && dataValida(prevista) &&
        prevista < dataPedido) {
      registrar("Datas inconsistentes", "Previsão anterior ao pedido.");
    }

    if (dataValida(dataPedido) && dataValida(entrega) &&
        entrega < dataPedido) {
      registrar("Datas inconsistentes", "Entrega anterior ao pedido.");
    }

    const permitidos = [
      "Entregue", "Em transporte", "Em preparação", "Cancelado"
    ];

    if (!vazio(status) && !permitidos.includes(status)) {
      registrar("Status inválido", "Status fora da lista permitida.");
    }

    if (status === "Entregue" && vazio(entrega)) {
      registrar("Entrega sem data", "Pedido entregue sem Data_Entrega.");
    }

    if (permitidos.includes(status) &&
        status !== "Entregue" && !vazio(entrega)) {
      registrar("Status inconsistente", "Existe Data_Entrega para pedido não entregue.");
    }
  });

  // Substitui o relatório anterior, preservando sua formatação.
  const linhasAnteriores = qualidade.getLastRow();
  if (linhasAnteriores > 1) {
    qualidade.getRange(2, 1, linhasAnteriores - 1, 5).clearContent();
  }

  let resultado = problemas;

  if (quantidade === 0) {
    resultado = [[agora, "", "", "Base vazia", "Nenhum pedido encontrado."]];
  } else if (problemas.length === 0) {
    resultado = [[
      agora, "", "", "Conferência concluída",
      quantidade + " pedidos verificados. Nenhum problema nas regras aplicadas."
    ]];
  }

  const linhasNecessarias = resultado.length + 1;
  if (qualidade.getMaxRows() < linhasNecessarias) {
    qualidade.insertRowsAfter(
      qualidade.getMaxRows(),
      linhasNecessarias - qualidade.getMaxRows()
    );
  }

  qualidade.getRange(2, 1, resultado.length, 5).setValues(resultado);
  qualidade.getRange(2, 1, resultado.length, 1)
    .setNumberFormat("dd/MM/yyyy HH:mm:ss");

  qualidade.setFrozenRows(1);
  arquivo.setActiveSheet(qualidade);
}
