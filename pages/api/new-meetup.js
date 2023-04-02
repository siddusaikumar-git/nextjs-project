import { MongoClient } from "mongodb";

// /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://hellouser:hellouser@cluster0.qiy3uhm.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupsCollections = db.collection("meetups");

    const result = await meetupsCollections.insertOne({ data });

    client.close();

    res.status(201).json({ message: "meetup inserted" });
  }
}

export default handler;
