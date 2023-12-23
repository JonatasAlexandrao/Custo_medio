
## Precisa mostrar os meses que houver vendas de ações

## Descobrir o tipo de ação q é e apresentar na tela (fundo, ouro, ação)


------------------------------------------------
# Venda de Ações não altera o preço médio!
# Quando for calcular o valor total depois de uma venda, se faz o preço médio vezes a quantidade vendida e esse valor é reduzido do valor total q vc tem assim é só dividir esse total pela quantidade q sobrou de ações q vc vai ter o preço médio, q será exatamente a o valor q já era antes pois venda não muda preço médio.
------------------------------------------------


* O Relatório de negociações traz valores, com ele é possivel fazer os calculos mas apenas daquele ano em específico... e não será conciderado os valores anterios para o calculo da média 
** Talvez puxar os relatórios de todos os anos anteriores... assim teria como fazer as contas desde a primeira compra daquela ação ( Parece q não é possivel baixar o extrato de mais de 12 meses atras )


-------------------------------------
[] Refaturar o stores, pq as variaveis do tipo "derived" não estão sendo atribuidas no momento da criação dos elementos, isso causa um problema de atualização. Fica sendo obrigatório usar um evento para disparar a atualização delas ou uma gambiarra.

ERRO:
[x] Quando se adiciona um valor de ações antigas em uma ação selecionada e em seguida troca a ação selecionada para adicionar outra açao antiga os valores anteriores são carregados juntos. Dessa forma tanto o valor adiciona como todos os valores adicionados para a outra açao são adicionados.

[x] Quando a ação tem somente vendas a quantidade é zerada porem se agente adiciona uma ação antiga essas vendas não são descontadas.

[x] Erro na mascara de input de valor monetário, quando se tenta digitar 400,00 ele não deixa o segundo zero.

[x] Na tabela de ações antigas o preço médio está aparecendo sem formatação

[x] Erro, quando o valor no input chega nos 1.000,00 por causa do ponto quando se aperta em adicionar ação antiga ela não é adicionada.

[x] Erro, o preço médio não passa de 2 digitos antes e depois da virgula

*** Erro com o calculo do preço e quantidade nos casos onde só tem venda nas ações e se adiciona ações antigas
--- Na verdade não está errado apenas é necessário q se adicione em açoes antigas uma quantidade maior q a quantidade em negativo, pq se a quantidade se manter no negativo significa q não existe açõe.

[x] corrigir os inputs para q o cursor de digitação fique no canto direito
[x] impedir que possa ser apagado o valor deles para q não aconteça de o usuario envie o valor 20 em vez de 20,00
[] se possivel corrigir o problema das caixas de resultado com valores negativos, elas deveriam ficar fazias ou zeradas até ter um valor valido.
[X] Erro na mascara de valor monetário, se tentar adicionar varios zeros ele não deixa.
[] Erro na formula de calculo de preço médio, quando se adiciona uma ação antiga e seu valor total é menor que o total vendido depois o resultado fica negativo