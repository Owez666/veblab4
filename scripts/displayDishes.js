document.addEventListener('DOMContentLoaded', function() {
    // Сортируем блюда по названию в алфавитном порядке
    const sortedDishes = [...dishes].sort((a, b) => a.name.localeCompare(b.name));

    const grids = {
        'soup': document.getElementById('soups-grid'),
        'main': document.getElementById('main-grid'),
        'drink': document.getElementById('drinks-grid')
    };

    // Очищаем существующие сетки
    Object.values(grids).forEach(grid => {
        if (grid) grid.innerHTML = '';
    });

    // Создаем карточки для каждого блюда
    sortedDishes.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.className = 'dish-card';
        dishCard.setAttribute('data-dish', dish.keyword);

        dishCard.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}" onerror="this.src='images/placeholder.jpg'">
            <p class="price">${dish.price} ₽</p>
            <p class="name">${dish.name}</p>
            <p class="weight">${dish.count}</p>
            <button class="add-button">Добавить</button>
        `;

        if (grids[dish.category]) {
            grids[dish.category].appendChild(dishCard);
        }
    });
});