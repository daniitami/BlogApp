import react, { useEffect, useState } from "react";
import {  ActivityIndicator,  FlatList,  View,  Text,  StyleSheet,  StatusBar,  SafeAreaView } from "react-native";

type Post = {
  id: string;
  title: string;
  body: string;
};

const Item = ({ body, title }: Post) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text>{body}</Text>
  </View>
);

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Post[]>([]);

  const url = "https://jsonplaceholder.typicode.com/posts";

  const getPost = async () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Item body={item.body} id={""} title={item.title} />
            )}
            keyExtractor={(item) => item.id}
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
    fontWeight: "bold",
  },
});
