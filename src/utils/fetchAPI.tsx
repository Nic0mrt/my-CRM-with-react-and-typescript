export async function postCompany(url: string, company = {}) {
  const results = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: company ? JSON.stringify(company) : null,
  });
  const data = results.json();
  return data;
}

export async function modifiyCompany(url: string, company = {}) {
  const results = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: company ? JSON.stringify(company) : null,
  });
  const data = results.json();
  return data;
}

export async function deleCompany(url: string) {
  const results = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  const data = results.json();
  return data;
}
