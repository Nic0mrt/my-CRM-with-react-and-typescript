export async function fetchAPI(url: string, method: string, company = {}) {
  const results = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: method,
    body: company ? JSON.stringify(company) : null,
  });
  const data = results.json();
  return data;
}
