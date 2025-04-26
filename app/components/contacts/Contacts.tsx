import { View, FlatList } from "react-native";
import Profile from "./profile";

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

export default function Contacts() {
  const renderContact = ({ item }: { item: Contact }) => (
    <Profile contact={item} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        contentContainerStyle={{ paddingVertical: 8 }}
        data={CONTACTS}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
