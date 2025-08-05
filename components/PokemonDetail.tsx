import React from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import type { FirstRelayComponentQuery as FirstRelayComponentQueryType } from "./__generated__/FirstRelayComponentQuery.graphql";
import { useLocalSearchParams } from "expo-router";

export default function PokemonDetail() {
  const { pokemon } = useLocalSearchParams<{ pokemon: string }>();
  const data = useLazyLoadQuery<FirstRelayComponentQueryType>(
    graphql`
      query FirstRelayComponentQuery($name: String!) {
        pokemon(name: $name) {
          name
          sprites {
            front_default
          }
        }
      }
    `,
    { name: pokemon },
  );
  const pokemonDetails = data.pokemon;

  if (!pokemonDetails) {
    return <Text>Pokemon not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pokemonDetails.name}</Text>
      {pokemonDetails.sprites?.front_default && (
        <Image
          source={{ uri: pokemonDetails.sprites.front_default }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
    alignSelf: "center",
  },
});
