const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv');
const { ApolloServer, gql } = require('apollo-server-express');

const {tasks} =  require('./constants/index');

// set evn variables
dotEnv.config();

const app = express();

//cors
app.use(cors());

// body parser middleWare
app.use(express.json());

// Apollo Server
const typeDefs = gql`
    type Query {
        greetings : String
        tasks : [Task!]
    }

    type User {
        id : ID!
        name : String!
        email : String!
        tasks : [Task!]
    }
    
    type Task {
        id : ID!
        name : String!
        completed : Boolean!
        user : User!
    }
`;

// [String] will return list
// ! will return non-null iteams or error



const resolvers = {
    Query : {
        greetings : () => "Hello",
        tasks : () => tasks
    }
};
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});


apolloServer.applyMiddleware({app,path: '/graphql'});



// PORT and Routes
const PORT = process.env.PORT || 3000;

app.use('/', (req,res) => {
    res.send({message : "Hi"});
})


app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
    console.log(`GraphQL Endpoint ${apolloServer.graphqlPath}`);
})