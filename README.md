# Simulation of Handshake (joinhandshake.com) Using GraphQL

In this project I have tried to replicate the Handshake (joinhandshake.com) where all the services offered by the Handshake for student and company is achieved using GraphQL(Data query and manipulation language).

## Architecture Diagram
<img width="602" alt="Screen Shot 2020-09-12 at 2 00 47 AM" src="https://user-images.githubusercontent.com/52833369/92991968-012ca500-f49c-11ea-96c9-a617e8f1736a.png">

## Project overview
- Compnay Login query:
<img width="1033" alt="Screen Shot 2020-09-12 at 1 42 36 AM" src="https://user-images.githubusercontent.com/52833369/92992045-b2333f80-f49c-11ea-8474-a12276afdf8a.png">

- Get all the students registered with the system query:
<img width="1036" alt="Screen Shot 2020-09-12 at 1 43 05 AM" src="https://user-images.githubusercontent.com/52833369/92992047-b3646c80-f49c-11ea-974d-1ea21fa0e81f.png">

- Apply to a job query (from student side):
<img width="1037" alt="Screen Shot 2020-09-12 at 1 40 25 AM" src="https://user-images.githubusercontent.com/52833369/92992040-ac3d5e80-f49c-11ea-97a0-954ea3fe98a8.png">

- Update student career objective from student profile query (from student side):
<img width="1036" alt="Screen Shot 2020-09-12 at 1 41 57 AM" src="https://user-images.githubusercontent.com/52833369/92992042-afd0e580-f49c-11ea-8c03-0effb43a6f8b.png">

- Adding a job posting query (from company side):
<img width="1037" alt="Screen Shot 2020-09-12 at 1 42 13 AM" src="https://user-images.githubusercontent.com/52833369/92992043-b19aa900-f49c-11ea-961f-3feec45c84ee.png">

- Getting all jobs posted by a company query:
<img width="1035" alt="Screen Shot 2020-09-12 at 1 43 17 AM" src="https://user-images.githubusercontent.com/52833369/92992050-b3fd0300-f49c-11ea-821e-39556b1ebe59.png">

- Searchin for a job using keyword query:
![image](https://user-images.githubusercontent.com/52833369/92992206-27534480-f49e-11ea-81b7-b2a00fffcc96.png)

## Getting Started

Clone code from the master branch and extract files on your local computer.

### Prerequisites

You need to have NodeJS and NPM(Node Package Manager) installed on your local device to succesfully run this project.

Node can be installed through this website[https://phoenixnap.com/kb/install-node-js-npm-on-windows]
Node can also be installed through NVM.
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```

### Installing

A step by step series of examples that tell you how to get a development env running

Clone repository on your local computer.
Traverse through the Backend folder, open terminal in this folder and enter
```
npm install
```
This will download all the dependencies required for the project.
After Installing all the dependencies enter
```
node index.js
```
"index.js" is our root file which will create connection with database and handle all the APIs

Travser to Frontend folder and again install the dependencies by entering
```
npm install
```
After Installing all the dependencies enter
```
npm start
```
It will start our frontend server which is in React.
Everything is set and you are good to go.

## Deployment

To deploy this on live system go to aws.amazon.com and follow the steps to instantiate EC2 instance.

## Built With

* [React](https://reactjs.org/docs/getting-started.html) - The library used
* [GraphQL](https://graphql.org/learn/) - An open-source data query and manipulation language
* [NodeJS](https://nodejs.org/en/docs/) - run time open source development platform
* [MongoDB](https://dev.mysql.com/doc/) - Database used

## Author

* **Deepen Patel**
