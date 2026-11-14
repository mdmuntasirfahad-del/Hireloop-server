import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
dotenv.config();
const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
    },
});

export async function connectToMongoDB() {
    try {
        await client.connect();

        const database = client.db("hireloop_auth_db");
        const jobCollection = database.collection("jobs");
        const usersCollection = database.collection('user')
        const companyCollection = database.collection("companies");
        const applicationsCollection = database.collection("applications");
        const planCollection = database.collection('plans');
        const subscriptionCollection = database.collection('subscriptions');

        app.get("/api/jobs", async (req, res) => {
            const query = {};
            if (req.query.recruiterId) {
                query.recruiterId = req.query.recruiterId;
            }
            if (req.query.status) {
                query.status = req.query.status;
            }

            const cursor = jobCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get("/api/jobs/:id", async (req, res) => {

            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            }

            const result = await jobCollection.findOne(query);
            res.send(result);

        })

        app.post("/api/jobs", async (req, res) => {
            try {
                const { _id, ...job } = req.body;

                const newJob = {
                    ...job,
                    createdAt: new Date()
                }

                const result = await jobCollection.insertOne(newJob);
                res.send(result);
            } catch (err) {
                console.dir(err);
                res.status(500).json({ error: "Failed to create job" });
            }
        });


        //applications related api

        app.get('/api/application', async (req, res) => {

            const query = {};

            if (req.query.applicantId) {
                query.applicantId = req.query.applicantId
            }
            if (req.query.jobId) {
                query.jobId = req.query.jobId
            }

            const cursor = applicationsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post("/api/application", async (req, res) => {

            const application = req.body;

            const newApplication = {
                ...application,
                createdAt: new Date()
            }

            const result = await applicationsCollection.insertOne(newApplication)
            res.send(result);
        })


        //company related api

        app.get("/api/companies", async (req, res) => {
            const query = {};
            // if (req.query.recruiterId) {
            //     query.recruiterId = req.query.recruiterId;
            // }
            // if (req.query.userId) {
            //     query.userId = req.query.userId;
            // }

            const cursor = companyCollection.find(query);
            const result = await cursor.toArray();
            res.send(result || {});
        });


        app.get("/api/my/companies", async (req, res) => {

            const query = {};

            if (req.query.recruiterId) {
                query.recruiterId = req.query.recruiterId;
            }

            const result = await companyCollection.findOne(query);
            res.send(result);

        })

        app.post("/api/companies", async (req, res) => {
            try {
                const company = req.body;

                const newCompany = {
                    ...company,
                    createdAt: new Date()
                }

                const result = await companyCollection.insertOne(newCompany);
                res.send(result);
            } catch (err) {
                console.dir(err);
                res.status(500).json({ error: "Failed to create company" });
            }
        });

        // plans

        app.get('/api/plans', async (req, res) => {

            const query = {};
            if (req.query.plan_id) {
                query.plan_id = req.query.plan_id;
            }
            const plan = await planCollection.findOne(query);
            res.send(plan);

        })

        // Subscription

        app.post('/api/subscriptions', async (req, res) => {
            const data = req.body;
            const subInfo = {
                ...data,
                createdAt: new Date()
            }

            const result = await subscriptionCollection.insertOne(subInfo);

            const filter = { email: data.email };

            const updateDocument = {
                $set: {
                    plan: data.planId
                }
            }
            const updateResult = await usersCollection.updateOne(filter, updateDocument)
            res.send(updateResult)


        })



        console.log("You successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.dir(err);
    }
}

export async function disconnectFromMongoDB() {
    await client.close();
}

connectToMongoDB().finally(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});