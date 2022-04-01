//Выбор гендера
const male = document.querySelector('#gender-male');
const female = document.querySelector('#gender-female');
const genders = document.querySelectorAll('input[name = "gender"]');
let gender = 'male';

// Минимальный показатели активности
let ratioActivityDef = 1.2;

//Параметры для калькулятора
const age = document.querySelector('#age');
const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const allParametrs = document.querySelectorAll('input[type = "text"]');


//Радио кнопкии привязка параметров ratioActivity
const minimalActivity = document.querySelector('#activity-minimal');
const lowActivity = document.querySelector('#activity-low');
const mediumActivity = document.querySelector('#activity-medium');
const heightActivity = document.querySelector('#activity-high');
const maxActivity = document.querySelector('#activity-maximal');
const allActivities = document.querySelectorAll('input[name = "activity"]');


//Захват кнопок очистки и кнопка расчёта
const calcBtn = document.querySelector('.form__submit-button');
const resetBtn = document.querySelector('.form__reset-button');


// Выбор гендера
genders.forEach(item => {
	item.addEventListener('change', event => {
		if (item.value === 'male') {
			gender = 'male';
		} else {
			gender = 'female';
		}
	})
});


// Приём параметров человека
allParametrs.forEach(item => {
	item.addEventListener('change', event => {
		// Разлог для кнопки calcBtn и resetBtn
		if (age.value != 0 && height.value != 0 && weight.value != 0) {
			calcBtn.disabled = false;
		} else {
			calcBtn.disabled = true;
		}

		if (age.value != 0 || height.value != 0 || weight.value != 0) {
			resetBtn.disabled = false;
		} else {
			resetBtn.disabled = true;
		}
	})
});


// Выбор активности
allActivities.forEach(item => {
	item.addEventListener('change', event => {
		if (item.id === 'activity-minimal') {
			ratioActivityDef = 1.2;
		} else if (item.id === 'activity-low') {
			ratioActivityDef = 1.375;
		} else if (item.id === 'activity-medium') {
			ratioActivityDef = 1.55;
		} else if (item.id === 'activity-high') {
			ratioActivityDef = 1.725;
		} else if (item.id === 'activity-maximal') {
			ratioActivityDef = 1.9;
		}
	})
});


// Кнопка очистки параметров
resetBtn.addEventListener('click', event => {
	age.value = 0;
	height.value = 0;
	weight.value = 0;
	result.classList.add('counter__result--hidden');
	calcBtn.disabled = true;
	resetBtn.disabled = true;
	gender = 'male';
});


// Захватываем результирующие параметры
const result = document.querySelector('.counter__result')
const neededCallories = document.querySelector('#calories-norm');
const minimalCallories = document.querySelector('#calories-minimal');
const maxCallories = document.querySelector('#calories-maximal');

// Создаём переменные для приема расчётов
let point = 0;
let getPoint = 0;
let losePoint = 0;

// Расчёты каллорий 
calcBtn.addEventListener('click', event => {
	result.classList.remove('counter__result--hidden');

	if (gender === 'male') {
		point = ((10 * weight.value) + (6.25 * height.value) - (5 * age.value) + 5) * ratioActivityDef;
	} else {
		point = ((10 * weight.value) + (6.25 * height.value) - (5 * age.value) - 161) * ratioActivityDef;
	}

	// Набор и сброс веса

	getPoint = point + (point * 0.15);
	losePoint = point - (point * 0.15);
//  Замена дефолт значений
	neededCallories.textContent = Math.round(point);
	minimalCallories.textContent = Math.round(losePoint);
	maxCallories.textContent = Math.round(getPoint);
});