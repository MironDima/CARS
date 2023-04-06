const select = document.querySelector('select')
const result = document.getElementById('result')

const render = (cars) => {
	result.innerHTML = select.options[select.selectedIndex].text
}

const filter = (cars, selectValue) => {
	let objCars = cars.filter(carElem => {
		if (selectValue === carElem.brand) {
			result.innerHTML = `Тачка ${carElem.brand} ${carElem.model}<br> Цена: ${carElem.price}`
		}
	})
	return objCars
}
select.addEventListener('change', (e) => {
	const value = e.target.value
	getData('./db/cars.json').then(data => render(filter(data, value)))

})

const getData = async (url) => {
	const responseCars = await fetch(url)
	const cars = await responseCars.json()
	const arrCars = cars.cars
	return arrCars
}

getData('./db/cars.json')
	.then(data => render(data))
	.catch(error => console.log(error))
