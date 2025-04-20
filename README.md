# Dad Jokes App with User Authentication

**Introducing "Dad Jokes: The Ultimate Source of Cheesy Laughter!"**

![image](https://github.com/Buchatech/dadjokes/assets/22551494/e528dc2e-3a91-49a5-9525-7147f31a68c4)

>Are you ready to embark on a hilarious journey into the world of dad jokes? Look no further! Our JavaScript Dad Jokes web app is here to tickle your funny bone and leave you in stitches.

>Get ready to embrace the sheer delight of cringeworthy humor as you explore an extensive collection of pun-tastic dad jokes. With just a click of a button, our app will serve you a fresh dose of laughter, guaranteed to make you groan and giggle at the same time.

>But wait, there's more! Feel like sharing your own gems of comedic genius? Our app allows you to add your very own dad jokes to the ever-expanding repertoire. Spread the laughter and watch as your jokes become part of the delightfully cheesy tapestry of dad humor.

*Get ready to laugh!*

## Features
- User signup and login with secure password hashing (using Bcrypt).
- Add, view, and edit jokes.
- Protected routes for authenticated users.

## Prerequisites
- Node.js (v14 or later)
- MySQL database

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd dadjokes-main
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up the Database**:
   - Create a MySQL database.
   - Run the SQL scripts in `setup/createdbandinsertjokes/` to set up the database schema and seed data:
     ```sql
     createDBandJokesTable.sql
     insertJokes.sql
     ```

4. **Configure the Database Connection**:
   - Update the `config/dbinfo.js` file with your database credentials.

5. **Run the Application Locally**:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

## App Purpose
I built this basic JavaScript app to be used for learning. Feel free to use this repo to get started with JavaScript. 
<!-- Visit a running demo of this app here: [Dad Jokes App](https://dad-jokes-mz8s.onrender.com) -->

I also used this app in one of my JavaScript courses on Pluralsight. 
You can find my Pluralsight author profile here: [Steve Buchanan on Pluralsight](https://www.pluralsight.com/authors/steve-buchanan).

## App Architecture
This app consists of:
- HTML 
- Bootstrap CSS
- JavaScript
- Node.js 
- Express
<img width="700" alt="image" src="https://github.com/Buchatech/dadjokes/assets/22551494/70efed66-548e-468c-b323-06b47502e58d">

## App Deployment 
This app requires a MySQL database. You will need to host the database somewhere. In the repo there are files with SQL code for creating the database, table, and for inserting the jokes. The folder path is *dadjokes/setup/createdbandinsertjokes/*

- createDBandJokesTable.sql
- insertJokes.sql

I have tested two deployment options for deploying this app. These are:

- This app can be deployed to the free tier on www.render.com with ease using these steps: [Deploy a Node Express App to Render](https://render.com/docs/deploy-node-express-app). 
- This app can be containerized and deployed with ease to [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/en-us/products/kubernetes-service) a cloud managed Kubernetes cluster using these steps here: [Automated Deployments for AKS](https://learn.microsoft.com/en-us/azure/aks/automated-deployments).

- **Note:** If you want to run the app locally check out the steps in the *dadjokes/setup/runlocally/localbuild.txt* file.

## License
This project is licensed under the MIT License.

**Be sure to visit my blog [www.buchatech.com](http://www.buchatech.com) to stay up to date on my adventures in tech!**

*Happy Coding!*
