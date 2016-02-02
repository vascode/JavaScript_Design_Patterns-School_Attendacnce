 // STUDENTS IGNORE THIS FUNCTION
 // * All this does is create an initial
 // * attendance record if one is not found
 // * within localStorage.
 // */

//burn to ground : start over
//try to implement with MVO(model, view, octopus)
//view consist of three views - tableView, rowView, countView

//student data consists of name, attendance, # of missed date(missed)
var model = {
    studentName: ['Slappy the Frog', 'Lilly the Lizard', 'Paulrus the Walrus', 'Gregory the Goat', 'Adam the Anaconda'],

    init: function (){
        var student = [];
        this.studentName.forEach(function(e, i){
            student.push({
                name: e,        //name of students
                attendance: [], //attendance on each date (12 elements will be filled in in octopus.init())
                missed: 0       //number of missed date
            })
        });
        this.student = student;
    },
    //populate students from local storage
    getStudent: function(){
        this.student = JSON.parse(localStorage.student);
    },
    //put students into local storage
    putStudent: function(){
        localStorage.student = JSON.stringify(this.student);

    }
};

var octopus = {
    //If localStorage.student has data, use it
    //If not, create attendence data by using Math.random
    //          and store it to localStorage.student
    init: function(){
        if(!localStorage.student){
            console.log('Creating student records...');
            model.init();
            model.student.forEach(function(e,i){
                for (var j=0; j<12; j++){
                    e.attendance[j] = octopus.getRandom();
                };

            });

            model.putStudent();
        }
        else{
            console.log('Using existing student records from localStorage');
            return model.getStudent();
        }

        //Initialize html stucture using tableView and rowView
        tableView.init();
        rowView.init();
    },
    getRandom: function() {
        return (Math.random() >= 0.5);
    },
    getStudent: function(){
        return model.student
    }

};


//===== 3 Views =====
var tableView = {
    //Create overall html structure
    init: function(){
        //Create sub-structure of thead and tbody
        this.$thead = $('thead');
        this.$tbody = $('tbody');
        this.student = octopus.getStudent();
        this.render();
    },
    render: function(){
        var $thead = this.$thead;
        var $tbody = this.$tbody;
        var student = this.student;

        //Create thead structure
        var html = '<tr><th class="name-col">Student Name</th></tr>';

        $thead.append(html);

        for (var i=1; i<=12; i++){
            $thead.children().append('<th>'+ i + '</th>');
        }
        $thead.children().append('<th class="missed-col">Days Missed-col</th>');

        this.$thead = $thead;

        //Create tbody structure
        for(var i=0; i<5; i++){
            $tbody.append('<tr class="student"></tr>');
        }



    }
};

octopus.init();

var rowView = {
    //Fill in details onto html structure created by tableView
    init: function(){

    },
    render: function(){

    }

};

var countView = {
    //Put the number of missed date in .missed-col
    init: function(){

    },
    render: function(){

    }

};

// octopus.init();



// /*

// (function() {
//     if (!localStorage.attendance) {
//         console.log('Creating attendance records...');
//         function getRandom() {
//             return (Math.random() >= 0.5);
//         }

//         var nameColumns = $('tbody .name-col'),
//             attendance = {};

//         nameColumns.each(function() {
//             var name = this.innerText;
//             attendance[name] = [];

//             for (var i = 0; i <= 11; i++) {
//                 attendance[name].push(getRandom());
//             }
//         });

//         localStorage.attendance = JSON.stringify(attendance);
//     }
// }());


// /* STUDENT APPLICATION */
// $(function() {
//     var attendance = JSON.parse(localStorage.attendance),
//         $allMissed = $('tbody .missed-col'),
//         $allCheckboxes = $('tbody input');

//     // Count a student's missed days
//     function countMissing() {
//         $allMissed.each(function() {
//             var studentRow = $(this).parent('tr'),
//                 dayChecks = $(studentRow).children('td').children('input'),
//                 numMissed = 0;

//             dayChecks.each(function() {
//                 if (!$(this).prop('checked')) {
//                     numMissed++;
//                 }
//             });

//             $(this).text(numMissed);
//         });
//     }

//     // Check boxes, based on attendace records
//     $.each(attendance, function(name, days) {
//         var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
//             dayChecks = $(studentRow).children('.attend-col').children('input');

//         dayChecks.each(function(i) {
//             $(this).prop('checked', days[i]);
//         });
//     });

//     // When a checkbox is clicked, update localStorage
//     $allCheckboxes.on('click', function() {
//         var studentRows = $('tbody .student'),
//             newAttendance = {};

//         studentRows.each(function() {
//             var name = $(this).children('.name-col').text(),
//                 $allCheckboxes = $(this).children('td').children('input');

//             newAttendance[name] = [];

//             $allCheckboxes.each(function() {
//                 newAttendance[name].push($(this).prop('checked'));
//             });
//         });

//         countMissing();
//         localStorage.attendance = JSON.stringify(newAttendance);
//     });

//     countMissing();
// }());
