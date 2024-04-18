import { expect, test } from "vitest";
import { url } from "../global";

test("register new user", async () => {
  const randomId = Math.floor(Math.random() * 1_000_000_000);

  console.log();
  const response = await fetch(url + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      name: {
        first: "User",
        last: String(randomId),
      },
      email: `user${randomId}@email.com`,
      password: `user${randomId}@email.com`,
    }),
  });

  expect(response.status).toBe(201);
});
