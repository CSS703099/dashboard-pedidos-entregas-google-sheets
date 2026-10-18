# Dashboard de Pedidos e Entregas — Google Sheets

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
