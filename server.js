import { MongoClient } from "mongodb";
import cors from 'cors';
import express from 'express';

let db;

async function connectToDB(cb) {
    const url = "mongodb://localhost:27017";
    const client = new MongoClient(url);
    await client.connect();
    db = client.db("JS_database");
    cb();
}

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json("Server is running successfully!");
});

app.post('/checkuser', async (req, res) => {
    try {
        // Check if a user with the provided registration number already exists
        const existingUser = await db.collection('admin').findOne({ REGISTRATIONNUMBER: req.body.registrationno });
        if (existingUser) {
            // If a user with the provided registration number already exists, return an error response
            return res.status(400).json({ error: 'User with this registration number already exists' });
        }

        // If the user does not exist, insert the new user details into the database
        const result = await db.collection('admin').insertOne({ 
            Mail: req.body.mail,
            FULLNAME: req.body.fullname,
            PHONENUMBER: req.body.phoneno,
            REGISTRATIONNUMBER: req.body.registrationno,
            BRANCH: req.body.branch,
            SECTION: req.body.section,
            YEAR: req.body.year,
            TEAMNAMES: req.body.teamnames 
        });

        // Send the details of the inserted document as the response
        res.json(result.ops[0]);
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/retrieveuser', async (req, res) => {
    await db.collection('admin').findOne({ REGISTRATIONNUMBER: req.body.registrationno })
        .then((details) => {
            res.json(details);
        })
        .catch((e) => {
            console.error("Error retrieving data:", e);
            res.status(500).json({ error: 'Internal server error' });
        });
});

connectToDB(() => {
    app.listen(8000, () => {
        console.log("Server running at port 8000");
    });
});
