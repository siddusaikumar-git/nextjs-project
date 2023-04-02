import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://i.guim.co.uk/img/media/ba91c9f36764462ac133e1f34c49bbc3e8e9b858/0_249_3600_2159/master/3600.jpg?width=620&quality=45&dpr=2&s=none",
    address: "some address, 5, 12345 New City",
    description: "This is a first meetup",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://i.guim.co.uk/img/media/ba91c9f36764462ac133e1f34c49bbc3e8e9b858/0_249_3600_2159/master/3600.jpg?width=620&quality=45&dpr=2&s=none",
    address: "some address, 5, 12345 New City",
    description: "This is a second meetup",
  },
  {
    id: "m3",
    title: "A Third Meetup",
    image:
      "https://i.guim.co.uk/img/media/ba91c9f36764462ac133e1f34c49bbc3e8e9b858/0_249_3600_2159/master/3600.jpg?width=620&quality=45&dpr=2&s=none",
    address: "some address, 5, 12345 New City",
    description: "This is a Third meetup",
  },
];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of a highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://hellouser:hellouser@cluster0.qiy3uhm.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollections = db.collection("meetups");

  let meetups = await meetupsCollections.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
