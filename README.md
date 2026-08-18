# Text Express 28.3.0 — Mascara DOM Real

Esta versão consolida as correções discutidas e troca a automação genérica de Protocolo pelas rotinas baseadas no DOM real observado no `Mascara.js`.

## O que foi mantido
- Pré-Visualização exclusiva para Protocolo.
- Sequência fecha ao escolher a opção final e abre a Pré-Visualização.
- Pré-Visualização arrastável e redimensionável, sem blur no sistema ao fundo.
- Tema da sequência e da Pré-Visualização acompanha o tema escolhido no Text Express.
- Aguardar existe somente na Pré-Visualização.
- Equipe externa continua sendo definida pelo próprio sistema.

## Integração real
- Registro: `textarea.text-area` + `button#send_button`.
- Etiquetas: `#tags`, `.anticon.anticon-plus`, `.ant-select-dropdown-menu-item` e `Concluir`.
- Externo: `Enviar` → `Pesquisar...` → `Suporte Externo` → problema → serviço → `Continuar`.
- Aguardar: `nz-switch#blocking button.ant-switch`.

## Catálogo do Mascara
O Text Express mantém uma cópia própria em `text_express_mascara_catalog_v283`. Na primeira oportunidade ele:
1. tenta copiar o cache legado `mensagensJsonData` do próprio navegador;
2. se o cache não existir, tenta uma única importação da fonte usada pelo Mascara;
3. após a cópia, usa o catálogo local e inclui esse catálogo no backup completo.

Os campos incorporados são `titulo`, `mensagem`, `etiqueta`, `externo`, `etiqueta_externo` e `servico`.

## Não incorporado
- Saski.
- Reconfiguração/configuração de roteador.

## Observação de validação
Os seletores são derivados do código real do Mascara, mas qualquer automação de DOM precisa ser validada no ambiente de trabalho porque versões futuras do sistema podem alterar HTML/classes.
