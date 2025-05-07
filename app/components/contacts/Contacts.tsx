import { View, FlatList, Pressable, StyleSheet } from "react-native";
import Profile from "./profile";
import { useEffect, useState } from "react";
import initializeDatabase from "../../db/db";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export interface Contact {
  id: number;
  name: string;
  number: string;
  image: string;
}

export default function Contacts() {
  const router = useRouter();
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

  const handleDeleteContact = (contactId: number) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  const renderContact = ({ item }: { item: Contact }) => (
    <Profile
      contact={item}
      onOptionsPress={() => handleContactPress(item.id)}
      showOptions={selectedContactId === item.id}
      onDelete={handleDeleteContact}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.listContainer}
        onPress={() => setSelectedContactId(null)}
      >
        <FlatList
          data={contacts as Contact[]}
          renderItem={renderContact}
          keyExtractor={(item) => item.id.toString()}
        />
      </Pressable>
      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/components/contacts/add-contact")}
      >
        <Ionicons name="add" size={30} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    flex: 1,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
