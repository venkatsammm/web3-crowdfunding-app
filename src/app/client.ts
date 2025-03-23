import { createThirdwebClient } from "thirdweb";

const clientId = "d4b41d8b61c3db10f396c9036a945108";

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});
