class CartItem {
    constructor(element) {
        this.element = element;
        this.price = parseFloat(element.dataset.price);
        this.quantityInput = element.querySelector('.counter');
        this.minusBtn = element.querySelector('.minus');
        this.plusBtn = element.querySelector('.plus');
        this.heartIcon = element.querySelector('.fa-heart');
        this.trashIcon = element.querySelector('.fa-trash');

        this.init();
    }

    // Initialize event listeners
    init() {
        this.heartIcon.addEventListener('click', () => this.toggleHeart());
        this.trashIcon.addEventListener('click', () => this.removeItem());
        this.minusBtn.addEventListener('click', () => this.decreaseQuantity());
        this.plusBtn.addEventListener('click', () => this.increaseQuantity());
        this.quantityInput.addEventListener('change', () => this.updateQuantity());
    }

    // Toggle heart icon color
    toggleHeart() {
        this.heartIcon.classList.toggle('heart-red');
    }

    // Remove item from the DOM and notify the cart
    removeItem() {
        this.element.remove();
        Cart.updateTotalPrice();
    }

    // Decrease quantity
    decreaseQuantity() {
        let quantity = parseInt(this.quantityInput.value);
        if (quantity > 1) {
            this.quantityInput.value = quantity - 1;
            Cart.updateTotalPrice();
        }
    }

    // Increase quantity
    increaseQuantity() {
        let quantity = parseInt(this.quantityInput.value);
        this.quantityInput.value = quantity + 1;
        Cart.updateTotalPrice();
    }

    // Update total price when quantity changes
    updateQuantity() {
        Cart.updateTotalPrice();
    }

    // Calculate the total price for this item
    getTotalPrice() {
        return this.price * parseInt(this.quantityInput.value);
    }
}

class Cart {
    static cartItems = [];
    static totalPriceElement = document.querySelector('.total-price');

    // Initialize the cart by finding all items
    static init() {
        document.querySelectorAll('.cart-item').forEach(element => {
            this.cartItems.push(new CartItem(element));
        });
        this.updateTotalPrice();
    }

    // Update the total price of the cart
    static updateTotalPrice() {
        let total = 0;
        this.cartItems.forEach(item => {
            if (document.body.contains(item.element)) { // Check if the item is still in the DOM
                total += item.getTotalPrice();
            }
        });
        this.totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }
}

// Initialize the cart when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    Cart.init();
});
