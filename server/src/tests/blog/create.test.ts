import { expect, test } from "vitest";
import { url } from "../global";

const name = "Blog" + Math.floor(Math.random() * 1_000_000_000);

test("test blog creation", async () => {
  const response = await fetch(url + "/blog/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlaXRvcm1ib25maW1AZW1haWwuY29tIiwibmFtZSI6eyJmaXJzdCI6IkhlaXRvciIsImxhc3QiOiJCb25maW0ifSwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTM0NjY5ODJ9.69Qu0xv8qWKiwioqR4kpGa5PfjiWAiqhpkLTmMePFg8",
    },
    body: JSON.stringify({
      name,
      description: "Just a dummy description made by the automated test",
      owner_id: "661d9a316d4283686a499497",
    }),
  });

  expect(response.status).toBe(201);
});
