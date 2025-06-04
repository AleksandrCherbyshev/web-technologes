// Данные о продуктах
const products = [
    {
        id: 'nvidia-rtx-4090',
        category: 'nvidia',
        price: 259999,
        memory: 24,
        title: 'Видеокарта NVIDIA GeForce RTX 4090',
        description: 'Видеочипсет NVIDIA GTX 4000, 2235 МГц (12530 МГц в режиме Восст.); Память 24 ГБ GDDR6X, 21000 МГц; Интерфейс PCI-E 4.0',
        imageUrl: 'images/RTX4090.2.png',
        thumbnailUrl: 'images/RTX4090.png'
    },
    {
        id: 'nvidia-gtx-1660',
        category: 'nvidia',
        price: 35000,
        memory: 6,
        title: 'Видеокарта NVIDIA GeForce GTX 1660',
        description: 'Видеочипсет NVIDIA GTX 1660, 1530 МГц (1830 МГц в режиме Восст.); Память 6 ГБ GDDR5, 8000 МГц; Интерфейс PCI-E 3.0',
        imageUrl: 'images/GTX1660S.png',
        thumbnailUrl: 'images/GTX1660S.2.png'
    },
    {
        id: 'nvidia-rtx-3080',
        category: 'nvidia',
        price: 75000,
        memory: 10,
        title: 'Видеокарта NVIDIA GeForce RTX 3060TI',
        description: 'Видеочипсет NVIDIA GTX 3060, 1440 МГц (1710 МГц в режиме Восст.); Память 8 ГБ GDDR6X, 19000 МГц; Интерфейс PCI-E 4.0',
        imageUrl: 'images/RTX3060TI.png',
        thumbnailUrl: 'images/RTX3060TI.png'
    },
    {
        id: 'amd-rx-7800xt',
        category: 'amd',
        price: 180000,
        memory: 16,
        title: 'Видеокарта AMD Radeon RX 7800 XT',
        description: 'Видеочипсет AMD RX 7800 XT, 2210 МГц; Память 16 ГБ GDDR6, 19.5 Гбит/с; Интерфейс PCI-E 4.0',
        imageUrl: 'images/RX7900.png',
        thumbnailUrl: 'images/RX7900.png'
    },
    {
        id: 'intel-arc-a770',
        category: 'intel',
        price: 50000,
        memory: 8,
        title: 'Видеокарта Intel Arc A770',
        description: 'Видеочипсет Intel Arc A770, 2100 МГц; Память 8 ГБ GDDR6, 16 Гбит/с; Интерфейс PCI-E 4.0',
        imageUrl: 'images/intelarca770.webp',
        thumbnailUrl: 'images/intelarca770.webp'
    },
];

// Функция для отображения нужной страницы и скрытия остальных
function showPage(pageId) {
    try {
        const pageSections = document.querySelectorAll('.page-section');
        pageSections.forEach(section => {
            section.classList.remove('active');
        });

        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.add('active');
            console.log(`Страница "${pageId}" активирована.`);
        } else {
            console.error(`Ошибка: Секция страницы с ID "${pageId}" не найдена.`);
        }

        history.pushState(null, '', `#${pageId}`);
    } catch (error) {
        console.error('Ошибка в функции showPage:', error);
    }
}

// Функция для отображения подробной информации о продукте
function showProductDetail(productId) {
    try {
        const product = products.find(p => p.id === productId);
        if (!product) {
            console.error(`Продукт с ID "${productId}" не найден.`);
            return;
        }

        document.getElementById('detail-product-image').src = product.imageUrl;
        document.getElementById('detail-product-image').alt = product.title;
        document.getElementById('detail-product-title').textContent = product.title;
        document.getElementById('detail-product-description').textContent = product.description;
        document.getElementById('detail-product-price').textContent = `Цена: ${product.price.toLocaleString('ru-RU')} Р`;

        showPage('product-detail'); // Переключаемся на страницу деталей продукта
    } catch (error) {console.error('Ошибка в функции showProductDetail:', error);
    }
}

// Функция для рендеринга карточек продуктов
function renderProductCards() {
    try {
        const productListDiv = document.getElementById('product-list');
        if (!productListDiv) {
            console.error('Элемент #product-list не найден.');
            return;
        }
        productListDiv.innerHTML = ''; // Очищаем список перед рендерингом

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center';
            productCard.dataset.id = product.id; // Добавляем data-id для идентификации
            productCard.dataset.category = product.category;
            productCard.dataset.price = product.price;
            productCard.dataset.memory = product.memory;

            productCard.innerHTML = `
                <img src="${product.thumbnailUrl}" alt="${product.title}" class="w-full h-auto object-cover mb-4 rounded-md cursor-pointer" data-product-id="${product.id}">
                <h3 class="text-xl font-semibold text-white mb-2 text-center">${product.title}</h3>
                <p class="text-gray-400 text-sm text-center mb-4">${product.description}</p>
                <p class="text-2xl font-bold text-white mb-4">Цена: ${product.price.toLocaleString('ru-RU')} Р</p>
                <div class="flex space-x-2">
                    <button class="btn-primary py-2 px-4 rounded-md hover:opacity-90">В корзину</button>
                    <button class="bg-gray-600 text-white py-2 px-4 rounded-md hover:opacity-90">В избранное</button>
                </div>
            `;
            productListDiv.appendChild(productCard);

            // Добавляем обработчик клика на изображение для перехода на страницу деталей
            const imageElement = productCard.querySelector('img');
            if (imageElement) {
                imageElement.addEventListener('click', (event) => {
                    const clickedProductId = event.target.dataset.productId;
                    if (clickedProductId) {
                        showProductDetail(clickedProductId);
                    }
                });
            }
        });
    } catch (error) {
        console.error('Ошибка в функции renderProductCards:', error);
    }
}

// Функция для применения всех фильтров (поиск, категория, цена, память)
function applyFilters() {
    try {
        const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
        const selectedCategory = document.querySelector('.category-link.active')?.dataset.category || 'all';
        const minPrice = parseInt(document.getElementById('min-price-slider')?.value || '0', 10);
        const maxPrice = parseInt(document.getElementById('max-price-slider')?.value || '500000', 10);
        const selectedMemoryFilters = Array.from(document.querySelectorAll('.memory-filter:checked')).map(cb => parseInt(cb.value, 10));

        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const titleElement = card.querySelector('h3');
            const descriptionElement = card.querySelector('p:nth-of-type(1)');

            const title = titleElement ? titleElement.textContent.toLowerCase() : '';
            const description = descriptionElement ? descriptionElement.textContent.toLowerCase() : '';

            const category = card.dataset.category;
            const price = parseInt(card.dataset.price || '0', 10);
            const memory = parseInt(card.dataset.memory || '0', 10);

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
            const matchesPrice = price >= minPrice && price <= maxPrice;
            const matchesMemory = selectedMemoryFilters.length === 0 || selectedMemoryFilters.includes(memory);

            if (matchesSearch && matchesCategory && matchesPrice && matchesMemory) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    } catch (error) {
        console.error('Ошибка в функции applyFilters:', error);
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Рендерим карточки продуктов при загрузке страницы
        renderProductCards();

        // Обработчики событий для навигационных ссылок
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const pageId = link.dataset.page;
                showPage(pageId);
            });
        });

        // Обработка навигации по хешу URL для прямой ссылки на страницы
        const initialHash = window.location.hash.substring(1);
        if (initialHash && document.getElementById(initialHash)) {
            showPage(initialHash);
        } else {
            showPage('home');
        }

        // Логика для поиска
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
        } else {
            console.warn('Предупреждение: Элемент поиска (search-input) не найден.');
        }

        // Логика для фильтрации по категориям
        document.querySelectorAll('.category-link').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                document.querySelectorAll('.category-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                applyFilters();
            });
        });

        // Устанавливаем активную категорию по умолчанию (Все)
        const allCategoryLink = document.querySelector('.category-link[data-category="all"]');
        if (allCategoryLink) {
            allCategoryLink.classList.add('active');
        } else {
            console.warn('Предупреждение: Ссылка категории "Все" не найдена.');
        }

        // Логика для ползунка диапазона цен
        const minPriceSlider = document.getElementById('min-price-slider');
        const maxPriceSlider = document.getElementById('max-price-slider');
        const priceRangeDisplay = document.getElementById('price-range-display');

        if (minPriceSlider && maxPriceSlider && priceRangeDisplay) {
            function updatePriceRangeDisplay() {
                try {
                    let minVal = parseInt(minPriceSlider.value, 10);
                    let maxVal = parseInt(maxPriceSlider.value, 10);

                    if (minVal > maxVal) {
                        [minVal, maxVal] = [maxVal, minVal];
                        minPriceSlider.value = minVal.toString();
                        maxPriceSlider.value = maxVal.toString();
                    }

                    priceRangeDisplay.textContent = `${minVal.toLocaleString('ru-RU')} Р - ${maxVal.toLocaleString('ru-RU')} Р`;
                    applyFilters();
                } catch (error) {
                    console.error('Ошибка в updatePriceRangeDisplay:', error);
                }
            }

            minPriceSlider.addEventListener('input', updatePriceRangeDisplay);
            maxPriceSlider.addEventListener('input', updatePriceRangeDisplay);

            updatePriceRangeDisplay();
        } else {
            console.warn('Предупреждение: Элементы ползунков цен или отображения диапазона не найдены.');
        }

        // Логика для фильтрации по объему видеопамяти
        document.querySelectorAll('.memory-filter').forEach(checkbox => {
            if (checkbox) {
                checkbox.addEventListener('change', applyFilters);
            }
        });

        applyFilters();
    } catch (error) {
        console.error('Ошибка во время DOMContentLoaded:', error);
    }
});