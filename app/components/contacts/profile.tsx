import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Modal,
  Platform,
} from "react-native";
import { useState } from "react";

interface Contact {
  id: string;
  name: string;
  location: string;
  image: string;
}

const CONTACTS: Contact[] = [
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

export default function Profile() {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  const handleMorePress = (id: string, event: any) => {
    event.target.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        setMenuPosition({ top: pageY + height, right: width });
        setSelectedContact(selectedContact === id ? null : id);
      }
    );
  };

  const renderContact = ({ item }: { item: Contact }) => (
    <View style={styles.contactCard}>
      <View style={styles.leftSection}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>
      <Pressable
        style={styles.moreButton}
        onPress={(event) => handleMorePress(item.id, event)}
      >
        <Text style={styles.moreButtonText}>⋮</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={CONTACTS}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
      />
      <Modal
        visible={selectedContact !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedContact(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSelectedContact(null)}
        >
          <View
            style={[
              styles.menuContainer,
              {
                top: menuPosition.top,
                right: menuPosition.right,
              },
            ]}
          >
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Edit</Text>
            </Pressable>
            <Pressable style={[styles.menuItem, styles.menuItemLast]}>
              <Text style={styles.menuText}>Delete</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingVertical: 8,
  },
  contactCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  infoContainer: {
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
    color: "#666",
  },
  moreButton: {
    padding: 8,
    width: 40,
    alignItems: "center",
  },
  moreButtonText: {
    fontSize: 20,
    color: "#666",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  menuContainer: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    width: 140,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuText: {
    fontSize: 14,
    color: "#333",
  },
});
