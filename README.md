# Ingrediate

## About
Ingrediate is an application for generating custom recipes based on validated, user inputted ingredients.

## Demo

<br />

<div align="center">
    <img src="/public/assets/ingrediate-demo.gif">
</div>

# Installation

## Prerequisites

1. Currently Ingrediate generates custom recipes with the paid <a href="https://openai.com/blog/openai-api" target="_blank">OpenAI API</a> service, you must have an account a d your own personal API key to use.
2. You must also have a <a href="https://www.mongodb.com/" target="_blank">MongoDB</a> account and password to be able to persist data into the database.

## How to use

1. Fork and clone this repo
2. `cd` to the client directory run `npm install`
3. `cd` to the server directory run `npm install`
4. Create a .env in server following the .env.example <br />
     `# Do not share your OpenAI API key with anyone! It should remain a secret.`
     <br />
    `OPENAI_API_KEY=`
     <br />
    `MONGODB_PW=`
     <br />
    `PORT=`
5. Paste in your OpenAI API key, MongoDB connection string, and port to run the server.
6. `cd` to the server directory run `npm start` your terminal should read `Connected to Database!
Beep. Boop. Listening on port XXXX`
7. `cd` to the client directory run `npm start` the app should open in your browser


# Author

| Developed By | Github | LinkedIn |
| :-: | :-: |:-: |
|Johanna Cameron|[![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jojecameron)|[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/johanna-cameron/) |
