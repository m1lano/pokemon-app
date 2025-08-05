import { Stack } from "expo-router";
import { RelayEnvironmentProvider } from "react-relay";
import { environment } from "../relay/environment";
import { Suspense } from "react";
import { Text } from "react-native";
import capitalize from "@/utils/capitalize";

export default function RootLayout() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={<Text>{"Loading..."}</Text>}>
        <Stack>
          <Stack.Screen name={"index"} options={{ title: "Pokemon List" }} />
          <Stack.Screen
            name={"[pokemon]"}
            options={({ route }) => ({
              title: capitalize(route.params?.pokemon),
            })}
          />
        </Stack>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
