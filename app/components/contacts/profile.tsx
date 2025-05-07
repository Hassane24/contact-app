import { View, Text, Image, Pressable, StyleSheet, Alert } from "react-native";
import { Contact } from "./Contacts";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import initializeDatabase from "../../db/db";

interface ProfileProps {
  contact: Contact;
  showOptions: boolean;
  onOptionsPress: () => void;
  onDelete: (contactId: number) => void;
}

export default function Profile({
  contact,
  showOptions,
  onOptionsPress,
  onDelete,
}: ProfileProps) {
  const [showOptionsMenu, setShowOptionsMenu] = useState<boolean>(showOptions);
  const router = useRouter();

  useEffect(() => {
    setShowOptionsMenu(showOptions);
  }, [showOptions]);

  const handleEdit = () => {
    onOptionsPress();
    router.push({
      pathname: "/edit-contact",
      params: { contactId: contact.id.toString() },
    });
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete Contact",
      "Are you sure you want to delete this contact?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const database = await initializeDatabase();
              await database.runAsync("DELETE FROM contacts WHERE id = ?", [
                contact.id,
              ]);
              onDelete(contact.id);
              onOptionsPress(); // Close the options menu
            } catch (error) {
              console.error("Error deleting contact:", error);
              Alert.alert("Error", "Failed to delete contact");
            }
          },
        },
      ]
    );
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => showOptionsMenu && onOptionsPress()}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: contact.image }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text>{contact.name}</Text>
          <Text>{contact.number}</Text>
        </View>
      </View>
      <Pressable
        style={{
          padding: 10,
        }}
        onPress={onOptionsPress}
      >
        <Text style={{ marginRight: 10, fontSize: 20 }}>⋮</Text>
      </Pressable>
      {showOptionsMenu && (
        <View style={styles.optionsContainer}>
          <Pressable onPress={handleEdit} style={{ padding: 10 }}>
            <Text>Edit</Text>
          </Pressable>
          <Pressable onPress={handleDelete} style={{ padding: 10 }}>
            <Text style={{ color: "red" }}>Delete</Text>
          </Pressable>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
    position: "absolute",
    right: "10%",
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
  },
});
