import { Contact } from "../models/Contact";
import { Comment } from "../models/Comment";

const HTTPADRRESS = "http://localhost:8000";

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

export async function addContact(url: string, contact: {}) {
  const results = await fetch(`${HTTPADRRESS + url}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: contact ? JSON.stringify(contact) : null,
  });
  const data = results.json();
  return data;
}

export async function getContactsByCompanyId(url: string, companyId: string) {
  const results = await fetch(`${HTTPADRRESS + url}/${companyId}`, {
    headers: {
      Accept: "applicaiton/json",
      "Content-Type": "application/json",
    },
  });

  const data = results.json();
  return data;
}

export async function deleteContactByIdWithCompanyId(
  url: string,
  companyId: string,
  contactId: string
) {
  const results = await fetch(`${HTTPADRRESS + url}/${companyId}`, {
    headers: {
      Accept: "applicaiton/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify({ contact_id: contactId }),
  });

  const data = results.json();

  return data;
}

export async function modifyContactWithId(
  url: string,
  contactId: string,
  contact: Contact
) {
  const results = await fetch(`${HTTPADRRESS + url}/${contactId}`, {
    headers: {
      Accept: "applicaiton/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(contact),
  });

  const data = results.json();

  return data;
}

export async function fetchApi(
  url: string,
  method: string,
  body?: string | null
) {
  const results = await fetch(`${HTTPADRRESS + url}`, {
    headers: {
      Accept: "applicaiton/json",
      "Content-Type": "application/json",
    },
    method: method,
    body: body ? body : null,
  });

  const data = results.json();

  return data;
}
