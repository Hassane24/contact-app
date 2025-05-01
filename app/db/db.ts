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
  await SQLite.openDatabaseAsync("contacts.db");

const initializeDatabase = async () => {
  try {
    const database = await connectToDatabase();
    await database.execAsync(
      "CREATE TABLE IF NOT EXISTS contacts (id TEXT PRIMARY KEY, name TEXT, location TEXT, image TEXT)"
    );

    const existingContacts = await database.getAllAsync<Contact>(
      "SELECT * FROM contacts"
    );

    if (existingContacts.length === 0) {
      for (const contact of DUMMY_CONTACTS) {
        await database.runAsync(
          "INSERT INTO contacts (id, name, location, image) VALUES (?, ?, ?, ?)",
          [contact.id, contact.name, contact.location, contact.image]
        );
      }
    }

    return database;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

export default initializeDatabase;
