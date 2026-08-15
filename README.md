# Text Express 28.0.3 — etiquetas automáticas em Protocolos

Versão completa do Text Express com o baralho de 06/08/2026, editor flexível de sequências, etiqueta automática opcional por cartão de Protocolo, acionamento numérico imediato, abertura confiável pelo ícone flutuante e proteção de rascunhos.

## O que está incluído

- 21 categorias e 132 cartões do backup `text-express-backup-completo-2026-08-06.json`;
- 43 cartões de Atendimento e 89 de Protocolo;
- 30 sequências de Atendimento e 5 fluxos de Protocolo;
- catálogo interno com as etiquetas fornecidas, sem criar uma aba de etiquetas;
- cadastro de nova etiqueta diretamente no editor do cartão;
- uma única etiqueta opcional para o cartão inteiro, inclusive quando ele possui sequência;
- automação da janela externa **Adicionar etiquetas**;
- prevenção de etiquetas repetidas na página atual;
- seleção imediata das opções 1 a 9 nos fluxos de Protocolo;
- rascunhos persistentes das edições do cartão no armazenamento do navegador;
- abertura direta pelo ícone flutuante, sem precisar acionar novamente o favorito;
- recuperação automática dos 132 cartões caso uma instância incompleta seja encontrada;
- avisos pequenos para etiqueta adicionada ou já existente;
- carregador autossuficiente, sem depender de uma segunda requisição para iniciar;
- recuperação automática de instância parcial/quebrada quando apenas o ícone fica visível;
- backup completo com cartões, categorias, configurações, posições da interface e catálogo de etiquetas.

## Como configurar uma etiqueta

1. Abra **Protocolos**.
2. Edite um cartão existente ou crie um novo.
3. No campo **Etiqueta automática do protocolo**, pesquise a etiqueta desejada.
4. Se ela não existir no catálogo, digite o nome completo da nova etiqueta.
5. Salve o cartão.

O campo aparece somente em cartões de Protocolo. Não existe menu ou aba separada para etiquetas. Alimentar o catálogo não associa nenhuma etiqueta aos cartões existentes: a associação só acontece quando o usuário escolhe uma etiqueta e salva o cartão.

## Funcionamento da automação

Depois que um protocolo associado a uma etiqueta é inserido, o Text Express:

1. verifica se a mesma etiqueta já está visível na página atual;
2. se já estiver, não a adiciona novamente;
3. clica no botão `+` da página;
4. aguarda a janela **Adicionar etiquetas**;
5. ignora **Categoria de etiqueta**;
6. abre somente o campo **Etiquetas**;
7. digita o nome salvo e escolhe apenas a correspondência exata;
8. clica no cabeçalho da janela para fechar a lista;
9. clica em **Concluir**.

Há uma fila interna contra duplo clique. Em cartões com sequência, todas as opções usam a mesma etiqueta do cartão. Se o usuário trocar a opção, a página é verificada novamente e a etiqueta não é repetida.

Se a janela externa mudar e algum controle não puder ser confirmado, o Text Express interrompe a automação e mostra um aviso; ele não escolhe uma etiqueta aproximada.

## Número imediato no Protocolo

Com um fluxo de Protocolo aberto, digitar de `1` a `9` no campo do atendimento executa a opção correspondente imediatamente. Não é necessário pressionar Espaço, Enter ou Tab, e o número não fica no campo.

Esse comportamento vale apenas enquanto um fluxo de Protocolo estiver aberto. Nos demais campos e na área de Atendimento, a digitação numérica normal é preservada.

## Salvamento e rascunhos

Cartões existentes continuam com salvamento automático. Além disso, cada alteração do editor gera um rascunho local de segurança. Ao retornar no mesmo navegador e na mesma página/origem, uma edição mais recente que o cartão salvo é recuperada automaticamente.

O rascunho é removido depois que o salvamento é confirmado. O backup completo não inclui rascunhos temporários, mas inclui todos os dados já salvos e o catálogo de etiquetas.

## Atualização do baralho

Na primeira abertura da versão 28.0.3:

- somente cartões e categorias locais são substituídos pela base de 06/08/2026;
- configurações, tema, posições e demais preferências são preservados;
- a base anterior é guardada como backup interno antes da troca;
- o catálogo de etiquetas é criado separadamente e não altera nenhum cartão.

## Arquivos principais

- `index.html`: interface do aplicativo;
- `styles.css`: estilos;
- `app.js`: lógica completa;
- `bookmarklet.js`: carregador para uso dentro do sistema externo;
- `build-bookmarklet.js`: regenera o carregador autossuficiente após alterações no projeto;
- `BARALHO_PADRAO_COMPLETO_2026-08-06.json`: backup completo usado como referência;
- `BASE_LIMPA_CARTOES_E_CATEGORIAS.json`: somente cartões e categorias da base;
- `etiquetas-sistema.json`: catálogo agrupado das etiquetas fornecidas.

## Publicação no GitHub Pages

Substitua na raiz do repositório:

- `index.html`;
- `styles.css`;
- `app.js`;
- `bookmarklet.js`;
- `README.md`.

Depois confirme o commit, aguarde a atualização do GitHub Pages e atualize a página do sistema com `Ctrl + F5`.

O `bookmarklet.js` da versão 28.0.3 já leva a interface, os estilos e a aplicação incorporados. O favorito não precisa buscar `index.html` e `app.js` durante a abertura.
