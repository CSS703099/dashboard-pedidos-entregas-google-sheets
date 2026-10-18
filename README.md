# Dashboard de Pedidos e Entregas — Google Sheets

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
