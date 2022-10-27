const fn = require("./contacts");
const argv = require("yargs").argv;

async function invokeAction({
  action,
  id,
  name,
  email,
  phone,
}) {
  switch (action) {
    case "list":
      const allContacts = await fn.listContacts();
      console.table(allContacts);
      return allContacts;

    case "get":
      const contactById = await fn.getContactById(
        id
      );
      console.log(contactById);
      return contactById;

    case "add":
      const newContact = await fn.addContact(
        name,
        email,
        phone
      );
      break;

    case "remove":
      const deletedContact =
        await fn.removeContact(id);
      console.log(deletedContact);
      return deletedContact;

    default:
      console.warn(
        "\x1B[31m Unknown action type!"
      );
  }
}

invokeAction(argv);
