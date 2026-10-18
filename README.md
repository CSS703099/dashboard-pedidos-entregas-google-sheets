# Dashboard de Pedidos e Entregas — Google Sheets

## V4 — Automação e qualidade dos dados

<img width="598" height="638" alt="dashboard-preview-sheets-v4 png  " src="https://github.com/user-attachments/assets/08a194ce-20f0-4893-815a-27bfbc5e9ced" />

A V4 acrescenta uma rotina de verificação dos pedidos com Google Apps Script, um menu personalizado e a exibição do resultado da última conferência no Dashboard.

### Regras verificadas

- Preenchimento dos campos obrigatórios.
- Códigos de pedido duplicados.
- Valores numéricos maiores que zero.
- Validade das datas preenchidas.
- Previsão ou entrega anterior à data do pedido.
- Status dentro da lista permitida.
- Pedidos entregues sem data de entrega.
- Pedidos não entregues que possuem data de entrega.

### Funcionamento

Na planilha, o menu **Qualidade dos dados → Verificar pedidos** executa a conferência do intervalo `Pedidos!A2:H1000`.

O relatório é registrado na aba **Qualidade**, contendo:

- Data e hora da execução.
- Linha na aba Pedidos.
- Código do pedido.
- Tipo de ocorrência.
- Detalhe do problema.

Cada execução substitui o relatório anterior. O Dashboard apresenta a data e o resultado da última conferência.

A execução é iniciada manualmente pelo menu. Não existe agendamento nem conferência automática após alterações nos dados.

### Testes realizados

Em uma cópia de teste:

1. Um valor negativo foi identificado como inválido.
2. Um código repetido foi identificado como duplicado.
3. Após restaurar os dados, a conferência voltou a indicar 36 pedidos verificados, sem problemas nas regras aplicadas.

### Resultados da base completa

Posição das entregas em **31/12/2025**, sem filtros:

| Indicador | Resultado |
|---|---:|
| Total de pedidos | 36 |
| Pedidos entregues | 29 |
| Entregues no prazo | 18 |
| Entregues com atraso | 11 |
| Pendentes em atraso | 2 |
| Pendentes no prazo | 1 |
| Cancelados | 4 |
| Valor não cancelado | R$ 30.420,00 |
| Entregas no prazo | 62,07% |

O valor não cancelado inclui pedidos pendentes e não representa receita recebida.

A data da conferência registra quando o script foi executado. Ela é diferente da data de referência utilizada para calcular os atrasos.

### Acessar a V4

[Abrir no Google Sheets](https://docs.google.com/spreadsheets/d/1GVI6mwbHxCTTBOKhNDxEspBJ1y3XHov9yVm4NW5_wvI/edit?usp=sharing)

O original está disponível para leitura. Para explorar os filtros e executar o script, entre em sua conta Google e selecione **Arquivo → Fazer uma cópia**.

Na cópia, pode ser necessário permitir a conexão do IMPORTRANGE na aba **Importacao** e autorizar o script na primeira execução. Recarregue a planilha para exibir o menu personalizado.

### Arquivos da V4

- [Dashboard em PDF](dashboard-pedidos-entregas-google-sheets-v4.pdf)
- [Cópia complementar em Excel](dashboard-pedidos-entregas-google-sheets-v4.xlsx)
- [Código do Apps Script](scripts/qualidade-pedidos-v4.gs)

O arquivo `.gs` contém o código utilizado na planilha. Para instalá-lo em outra planilha compatível, acesse **Extensões → Apps Script**, cole o código e salve.

### Limitações

- Os dados são fictícios e não permitem determinar as causas dos atrasos.
- A ausência de ocorrências não garante que todos os dados estejam corretos: somente as regras descritas são verificadas.
- A conferência não garante que a importação esteja atualizada.
- A integração depende do acesso à planilha V2 e pode levar algum tempo para refletir alterações.
- O relatório representa a última execução e não mantém histórico acumulado.
- A versão funcional de referência é o Google Sheets. A exportação para Excel não inclui o Apps Script e pode apresentar incompatibilidades com as fórmulas.

---

## V3 — Preparação e integração de dados

<img width="778" height="802" alt="dashboard-preview-sheets-v3 png  " src="https://github.com/user-attachments/assets/ff0da5b1-a371-4042-a928-202942fa9073" />

A V3 conecta o dashboard a uma planilha externa e utiliza consultas e fórmulas matriciais para organizar os dados.

### Recursos adicionados

| Ferramenta | Aplicação |
|---|---|
| IMPORTRANGE | Importação dos pedidos da planilha V2 |
| FILTER | Seleção de linhas preenchidas e exibição dos pedidos atrasados |
| ARRAYFORMULA | Cálculos de atraso, situação de entrega e mês para várias linhas |
| QUERY | Resumo de valores por região e consulta de pendências |
| UNIQUE e SORT | Lista de regiões sem repetições e em ordem alfabética |

Os intervalos de importação, cálculos, consultas, tabelas dinâmicas e segmentações foram ampliados até a linha 1000, permitindo até 999 pedidos.

### Lista de pedidos atrasados

O Dashboard apresenta os pedidos pendentes em atraso, ordenados pelo maior número de dias de atraso.

Na posição de 31/12/2025:

- Pedido 2034: Centro-Oeste, R$ 1.900,00 e 14 dias de atraso.
- Pedido 2035: Norte, R$ 1.320,00 e 5 dias de atraso.

Essa lista apresenta a visão geral e não acompanha os filtros do painel.

### Resultados da base completa

- 36 pedidos, sendo 29 entregues.
- 18 entregas no prazo e 11 com atraso.
- 2 pedidos pendentes em atraso e 1 pendente no prazo.
- 4 pedidos cancelados.
- R$ 30.420,00 em pedidos não cancelados.
- 62,07% de pontualidade entre os pedidos entregues.

Os dados são fictícios. O valor não cancelado inclui pedidos pendentes e não representa receita recebida.

### Acessar no Google Sheets

[Abrir o dashboard V3](https://docs.google.com/spreadsheets/d/10C_GGzYiS-WVKeiYyi5KkC4AZKR9gff7aiVBuXJyzZI/edit?usp=sharing)

Para explorar os filtros, entre em sua conta Google e selecione **Arquivo → Fazer uma cópia**.

A importação depende do acesso à planilha de origem. Na cópia, pode ser necessário autorizar a conexão na aba **Importacao**.

### Arquivos da V3

- [Visualizar o dashboard V3 em PDF](dashboard-pedidos-entregas-google-sheets-v3.pdf)
- [Baixar a cópia complementar em Excel](dashboard-pedidos-entregas-google-sheets-v3.xlsx)

A versão funcional de referência está no Google Sheets. Funções como IMPORTRANGE e QUERY não têm compatibilidade direta com o Excel.

### Validação e atualização

Foi realizada uma alteração temporária de R$ 100,00 na origem, conferida no Dashboard e depois revertida.

A atualização da importação pode levar algum tempo e não deve ser interpretada como atualização em tempo real.

---

## V2 — Tabelas dinâmicas e análise mensal

<img width="787" height="681" alt="dashboard-preview-sheets-v2 png  " src="https://github.com/user-attachments/assets/76de7849-61ef-4e31-bd48-cc1807d405f3" />

A V2 amplia a base para 36 pedidos fictícios distribuídos pelos 12 meses de 2025, com posição das entregas em 31/12/2025.

### Novos recursos

- Tabela dinâmica de quantidade de pedidos por mês e situação de entrega.
- Tabela dinâmica de valor dos pedidos não cancelados por região.
- Tabela dinâmica de valor dos pedidos não cancelados por mês.
- Segmentações por região e mês na aba Dinamicas.
- Gráfico de comparação de valores por região.
- Gráfico de evolução mensal dos valores.

### Como usar os filtros

O seletor no topo do Dashboard controla os cartões e o gráfico de situações de entrega.

As segmentações na aba Dinamicas controlam as tabelas dinâmicas e os dois gráficos de valores. Elas não alteram os cartões calculados por fórmulas.

O gráfico de pendentes em atraso por região mantém a visão geral.

### Resultados da V2 sem filtros

| Indicador | Resultado |
|---|---:|
| Total de pedidos | 36 |
| Pedidos entregues | 29 |
| Entregues no prazo | 18 |
| Entregues com atraso | 11 |
| Pendentes em atraso | 2 |
| Pendentes no prazo | 1 |
| Cancelados | 4 |
| Valor não cancelado | R$ 30.420,00 |
| Entregas no prazo | 62,07% |

Dezembro apresenta o maior valor de pedidos não cancelados: R$ 4.210,00.

O valor não cancelado inclui pedidos pendentes e não representa receita recebida. A pontualidade considera apenas os pedidos entregues.

A base é fictícia e possui três pedidos por mês. Ela serve para demonstrar as ferramentas e não permite concluir sobre sazonalidade real ou causas dos atrasos.

### Acessar a V2 no Google Sheets

[Abrir o dashboard V2](https://docs.google.com/spreadsheets/d/18UUCz7QF-f9dRynlPsQjH-5tG_YeVlcVZ73v_67FUig/edit?usp=sharing)

Para testar os filtros, entre em sua conta Google e selecione **Arquivo → Fazer uma cópia**.

Na sua cópia, use o seletor do Dashboard e as segmentações de região e mês da aba **Dinamicas**.

### Arquivos da V2

- [Visualizar o dashboard V2 em PDF](dashboard-pedidos-entregas-google-sheets-v2.pdf)
- [Baixar a cópia da V2 em Excel](dashboard-pedidos-entregas-google-sheets-v2.xlsx)

A versão original foi desenvolvida no Google Sheets. A cópia em Excel pode apresentar diferenças de compatibilidade.

---

## V1 — Primeira versão

As informações abaixo documentam a V1, com 12 pedidos e posição em 28/02/2026.

Dashboard desenvolvido no Google Sheets para acompanhar pedidos, pontualidade das entregas e pendências por região.

Projeto de estudo com dados fictícios, criado para meu portfólio de Análise de Dados.

## Prévia

<img width="945" height="667" alt="dashboard-preview-sheets-v1 png  " src="https://github.com/user-attachments/assets/6e1a722d-1ef7-4cf4-9d00-496b1c28c9d9" />

## Objetivo

Organizar uma base de pedidos e transformar os dados em indicadores que ajudem a identificar atrasos e acompanhar as entregas.

## Indicadores

- Total de pedidos.
- Pedidos entregues.
- Pedidos pendentes em atraso.
- Pedidos cancelados.
- Valor dos pedidos não cancelados.
- Percentual de entregas realizadas no prazo.

O valor dos pedidos não cancelados inclui pedidos pendentes e não representa receita recebida. O percentual de pontualidade considera apenas os pedidos entregues.

## Recursos utilizados

- Fórmulas condicionais e tratamento de erros.
- Contagens e somas com critérios.
- Cálculo de dias de atraso.
- Validação de dados com lista suspensa.
- Filtro por região integrado aos indicadores e ao gráfico de situações.
- Formatação condicional.
- Gráficos de barras e colunas.
- Documentação dos indicadores e das conclusões.

O gráfico de pendentes em atraso por região apresenta uma visão geral e não muda com o filtro.

## Resultados da base completa

Posição em **28/02/2026**, considerando todas as regiões:

| Indicador | Resultado |
|---|---:|
| Total de pedidos | 12 |
| Pedidos entregues | 8 |
| Pendentes em atraso | 2 |
| Pedidos cancelados | 1 |
| Valor não cancelado | R$ 8.430,00 |
| Entregas no prazo | 62,50% |

Das oito entregas realizadas, cinco chegaram no prazo e três com atraso. Os dois pedidos pendentes em atraso estão no Sudeste e no Nordeste, um em cada região.

A base não permite determinar as causas dos atrasos.

## Acessar no Google Sheets

[Abrir o dashboard](https://docs.google.com/spreadsheets/d/1wVieF7-ckSkA2Pg7CcKtkvkZqD3T5CGjFkUBW7NWuWo/edit?usp=sharing)

O arquivo original está disponível para leitura. Para testar o filtro de região, entre em sua conta Google e selecione **Arquivo → Fazer uma cópia**.

## Arquivos

- [Visualizar o dashboard em PDF](dashboard-pedidos-entregas-google-sheets-v1.pdf)
- [Baixar a cópia da planilha em Excel](dashboard-pedidos-entregas-google-sheets-v1.xlsx)

O projeto foi desenvolvido no Google Sheets. A cópia em Excel pode apresentar diferenças de formatação ou compatibilidade.

## Estrutura da planilha

- **Pedidos:** base de dados e cálculos por pedido.
- **Listas:** opções do filtro e data de referência.
- **Analises:** cálculos dos indicadores e dados dos gráficos.
- **Dashboard:** painel visual.
- **Sobre:** documentação e conclusões.

## Autor

Caio Siqueira
