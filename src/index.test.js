test("foo", function () {
  expect(true).toBe(true);
});

const baseUrl = "http://localhost:3000";

beforeAll(async function () {
  await new Promise((resolve) => setTimeout(resolve, 50));
});

test("get", async function () {
  const response = await fetch(baseUrl);
  expect(response.status).toBe(200);
});

test("login", async function () {
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "foo",
      password: "bar",
    }),
  });
  expect(response.status).toBe(200);

  const json = await response.json();
  expect(json.username).toBe("foo");
  expect(json.token).toBeTruthy();
});

test("protected", async function () {
  const { token } = await (
    await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "foo",
        password: "bar",
      }),
    })
  ).json();

  const response = await fetch(`${baseUrl}/protected`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(response.status).toBe(200);
});
