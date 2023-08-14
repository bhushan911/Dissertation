This is a readme file which has steps to be followed to setup development environment, dependencies, and run the project.

STEP 1

Software to be installed

Download and setup Nodejs on your machine - https://nodejs.org/en/download

Download and install MySQL Server - https://dev.mysql.com/downloads/mysql/

MYSQL Workbench(optional) - https://dev.mysql.com/downloads/workbench/

Code Editor (Vscode, Atom, etc) - https://code.visualstudio.com/download

Git (optional) - https://git-scm.com/downloads
You will have to configure git for the first time like setting up user account details git local file.

Step 2

Download the zip code file from myplace and extract the zip folder in a preferred location or clone the project using below github url

command - git clone https://github.com/bhushan911/Dissertation.git

Step 3

Setup the SQL server and create a connection using MySQL workbench.
//sample sql connection
//port:3306
//host= 127.0.0.1
//user= xyz
//password= xyz

Once the SQL connection is established you can import the database from /database/dump folder. Follow below steps to import the database using SQL workbench.
Step 1: In the tab Server click Data Import
Step 2 : You will see a link to the default dump folder. Specify the path of the dump folder (which contains our database) by clicking "..." and click OK.
Step 3 : Click the database and navigate to where your MySQL backup file is located, select the backup you want to load, and click OK.
Step 4 : The schema names in your dump should appear on the left-hand side, at the bottom. Select the schemas that need to be restored.
Step 5 : Click on "Import Progress" and Select Start Import on the bottom right.

This will import the offers database on your local machine. If you still face any issues you can follow below link to import data on mysql server.

https://dev.mysql.com/doc/workbench/en/wb-admin-export-import-management.html

Step 4

Open a terminal and change the path to project directory.
e.g : cd "xyz/Notify-offers"

Install npm dependencies using package.json using below command. Make sure to install all the dependencies.
npm install package.json

Step 5

Create an ".env.local" file in parent folder of project directory. Configure the .env.local file as given below.

//Database connection
MYSQL_HOST= 127.0.0.1
MYSQL_PORT= 3306
MYSQL_DATABASE= offers
MYSQL_USER= "xyz"
MYSQL_PASSWORD= "xyz"

//Nodemailer configuration
NODEMAILER_EMAIL = 'test@test.com' //User email which will be used to send email
NODEMAILER_PW = 'xyz' //User password

The user email account should be setup to send email using nodemailer. If you are using gmail, make sure to Enable 2-Step Verification and use app password to send emails.

Step 6
Start the application using below command from terminal

command: npm run dev //command to start the server for development and testing purpose
OR
commnad: npm start

```

```
