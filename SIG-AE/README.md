# SIG-AE: Sistema Integrado de Gestão da Alimentação Escolar

https://p9hwiqcl8d58.manus.space

## Visão Geral
Este projeto é um protótipo de sistema web para gestão da alimentação escolar, com funcionalidades para cadastro, consulta e controle de produtos, fornecedores, estoque, consumo e avaliações. O objetivo é evoluir para uma solução integrada ao Office 365, utilizando Microsoft Forms para coleta de dados e Excel Online (Sheets) para armazenamento e automação via Power Automate.

## Funcionalidades Prototipadas
- **Catálogo de Produtos**: Visualização, busca e cadastro de produtos alimentícios.
- **Gestão de Fornecedores**: Cadastro e consulta de fornecedores.
- **Controle de Estoque**: Visualização e atualização de estoques.
- **Consumo e Avaliações**: Registro de consumo e avaliações de produtos.
- **Dashboard**: Visão geral dos dados.

## Próximos Passos
### 1. Integração com Office 365
- **Microsoft Forms**: Utilizar Forms para coleta de dados (cadastro de produtos, consumo, avaliações, etc.).
- **Excel Online (Sheets)**: Armazenar os dados coletados em planilhas hospedadas no SharePoint/OneDrive.
- **Power Automate**: Automatizar fluxos de trabalho, como atualização de planilhas e notificações.

### 2. Automatização da Infraestrutura
- Utilizar o script `Office/setup_infra.sh` para provisionar grupos, sites e permissões no Office 365.
- Seguir as instruções do script para criar manualmente os Forms e Flows, utilizando os arquivos `form1_fields.json` e `flow1_actions.json` como referência.

### 3. Evolução do Frontend
- Adaptar as telas para consumir dados diretamente das planilhas do Office 365 (via API Graph ou Power Automate).
- Implementar autenticação integrada ao Azure AD.
- Permitir submissão de dados via Forms diretamente pelo frontend.

### 4. Documentação e Governança
- Documentar o fluxo de dados entre Forms, Sheets e o sistema.
- Definir papéis e permissões para os usuários (analistas, gestores, escolas).

## Como Pensar as Funcionalidades
- **Cada funcionalidade do protótipo** deve ser mapeada para um formulário no Microsoft Forms e uma tabela no Excel Online.
- **Ações do usuário** (ex: cadastrar produto) devem ser feitas via Forms, com automação para atualizar as planilhas.
- **Consultas e relatórios** podem ser feitos lendo diretamente das planilhas via API ou exportando para o frontend.

## Referências Úteis
- [CLI Microsoft 365](https://pnp.github.io/cli-microsoft365/)
- [Microsoft Forms](https://forms.microsoft.com)
- [Power Automate](https://make.powerautomate.com)
- [Microsoft Graph API](https://learn.microsoft.com/pt-br/graph/overview)

## Estrutura do Projeto
- `*.jsx`/`*.tsx`: Telas e componentes do frontend.
- `Office/setup_infra.sh`: Script para provisionamento no Office 365.
- `Office/form1_fields.json` e `Office/flow1_actions.json`: Modelos para Forms e Flows.

---
**Atenção:** Este projeto é um protótipo. Para produção, priorize a integração nativa com Office 365, garantindo governança, segurança e automação dos fluxos de dados.
