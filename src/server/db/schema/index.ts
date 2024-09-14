import * as users from "./users";
import * as accounts from "./accounts";
import * as posts from "./posts";
import * as sessions from "./sessions";
import * as verificationTokens from "./verification-tokens";

export const schema = {
  ...users,
  ...accounts,
  ...posts,
  ...sessions,
  ...verificationTokens,
};
