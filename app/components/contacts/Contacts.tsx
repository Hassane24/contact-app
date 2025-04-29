import { View, FlatList } from "react-native";
import Profile from "./profile";
import { useEffect, useState } from "react";
import connectToDatabase, { DUMMY_CONTACTS } from "../../db/db";

export interface Contact {
  id: string;
  name: string;
  location: string;
  image: string;
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const initDatabase = async () => {
      try {
        const database = await connectToDatabase();
        await database.execAsync(
          "CREATE TABLE IF NOT EXISTS contacts (id TEXT PRIMARY KEY, name TEXT, location TEXT, image TEXT)"
        );

        // Check if contacts table is empty
        const existingContacts = await database.getAllAsync<Contact>(
          "SELECT * FROM contacts"
        );
        console.log(existingContacts);
        if (existingContacts.length === 0) {
          // Only insert if the table is empty
          console.log("Inserting dummy contacts...");
          for (const contact of DUMMY_CONTACTS) {
            console.log("Inserting contact:", contact.name);
            await database.runAsync(
              "INSERT INTO contacts (id, name, location, image) VALUES (?, ?, ?, ?)",
              [contact.id, contact.name, contact.location, contact.image]
            );
          }
          console.log("Finished inserting dummy contacts");
        }

        const contacts = await database.getAllAsync<Contact>(
          "SELECT id, name, location, image FROM contacts"
        );
        // Ensure each contact has a valid ID
        const validContacts = contacts.filter(
          (contact) => contact && contact.id
        );
        setContacts(validContacts);
      } catch (error) {
        console.error(error);
      }
    };

    initDatabase();
  }, []);

  const renderContact = ({ item }: { item: Contact }) => (
    <Profile contact={item} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingVertical: 8 }}
        data={contacts as Contact[]}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
