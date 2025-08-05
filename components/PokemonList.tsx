import React from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import { PokemonListQuery as PokemonListQueryType } from "./__generated__/PokemonListQuery.graphql";
import { router } from "expo-router";

export default function PokemonList() {
  const data = useLazyLoadQuery<PokemonListQueryType>(
    graphql`
      query PokemonListQuery {
        pokemons(limit: 100, offset: 0) {
          results {
            name
          }
        }
      }
    `,
    {},
  );

  const pokemons = data.pokemons?.results?.filter((pokemon) => !!pokemon?.name);

  if (!pokemons) {
    return <Text>No Pokemons found!</Text>;
  }

  const renderItem = ({ item }: { item: (typeof pokemons)[number] }) => (
    <TouchableOpacity
      onPress={() =>
        item.name &&
        router.push({ pathname: "./[pokemon]", params: { pokemon: item.name } })
      }
    >
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 5,
    padding: 15,
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 20,
    borderRadius: 10,
    textTransform: "capitalize",
  },
  container: {
    flex: 1,
    width: Dimensions.get("window").width - 10,
    alignSelf: "center",
    paddingTop: 5,
  },
});
