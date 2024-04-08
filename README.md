# Ingrediate

<div align="center" width="100%">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)
![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Shell](https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)


</div>


## About
Ingrediate is an open-source application for generating custom recipes based on validated, user inputted ingredients. </br> </br>
Simply type in the contents of your fridge/pantry, choose a meal type you would like to make, select a recipe generation model, and generate! Ingrediate supports persistent data through user authentication with Firebase, and PostgreSQL.

## Demo

<br />

<div align="center">
    <img src="/public/assets/Ingrediate_demo.gif">
</div>

# Installation

## Prerequisites

1. For use of Open Source LLM's within the application, download and install <a href="https://ollama.com/download" target="_blank">Ollama</a>, and make sure you have both mistral:7b and llama2 downloaded locally.
2. Ingrediate can also generate custom recipes with the paid <a href="https://openai.com/blog/openai-api" target="_blank">OpenAI API</a> service, you must have an account and your own personal API key to use. This will only apply if you want to use the text-davinci-003 model in the application.
3. You must also have a <a href="https://www.postgresql.org" target="_blank">PostgreSQL</a> database instance with a connection string to be able to persist favorited recipes to the database.
4. Finally, for user authentication you should set up a <a href="https://firebase.google.com/" target="_blank">Firebase</a> instance with a Web API key.

## How to use

1. Fork and clone this repo.
2. `cd` to the root directory run `npm install`
3. Create a .env in server following the .env.example. <br />
     `# Do not share your OpenAI API key with anyone! It should remain a secret.`
     <br />
    `OPENAI_API_KEY=`
    <br />
    `PORT=`
     <br />
    `PG_URI=`
     <br />
    `NODE_ENV=`
     <br />
    `FIREBASE_API_KEY=`

4. Paste in your OpenAI API & Firebase API key for user auth, PG_URI connection string, and port to run your server.
5. Run `npm run dev`, ollama will launch, the development server and client will run concurrently, and Ingrediate will open in your web browser!


# Author

| Developed By | Github | LinkedIn |
| :-: | :-: |:-: |
|Johanna Cameron|[![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jojecameron)|[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/johanna-cameron/) |
