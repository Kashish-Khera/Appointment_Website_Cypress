import 'cypress-iframe';

describe('DatePicker Testcases ', () => {
    it('1.Manually type in the date field', () => {


        // here our date field is in iframe so we imported iframe plugin

        cy.visit("https://jqueryui.com/datepicker/")
        cy.frameLoaded(".demo-frame")
        cy.iframe().find("#datepicker").type("16/01/2008")
    });

    it('2. Choose from the calender', () => {
        
        cy.visit("https://demo.automationtesting.in/Datepicker.html")

        // upon clicking in the field , calender is displayed 
        cy.get("#datepicker1").click()
        cy.get("#ui-datepicker-div").should("be.visible")

    });
});


describe('B. Make Appointment Page', () => {

    beforeEach(() => {

        // visit the page , click on make appointment button and login using the creds
        cy.visit("https://katalon-demo-cura.herokuapp.com/")
        cy.get("#btn-make-appointment").click()
        cy.get('#txt-username').type("John Doe")
        cy.get('#txt-password').type("ThisIsNotAPassword")
        cy.get("#btn-login").click()
    })

    it('9. Datepickeris displayed or not', () => {

        // upon clicking the field , datepicker is dislayed

        cy.get("#txt_visit_date").click()
        cy.get(".datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-bottom").should("be.visible")

        // upon clicking the icon

        cy.get(".glyphicon.glyphicon-calendar").click()
        cy.get(".datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-bottom").should("be.visible")

        // check if the current month and year is diasplayed or not 

        cy.get("div[class='datepicker-days'] th[class='datepicker-switch']").should("include.text", "November 2023")

    });

    it('10. Manually type the current date ', () => {


        /* 
        ${} (Template Literal):

                The backticks (``) are used to create a template literal in JavaScript. This allows you to embed expressions inside a string.
                currentDate.getDate() (Get Day of the Month):

                currentDate.getDate() is a method of the Date object in JavaScript. It returns the day of the month (from 1 to 31) for the specified date.
                / (Slash):

                This is a simple forward slash used as a separator in the string.
                currentDate.getMonth() + 1 (Get Month):

                currentDate.getMonth() is another method of the Date object. It returns the month for the specified date, where January is 0 and December is 11.
                Adding + 1 is necessary because months in JavaScript are zero-based. So, adding 1 adjusts the month value to be in the range of 1 to 12 (January to December).
                / (Slash):

                Another separator in the string.
                currentDate.getFullYear() (Get Year):

                currentDate.getFullYear() is yet another method of the Date object. It returns the year for the specified date with four digits.
                Putting it all together:

                ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} creates a string representing the formatted date in the "dd/mm/yyyy" format.
        
        */

        // type current date (explanation obove)

        const today_date = new Date();
        cy.log(today_date);

        const formatted_date = `${today_date.getDate()}/${today_date.getMonth() + 1}/${today_date.getFullYear()}`
        const current_date = `${today_date.getDate()}`
        const current_year = `${today_date.getFullYear()}`

        // converted the monthnumber to monthname 
        const currentMonthName = today_date.toLocaleString('en-US', { month: 'long' });


        // toLocaleString('en-US', { month: 'long' }) uses the toLocaleString method to format the date according to the specified locale ('en-US' for English in the United States).
        // { month: 'long' } is an options object that specifies the formatting options. In this case, it specifies that we want the full month name.

        cy.get("#txt_visit_date").type(formatted_date)

        // check if the date is visible or not on the field 
        cy.get("#txt_visit_date").should("have.value", formatted_date)

        // check if the date is blue highlighted in the datepicker 

        cy.get(".active.day").should("include.text", current_date)

        // check the month name and year 

        // concatenated the monthname and year 
        const month_year = `${currentMonthName} ${current_year}`
        cy.get("div[class='datepicker-days'] th[class='datepicker-switch']").should("include.text", month_year)


    });


    it('11. Manually type the some date and check if it is blue highlighted in datepicker', () => {

        // type current date 

        const random_date = "16/01/2008"
        cy.get("#txt_visit_date").type(random_date)
        cy.get("#txt_visit_date").should("have.value", random_date)

        // check if this ate is visible in the calender or not with blue color
        cy.get(".active.day").should("include.text", 16)

        cy.get("div[class='datepicker-days'] th[class='datepicker-switch']").should("include.text", "January 2008")



    });


    it('12. Geanrate random date and typwe it  Manually in the date field ', () => {

        // Generate a random day, month, and year
        const randomDay = Math.floor(Math.random() * 28) + 1; // Assuming 28 days in a month for simplicity
        const randomMonth = Math.floor(Math.random() * 12) + 1; // Months are 1-12
        const randomYear = Math.floor(Math.random() * (2023 - 2000 + 1)) + 2000; // Assuming years between 2000 and 2023

        // Helper function to zero-pad a number
        const zeroPad = (num) => (num < 10 ? `0${num}` : num);

        // Format the date components to "dd/mm/yyyy"
        const formattedDate = `${zeroPad(randomDay)}/${zeroPad(randomMonth)}/${randomYear}`;

        cy.get("#txt_visit_date").type(formattedDate);
        cy.get("#txt_visit_date").should("have.value", formattedDate);

        // Convert the formatted string to a Date object
        // The toLocaleString method is typically applied to a Date object, but in your code, you are applying it to a string (formattedDate). Instead, you should create a Date object from the formatted string and then use toLocaleString. 

        const dateObject = new Date(`${randomYear}-${zeroPad(randomMonth)}-${zeroPad(randomDay)}`);

        const currentMonthName = dateObject.toLocaleString('en-US', { month: 'long' });

        const month_year = `${currentMonthName} ${randomYear}`;

        // verify the  month name and year displayed on the datepicker
        cy.get("div[class='datepicker-days'] th[class='datepicker-switch']").should("include.text", month_year);

        // verify the date highlighted in the datepicker
        cy.get(".active.day").should("include.text", randomDay)

    });


    it.only('13. select the date using the arrows in Datepicker', () => {
        cy.get("#txt_visit_date").click()

        // const year_want_to_select = 2022
        const year_want_to_select = 2025
        const month_want_to_select = "March";
        const date_want_to_select = 15;

        cy.get("div[class='datepicker-days'] th[class='datepicker-switch']").click()

        // after clicking it shpwsthe current year selected 
        let month_year_extracted;
        let extractedYear;
        let extractedMonth;

        cy.get("div[class='datepicker-days'] th[class='datepicker-switch']").then(($month_year) => {

            month_year_extracted = $month_year.text()
            cy.log(month_year_extracted + " is extracted ")
            // Split the string by space and take the first part
            extractedMonth = month_year_extracted.split(' ')[0];

            // Split the string by space and take the second part
            extractedYear = month_year_extracted.split(' ')[1];

            cy.log(extractedYear + " Yaer is extracted from the data");
            cy.log(extractedMonth + " Month is extracted from the data");


            while (year_want_to_select < extractedYear) {


                // using the prev arrow in the datpicker , move backwords in calender
                cy.get('.datepicker-months > .table-condensed > thead > :nth-child(2) > .prev').click();

                // Wait for the calendar to update
                cy.wait(1000); // Adjust the wait time as needed

                // Update the extracted year after each click
                extractedYear = cy.get("div[class='datepicker-days'] th[class='datepicker-switch']").invoke('text');

            }

            while (year_want_to_select > extractedYear) {

                cy.get('.datepicker-months > .table-condensed > thead > :nth-child(2) > .next').click();

                // Wait for the calendar to update
                cy.wait(1000); // Adjust the wait time as needed

                // Update the extracted year after each click
                extractedYear = cy.get("div[class='datepicker-days'] th[class='datepicker-switch']").invoke('text');
            }


            cy.contains(month_want_to_select.substring(0, 3)).click(); // Click on the abbreviated month name

            cy.log(`${month_want_to_select} ${year_want_to_select} needs to be selected in the datepicker`);

        })


        /*
              The `td.day:not(.old):not(.new)` selector is a CSS selector used in the context of a datepicker to identify and target specific elements representing days within the calendar. Let's break down each part of the selector:

            - **`td`**: Selects all HTML elements of type `<td>` (table cell). In the context of a calendar, each day is often represented by a table cell.

            - **`.day`**: Selects elements with the class `day`. This class is often used to mark the cells that represent days in a datepicker.

            - **`:not(.old)` and `:not(.new)`**: Excludes elements with the class `old` and `new`. In many datepickers, past days might have the class `old`, and future days might have the class `new`. The `:not()` pseudo-class is used to exclude elements with these classes.

            So, putting it all together, `td.day:not(.old):not(.new)` selects all table cells with the class `day` that are not marked as "old" or "new" (typically representing past or future days).

            This selector is just an example, and the actual structure and classes used in your datepicker might be different. You should inspect the HTML structure of your datepicker and adjust the selector accordingly to match the specific structure and classes used in your application.
     
            */

        // Click on the specific day
        cy.get("td.day:not(.old):not(.new)").contains(date_want_to_select).click();


        // check if the date sleecte dis visible on thr field or not 


        // convert the monthname to monthnumber 

        const monthNumber = new Date(`${month_want_to_select} 01 2000`).toLocaleDateString('en', { month: '2-digit' });
        cy.log(month_want_to_select + " ---- " + monthNumber)

        const new_date = `${date_want_to_select}/${monthNumber}/${year_want_to_select}`

        cy.get("#txt_visit_date").should("have.value", new_date)


    });




});


