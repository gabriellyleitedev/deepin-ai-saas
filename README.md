# Deepin AI - Plataforma SaaS

Uma plataforma SaaS moderna para gerenciamento e automação de respostas de leads com inteligência artificial, construída com foco em alta performance, design premium e escalabilidade.

---

## Interface do Projeto

Abaixo estão as capturas de tela das principais seções desenvolvidas até o momento na aplicação:

link do projeto: https://deepin-ai-saas.vercel.app/

### Seção Hero
 <img width="1918" height="903" alt="Captura de tela 2026-05-20 143324" src="https://github.com/user-attachments/assets/e66f7386-5177-49b7-afd5-a04c81dba01e" />

*Painel de apresentação principal da plataforma focado na conversão de visitantes.*

### Tabela de Preços (Pricing)
 <img width="1918" height="906" alt="Captura de tela 2026-05-20 143420" src="https://github.com/user-attachments/assets/7bc67b6e-e998-4424-8167-7657027ee55a" />

*Estrutura de planos Starter, Professional e Enterprise integrada ao modelo de negócios.*

### Tela de Autenticação (Login e Cadastro)
 <img width="1918" height="902" alt="Captura de tela 2026-05-20 143437" src="https://github.com/user-attachments/assets/96a9209d-6098-4404-b149-699e194dec4c" />

*Fluxo de login unificado com suporte a credenciais nativas e provedores sociais.*

---

## 🛠️ Arquitetura e Tecnologias

A plataforma foi desenvolvida utilizando uma arquitetura moderna e desacoplada, focando em performance de carregamento e segurança dos dados:

- **Ambiente de Desenvolvimento:** Node.js com Vite para gerenciamento de dependências e build otimizado da aplicação.
- **Frontend:** React.js construído com TypeScript para tipagem estática e Tailwind CSS para estilização através de classes utilitárias premium.
- **Backend-as-a-Service (BaaS):** Supabase, utilizando a robustez do banco de dados relacional PostgreSQL para persistência de dados.
- **APIs de Autenticação (OAuth 2.0):** Integração direta com os endpoints e APIs da Meta (Facebook Login), Google Cloud Console e GitHub Developer Settings, garantindo um fluxo seguro de troca de tokens de acesso.

---

## Progresso do Desenvolvimento

### Funcionalidades Concluídas
- **Interface de Usuário (UI/UX):** Landing page responsiva desenvolvida com React, Vite e Tailwind CSS, incluindo seções institucionais, precificação e rodapés legais.
- **Banco de Dados e Infraestrutura:** Integração completa com o Supabase para gerenciamento de sessões e persistência de dados de usuários.
- **Autenticação Social (OAuth):** Fluxos de login e cadastro totalmente homologados em ambiente de desenvolvimento:
  - Integração com GitHub via chaves de aplicação.
  - Integração com Google Cloud Console com tela de consentimento de marca configurada.
  - Integração com Meta for Developers (Facebook Authentication) com escopo de permissão de email validado.
- **Rodapé Legal:** Implementação dos links de Termos de Uso (Terms of Use) e Política de Privacidade (Privacy Policy) na interface de login para conformidade com as diretrizes das plataformas parceiras.
- **Hospedagem e CI/CD:** Configuração do pipeline de deploy contínuo na Vercel com resolução de variáveis de ambiente globais de forma segura.

### Próximos Passos e Cronograma
- **Painel de Controle (Dashboard):** Construção da área logada do usuário para monitoramento de interações em tempo real.
- **Integração de IA (Engine):** Conexão com as APIs de modelos de linguagem para automatizar as respostas de leads recebidos em segundos.
- **Gateway de Pagamento:** Integração com Stripe ou maior provedor equivalente para cobrança automatizada dos planos Professional e Enterprise.
- **Homologação de Produção:** Submissão do aplicativo para revisão formal na Meta e no Google para liberação pública fora do modo de teste.

---

## Como Executar o Projeto Localmente

1. Clone o repositório:
   ```bash
   git clone [https://github.com/seu-usuario/deepin-ai-saas.git](https://github.com/seu-usuario/deepin-ai-saas.git)
   cd deepin-ai-saas
