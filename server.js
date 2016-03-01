import express from 'express'; // ES6 module import syntax
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express(); // const declarations for immutable values
const port = 8910;
const mongoUri = `mongodb://localhost:27017/es6-profiles`;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + `/dist`));

mongoose.connect(mongoUri);
mongoose.connection.once(`open`, () => { // arrow function
    console.log(`Connected to MongoDB at ${ mongoUri }.`); // template string
});

import profileRoutes from './server/components/profile/profileRoutes';

profileRoutes( app );

app.listen(port, () => {
    console.log(`Listening on ${ port }`);
});