Absolutely, here's your README file content organized and formatted with proper Markdown syntax:

# Project Setup Guide

Follow these steps to set up the development environment, install dependencies, and run the project.

## Step 1: Software Installation

1. Download and setup Node.js on your machine from [nodejs.org](https://nodejs.org/en/download).
2. Download and install MySQL Server from [dev.mysql.com](https://dev.mysql.com/downloads/mysql/).
3. Optionally, install MySQL Workbench from [dev.mysql.com](https://dev.mysql.com/downloads/workbench/).
4. Install a code editor of your choice (e.g., [Visual Studio Code](https://code.visualstudio.com/download), [Atom](https://atom.io/)).
5. Optionally, install Git from [git-scm.com](https://git-scm.com/downloads) and configure it with your user account details.

## Step 2: Project Setup

1. Download the project ZIP file from University Myplace and extract it to your preferred location.
   OR
   Clone the project using the following command:
   ```
   git clone https://github.com/bhushan911/Dissertation.git
   ```

## Step 3: Database Setup

1. Setup the MySQL server and create a connection using MySQL Workbench (or any preferred client).
2. Import the database by following these steps:
   - In the Server tab, click Data Import.
   - Specify the path of the dump folder (contains the database) by clicking "..." and click OK.
   - Navigate to your MySQL backup file, select the backup, and click OK.
   - The schema names should appear on the left-hand side, select the schemas to be restored.
   - Click "Import Progress" and Start Import on the bottom right.
   - If you still face any issues you can follow below link to import data on mysql server [workbench.org](https://dev.mysql.com/doc/workbench/en/wb-admin-export-import-management.html)

## Step 4: Dependency Installation

1. Open a terminal and navigate to the project directory:
   ```
   cd "path/to/application"
   ```
2. Install npm dependencies using the following command:
   ```
   npm install
   ```

## Step 5: Configuration

1. Create a `.env.local` file in the parent folder of the project directory.
2. Configure the `.env.local` file as follows:

```
# Database Connection
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DATABASE=offers
MYSQL_USER="xyz"
MYSQL_PASSWORD="xyz"

# Nodemailer Configuration
NODEMAILER_EMAIL=test@test.com
NODEMAILER_PW=xyz
```

Make sure to replace `"xyz"` with your actual MySQL user and password, and provide valid Nodemailer email credentials.

## Step 6: Start the Application

To start the application for development and testing purposes, run one of the following command in the terminal:

```
npm run dev
```

OR

```
npm start
```

That's it! Your application should now be up and running.

Remember that this guide assumes a basic understanding of software development and command-line usage. If you encounter any issues during setup, refer to the documentation of the tools used or seek further assistance online.
