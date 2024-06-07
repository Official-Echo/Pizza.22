const pizzaInfo = [
	{
		id: 1,
		icon: "assets/images/pizza_7_transparent.png",
		title: "Імпреза",
		type: "М’ясна піца",
		content: {
			meat: ["балик", "салямі"],
			chicken: ["куриця"],
			cheese: ["сир моцарелла", "сир рокфорд"],
			pineapple: ["ананаси"],
			additional: ["томатна паста", "петрушка"],
		},
		small_size: {
			weight: 370,
			size: 30,
			price: 99,
		},
		big_size: {
			weight: 660,
			size: 40,
			price: 169,
		},
		is_new: true,
	},
	{
		id: 2,
		icon: "assets/images/pizza_2_transparent.png",
		title: "BBQ",
		type: "М’ясна піца",
		content: {
			meat: ["мисливські ковбаски", "ковбаски папероні", "шинка"],
			cheese: ["сир домашній"],
			mushroom: ["шампінйони"],
			additional: ["петрушка", "оливки"],
		},
		small_size: {
			weight: 460,
			size: 30,
			price: 139,
		},
		big_size: {
			weight: 840,
			size: 40,
			price: 199,
		},
		is_popular: true,
	},
	{
		id: 3,
		icon: "assets/images/pizza_1_transparent.png",
		title: "Міксовий поло",
		type: "М’ясна піца",
		content: {
			meat: ["вітчина", "куриця копчена"],
			cheese: ["сир моцарелла"],
			pineapple: ["ананаси"],
			additional: ["кукурудза", "петрушка", "соус томатний"],
		},
		small_size: {
			weight: 430,
			size: 30,
			price: 115,
		},
		big_size: {
			weight: 780,
			size: 40,
			price: 179,
		},
	},
	{
		id: 4,
		icon: "assets/images/pizza_5_transparent.png",
		title: "Сициліано",
		type: "М’ясна піца",
		content: {
			meat: ["вітчина", "салямі"],
			cheese: ["сир моцарелла"],
			mushroom: ["шампінйони"],
			additional: ["перець болгарський", "соус томатний"],
		},
		small_size: {
			weight: 450,
			size: 30,
			price: 111,
		},
		big_size: {
			weight: 790,
			size: 40,
			price: 169,
		},
	},
	{
		id: 17,
		icon: "assets/images/pizza_3_transparent.png",
		title: "Маргарита",
		type: "Вега піца",
		content: {
			cheese: ["сир моцарелла", "сир домашній"],
			tomato: ["помідори"],
			additional: ["базилік", "оливкова олія", "соус томатний"],
		},
		small_size: {
			weight: 370,
			size: 30,
			price: 89,
		},
	},
	{
		id: 43,
		icon: "assets/images/pizza_6_transparent.png",
		title: "Мікс смаків",
		type: "М’ясна піца",
		content: {
			meat: ["ковбаски"],
			cheese: ["сир моцарелла"],
			mushroom: ["шампінйони"],
			pineapple: ["ананаси"],
			additional: ["цибуля кримська", "огірки квашені", "соус гірчичний"],
		},
		small_size: {
			weight: 470,
			size: 30,
			price: 115,
		},
		big_size: {
			weight: 780,
			size: 40,
			price: 180,
		},
	},
	{
		id: 90,
		icon: "assets/images/pizza_8_transparent.png",
		title: "Дольче Маре",
		type: "Морська піца",
		content: {
			ocean: [
				"криветки тигрові",
				"мідії",
				"ікра червона",
				"філе червоної риби",
			],
			cheese: ["сир моцарелла"],
			additional: ["оливкова олія", "вершки"],
		},
		big_size: {
			weight: 845,
			size: 40,
			price: 399,
		},
	},
	{
		id: 6,
		icon: "assets/images/pizza_4_transparent.png",
		title: "Россо Густо",
		type: "Морська піца",
		content: {
			ocean: ["ікра червона", "лосось копчений"],
			cheese: ["сир моцарелла"],
			additional: ["оливкова олія", "вершки"],
		},
		small_size: {
			weight: 400,
			size: 30,
			price: 189,
		},
		big_size: {
			weight: 700,
			size: 40,
			price: 299,
		},
	},
];

let lastRowHeight = 3;
let urlParams = new URLSearchParams(window.location.search);
let cart = urlParams.get("cart")
	? JSON.parse(decodeURIComponent(urlParams.get("cart")))
	: {};
let totalSum = 0;

function updateCart() {
	const cartWrapper = document.getElementById("aside-item-wrapper");
	cartWrapper.innerHTML = "";
	totalSum = 0;

	for (const key in cart) {
		const pizza = cart[key];
		const pizzaData = pizzaInfo.find((p) => p.id === pizza.id);
		const size = pizza.isSmall ? pizzaData.small_size : pizzaData.big_size;
		const div = document.createElement("section");
		div.className = "item";
		div.innerHTML = `
            <section class="description-of-bought">
                <section class="label">${pizzaData.title} (${pizza.isSmall ? "Мала" : "Велика"
			})</section>
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
                <section class="pricing" style="box-sizing: border-box; min-height: 30px; align-content: center; padding-bottom:1px">
                    <span class="total-cost">${size.price * pizza.count
			} грн</span>
                    <span class="item-counter number-of-ordered">${pizza.count
			}</span>
                </section>
            </section>
            <img src="${pizzaData.icon}" alt='Піца "${pizzaData.title}"' />
        `;
		cartWrapper.appendChild(div);
		totalSum += size.price * pizza.count;
	}

	document.querySelector(".number-of-ordered").textContent = Object.values(
		cart
	).reduce((acc, pizza) => acc + pizza.count, 0);
	document.querySelector(".finalprice").textContent = totalSum + " грн";
}

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
	drawPizzaTypeHistogram();
	drawOrderSizeHistogram();
	drawIndividualPizzaOrdersHistogram();
	drawPizzaOrdersByNameHistogram();
	drawPizzaTypePieChart();
	drawTotalPriceByTypeHistogram();
}

function drawPizzaTypeHistogram() {
	const data = getPizzaData();
	const typeData = [["Тип піци", "Кількість замовлень"]];

	data.slice(1).forEach(([type, count]) => {
		typeData.push([type, count]);
	});

	const chartOptions = {
		title: "Кількість замовлених піц по типах",
		legend: { position: "none" },
		hAxis: { title: "Тип піци" },
		vAxis: { title: "Кількість замовлень" },
		backgroundColor: "transparent",
	};

	const chartContainer = document.createElement("div");
	chartContainer.className = "chartContainer";
	chartContainer.style.width = "600px";
	chartContainer.style.height = "500px";
	document.getElementById("grid").appendChild(chartContainer);

	const chart = new google.visualization.ColumnChart(chartContainer);
	chart.draw(google.visualization.arrayToDataTable(typeData), chartOptions);
}

function drawOrderSizeHistogram() {
	const sizeData = [["Розмір піци", "Кількість замовлень"]];
	let smallCount = 0;
	let bigCount = 0;

	for (const key in cart) {
		const { isSmall, count } = cart[key];
		if (isSmall) {
			smallCount += count;
		} else {
			bigCount += count;
		}
	}

	sizeData.push(["Мала", smallCount]);
	sizeData.push(["Велика", bigCount]);

	const chartOptions = {
		title: "Кількість замовлень по розмірам піц",
		legend: { position: "none" },
		hAxis: { title: "Розмір піци" },
		vAxis: { title: "Кількість замовлень" },
		backgroundColor: "transparent",
	};

	const chartContainer = document.createElement("div");
	chartContainer.className = "chartContainer";
	chartContainer.style.width = "600px";
	chartContainer.style.height = "500px";
	document.getElementById("grid").appendChild(chartContainer);

	const chart = new google.visualization.ColumnChart(chartContainer);
	chart.draw(google.visualization.arrayToDataTable(sizeData), chartOptions);
}

function drawIndividualPizzaOrdersHistogram() {
	const pizzaData = [["Назва піци", "Кількість замовлень"]];

	for (const key in cart) {
		const { id, count, isSmall } = cart[key];
		const pizza = pizzaInfo.find((p) => p.id === id);
		const pizzaSizeString = isSmall ? "(велика)" : "(мала)";
		pizzaFullString = pizza.title + ' ' + pizzaSizeString;
		pizzaData.find((row) => row[0] === pizzaFullString)
			? (pizzaData.find((row) => row[0] === pizzaFullString)[1] += count)
			: pizzaData.push([pizzaFullString, count]);
	}

	const chartOptions = {
		title: "Кількість замовлень за окремими піцами",
		legend: { position: "none" },
		hAxis: { title: "Назва піци" },
		vAxis: { title: "Кількість замовлень" },
		backgroundColor: "transparent",
	};

	const chartContainer = document.createElement("div");
	chartContainer.className = "chartContainer";
	chartContainer.style.width = "600px";
	chartContainer.style.height = "500px";
	document.getElementById("grid").appendChild(chartContainer);

	const chart = new google.visualization.ColumnChart(chartContainer);
	chart.draw(google.visualization.arrayToDataTable(pizzaData), chartOptions);
}

function drawPizzaOrdersByNameHistogram() {
	const pizzaData = [["Назва піци", "Кількість замовлень"]];

	for (const key in cart) {
		const { id, count } = cart[key];
		const pizza = pizzaInfo.find((p) => p.id === id);
		pizzaData.find((row) => row[0] === pizza.title)
			? (pizzaData.find((row) => row[0] === pizza.title)[1] += count)
			: pizzaData.push([pizza.title, count]);
	}

	const chartOptions = {
		title: "Кількість замовлень за назвами піц",
		legend: { position: "none" },
		hAxis: { title: "Назва піци" },
		vAxis: { title: "Кількість замовлень" },
		backgroundColor: "transparent"
	};

	const chartContainer = document.createElement("div");
	chartContainer.className = "chartContainer";
	chartContainer.style.width = "600px";
	chartContainer.style.height = "500px";
	document.getElementById("grid").appendChild(chartContainer);

	const chart = new google.visualization.PieChart(chartContainer);
	chart.draw(google.visualization.arrayToDataTable(pizzaData), chartOptions);
}

function drawPizzaTypePieChart() {
	const data = getPizzaData();

	const chartOptions = {
		title: "Розподіл замовлень за типами піц",
		pieHole: 0.4,
		backgroundColor: "transparent",
	};

	const chartContainer = document.createElement("div");
	chartContainer.className = "chartContainer";
	chartContainer.style.width = "600px";
	chartContainer.style.height = "500px";
	document.getElementById("grid").appendChild(chartContainer);

	const chart = new google.visualization.PieChart(chartContainer);
	chart.draw(google.visualization.arrayToDataTable(data), chartOptions);
}

function drawTotalPriceByTypeHistogram() {
	const priceData = [["Тип піци", "Сума замовлень (грн)"]];
	const typePriceMap = {};

	for (const key in cart) {
		const { id, count, isSmall } = cart[key];
		const pizza = pizzaInfo.find((p) => p.id === id);
		const size = isSmall ? pizza.small_size : pizza.big_size;
		const price = size.price * count;

		if (typePriceMap[pizza.type]) {
			typePriceMap[pizza.type] += price;
		} else {
			typePriceMap[pizza.type] = price;
		}
	}

	for (const [type, price] of Object.entries(typePriceMap)) {
		priceData.push([type, price]);
	}

	const chartOptions = {
		title: "Сумарна вартість замовлень по типах піц",
		legend: { position: "none" },
		hAxis: { title: "Тип піци" },
		vAxis: { title: "Сума замовлень (грн)" },
		backgroundColor: "transparent",
		bar: { groupWidth: "15%" },
	};

	const chartContainer = document.createElement("div");
	chartContainer.className = "chartContainer";
	chartContainer.style.width = "600px";
	chartContainer.style.height = "500px";
	document.getElementById("grid").appendChild(chartContainer);

	const chart = new google.visualization.BarChart(chartContainer);
	chart.draw(google.visualization.arrayToDataTable(priceData), chartOptions);
}

function getPizzaData() {
	const chartData = [["Тип піци", "Кількість замовлень"]];

	for (const key in cart) {
		const { id, count } = cart[key];
		const pizza = pizzaInfo.find((p) => p.id === id);
		const type = pizza.type;

		chartData.find((row) => row[0] === type)
			? (chartData.find((row) => row[0] === type)[1] += count)
			: chartData.push([type, count]);
	}

	return chartData;
}

updateCart();

document
	.getElementsByClassName("order-button")[0]
	.addEventListener("click", () => {
		window.location.href = `index.html`;
	});
