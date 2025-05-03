import { View, FlatList, Pressable, StyleSheet } from "react-native";
import Profile from "./profile";
import { useEffect, useState } from "react";
import initializeDatabase from "../../db/db";

export interface Contact {
  id: number;
  name: string;
  number: number | string;
  image: string;
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const initDatabase = async () => {
      try {
        const database = await initializeDatabase();
        const contacts = await database.getAllAsync<Contact>(
          "SELECT id, name, number, image FROM contacts"
        );
        // Ensure each contact is valid and has a valid ID
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

  const handleContactPress = (contactId: number) => {
    setSelectedContactId(contactId === selectedContactId ? null : contactId);
  };

  const renderContact = ({ item }: { item: Contact }) => (
    <Profile
      contact={item}
      onOptionsPress={() => handleContactPress(item.id)}
      showOptions={selectedContactId === item.id}
    />
  );

  return (
    <Pressable
      style={{ flex: 1, backgroundColor: "#fff" }}
      onPress={() => setSelectedContactId(null)}
    >
      <FlatList
        data={contacts as Contact[]}
        renderItem={renderContact}
        keyExtractor={(item) => item.id.toString()}
      />
    </Pressable>
  );
}
