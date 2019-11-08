var DatePicker = function () {
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
    var reqIndex;
    var  previousSelectedDate;
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
        if(month > 11){
            month = 0;
            year++;
        }
        mth_element.textContent =  months[month] + ' ' + year;
        populateDates(month,year);

    }

    function goToPrevMonth(){
        month--;
        if(month < 0 ){
            month = 11;
            year--;
        }
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
                // if(i == firstDay){
                //  day_element.tabIndex = 0;
                // }
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
        if(reqIndex == undefined){
            for (let i = 0; i < allElements.length; i++) {
                if (allElements[i].className == "day selected") {

                    previousSelectedDate = i;
                    reqIndex=i;
                    break;
                }
            }
        }


        switch (e.keyCode) {
            case 13:
                selected_date_element.textContent = "";
                selected_date_element.textContent = formateDate(new Date( selected_year + '-' + (selected_month+1)+ '-' + (reqIndex - 6-(new Date(selected_year, selected_month)).getDay()) ));
                // selected_date_element.dataset.value = new Date( selected_year + '-' + (selected_year+1)+ '-' + (e.target.textContent) );
                allElements[previousSelectedDate].classList.remove('selected');
                allElements[reqIndex].classList.add('selected');
                previousSelectedDate=reqIndex;
                break;
            case 37:
                if(allElements[reqIndex-8] != undefined){
                    allElements[reqIndex].classList.remove('move');
                    allElements[reqIndex-1].classList.add('move');
                    reqIndex=reqIndex-1;
                }

                break;
            case 38:
                if(reqIndex >= 14){
                    allElements[reqIndex].classList.remove('move');
                    allElements[reqIndex-7].classList.add('move');
                    reqIndex=reqIndex-7;
                }

                break;
            case 39:
                if(allElements[reqIndex+1] != undefined){
                    allElements[reqIndex].classList.remove('move');
                    allElements[reqIndex+1].classList.add('move');
                    reqIndex = reqIndex+1;
                }

                break;
            case 40:
                if(allElements[reqIndex+7] != undefined){
                    allElements[reqIndex].classList.remove('move');
                    allElements[reqIndex+7].classList.add('move');
                    reqIndex=reqIndex+7;
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
};

const datePicker = DatePicker();

const date_picker_element = document.getElementById('required-date-picker');
date_picker_element.addEventListener('click',datePicker.toggleCalendar);

const next_mth_element = document.getElementById('required-next-mth');
next_mth_element.addEventListener('click',datePicker.nextMonth);
next_mth_element.onkeydown = function(e){
    switch (e.keyCode) {
        case 39:
            datePicker.nextMonth();
            break;
    }

};

const prev_mth_element = document.getElementById('required-prev-mth');
prev_mth_element.addEventListener('click',datePicker.previousMonth);
prev_mth_element.onkeydown = function(e){
    switch (e.keyCode) {
        case 37:
            datePicker.previousMonth();
            break;
    }
};

document.addEventListener('click',datePicker.hideDatePicker);









