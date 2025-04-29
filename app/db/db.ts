import * as SQLite from "expo-sqlite";

import { Contact } from "../components/contacts/Contacts";

export const DUMMY_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Takeshi Movic",
    location: "San Francisco, CA",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Emma Larwind",
    location: "Stockholm, SE",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "3",
    name: "Giovanni Naitila",
    location: "Rome, Italy",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    name: "Miyoshi Zawn",
    location: "Los Angeles, CA",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

const connectToDatabase = async () =>
  await SQLite.openDatabaseAsync("databaseName");

export default connectToDatabase;
