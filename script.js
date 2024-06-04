const pizzaInfo = [
	{
		id: 1,
		icon: 'assets/images/pizza_7_transparent.png',
		title: "Імпреза",
		type: 'М’ясна піца',
		content: {
			meat: ['балик', 'салямі'],
			chicken: ['куриця'],
			cheese: ['сир моцарелла', 'сир рокфорд'],
			pineapple: ['ананаси'],
			additional: ['томатна паста', 'петрушка']
		},
		small_size: {
			weight: 370,
			size: 30,
			price: 99
		},
		big_size: {
			weight: 660,
			size: 40,
			price: 169
		},
		is_new: true,
		is_popular: true

	},
	{
		id: 2,
		icon: 'assets/images/pizza_2_transparent.png',
		title: "BBQ",
		type: 'М’ясна піца',
		content: {
			meat: ['мисливські ковбаски', 'ковбаски папероні', 'шинка'],
			cheese: ['сир домашній'],
			mushroom: ['шампінйони'],
			additional: ['петрушка', 'оливки']
		},
		small_size: {
			weight: 460,
			size: 30,
			price: 139
		},
		big_size: {
			weight: 840,
			size: 40,
			price: 199
		},
		is_popular: true
	},
	{
		id: 3,
		icon: 'assets/images/pizza_1_transparent.png',
		title: "Міксовий поло",
		type: 'М’ясна піца',
		content: {
			meat: ['вітчина', 'куриця копчена'],
			cheese: ['сир моцарелла'],
			pineapple: ['ананаси'],
			additional: ['кукурудза', 'петрушка', 'соус томатний']
		},
		small_size: {
			weight: 430,
			size: 30,
			price: 115
		},
		big_size: {
			weight: 780,
			size: 40,
			price: 179
		}
	},
	{
		id: 4,
		icon: 'assets/images/pizza_5_transparent.png',
		title: "Сициліано",
		type: 'М’ясна піца',
		content: {
			meat: ['вітчина', 'салямі'],
			cheese: ['сир моцарелла'],
			mushroom: ['шампінйони'],
			additional: ['перець болгарський', 'соус томатний']
		},
		small_size: {
			weight: 450,
			size: 30,
			price: 111
		},
		big_size: {
			weight: 790,
			size: 40,
			price: 169
		}
	},
	{
		id: 17,
		icon: 'assets/images/pizza_3_transparent.png',
		title: "Маргарита",
		type: 'Вега піца',
		content: {
			cheese: ['сир моцарелла', 'сир домашній'],
			tomato: ['помідори'],
			additional: ['базилік', 'оливкова олія', 'соус томатний']
		},
		small_size: {
			weight: 370,
			size: 30,
			price: 89
		}
	},
	{
		id: 43,
		icon: 'assets/images/pizza_6_transparent.png',
		title: "Мікс смаків",
		type: 'М’ясна піца',
		content: {
			meat: ['ковбаски'],
			cheese: ['сир моцарелла'],
			mushroom: ['шампінйони'],
			pineapple: ['ананаси'],
			additional: ['цибуля кримська', 'огірки квашені', 'соус гірчичний']
		},
		small_size: {
			weight: 470,
			size: 30,
			price: 115
		},
		big_size: {
			weight: 780,
			size: 40,
			price: 180
		}
	},
	{
		id: 90,
		icon: 'assets/images/pizza_8_transparent.png',
		title: "Дольче Маре",
		type: 'Морська піца',
		content: {
			ocean: ['криветки тигрові', 'мідії', 'ікра червона', 'філе червоної риби'],
			cheese: ['сир моцарелла'],
			additional: ['оливкова олія', 'вершки']
		},
		big_size: {
			weight: 845,
			size: 40,
			price: 399
		}
	},
	{
		id: 6,
		icon: 'assets/images/pizza_4_transparent.png',
		title: "Россо Густо",
		type: 'Морська піца',
		content: {
			ocean: ['ікра червона', 'лосось копчений'],
			cheese: ['сир моцарелла'],
			additional: ['оливкова олія', 'вершки']
		},
		small_size: {
			weight: 400,
			size: 30,
			price: 189
		},
		big_size: {
			weight: 700,
			size: 40,
			price: 299
		}
	}
];

let cart = JSON.parse(localStorage.getItem('cart')) || {};
let totalSum = 0;

function updateCart() {
	const cartWrapper = document.getElementById('aside-item-wrapper');
	cartWrapper.innerHTML = '';
	totalSum = 0;

	for (const key in cart) {
		const pizza = cart[key];
		const pizzaData = pizzaInfo.find(p => p.id === pizza.id);
		const size = pizza.isSmall ? pizzaData.small_size : pizzaData.big_size;
		const div = document.createElement('section');
		div.className = 'item';
		div.innerHTML = `
            <section class="description-of-bought">
                <section class="label">${pizzaData.title} (${pizza.isSmall ? 'Мала' : 'Велика'})</section>
                <section class="specs-wrapper">
                    <section class="svg-symbol">
                        <img src="assets/images/size-icon.svg" alt="Ø symbol" />
                        <span>${size.size}</span>
                    </section>
                    <section class="svg-symbol">
                        <img src="assets/images/weight.svg" alt="Weight symbol" />
                        <span>${size.weight}</span>
                    </section>
                </section>
                <section class="pricing">
                    <span class="total-cost">${size.price * pizza.count} грн</span>
                    <button class="round-button minus-button" onclick="changePizzaCount('${key}', -1)">–</button>
                    <span class="item-counter">${pizza.count}</span>
                    <button class="round-button add-button" onclick="changePizzaCount('${key}', 1)">+</button>
                    <button class="round-button delete-button" onclick="removePizza('${key}')"></button>
                </section>
            </section>
            <img src="${pizzaData.icon}" alt='Піца "${pizzaData.title}"' />
        `;
		cartWrapper.appendChild(div);
		totalSum += size.price * pizza.count;
	}

	document.querySelector('.number-of-ordered').textContent = Object.values(cart).reduce((acc, pizza) => acc + pizza.count, 0);
	document.querySelector('.finalprice').textContent = totalSum + ' грн';
}

function addToCart(id, isSmall) {
	const key = `${id}-${isSmall ? 'small' : 'big'}`;
	if (cart[key]) {
		cart[key].count++;
	} else {
		cart[key] = { id: id, isSmall: isSmall, count: 1 };
	}
	localStorage.setItem('cart', JSON.stringify(cart));
	updateCart();
}

function changePizzaCount(key, change) {
	cart[key].count += change;
	if (cart[key].count <= 0) {
		delete cart[key];
	}
	localStorage.setItem('cart', JSON.stringify(cart));
	updateCart();
}

function removePizza(key) {
	delete cart[key];
	localStorage.setItem('cart', JSON.stringify(cart));
	updateCart();
}

function clearCart() {
	cart = {};
	localStorage.setItem('cart', JSON.stringify(cart));
	updateCart();
}

function displayPizzas(filter = null) {
	const grid = document.getElementById('grid');
	grid.innerHTML = '';

	let filteredPizzas = pizzaInfo;
	if (filter === 'vega') {
		filteredPizzas = pizzaInfo.filter(pizza => !pizza.content.meat && !pizza.content.ocean);
	} else if (filter) {
		filteredPizzas = pizzaInfo.filter(pizza => pizza.content[filter]);
	}

	filteredPizzas.forEach(pizza => {
		const div = document.createElement('section');
		div.innerHTML = `
            <section>
                ${pizza.is_new ? '<span class="aux-s new">Нова</span>' : ''}
                ${pizza.is_popular ? '<span class="aux-s popular">Популярна</span>' : ''}
                <section class="grid-entry">
                    <img src="${pizza.icon}" alt='Піца "${pizza.title}"' />
                    <section class="grid-entry-data-wrapper">
                        <span class="title">${pizza.title}</span>
                        <span class="type">${pizza.type}</span>
                        <p class="description">${Object.values(pizza.content).flat().join(', ')}</p>
                        <section class="grid-entry-info">
                            ${pizza.small_size ? `
                                <section>
                                    <section class="size">
                                        <img src="assets/images/size-icon.svg" alt="Ø symbol" />
                                        <span>${pizza.small_size.size}</span>
                                    </section>
                                    <section class="weight">
                                        <img src="assets/images/weight.svg" alt="Weight symbol" />
                                        <span>${pizza.small_size.weight}</span>
                                    </section>
                                    <span class="price">${pizza.small_size.price}</span>
                                    <span class="currency">грн.</span>
                                    <button class="buy-button enter-button" onclick="addToCart(${pizza.id}, true)">Купити</button>
                                </section>
                            ` : ''}
                            ${pizza.big_size ? `
                                <section>
                                    <section class="size">
                                        <img src="assets/images/size-icon.svg" alt="Ø symbol" />
                                        <span>${pizza.big_size.size}</span>
                                    </section>
                                    <section class="weight">
                                        <img src="assets/images/weight.svg" alt="Weight symbol" />
                                        <span>${pizza.big_size.weight}</span>
                                    </section>
                                    <span class="price">${pizza.big_size.price}</span>
                                    <span class="currency">грн.</span>
                                    <button class="buy-button enter-button" onclick="addToCart(${pizza.id}, false)">Купити</button>
                                </section>
                            ` : ''}
                        </section>
                    </section>
                </section>
            </section>
        `;
		grid.appendChild(div);
	});
	document.querySelector('.pizzacount').textContent = filteredPizzas.length;
}

document.getElementById('clear-cart-items').addEventListener('click', clearCart);

document.getElementById('filter').addEventListener('click', (event) => {
	if (event.target.tagName === 'SPAN') {
		const filterName = event.target.textContent;
		const filterDisplay = filterName === 'Усі' || filterName === 'Вега' || filterName === "М\'ясні" ? filterName + ' піци' : 'Піци ' + filterName.toLowerCase();
		document.querySelector('.pizza-filter-name').textContent = filterDisplay;

		const filter = filterName.toLowerCase();
		const mapping = {
			'усі': null,
			'м\'ясні': 'meat',
			'з ананасами': 'pineapple',
			'з грибами': 'mushroom',
			'з морепродуктами': 'ocean',
			'вега': 'vega'
		};
		displayPizzas(mapping[filter]);
	}
});

displayPizzas();
updateCart();