import { Stack } from "expo-router";
import { RelayEnvironmentProvider } from "react-relay";
import { environment } from "../relay/environment";
import { Suspense } from "react";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Stack />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
