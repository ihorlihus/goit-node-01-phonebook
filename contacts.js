const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");

const contactsPath = path.join(
  __dirname,
  "./db/contacts.json"
);

async function listContacts() {
  const contacts = await fs.readFile(
    contactsPath,
    "utf-8"
  );
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(
    (item) => item.id === contactId.toString()
  );
  return contact;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const contact = await getContactById(contactId);

  if (!contact) {
    console.log(
      `no contact with ${contactId} id`
    );
    return null;
  }
  const contactsWithoutDel = allContacts.filter(
    (item) => item.id !== contactId.toString()
  );
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsWithoutDel)
  );
  return contact;
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };
  const contacts = await listContacts();
  contacts.push(contact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts)
  );
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
