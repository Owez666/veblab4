document.addEventListener('DOMContentLoaded', function() {
    const orderState = {
        soup: null,
        main: null,
        drink: null
    };

    // Обработчик кликов по кнопкам "Добавить"
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-button')) {
            const dishCard = e.target.closest('.dish-card');
            const dishKeyword = dishCard.getAttribute('data-dish');
            const dish = dishes.find(d => d.keyword === dishKeyword);
            
            if (dish) {
                selectDish(dish.category, dish);
                updateOrderDisplay();
            }
        }
    });

    function selectDish(category, dish) {
        // Снимаем выделение с предыдущего блюда в категории
        if (orderState[category]) {
            const prevCard = document.querySelector(`[data-dish="${orderState[category].keyword}"]`);
            if (prevCard) prevCard.classList.remove('selected');
        }

        // Добавляем выделение новому блюду
        const newCard = document.querySelector(`[data-dish="${dish.keyword}"]`);
        if (newCard) newCard.classList.add('selected');

        orderState[category] = dish;
    }

    function updateOrderDisplay() {
        updateCategoryDisplay('soup', 'selected-soup', 'Суп');
        updateCategoryDisplay('main', 'selected-main', 'Основное блюдо');
        updateCategoryDisplay('drink', 'selected-drink', 'Напиток');
        
        updateTotalPrice();
        toggleOrderVisibility();
        updateHiddenFields();
    }

    function updateCategoryDisplay(category, elementId, categoryName) {
        const element = document.getElementById(elementId);
        if (orderState[category]) {
            element.innerHTML = `${orderState[category].name} - ${orderState[category].price} ₽`;
        } else {
            element.innerHTML = categoryName === 'Напиток' ? 'Напиток не выбран' : 'Блюдо не выбрано';
        }
    }

    function updateTotalPrice() {
        const total = Object.values(orderState).reduce((sum, dish) => {
            return sum + (dish ? dish.price : 0);
        }, 0);
        
        document.getElementById('total-price').textContent = total;
    }

    function toggleOrderVisibility() {
        const hasSelection = Object.values(orderState).some(dish => dish !== null);
        const noSelection = document.getElementById('no-selection');
        const orderCategories = document.querySelectorAll('.order-category');
        const orderTotal = document.getElementById('order-total');

        noSelection.style.display = hasSelection ? 'none' : 'block';
        orderCategories.forEach(cat => cat.style.display = hasSelection ? 'block' : 'none');
        orderTotal.style.display = hasSelection ? 'block' : 'none';
    }

    function updateHiddenFields() {
        document.getElementById('soup-keyword').value = orderState.soup ? orderState.soup.keyword : '';
        document.getElementById('main-keyword').value = orderState.main ? orderState.main.keyword : '';
        document.getElementById('drink-keyword').value = orderState.drink ? orderState.drink.keyword : '';
    }

    // Обработчик отправки формы
    document.getElementById('order-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const orderData = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            soup: formData.get('soup'),
            main: formData.get('main'),
            drink: formData.get('drink'),
            total: document.getElementById('total-price').textContent
        };

        console.log('Данные заказа:', orderData);
        alert('Заказ оформлен! С вами свяжутся для подтверждения.');
        this.reset();
        resetOrder();
    });

    function resetOrder() {
        Object.keys(orderState).forEach(category => {
            orderState[category] = null;
        });
        document.querySelectorAll('.dish-card').forEach(card => {
            card.classList.remove('selected');
        });
        updateOrderDisplay();
    }
});