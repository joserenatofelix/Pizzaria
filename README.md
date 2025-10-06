🍕 JRF Pizzaria - E-commerce Completo
<div align="center">
https://img.shields.io/github/last-commit/joserenatofelix/Pizzaria?style=for-the-badge&logo=github
https://img.shields.io/github/languages/code-size/joserenatofelix/Pizzaria?style=for-the-badge&logo=github
https://img.shields.io/github/languages/top/joserenatofelix/Pizzaria?style=for-the-badge&logo=javascript
https://img.shields.io/github/license/joserenatofelix/Pizzaria?style=for-the-badge

Uma experiência moderna de e-commerce para pizzaria com design responsivo e funcionalidades avançadas

🚀 Demo ao Vivo • 📋 Documentação • 💻 Tecnologias • 🎯 Funcionalidades

</div>
📋 Sobre o Projeto
O JRF Pizzaria é um e-commerce completo desenvolvido com as melhores práticas de desenvolvimento web moderno. O projeto oferece uma experiência de usuário fluida e intuitiva para seleção, customização e compra de pizzas, com interface totalmente responsiva e acessível.

🎥 Demonstração
<div align="center">
https://user-images.githubusercontent.com/93296913/193107872-e3ec9564-b5a7-4902-881b-ffc77803468e.mp4

Interface responsiva funcionando em diferentes dispositivos

</div>
🚀 Características Principais
🎯 Funcionalidades do Sistema
Módulo	Funcionalidades
🛒 Carrinho de Compras	• Adição/remoção dinâmica de itens
• Cálculo automático de totais
• Persistência de dados
• Quantidade customizável
📱 Design Responsivo	• Mobile-first approach
• Breakpoints otimizados
• Touch-friendly interfaces
• Cross-browser compatibility
🎨 Interface Moderna	• CSS Grid & Flexbox
• Animações suaves
• Sistema de design consistente
• Modais interativos
⚡ Performance	• Código otimizado
• Carregamento eficiente
• Animações CSS performáticas
• Templates reutilizáveis
💻 Tecnologias Implementadas
bash
Frontend Stack:
├── HTML5 (Semântico & Acessível)
├── CSS3 (Grid, Flexbox, Variáveis CSS)
├── JavaScript ES6+ (Modular & Funcional)
└── JSON (Data Management)
🛠️ Tecnologias & Ferramentas
<div align="center">
Camada	Tecnologias
Frontend	https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
Layout	https://img.shields.io/badge/CSS_Grid-1572B6?style=for-the-badge&logo=css3&logoColor=white https://img.shields.io/badge/Flexbox-1572B6?style=for-the-badge&logo=css3&logoColor=white
Design	https://img.shields.io/badge/Responsive-Design-1572B6?style=for-the-badge https://img.shields.io/badge/CSS_Animations-1572B6?style=for-the-badge
</div>
📁 Estrutura do Projeto
text
Pizzaria/
├── 📄 index.html                 # Estrutura principal semântica
├── 🎨 css/
│   └── style.css                # Estilos modernos com CSS Grid & Variables
├── ⚡ js/
│   ├── app.js                   # Aplicação principal modularizada
│   └── pizzas.js                # Base de dados das pizzas
├── 🖼️ images/                   # Assets e imagens das pizzas
└── 📖 README.md                 # Documentação completa
🎯 Funcionalidades Detalhadas
🍕 Sistema de Produtos
Catálogo Dinâmico: Lista de pizzas carregada via JSON

Modal de Detalhes: Visualização ampliada com informações completas

Seleção de Tamanhos: Pequena, Média e Grande com preços diferenciados

Descrições Detalhadas: Ingredientes e informações nutricionais

🛒 Gerenciamento do Carrinho
javascript
// Exemplo de estrutura do carrinho
{
  items: [
    {
      id: 1,
      name: "Mussarela",
      size: "G",
      quantity: 2,
      price: 25.00,
      total: 50.00
    }
  ],
  subtotal: 50.00,
  delivery: 5.00,
  total: 55.00
}
📱 Experiência Mobile
Gestos Touch: Navegação otimizada para touch

Layout Adaptativo: Grid que se ajusta ao viewport

Performance: Carregamento otimizado para mobile

Acessibilidade: Navegação por voz e leitores de tela

🚀 Como Executar o Projeto
Pré-requisitos
Navegador moderno (Chrome, Firefox, Safari, Edge)

Servidor web local (opcional)

Instalação Local
bash
# Clone o repositório
git clone https://github.com/joserenatofelix/Pizzaria.git

# Acesse o diretório
cd Pizzaria

# Abra no navegador
# Opção 1: Abrir index.html diretamente
# Opção 2: Usar servidor local
python -m http.server 8000
# Acesse: http://localhost:8000
📦 Deploy
O projeto está configurado para GitHub Pages e pode ser acessado em:
https://joserenatofelix.github.io/Pizzaria/

💡 Conceitos Técnicos Implementados
JavaScript ES6+
javascript
// Arrow Functions & Modern Array Methods
pizzaJson.forEach((pizza, index) => {
    const card = this.createPizzaCard(pizza, index);
    this.elements.pizzasGrid.appendChild(card);
});

// Destructuring & Template Literals
const { name, price, description } = pizza;
const formattedPrice = `R$ ${price.toFixed(2)}`;

// Modules & Classes
class PizzaStore {
    constructor() {
        this.cart = [];
        this.initializeApp();
    }
}
CSS Moderno
css
/* CSS Grid & Custom Properties */
:root {
    --primary: #e74c3c;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.pizzas-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}
HTML Semântico
html
<main role="main">
    <section aria-labelledby="pizzas-title">
        <h2 id="pizzas-title">Nossas Pizzas</h2>
        <div class="pizzas-grid" role="list">
            <!-- Itens dinâmicos -->
        </div>
    </section>
</main>
🎨 Design System
Cores
Cor	Uso	Hexadecimal
Primary	Botões principais, elementos de destaque	#e74c3c
Secondary	Textos, headers	#2c3e50
Accent	Elementos de foco, interações	#f39c12
Success	Confirmações, ações positivas	#27ae60
Tipografia
Primary Font: Poppins (Interface)

Secondary Font: Roboto Slab (Títulos)

Weights: 300, 400, 500, 600, 700

📱 Responsividade
Dispositivo	Breakpoint	Características
Mobile	< 768px	Layout single column, gestos touch
Tablet	768px - 1024px	Grid adaptativo, modal side-by-side
Desktop	> 1024px	Layout completo, hover effects
🔧 Personalização
Adicionando Novas Pizzas
javascript
// Em js/pizzas.js
{
    id: 11,
    name: "Nova Pizza",
    img: "images/nova-pizza.png",
    price: [28.00, 31.00, 34.00],
    sizes: ["6 fatias", "8 fatias", "12 fatias"],
    description: "Descrição da nova pizza",
    category: "especial"
}
Customizando Estilos
css
/* Modificando cores do tema */
:root {
    --primary: # seu-novo-vermelho;
    --secondary: # seu-novo-azul;
}
🤝 Contribuindo
Contribuições são sempre bem-vindas! Para contribuir:

Fork o projeto

Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a branch (git push origin feature/AmazingFeature)

Abra um Pull Request

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👨‍💻 Autor
<div align="center">
José Renato Felix da Silva
https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
https://img.shields.io/badge/Portfolio-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white

</div>
🎉 Agradecimentos
Ícones e imagens por FlatIcon

Fontes por Google Fonts

Inspiração design por Dribbble

<div align="center">
⭐ Não esqueça de dar uma estrela se você gostou do projeto!
Desenvolvido com ❤️ e ☕ por José Renato Felix

</div>