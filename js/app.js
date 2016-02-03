 // STUDENTS IGNORE THIS FUNCTION
 // * All this does is create an initial
 // * attendance record if one is not found
 // * within localStorage.
 // */

//burn to ground : start over
//try to implement with MVO(model, view, octopus)
//view consist of three views - tableView, rowView, countView

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
                for (var j=0; j<NUM_OF_STUDENT; j++){
                    e.attendance[j] = octopus.getRandom();
                };

            });

            model.putStudents();
        }
        else{
            console.log('Using existing students records from localStorage');
            return model.getStudents();
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
    countMissed: function(student){
        var $studentRow = $('tbody .name-col:contains("' + student.name + '")').parent('tr'),
            dayChecks = $studentRow.children('td').children('input');

        dayChecks.each(function(i){
            if(!$(this).prop('checked')){
                student.missed++;
            }
        });

        return student.missed;
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
    //Set checkbox(checked, not checked) based on attendance records
    init: function(){
        this.$tbody_student = $('tbody .student');
        this.students = octopus.getStudents();

        this.$tbody_student.each(function(i, e){
            //Draw each row in table
            rowView.render(i, e);

            //Event handler for clicking checkbox (-> update count in missed-col)


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



        });

    },
    render: function(i, e){
        //name-col
        $(e).append('<td class="name-col">' + this.students[i].name + '</td>');

        //attend-col
        for(var j=0; j<NUM_OF_DAYS; j++){
            $(e).append('<td class="attend-col"><input type="checkbox"></td>');
        }

        //missed-col
        $(e).append('<td class="missed-col">' + this.students[i].missed + '</td>');

        //     // Check boxes, based on attendace records
//     $.each(attendance, function(name, days) {
//         var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
//             dayChecks = $(studentRow).children('.attend-col').children('input');

//         dayChecks.each(function(i) {
//             $(this).prop('checked', days[i]);
//         });
//     });


    }

};


octopus.init();



/* STUDENT APPLICATION */
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
