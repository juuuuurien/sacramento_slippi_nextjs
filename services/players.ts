import { appUrl } from "@/lib/constants";

export async function fetchPlayerData() {
  try {
    const { data } = await (await fetch(`${appUrl}/players`)).json();
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function fetchSlippiPlayerData(connectCode: string) {
  try {
    const slippiQuery = `fragment userProfilePage on User {
      displayName
      connectCode {
          code
          }
      rankedNetplayProfile {
              id
              ratingOrdinal
              ratingUpdateCount
              wins
              losses
              dailyGlobalPlacement
              dailyRegionalPlacement
              continent
              characters {
                      id
                      character
                      gameCount
                  }
          }
  }
  query AccountManagementPageQuery($cc: String!) {
      getConnectCode(code: $cc) {
              user {
                      ...userProfilePage
                  }
          }
  }`;

    const { data } = await (
      await fetch("https://gql-gateway-dot-slippi.uc.r.appspot.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operationName: "AccountManagementPageQuery",
          query: slippiQuery,
          variables: {
            cc: connectCode,
          },
        }),
      })
    ).json();

    return data;
  } catch (e) {
    console.error(e);
    return e;
  }
}
