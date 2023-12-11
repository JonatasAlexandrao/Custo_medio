
## Precisa mostrar os meses que houver vendas de ações

## Descobrir o tipo de ação q é e apresentar na tela (fundo, ouro, ação)


* O Relatório de negociações traz valores, com ele é possivel fazer os calculos mas apenas daquele ano em específico... e não será conciderado os valores anterios para o calculo da média 
** Talvez puxar os relatórios de todos os anos anteriores... assim teria como fazer as contas desde a primeira compra daquela ação ( Parece q não é possivel baixar o extrato de mais de 12 meses atras )


-------------------------------------
[] Refaturar o stores, pq as variaveis do tipo "derived" não estão sendo atribuidas no momento da criação dos elementos, isso causa um problema de atualização. Fica sendo obrigatório usar um evento para disparar a atualização delas ou uma gambiarra.

ERRO:
[] Quando se adiciona um valor de ações antigas em uma ação selecionada e em seguida troca a ação selecionada para adicionar outra açao antiga os valores anteriores são carregados juntos. Dessa forma tanto o valor adiciona como todos os valores adicionados para a outra açao são adicionados.
