export async function getSlippiData(cc: string) {
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
          cc: cc,
        },
      }),
    })
  ).json();

  return data;
}
