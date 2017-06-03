Database Schema
Postresql

User-----------------------
* email
* token
* hashedPassword
* profile_id
* 

Profile-------------------------
* weight
* height
* age
* user_id
* 

Vaccine------------------------
* name
* CPTCode
* CVXCode
* description
* 

Dose-------------------------
* doseOrder
* recommendedAdministration
* 







# Track my Vaccines

Renzo Tomlinson

Hackaton End of Week 6. GET CRAZY CODING!

**IMPORTANT: Modify this file to add description to how we will start/use your app.**

1. npm i, to install necessary dependencies
2. POSTGRES db is required, it is recommended that a .env file is created in the root directory
for your environment variables. The config file for sequelize will need a `PG_USERNAME`, `PG_PASSWORD` and `DEV_DATABASE`
environment variables
3. You will need to create a database with the name that you selected for DEV_DATABASE
4. Once your database is setup, you can run `npm run sql:s` to seed the database.
This will create a user with username and password, admin@admin.com and admin, respectively.

Using the app:
1. To use the app, create an account at the registration page.
2. You can navigate to the stats and profile pages.
3. Back on the home page, you can record blood sugar readings. Units are in mg/dl.
4. After submitting readings, you can view the stats on the stats page to see how you are doing overall.


