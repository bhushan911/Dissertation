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

Project folder Structure

notify-offers
├─ .git
│ ├─ COMMIT_EDITMSG
│ ├─ config
│ ├─ description
│ ├─ HEAD
│ ├─ hooks
│ │ ├─ applypatch-msg.sample
│ │ ├─ commit-msg.sample
│ │ ├─ fsmonitor-watchman.sample
│ │ ├─ post-update.sample
│ │ ├─ pre-applypatch.sample
│ │ ├─ pre-commit.sample
│ │ ├─ pre-merge-commit.sample
│ │ ├─ pre-push.sample
│ │ ├─ pre-rebase.sample
│ │ ├─ pre-receive.sample
│ │ ├─ prepare-commit-msg.sample
│ │ ├─ push-to-checkout.sample
│ │ └─ update.sample
│ ├─ index
│ ├─ info
│ │ └─ exclude
│ ├─ logs
│ │ ├─ HEAD
│ │ └─ refs
│ │ └─ heads
│ │ └─ master
│ ├─ objects
│ │ ├─ 02
│ │ │ └─ 695bc1db34964f5ae20b3b196122d1d6b59409
│ │ ├─ 20
│ │ │ └─ fccdd4b84d99e50c632b9deb5d3eae964bef51
│ │ ├─ 49
│ │ │ └─ 65832f2c9b0605eaa189b7c7fb11124d24e48a
│ │ ├─ 51
│ │ │ └─ c838edbb133732d47d53953359f5bbfb9bc715
│ │ ├─ 5d
│ │ │ └─ 5e2bccff88a0fd5157e026d1fd10fed44af0e4
│ │ ├─ 76
│ │ │ └─ 4f2f1d4cb98b49df5eea21eaf87d935659a201
│ │ ├─ 95
│ │ │ └─ bfb35a11ed9620863f5f1901867ce0e5d23832
│ │ ├─ 97
│ │ │ └─ e8a672e42f930ac56f6d61e1345eb8e0bad0ec
│ │ ├─ a3
│ │ │ └─ 5f5bba2023fcefc7cb6936288bbff60bcffb94
│ │ ├─ a6
│ │ │ └─ 5072d29d8a9cfdefa3a8302588e26c59f6dc67
│ │ ├─ b8
│ │ │ └─ 2575626db4fd6ef030e26a70aa6a8ef3db755d
│ │ ├─ c3
│ │ │ └─ 8d0c1acae8ee04381388256285a658d41ea6cb
│ │ ├─ fb
│ │ │ └─ f0e25a651c28931b2fe8afa2947e124eebc74f
│ │ ├─ fc
│ │ │ └─ 621b16f874a9cd4f6003c42119647c2f3785d7
│ │ ├─ info
│ │ └─ pack
│ └─ refs
│ ├─ heads
│ │ └─ master
│ └─ tags
├─ .gitignore
├─ app
│ └─ notify
│ └─ user.js
├─ components
│ ├─ DataFetcher.js
│ ├─ Header.js
│ ├─ InterestModal.js
│ ├─ Layout.js
│ ├─ ProductDetails.js
│ └─ ProductItem.js
├─ data
│ └─ db.js
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ pages
│ ├─ api
│ │ ├─ auth
│ │ │ ├─ login.js
│ │ │ └─ [...nextauth].js
│ │ ├─ category
│ │ │ └─ [department].js
│ │ ├─ notification
│ │ │ ├─ api_four.js
│ │ │ ├─ product.js
│ │ │ ├─ testlogiccopy.js
│ │ │ └─ user.js
│ │ ├─ product
│ │ │ ├─ userinterest.js
│ │ │ └─ [sku].js
│ │ └─ registration.js
│ ├─ appliances.js
│ ├─ auth
│ │ └─ loginscreen.js
│ ├─ computers.js
│ ├─ index.js
│ ├─ mobile&tablet.js
│ ├─ movie&music.js
│ ├─ personalcare.js
│ ├─ product
│ │ └─ [sku].js
│ ├─ registrationscreen.js
│ ├─ tv&speaker.js
│ └─ \_app.js
├─ public
│ ├─ favicon.ico
│ ├─ like.png
│ ├─ unlike.png
│ └─ vercel.svg
├─ README.md
├─ service
│ └─ mailservice.js
└─ styles
├─ form.css
├─ globals.css
└─ Home.module.css

```

```
