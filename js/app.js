 // STUDENTS IGNORE THIS FUNCTION
 // * All this does is create an initial
 // * attendance record if one is not found
 // * within localStorage.
 // */

//burn to ground : start over
//try to implement with MVO(model, view, octopus)
//view consist of three views - tableView, rowView, countView

//change something on model -> save it in model and localStorage

const NUM_OF_STUDENT = 5;
const NUM_OF_DAYS = 12;

//student data consists of name, attendance, # of missed date(missed)
var model = {
    studentName: ['Slappy the Frog', 'Lilly the Lizard', 'Paulrus the Walrus', 'Gregory the Goat', 'Adam the Anaconda'],

    init: function (){
        var students = [];
        this.studentName.forEach(function(e, i){
            students.push({
                name: e,        //name of students
                attendance: [], //attendance on each date (NUM_OF_DAYS will decide size of attendence)
                missed: 0       //number of missed date
            })
        });
        this.students = students;
    },
    //populate students from local storage
    getStudents: function(){
        this.students = JSON.parse(localStorage.students);
    },
    //put students into local storage
    putStudents: function(){
        localStorage.students = JSON.stringify(this.students);

    }
};

var octopus = {
    //If localStorage.student has data, use it
    //If not, create attendence data by using Math.random
    //          and store it to localStorage.student
    init: function(){
        if(!localStorage.students){
            console.log('Creating students records...');
            model.init();
            model.students.forEach(function(e,i){
                for (var j=0; j<NUM_OF_DAYS; j++){
                    e.attendance[j] = octopus.getRandom();
                };

            });

            model.putStudents();
        }
        else{
            console.log('Using existing students records from localStorage');
            model.getStudents();
        }

        //Initialize html stucture using tableView and rowView
        tableView.init();
        rowView.init();
    },
    getRandom: function() {
        return (Math.random() >= 0.5);
    },
    getStudents: function(){
        return model.students;
    },
    saveStudents: function(){
        model.putStudents();
    },
    updateAttendance: function(studenti, date){
        if(model.students[studenti].attendance[date])
            model.students[studenti].attendance[date] = false;
        else
            model.students[studenti].attendance[date] = true;

        model.putStudents();
    },
    getCount: function(i, studenti){
        // Always re-count missed date for a student everytime checkbox is checked or unchecked
        var $studentRow = $('tbody .name-col:contains("' + studenti.name + '")').siblings('.attend-col'),
            dayChecks = $studentRow.children('input');

        model.students[i].missed = 0;

        dayChecks.each(function(j){
            if(!$(this).prop('checked')){
                model.students[i].missed++;
            }
        });
        model.putStudents();

        return model.students[i].missed;
    }
};

//===== 3 Views =====
var tableView = {
    //Create overall html structure
    init: function(){
        //Create sub-structure of thead and tbody
        this.$thead = $('thead');
        this.$tbody = $('tbody');
        this.students = octopus.getStudents();
        this.render();
    },
    render: function(){
        var $thead = this.$thead;
        var $tbody = this.$tbody;
        var students = this.students;

        //Create thead structure
        $thead.append('<tr><th class="name-col">Student Name</th></tr>');

        for (var i=1; i<=NUM_OF_DAYS; i++){
            $thead.children().append('<th>'+ i + '</th>');
        }
        $thead.children().append('<th class="missed-col">Days Missed-col</th>');

        this.$thead = $thead;

        //Create tbody structure
        for(var i=0; i<NUM_OF_STUDENT; i++){
            $tbody.append('<tr class="student"></tr>');
        };
    }
};

var rowView = {
    //Fill in details onto html structure created by tableView
    //Set checkbox(.checked) based on attendance records
    init: function(){
        this.$tbody_student = $('tbody .student');
        this.students = octopus.getStudents();
        var students = this.students;

        this.$tbody_student.each(function(i, e){
            //Draw each row in table :
            rowView.render(i, e);


            //Event handler for clicking checkbox
            //Check checkbox -> update count(missed) in attendence and value in missed-col (Need to update html ?)
            //Uncheck checkbox -> same as above
            $(this).on('click', '.attend-col', function(){
                var $input = $(this).children('input');
                if (rowView.students[i].attendance[this.id]){// this =>  <td class="attend-col">
                    $input.removeAttr('checked');
                }
                else{
                    $input.attr('checked', 'checked');
                }
                octopus.updateAttendance(i, this.id);
                countView.render(i, students[i], $(this));
            })
        });

    },
    render: function(i, e){
        //1. create checkbox with checked property
        //2. calculate missed date and put in in .missed-col

        var studenti = this.students[i]
        //name-col
        $(e).append('<td class="name-col">' + studenti.name + '</td>');

        //attend-col
        for(var j=0; j<NUM_OF_DAYS; j++){
            if(studenti.attendance[j]){
                $(e).append('<td id="' + j + '" class="attend-col"><input type="checkbox" checked="checked"></td>');
            }
            else {
                $(e).append('<td id="' + j + '" class="attend-col"><input type="checkbox"></td>');
            }
        }
        //missed-col
        $(e).append('<td class="missed-col">' + octopus.getCount(i, studenti) + '</td>');

    }

};

var countView = {
    //Put the number of missed date in .missed-col
    init: function(){
    },
    render: function(i, studenti, $student){
        $student.siblings('.missed-col').text(octopus.getCount(i, studenti));
    }

};
octopus.init();
