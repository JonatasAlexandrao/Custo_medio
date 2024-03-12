
========= BUGS =========

[] quando selecionado o arquivo da tabela com o card da tabela aberto ele não atualiza, precisa minimizar e abrir novamente para aparecer as informações.

[] Tabela não está responsiva no header, por enquanto foi posto um max-header: 70vh; 

========= Melhorias =========

[] Tabela está ocupando muito espaço, acho melhor criar um botão para poder minimizala.


========= Funções para adicionar =========

[x] Fazer os calculos e apresentar qtd total, preço médio final e valor total de cada ação

[x] é preciso ter a soma das vendas de cada mês
  [] Identificar os meses que ultrapassem 20k
  [x] Ver como verificar dayTrade, que deve ser calculado separado.

[x] mostrar o lucro final de cada mês.

[x] Uma area com o texto padrão da declaração já preenchido.

[x] Acho q vai ser necessário uma tabela filtrada por codigo, que mostre todas as negociações e a atualização do preço médio linha a linha.
----------------------------------------------------
[x] Mostrar o total de vendas por mes na tela
[x] Mostrar o lucro de cada mês na tela
[x] Mostrar o lucro de cada daytrade
[x] Mostrar o daytrade na tela


# Informações que faltam
  - Nome inteiro da Ações
  - CNPJ 
  (essas informações tem em Relatório anual)

# CORRIGIR

[x] soma das Vendas ainda está somando os day trades
******** Lucro do daytrade, quando a pessoa compra e vende em quantidades diferentes ainda não está certo

[x] Remover os codigos com "F" no final e juntar com sua versão sem "F"
[x] Depois de juntar os codigos ordenar por data

[x] Fazer o preço médio por linha (lançamento) e salvar em um campo junto
[x] Total atual também será necessário para facilitar 

- Qtd parcial,
- preço médio parcial
- valor total parcial

[] Testar se a formula está funcionando e os erros quando tiver mais vendas do que compras
[] Refaturar os arquivos de formatInfo e formulas

[] Verificar se o calculo de lucro por mês está fazendo a conta certa

[x] Na tabela com o preço médio por um combo box por codigo, com o codigo selecionado a tabela some e em caixas de texto apresentar os valores importantes inclusive o texto para copiar para o IR

----------------------------------------
# Fazer

[] tabela não atualiza automaticamente
[x] Entrada de Ano Anterior
  - pensar em uma logica para o numero q será posto na coluna posição, vai ser permitido adicionar mais de uma entrada de ano anterior no mesmo código?
  
[x] Entrada de bonificação 
  - vai ser necessário buscar a posição de um item na tabela para por a bonificação?
  [x] Em bonificação é melhor q se pesquise a posição q foi digitada e verifique se existe pq se não a entrada pode ir parar em algum lugar errado
  [] talvez para facilitar pro usuario quando se clicar na tabela ele poderia puxar a posição
  
  [] Criar um componente que substitua o select para que o usuário possa digitar e filtrar os itens do combo box

  [] Melhorar a animaçao do texto Copiado!