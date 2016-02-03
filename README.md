udacity-frontend-attendance
===========================

# original repository for the School Attendance Application: https://github.com/udacity/ud989-school-attendance
$ inspired about how to structure code by https://github.com/PaulMatencio/ud989-school-attendance/

I burn original code to ground and start over but still use some of original functions

#This application has following MVO structure: 
- model : Contains all the data including students Name, attended dates, the number of missed date
- octopus : Whenever views need to access model to get/modify/put data, octopus plays a role of bridge
- view : broken into three views
  - tableView : generate general layout of html for table (not creating row or filling in data yet)
  - rowView : generate checkboxs for each student and put missed date after calculation
  - countView : when checkbox is checked or unchecked, this function is called so that the number of missed date is updated.
