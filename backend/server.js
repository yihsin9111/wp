import express from 'express';
import cors from 'cors';
import path from 'path';
import db from './src/db';
import routes from './src/routes';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
if (process.env.NODE_ENV === "development") {
	app.use(cors());
}
app.use(express.json());

//database
db.connect();

app.use('/',routes);
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
      res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);