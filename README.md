#README for getInSPIREd#
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
To login: Go to login page and login with username: "test" and password "test"
To login as admin: Go to login page and login with username "admin" and password "admin"

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

Our app maintains statefulness throughout its design by keeping track of user sessions, and checking for the validity of the user when processing the various routes. This can be seen in our admin-routes.js class (https://github.com/tcontois1/teamgoose/blob/master/routes/admin-routes.js), where we pull the user from the req.session object when getting the main admin view, and then check to make sure the user object exists and has admin privileges before proceeding to the proper view. By using the session object, our app maintains statefulness by keeping track of whether a visitor is able to access certain views based on whether they are logged in, or have specific access privileges. This is accomplished through the express-session library, which we require in the main app.js class. We also use the body-parser libraries to maintain statefulness by using the req.body object to extract information from what the user has sent. For example, when posting from the view in admin-routes to create new users, the req.body object pulls the inputted user info and inputs it to the database.

Another example of statefulness is the profile page. When the user tries to access the profile page, our app checks to see if the user exists. This is accomplished in our /routes/user-routes.js class by getting the req.session.user object and seeing if it is undefined. If it is undefined (i.e. the user is not logged in), the user is redirected to the login page with the flash message "You must be logged in to access your profile". If the user is logged in, they are allowed to go to the profile page and their username (obtained from req.session.user.name) is displayed on the page.

####Persistence:
This is where we provide a detailed explanation of how our application uses databases. You must make reference to specific files in your project repository and links to the associated files. You must include a figure that shows the important data sets that your database maintains. 

Our app will eventually make extensive use of databases related to UMass classes and major plans, but its functionality currently only extends to logging active registered users and classes that have been inputted into the site. For our databases, we are using three different tables in ElephantSQL. We have a database to keep track of entered classes, created users, and a map of users and classes so that we are able to match recurring users with the courses they have added. Much of this functionality can be found in our db.js class (https://github.com/tcontois1/teamgoose/blob/master/db.js). 
For example, our addCourse function takes a course on input from the user, connects to our database, and then inserts the class into the table. If our app then calls a function like getAllCourses, this function will now be listed. 

We still have more work to do in the area of adding courses and specifying major requirements, but are user creation/login/deletion is a good example of persistence on our web app. To see this, go to the login page and click "Create Account". Make a new account with whatever username and password you like. Then terminate app.js from the command line. Restart app.js and login with the username and password you just made. In IPA03 this would not have worked, but in our app this will work because of our use of a real database. Another example is changing your password on the profile page. This will update your password in the actual database. Account deletion is another working option on the profile page.

To see a figure of our database tables go to the /db_figures folder.
