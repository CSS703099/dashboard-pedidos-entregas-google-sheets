/** @OnlyCurrentDoc */

// Cria o menu ao abrir a planilha.
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Qualidade dos dados")
    .addItem("Verificar pedidos", "verificarPedidos")
    .addToUi();
}

// Executa a conferência da base completa, sem filtros.
function verificarPedidos() {
  const arquivo = SpreadsheetApp.getActiveSpreadsheet();
  const pedidos = arquivo.getSheetByName("Pedidos");
  const custos = arquivo.getSheetByName("Custos");
  const qualidade = arquivo.getSheetByName("Qualidade");

  if (!pedidos || !custos || !qualidade) {
    throw new Error(
      "Confira se existem as abas Pedidos, Custos e Qualidade."
    );
  }

  SpreadsheetApp.flush();

  // A linha 1 contém os cabeçalhos.
  const ultimaLinhaPedidos = Math.min(1000, pedidos.getMaxRows());
  const ultimaLinhaCustos = Math.min(1000, custos.getMaxRows());

  const dados = ultimaLinhaPedidos > 1
    ? pedidos.getRange(2, 1, ultimaLinhaPedidos - 1, 8).getValues()
    : [];

  const dadosCustos = ultimaLinhaCustos > 1
    ? custos.getRange(2, 1, ultimaLinhaCustos - 1, 3).getValues()
    : [];

  const agora = new Date();
  const problemas = [];
  const codigos = new Map();

  const permitidos = [
    "Entregue",
    "Em transporte",
    "Em preparação",
    "Cancelado"
  ];

  let quantidade = 0;

  dados.forEach((linha, indice) => {
    if (linha.every(estaVazio)) return;

    quantidade++;
    const numeroLinha = indice + 2;

    const [
      pedido,
      dataPedido,
      cliente,
      regiao,
      valor,
      prevista,
      entrega,
      status
    ] = linha;

    const registrar = (tipo, detalhe) => {
      problemas.push([
        agora,
        numeroLinha,
        pedido,
        tipo,
        detalhe
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
      if (estaVazio(conteudo)) {
        registrar(
          "Campo vazio",
          campo + " não foi preenchido."
        );
      }
    });

    if (!estaVazio(pedido)) {
      const codigo = String(pedido).trim();

      if (codigos.has(codigo)) {
        registrar(
          "Pedido duplicado",
          "Código também encontrado na linha " +
            codigos.get(codigo) + " da aba Pedidos."
        );
      } else {
        codigos.set(codigo, numeroLinha);
      }
    }

    if (!estaVazio(valor) &&
        (!numeroValido(valor) || valor <= 0)) {
      registrar(
        "Valor inválido",
        "Valor_Pedido deve ser um número maior que zero."
      );
    }

    const datas = [
      [dataPedido, "Data_Pedido"],
      [prevista, "Data_Prevista"],
      [entrega, "Data_Entrega"]
    ];

    datas.forEach(([conteudo, campo]) => {
      if (!estaVazio(conteudo) && !dataValida(conteudo)) {
        registrar(
          "Data inválida",
          campo + " não contém uma data válida."
        );
      }
    });

    if (dataValida(dataPedido) &&
        dataValida(prevista) &&
        prevista < dataPedido) {
      registrar(
        "Datas inconsistentes",
        "Data_Prevista anterior à Data_Pedido."
      );
    }

    if (dataValida(dataPedido) &&
        dataValida(entrega) &&
        entrega < dataPedido) {
      registrar(
        "Datas inconsistentes",
        "Data_Entrega anterior à Data_Pedido."
      );
    }

    if (!estaVazio(status) && !permitidos.includes(status)) {
      registrar(
        "Status inválido",
        "Use Entregue, Em transporte, Em preparação ou Cancelado."
      );
    }

    if (status === "Entregue" && estaVazio(entrega)) {
      registrar(
        "Entrega sem data",
        "Pedido entregue sem Data_Entrega."
      );
    }

    if (permitidos.includes(status) &&
        status !== "Entregue" &&
        !estaVazio(entrega)) {
      registrar(
        "Status inconsistente",
        "Existe Data_Entrega para um pedido não entregue."
      );
    }
  });

  // Inclui as ocorrências do cadastro de custos.
  problemas.push(
    ...conferirCustos(dadosCustos, dados, agora)
  );

  // Mantém eventuais problemas de custos mesmo se a base estiver vazia.
  if (quantidade === 0) {
    problemas.unshift([
      agora,
      "",
      "",
      "Base vazia",
      "Nenhum pedido encontrado na base consultada."
    ]);
  }

  const resultado = problemas.length > 0
    ? problemas
    : [[
        agora,
        "",
        "",
        "Conferência concluída",
        quantidade +
          " pedidos verificados. Nenhum problema nas regras aplicadas."
      ]];

  // Garante espaço suficiente para o novo relatório.
  const linhasNecessarias = resultado.length + 1;

  if (qualidade.getMaxRows() < linhasNecessarias) {
    qualidade.insertRowsAfter(
      qualidade.getMaxRows(),
      linhasNecessarias - qualidade.getMaxRows()
    );
  }

  // Substitui somente o relatório da aba Qualidade.
  const linhasAnteriores = qualidade.getLastRow();

  if (linhasAnteriores > 1) {
    qualidade
      .getRange(2, 1, linhasAnteriores - 1, 5)
      .clearContent();
  }

  qualidade.getRange("A1:E1").setValues([[
    "Data da verificação",
    "Linha em Pedidos",
    "Pedido",
    "Verificação",
    "Detalhe"
  ]]);

  qualidade
    .getRange(2, 1, resultado.length, 5)
    .setValues(resultado);

  qualidade
    .getRange(2, 1, resultado.length, 1)
    .setNumberFormat("dd/MM/yyyy HH:mm:ss");

  qualidade.setFrozenRows(1);
  qualidade.getRange(1, 1, resultado.length + 1, 5)
    .setWrap(true);

  arquivo.setActiveSheet(qualidade);
}

// Verifica o cadastro de custos e sua ligação com os pedidos.
function conferirCustos(custos, pedidos, agora) {
  const ocorrencias = [];
  const cadastrados = new Map();

  custos.forEach((linha, indice) => {
    if (linha.every(estaVazio)) return;

    const [pedido, produtos, frete] = linha;
    const numeroLinha = indice + 2;

    const registrar = (tipo, detalhe) => {
      ocorrencias.push([
        agora,
        "",
        pedido,
        tipo,
        "Custos, linha " + numeroLinha + ": " + detalhe
      ]);
    };

    if (estaVazio(pedido)) {
      registrar(
        "Código ausente",
        "Preencha o código do pedido."
      );
    } else {
      const codigo = String(pedido).trim();

      if (cadastrados.has(codigo)) {
        registrar(
          "Custo duplicado",
          "Código também encontrado na linha " +
            cadastrados.get(codigo) + " da aba Custos."
        );
      } else {
        cadastrados.set(codigo, numeroLinha);
      }
    }

    [
      [produtos, "Custo_Produtos"],
      [frete, "Frete_Empresa"]
    ].forEach(([valor, campo]) => {
      if (!numeroValido(valor) || valor < 0) {
        registrar(
          "Custo inválido",
          campo +
            " deve estar preenchido com um número maior ou igual a zero."
        );
      }
    });
  });

  pedidos.forEach((linha, indice) => {
    const pedido = linha[0];

    if (estaVazio(pedido)) return;

    const codigo = String(pedido).trim();

    if (!cadastrados.has(codigo)) {
      ocorrencias.push([
        agora,
        indice + 2,
        pedido,
        "Custo não cadastrado",
        "Pedido sem cadastro na aba Custos."
      ]);
    }
  });

  return ocorrencias;
}

// Funções auxiliares.
function estaVazio(valor) {
  return valor === null ||
    valor === undefined ||
    String(valor).trim() === "";
}

function numeroValido(valor) {
  return typeof valor === "number" &&
    Number.isFinite(valor);
}

function dataValida(valor) {
  return valor instanceof Date &&
    !isNaN(valor.getTime());
}
