import {
  Environment,
  Store,
  RecordSource,
  Network,
  FetchFunction,
} from "relay-runtime";

const HTTP_ENDPOINT = "https://graphql-pokeapi.graphcdn.app/";

const fetchGraphQL: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: request.text, variables }),
  });
  if (!resp.ok) {
    throw new Error("Response failed.");
  }
  return await resp.json();
};

export const environment = new Environment({
  store: new Store(new RecordSource({})),
  network: Network.create(fetchGraphQL),
});
