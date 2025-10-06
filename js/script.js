// ===== CONFIGURAÇÕES E CONSTANTES =====
const PIZZA_SIZES = {
    P: { name: 'Pequena', slices: '6 fatias' },
    M: { name: 'Média', slices: '8 fatias' },
    G: { name: 'Grande', slices: '12 fatias' }
};

const DELIVERY_FEE = 5.00;

// ===== ESTADO DA APLICAÇÃO =====
class PizzaStore {
    constructor() {
        this.cart = [];
        this.currentPizza = null;
        this.modalQuantity = 1;
        this.selectedSize = 'G';
        
        this.initializeApp();
    }

    // ===== INICIALIZAÇÃO =====
    initializeApp() {
        this.cacheElements();
        this.bindEvents();
        this.renderPizzas();
        this.updateCart();
    }

    // ===== CACHE DE ELEMENTOS =====
    cacheElements() {
        this.elements = {
            // Templates
            pizzaCardTemplate: document.getElementById('pizza-card-template'),
            cartItemTemplate: document.getElementById('cart-item-template'),
            
            // Containers
            pizzasGrid: document.querySelector('.pizzas-grid'),
            cartItems: document.querySelector('.cart-items'),
            cartSummary: document.querySelector('.cart-summary'),
            cartEmpty: document.querySelector('.cart-empty'),
            
            // Botões e controles
            cartOpener: document.querySelector('.cart-opener'),
            cartClose: document.querySelector('.cart-sidebar__close'),
            cartCheckout: document.querySelector('.cart-summary__checkout'),
            heroCta: document.querySelector('.hero__cta'),
            
            // Modal
            modal: document.querySelector('.modal'),
            modalBackdrop: document.querySelector('.modal__backdrop'),
            modalClose: document.querySelector('.modal__close'),
            modalCloseMobile: document.querySelector('.modal__close--mobile'),
            
            // Elementos do modal
            modalTitle: document.getElementById('pizza-modal-title'),
            modalImage: document.querySelector('.pizza-detail__img'),
            modalDescription: document.querySelector('.pizza-detail__description'),
            modalPrice: document.querySelector('[data-price]'),
            modalQuantity: document.querySelector('[data-quantity]'),
            modalDecrease: document.querySelector('[data-decrease]'),
            modalIncrease: document.querySelector('[data-increase]'),
            modalAddToCart: document.querySelector('[data-add-to-cart]'),
            modalCancel: document.querySelector('[data-cancel]'),
            sizeInputs: document.querySelectorAll('.size-option__input'),
            
            // Elementos do carrinho
            cartSubtotal: document.querySelector('[data-subtotal]'),
            cartDiscount: document.querySelector('[data-discount]'),
            cartDelivery: document.querySelector('[data-delivery]'),
            cartTotal: document.querySelector('[data-total]'),
            cartCount: document.querySelector('.cart-opener__count')
        };
    }

    // ===== EVENT BINDING =====
    bindEvents() {
        // Carrinho
        this.elements.cartOpener.addEventListener('click', () => this.toggleCart());
        this.elements.cartClose.addEventListener('click', () => this.closeCart());
        this.elements.cartCheckout.addEventListener('click', () => this.checkout());
        
        // Modal
        this.elements.modalBackdrop.addEventListener('click', () => this.closeModal());
        this.elements.modalClose.addEventListener('click', () => this.closeModal());
        this.elements.modalCloseMobile.addEventListener('click', () => this.closeModal());
        this.elements.modalCancel.addEventListener('click', () => this.closeModal());
        
        // Controles de quantidade
        this.elements.modalDecrease.addEventListener('click', () => this.decreaseQuantity());
        this.elements.modalIncrease.addEventListener('click', () => this.increaseQuantity());
        this.elements.modalAddToCart.addEventListener('click', () => this.addToCart());
        
        // Seleção de tamanho
        this.elements.sizeInputs.forEach(input => {
            input.addEventListener('change', (e) => this.selectSize(e.target.value));
        });
        
        // CTA do hero
        this.elements.heroCta.addEventListener('click', () => this.scrollToPizzas());
        
        // Fechar carrinho com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeCart();
                this.closeModal();
            }
        });
    }

    // ===== RENDERIZAÇÃO DE PIZZAS =====
    renderPizzas() {
        this.elements.pizzasGrid.innerHTML = '';
        
        pizzaJson.forEach((pizza, index) => {
            const card = this.createPizzaCard(pizza, index);
            this.elements.pizzasGrid.appendChild(card);
        });
    }

    createPizzaCard(pizza, index) {
        const template = this.elements.pizzaCardTemplate.content.cloneNode(true);
        const card = template.querySelector('.pizza-card');
        
        // Preencher dados
        const img = card.querySelector('.pizza-card__img');
        const price = card.querySelector('[data-price]');
        const title = card.querySelector('.pizza-card__title');
        const description = card.querySelector('.pizza-card__description');
        const addBtn = card.querySelector('.pizza-card__add');
        const overlay = card.querySelector('.pizza-card__overlay');
        
        img.src = pizza.img;
        img.alt = `Pizza ${pizza.name}`;
        price.textContent = this.formatPrice(pizza.price[2]); // Preço grande
        title.textContent = pizza.name;
        description.textContent = pizza.description;
        
        // Event listeners
        const openModal = () => this.openModal(pizza, index);
        
        overlay.addEventListener('click', openModal);
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.pizza-card__add')) {
                openModal();
            }
        });
        
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.quickAddToCart(pizza, index);
        });
        
        return card;
    }

    // ===== MODAL =====
    openModal(pizza, index) {
        this.currentPizza = { ...pizza, index };
        this.modalQuantity = 1;
        this.selectedSize = 'G';
        
        this.updateModalContent();
        this.showModal();
    }

    updateModalContent() {
        const { currentPizza } = this;
        
        // Atualizar informações básicas
        this.elements.modalTitle.textContent = currentPizza.name;
        this.elements.modalImage.src = currentPizza.img;
        this.elements.modalImage.alt = `Pizza ${currentPizza.name}`;
        this.elements.modalDescription.textContent = currentPizza.description;
        
        // Atualizar tamanhos
        this.elements.sizeInputs.forEach((input, index) => {
            const sizeKey = input.value;
            const label = input.nextElementSibling;
            const desc = label.querySelector('.size-option__description');
            
            desc.textContent = currentPizza.sizes[index];
            
            if (sizeKey === this.selectedSize) {
                input.checked = true;
            }
        });
        
        // Atualizar preço e quantidade
        this.updateModalPrice();
        this.elements.modalQuantity.textContent = this.modalQuantity;
    }

    updateModalPrice() {
        const priceIndex = this.getPriceIndex(this.selectedSize);
        const price = this.currentPizza.price[priceIndex] * this.modalQuantity;
        this.elements.modalPrice.textContent = this.formatPrice(price);
    }

    getPriceIndex(size) {
        const sizes = ['P', 'M', 'G'];
        return sizes.indexOf(size);
    }

    selectSize(size) {
        this.selectedSize = size;
        this.updateModalPrice();
    }

    increaseQuantity() {
        this.modalQuantity++;
        this.elements.modalQuantity.textContent = this.modalQuantity;
        this.updateModalPrice();
    }

    decreaseQuantity() {
        if (this.modalQuantity > 1) {
            this.modalQuantity--;
            this.elements.modalQuantity.textContent = this.modalQuantity;
            this.updateModalPrice();
        }
    }

    showModal() {
        this.elements.modal.hidden = false;
        document.body.style.overflow = 'hidden';
        
        // Foco no primeiro elemento interativo
        setTimeout(() => {
            this.elements.modalClose.focus();
        }, 100);
    }

    closeModal() {
        this.elements.modal.hidden = true;
        document.body.style.overflow = '';
        this.currentPizza = null;
    }

    // ===== CARRINHO =====
    addToCart() {
        if (!this.currentPizza) return;
        
        const priceIndex = this.getPriceIndex(this.selectedSize);
        const price = this.currentPizza.price[priceIndex];
        const identifier = `${this.currentPizza.id}t${this.selectedSize}`;
        
        const existingItem = this.cart.find(item => item.identifier === identifier);
        
        if (existingItem) {
            existingItem.quantity += this.modalQuantity;
        } else {
            this.cart.push({
                identifier,
                id: this.currentPizza.id,
                size: this.selectedSize,
                quantity: this.modalQuantity,
                price: price
            });
        }
        
        this.updateCart();
        this.closeModal();
        this.showNotification('Pizza adicionada ao carrinho!');
    }

    quickAddToCart(pizza, index) {
        const price = pizza.price[2]; // Preço grande
        const identifier = `${pizza.id}tG`;
        
        const existingItem = this.cart.find(item => item.identifier === identifier);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                identifier,
                id: pizza.id,
                size: 'G',
                quantity: 1,
                price: price
            });
        }
        
        this.updateCart();
        this.showNotification('Pizza adicionada ao carrinho!');
    }

    updateCart() {
        this.renderCartItems();
        this.updateCartSummary();
        this.updateCartCount();
        this.toggleCartEmptyState();
    }

    renderCartItems() {
        this.elements.cartItems.innerHTML = '';
        
        this.cart.forEach((item, index) => {
            const cartItem = this.createCartItem(item, index);
            this.elements.cartItems.appendChild(cartItem);
        });
    }

    createCartItem(item, index) {
        const template = this.elements.cartItemTemplate.content.cloneNode(true);
        const cartItem = template.querySelector('.cart-item');
        
        const pizza = pizzaJson.find(p => p.id === item.id);
        const sizeName = PIZZA_SIZES[item.size].name;
        
        // Preencher dados
        const img = cartItem.querySelector('.cart-item__img');
        const name = cartItem.querySelector('.cart-item__name');
        const quantity = cartItem.querySelector('[data-quantity]');
        const decreaseBtn = cartItem.querySelector('[data-decrease]');
        const increaseBtn = cartItem.querySelector('[data-increase]');
        const removeBtn = cartItem.querySelector('.cart-item__remove');
        
        img.src = pizza.img;
        img.alt = pizza.name;
        name.textContent = `${pizza.name} (${sizeName})`;
        quantity.textContent = item.quantity;
        
        // Event listeners
        decreaseBtn.addEventListener('click', () => this.decreaseCartItem(index));
        increaseBtn.addEventListener('click', () => this.increaseCartItem(index));
        removeBtn.addEventListener('click', () => this.removeCartItem(index));
        
        return cartItem;
    }

    increaseCartItem(index) {
        this.cart[index].quantity++;
        this.updateCart();
    }

    decreaseCartItem(index) {
        if (this.cart[index].quantity > 1) {
            this.cart[index].quantity--;
        } else {
            this.cart.splice(index, 1);
        }
        this.updateCart();
    }

    removeCartItem(index) {
        this.cart.splice(index, 1);
        this.updateCart();
        this.showNotification('Item removido do carrinho');
    }

    updateCartSummary() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = 0; // Poderia implementar sistema de cupons
        const total = subtotal - discount + DELIVERY_FEE;
        
        this.elements.cartSubtotal.textContent = this.formatPrice(subtotal);
        this.elements.cartDiscount.textContent = this.formatPrice(discount);
        this.elements.cartDelivery.textContent = this.formatPrice(DELIVERY_FEE);
        this.elements.cartTotal.textContent = this.formatPrice(total);
        
        // Habilitar/desabilitar botão de finalizar
        this.elements.cartCheckout.disabled = this.cart.length === 0;
    }

    updateCartCount() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        this.elements.cartCount.textContent = totalItems;
        this.elements.cartCount.setAttribute('aria-label', `${totalItems} itens no carrinho`);
    }

    toggleCartEmptyState() {
        const hasItems = this.cart.length > 0;
        
        this.elements.cartEmpty.style.display = hasItems ? 'none' : 'flex';
        this.elements.cartItems.style.display = hasItems ? 'block' : 'none';
        this.elements.cartSummary.style.display = hasItems ? 'block' : 'none';
    }

    toggleCart() {
        const cartSidebar = document.querySelector('.cart-sidebar');
        const isHidden = cartSidebar.getAttribute('aria-hidden') === 'true';
        
        if (isHidden && this.cart.length > 0) {
            this.openCart();
        } else {
            this.closeCart();
        }
    }

    openCart() {
        const cartSidebar = document.querySelector('.cart-sidebar');
        cartSidebar.setAttribute('aria-hidden', 'false');
        this.elements.cartOpener.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    closeCart() {
        const cartSidebar = document.querySelector('.cart-sidebar');
        cartSidebar.setAttribute('aria-hidden', 'true');
        this.elements.cartOpener.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('Adicione itens ao carrinho antes de finalizar');
            return;
        }
        
        const total = this.elements.cartTotal.textContent;
        this.showNotification(`Pedido finalizado! Total: ${total}`);
        
        // Simular processamento
        setTimeout(() => {
            this.cart = [];
            this.updateCart();
            this.closeCart();
        }, 2000);
    }

    // ===== UTILITÁRIOS =====
    formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    }

    showNotification(message) {
        // Remover notificação existente
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Mostrar
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    scrollToPizzas() {
        const pizzasSection = document.querySelector('.pizzas-section');
        pizzasSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== DADOS DAS PIZZAS =====
const pizzaJson = [
    {
        id: 1,
        name: 'Mussarela',
        img: 'images/pizza.png',
        price: [20.00, 23.00, 25.00],
        sizes: ['6 fatias', '8 fatias', '12 fatias'],
        description: 'Molho de tomate, camada dupla de mussarela e orégano'
    },
    {
        id: 2,
        name: 'Calabresa',
        img: 'images/pizza2.png',
        price: [21.00, 24.00, 26.00],
        sizes: ['6 fatias', '8 fatias', '12 fatias'],
        description: 'Molho de tomate, mussarela, calabresa fatiada, cebola e orégano'
    },
    {
        id: 3,
        name: 'Quatro Queijos',
        img: 'images/pizza3.png',
        price: [23.00, 26.00, 28.00],
        sizes: ['6 fatias', '8 fatias', '12 fatias'],
        description: 'Molho de tomate, camadas de mussarela, provolone, parmessão, gorgonzola e orégano'
    },
    {
        id: 4,
        name: 'Brasileira',
        img: 'images/pizza4.png',
        price: [25.00, 28.00, 30.00],
        sizes: ['6 fatias', '8 fatias', '12 fatias'],
        description: 'Molho de tomate, mussarela, calabresa picada, palmito, champignon, azeitonas e orégano'
    },
    {
        id: 5,
        name: 'Portuguesa',
        img: 'images/pizza5.png',
        price: [24.00, 27.00, 29.00],
        sizes: ['6 fatias', '8 fatias', '12 fatias'],
        description: 'Molho de tomate, mussarela, presunto, ovos, cebolas, pimentão, azeitona e orégano'
    },
    {
        id: 6,
        name: 'Moda da Casa',
        img: 'images/pizza6.png',
        price: [30.00, 33.00, 35.00],
        sizes: ['6 fatias', '8 fatias', '12 fatias'],
        description: 'Molho de tomate, mussarela, carne de sol, tomates em cubos, coentro, cebola, azeitona, catupiry e orégano'
    },
    {
        id: 7,
        name: 'Banana com canela',
        img: 'images/pizza7.png',
        price: [27.00, 30.00, 32.00],
        sizes: ['6 fatias', '8 fatias', '12 fatias'],
        description: 'Mussarela, banana, canela e açúcar'
    },
    {
        id: 8,
        name: 'Chocolate com morango',
        img: 'images/pizza8.png',
        price: [30.00, 32.00, 35.00],
        sizes: ['6 fatias', '8 fatias', '12 fatias'],
        description: 'Creme de leite, lascas de chocolate e morangos'
    },
    {
        id: 9,
        name: 'Frango com Catupiry',
        img: 'images/pizza.png',
        price: [26.00, 29.00, 31.00],
        sizes: ['6 fatias', '8 fatias', '12 fatias'],
        description: 'Molho de tomate, frango desfiado, catupiry e orégano'
    },
    {
        id: 10,
        name: 'Margherita',
        img: 'images/pizza2.png',
        price: [22.00, 25.00, 27.00],
        sizes: ['6 fatias', '8 fatias', '12 fatias'],
        description: 'Molho de tomate, mussarela, tomate fresco, manjericão e azeite'
    }
];

// ===== INICIALIZAÇÃO DA APLICAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    new PizzaStore();
});

// ===== SERVICE WORKER (OPCIONAL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}