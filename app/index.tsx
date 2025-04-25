import { StyleSheet, Text, View, useColorScheme } from "react-native";

export default function Index() {
  const colorScheme = useColorScheme();
  const themeColors = COLORS[colorScheme || 'light'];
  console.log(themeColors)
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.background },

      ]}
    >
      <Text style={[{ color: COLORS.dark.text }]}>Well hello there</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});

const COLORS = {
  light: {
    background: '#FFFFFF',
    text: '#000000',
  },
  dark: {
    background: 'black',
    text: 'white',
  },
};
