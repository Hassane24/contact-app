import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { Contact } from "./components/contacts/Contacts";
import { useState, useEffect } from "react";
import initializeDatabase from "./db/db";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function EditContact() {
  const { contactId } = useLocalSearchParams();
  const router = useRouter();
  const [editedContact, setEditedContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const database = await initializeDatabase();
        const contacts = await database.getAllAsync<Contact>(
          "SELECT * FROM contacts WHERE id = ?",
          [parseInt(contactId as string)]
        );
        if (contacts.length > 0) {
          setEditedContact(contacts[0]);
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };

    fetchContact();
  }, [contactId]);

  const handleSave = async () => {
    if (!editedContact) return;

    try {
      const database = await initializeDatabase();
      await database.runAsync(
        "UPDATE contacts SET name = ?, number = ?, image = ? WHERE id = ?",
        [
          editedContact.name,
          editedContact.number,
          editedContact.image,
          editedContact.id,
        ]
      );

      // Refresh the contacts list by navigating back and then forward
      router.replace("/");
      router.push("/");
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handlePhoneNumberChange = (text: string) => {
    if (!editedContact) return;

    // Limit to 10 digits
    const limitedNumber = text.slice(0, 10);
    setEditedContact({
      ...editedContact,
      number: parseInt(limitedNumber) || "",
    });
  };

  if (!editedContact) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: editedContact.image }} style={styles.image} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={editedContact.name}
          onChangeText={(text) =>
            setEditedContact({ ...editedContact, name: text })
          }
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={editedContact.number.toString()}
          onChangeText={handlePhoneNumberChange}
          keyboardType="numeric"
          maxLength={10}
        />
        <Text style={styles.label}>Image URL</Text>
        <TextInput
          style={styles.input}
          value={editedContact.image}
          onChangeText={(text) =>
            setEditedContact({ ...editedContact, image: text })
          }
        />
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  formContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
