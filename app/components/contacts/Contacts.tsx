import { View, FlatList } from "react-native";
import Profile from "./profile";
import { useEffect, useState } from "react";
import initializeDatabase from "../../db/db";

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
        const database = await initializeDatabase();
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
