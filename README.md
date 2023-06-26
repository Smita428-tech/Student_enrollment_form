# employee_form
Development of Employee Form with Control Buttons

1.Create an employee form as per the video link given at the end to store data in following columns of the relation "EmpData" in "EMP-DB" database.

 {id, name, salary, hra, da, deduction}

2.There will be three disabled control buttons [Save] [Change] [Reset] at the bottom of the form.

3.On page load or any control button click, an empty form will be displayed and the cursor will remain at 'Employee ID'. All other fields and buttons should be disabled at this time.

4.User will enter data in 'Employee ID' and

If {id} does NOT exist in the database, enable [Save] and [Reset] buttons and move the cursor to the next field and allow you to enter data in the form.

Check that the data should be valid i.e. no empty fields.

Complete the data entry form and click the [Save] button to store the data in the database and go to step-2.

Click [Reset] to reset the form as per the step-2.

If {id} is present in the database, display that data in the form. Enable [Change] and [Reset] buttons and move the cursor to the 'Employee Name' field in the form. Keep disable the 'Employee ID' field and allow users to change other form fields.

Check that the data should be valid i.e. no empty fields.

Click on [Change] button to update the data in the database and go to step-2.

Click [Reset] to reset the form as per the step-2.

5.This overall form will make the {id} to behave as Primary Key in the relation.
