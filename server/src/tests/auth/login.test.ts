import { expect, test } from "vitest";
import { url } from "../global";

test("login with credentials", async () => {
  const response = await fetch(url + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email: "heitormbonfim@email.com", password: "heitormbonfim@email.com" }),
  });

  expect(response.status).toBe(200);
});

test("login with token", async () => {
  const response = await fetch(url + "/login", {
    method: "GET",
    headers: {
      auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlaXRvcm1ib25maW1AZW1haWwuY29tIiwibmFtZSI6eyJmaXJzdCI6IkhlaXRvciIsImxhc3QiOiJCb25maW0ifSwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTM0NjY5ODJ9.69Qu0xv8qWKiwioqR4kpGa5PfjiWAiqhpkLTmMePFg8",
    },
  });

  expect(response.status).toBe(200);
});
