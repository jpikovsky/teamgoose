#README for getinSPIREd#
##Team Goose##
getInSpired is a web application designed to simply the user experience involved in trudging through SPIRE(UMass Amherst's student management system).
Our application aims to help students navigate their academic requirements and learn more about other major requirements. Students can see what courses they have left to take in an easy to read list, and even see what order would be the most efficient.

_We help_ _students_ _make_ _**major**_ _changes_ _to_ _their_ _academic career_

####Goals:
* Provide users with an easy interface to track their academic progress.
* Assist users to find the best path to complete college and/or major requirements.
* Link a student review interface to allow users to make informed choices when choosing classes.

####How To Run:
In order to run our application, all you will need to do is enter: "node app.js" into your favorite command line! 

####Views:
* **Home**: This is essentially an About Page, describes the purpose of getinSPIREd and its origin story
* **Courses**: Add new courses to profile. 
* **Course Details**: This view will allow the user to enter a course, and see information about the class, such as its description and class times.
* **getinSPIREd**: Shows you other majors you may be close to completing and what those changes would require
* **Login**: Logging in will bring you to your profile
* **Team**: List of team members
  * Team Member's individual pages with small non-fiction biography
* **Profile**: Shows information about the user such as current major, expected date of graduation, courses taken, etc.
* **Admin**: Allows admin to add new user accounts with the option of admin privelages.

####Statefulness:
Provide a detailed writeup of how your application uses sessions to maintain statefulness. You must make references to specific files in your project repository and links to the associated files. We will be reviewing your work through github and using the README.md file as an entry point.

Our app maintains statefulness throughout its design by keeping track of user sessions, and checking for the validity of the user when processing the various routes. This can be seen in our admin-routes.js class, where we pull the user from the req.session object when getting the main admin view, and check to make sure the user object exists and has admin privileges before proceeding to the proper view. This is accomplished through the express-session library, which we require in the main app.js class. We also use the body-parser libraries to maintain statefulness by using the req.body object to extract information from what the user has sent. For example, when posting from the view to create new users, the req.body object pulls the inputted user info and inputs it to the database. 

####Persistence:
This is where we provide a detailed explanation of how our application uses databases. You must make reference to specific files in your project repository and links to the associated files. You must include a figure that shows the important data sets that your database maintains. 
