import react, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View, Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";

type Pokemon = {
  name: string;
  url: string;
};

const Item = ({ name }: { name: string }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  </View>
);

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Pokemon[]>([]);

  const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

  const getPost = async () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getPost();
  }, []);

  const extractIdFromUrl = (url: string) => {
    const parts = url.split("/");
    return parts[parts.length - 2]; // El penúltimo elemento es el ID
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={data}
            renderItem={({ item }) => <Item name={item.name} />}
            keyExtractor={(item) => extractIdFromUrl(item.url)}
          />
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#fbcab0",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
