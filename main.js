const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const months_element = document.querySelector('.date-picker .dates .months');
const mth_element = document.querySelector('.date-picker .dates .months .mth');
const next_mth_element = document.querySelector('.date-picker .dates .months .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .months .prev-mth');

const days_element = document.querySelector('.date-picker .days');
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selected_day = day;
let selected_month = month;
let selected_year = year;


mth_element.textContent =  months[month] + ' ' + year;

selected_date_element.textContent = formateDate(date);
populateDates();

date_picker_element.addEventListener('click',toggleDatePicker);
next_mth_element.addEventListener('click',gotToNextMonth);
prev_mth_element.addEventListener('click',goToPrevMonth);
document.addEventListener('click',hideCalendar);
selected_date_element.addEventListener('keypress',showCalender);


function toggleDatePicker(e){
if(!checkPathForClass(e.path,'dates')){
	dates_element.classList.toggle('active');
}
e.stopPropagation();
}

function gotToNextMonth(){
	month++;
	if(month > 11){
		month = 0;
		year++;
	}
	mth_element.textContent =  months[month] + ' ' + year;
	populateDates();

}

function goToPrevMonth(){
	month--;
	if(month < 0 ){
		month = 11;
		year--;
	}
	mth_element.textContent =  months[month] + ' ' + year;
	populateDates();

}

//helper function to check path for class 
function checkPathForClass(path,selector){
	for(let i=0; i<path.length;i++){
       if(path[i].classList &&  path[i].classList.contains(selector)){
       	return true;
       }
	}
	return false;
	
}

function formateDate(d){
	let day = d.getDate();
	if(day < 0){
		day = '0' + day;
	}
	let month = d.getMonth() + 1;
	if(month < 0){
		month = '0' + month;
	}
	let year = d.getFullYear();

	return day + '/' + month + '/' + year;
}

function populateDates(){
    days_element.innerHTML = '';
	let amount_days = 31;

	if(month == 1){
		amount_days = 28;
	}

	for (let i=0; i < amount_days; i++){
		const day_element = document.createElement('div');
		day_element.classList.add('day');
		day_element.textContent = i+1;
		if(selected_day == (i+1) && selected_month == month && selected_year == year){
			day_element.classList.add('selected');
		}
           day_element.addEventListener('click', function(){
           	console.log("day is selected");
           	selectedDate = new Date( year + '-' + (month+1)+ '-' + (i+1) );
           	selected_day= i+1;
           	selected_month = month;
           	selected_year = year;
           	selected_date_element.textContent = formateDate(selectedDate);
           	selected_date_element.dataset.value = selectedDate;
           	populateDates();

           });
		days_element.appendChild(day_element);


	}

}

function hideCalendar(){
	dates_element.classList.remove('active');
}

function showCalender(e){
	if(e.keyCode == 13){
		dates_element.classList.toggle('active');
	}
	
}

months_element.onkeydown = function(e) {
	console.log(e.keyCode);
    switch (e.keyCode) {
        case 37:
            goToPrevMonth();
            break;
        case 39:
            gotToNextMonth();
            break;
    }
};
