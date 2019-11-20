var DatePicker = (function () {
    const selected_date_element = document.getElementById('required-selected-date');
    const dates_element = document.getElementById('required-dates');
    const mth_element = document.getElementById('required-mth');
    const days_element = document.getElementById('required-days');
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const daysOfMonth = ["sun","mon","tue","wed","thus","fri","sat"];
//const months_element = document.querySelector('.date-picker .dates .months');


    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    let selected_day = day;
    let selected_month = month;
    let selected_year = year;
    let reqIndex;
    let  previousSelectedDate;
    let moveTabFromHere;
    let firstDayOfMonth;
    mth_element.textContent =  months[month] + ' ' + year;

    selected_date_element.textContent = formateDate(date);
    populateDates(selected_month,selected_year);

    selected_date_element.addEventListener('keypress',showCalender);


    function toggleDatePicker(e){
        if(!checkPathForClass(e.path,'dates')){
            dates_element.classList.toggle('active');
        }
        e.stopPropagation();
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

    function gotToNextMonth(){
        month++;
        selected_month = month;
        if(month > 11){
            month = 0;
            year++;
        }
        selected_year = year;
        mth_element.textContent =  months[month] + ' ' + year;
        populateDates(month,year);

    }

    function goToPrevMonth(){
        month--;
        selected_month = month;
        if(month < 0 ){
            month = 11;
            year--;
        }
        selected_year = year;
        mth_element.textContent =  months[month] + ' ' + year;
        populateDates(month,year);

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

    function hideCalendar(){
        dates_element.classList.remove('active');
    }

    function showCalender(e){
        if(e.keyCode == 13){
            dates_element.classList.toggle('active');
        }

    }

    function daysInMonth(iMonth, iYear)
    {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    function populateDates(currentMonth,currentYear){
        days_element.innerHTML = '';
        let firstDay = (new Date(currentYear, currentMonth)).getDay();
        firstDayOfMonth = firstDay;
        moveTabFromHere=firstDay;
        for(let j=0; j<daysOfMonth.length ; j++){
            const days_of_week = document.createElement('div');
            days_of_week.textContent = daysOfMonth[j];
            days_element.appendChild(days_of_week);
        }

        let date = 1;
        for (let i=0; i < daysInMonth(currentMonth, currentYear)+firstDay; i++){
            const day_element = document.createElement('div');
            day_element.classList.add('day');
            if(i < firstDay){
                day_element.textContent = "";
            }else{
                if(i == firstDay){
                 day_element.classList.add('move');
                }
                day_element.textContent = date;
                date++;
            }

            if(selected_day == (date -1 ) && selected_month == month && selected_year == year){
                day_element.classList.add('selected');
            }
            day_element.addEventListener('click', function(e){
                selectedDate = new Date( year + '-' + (month+1)+ '-' + (e.target.textContent) );
                selected_day= e.target.textContent ;
                selected_month = month;
                selected_year = year;
                selected_date_element.textContent = formateDate(selectedDate);
                selected_date_element.dataset.value = selectedDate;
                populateDates(selected_month,selected_year);

            });

            days_element.appendChild(day_element);


        }

    }

    days_element.onkeydown = function(e){
        let allElements = days_element.children;

            for (let i = 0; i < allElements.length; i++) {
                if (allElements[i].className == "day selected") {
                    previousSelectedDate = i;
                    break;
                }
            }



        switch (e.keyCode) {
            case 13:
                selected_date_element.textContent = "";
                selected_date_element.textContent = formateDate(new Date( year + '-' + (month+1)+ '-' + (moveTabFromHere-firstDayOfMonth+1) ));
                allElements[previousSelectedDate].classList.remove('selected');
                allElements[moveTabFromHere+7].classList.add('selected');
                previousSelectedDate=moveTabFromHere;
                break;
            case 37:
                if((moveTabFromHere-1) >= firstDayOfMonth){
                    allElements[moveTabFromHere+7].classList.remove('move');
                    allElements[moveTabFromHere+7-1].classList.add('move');
                    moveTabFromHere=moveTabFromHere-1;
                }

                break;
            case 38:
                if((moveTabFromHere - 7) >= firstDayOfMonth ){
                    allElements[moveTabFromHere+7].classList.remove('move');
                    allElements[moveTabFromHere].classList.add('move');
                    moveTabFromHere = moveTabFromHere-7;
                }

                break;
            case 39:
                if(allElements[moveTabFromHere+1+7] != undefined){
                    allElements[moveTabFromHere+7].classList.remove('move');
                    allElements[moveTabFromHere+1+7].classList.add('move');
                    moveTabFromHere = moveTabFromHere+1;
                }

                break;
            case 40:
                if((moveTabFromHere+7) < 35){
                    allElements[moveTabFromHere+7].classList.remove('move');
                    allElements[moveTabFromHere+14].classList.add('move');
                    moveTabFromHere=moveTabFromHere+7;
                }

                break;
        }
    };

    return {
        toggleCalendar: toggleDatePicker,
        nextMonth: gotToNextMonth,
        previousMonth: goToPrevMonth,
        hideDatePicker: hideCalendar


    }
})();

// const datePicker = DatePicker();

const date_picker_element = document.getElementById('required-date-picker');
date_picker_element.addEventListener('click',DatePicker.toggleCalendar);

const next_mth_element = document.getElementById('required-next-mth');
next_mth_element.addEventListener('click',DatePicker.nextMonth);
next_mth_element.onkeydown = function(e){
    switch (e.keyCode) {
        case 39:
            DatePicker.nextMonth();
            break;
    }

};

const prev_mth_element = document.getElementById('required-prev-mth');
prev_mth_element.addEventListener('click',DatePicker.previousMonth);
prev_mth_element.onkeydown = function(e){
    switch (e.keyCode) {
        case 37:
            DatePicker.previousMonth();
            break;
    }
};

document.addEventListener('click',DatePicker.hideDatePicker);

const selected_date_element = document.getElementById('required-selected-date');
const submit_selected_date = document.getElementById('submit-selected-date');
submit_selected_date.addEventListener('click',submitSelectedDate);

function submitSelectedDate() {
    let chosenDate = document.getElementById('required-selected-date').innerHTML;

    let requiredData={
        selDate:chosenDate
    }
    fetch('http://localhost:3000/selected/date', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify(requiredData)
    })
        .then((resp) => resp.json())
        .then(function(data) {
            alert(data['message']);
        })
        .catch(function(error) {
            console.log("ERROR:"+error);
        });
}









