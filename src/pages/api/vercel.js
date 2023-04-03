export default async function handler(req, res) {
  const result = await fetch(
    "https://api.vercel.com/v9/projects/prj_XLKmu1DyR1eY7zq8UgeRKbA7yVLA/env",
    {
      headers: {
        Authorization: "Bearer <TOKEN>",
      },
      method: "get",
    }
  );

  const data = await result.json();
  res.status(200).json(data);
}
