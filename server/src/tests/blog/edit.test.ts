import { test, expect } from "vitest";
import { url } from "../global";

test("Editing Blog with valid data", async () => {
  const randomName = "Blog" + Math.floor(Math.random() * 1_000_000_000);

  const response = await fetch(url + "/blog/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlaXRvcm1ib25maW1AZW1haWwuY29tIiwibmFtZSI6eyJmaXJzdCI6IkhlaXRvciIsImxhc3QiOiJCb25maW0ifSwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTM0NjY5ODJ9.69Qu0xv8qWKiwioqR4kpGa5PfjiWAiqhpkLTmMePFg8",
    },
    body: JSON.stringify({
      _id: "66254c8e575771b92167e206",
      name: randomName,
      description: "Same as always",
    }),
  });

  expect(response.status).toBe(200);
});

test("Editing Blog with invalid Token", async () => {
  const randomName = "Blog" + Math.floor(Math.random() * 1_000_000_000);

  const response = await fetch(url + "/blog/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlaXRvcm1ib25maW1AZW1haWwuY29tIiwibmFtZSI6ey Break Token JmaXJzdCI6IkhlaXRvciIsImxhc3QiOiJCb25maW0ifSwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTM0NjY5ODJ9.69Qu0xv8qWKiwioqR4kpGa5PfjiWAiqhpkLTmMePFg8",
    },
    body: JSON.stringify({
      _id: "66254c8e575771b92167e206",
      name: randomName,
      description: "Same as always",
    }),
  });

  expect(response.status).toBe(500);
});

test("Editing Blog with invalid data", async () => {
  const randomName = "Blog" + Math.floor(Math.random() * 1_000_000_000);

  const response = await fetch(url + "/blog/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      auth: "Break Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlaXRvcm1ib25maW1AZW1haWwuY29tIiwibmFtZSI6eyJmaXJzdCI6IkhlaXRvciIsImxhc3QiOiJCb25maW0ifSwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTM0NjY5ODJ9.69Qu0xv8qWKiwioqR4kpGa5PfjiWAiqhpkLTmMePFg8",
    },
    body: JSON.stringify({
      _id: "node-valid-id",
      name: randomName,
      description: "Same as always",
    }),
  });

  expect(response.status).toBe(500);
});
