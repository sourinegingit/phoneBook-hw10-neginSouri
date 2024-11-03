import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const contactListElement = document.getElementById("contact-list");
  const contactForm = document.getElementById("contactForm");
  const contactModal = document.getElementById("contactModal");
  const modalTitle = document.getElementById("modalTitle");
  const editIdInput = document.getElementById("editId");
  const contactNameInput = document.getElementById("contactName");
  const contactPhoneInput = document.getElementById("contactPhone");
  const contactEmailInput = document.getElementById("contactEmail");
  const addContactBtn = document.getElementById("addContactBtn");
  const NameInput = document.getElementById("name");
  const PhoneInput = document.getElementById("phone");
  const EmailInput = document.getElementById("email");
  const saveBtn = document.getElementById("saveBtn");
  const closeModalBtn = document.getElementById("closeModal");
  const searchInput = document.getElementById("search");

  // let contacts = [
  //   { name: "zahra", phone: "09125648978", email: "nsouri@",id:"1" },
  //   { name: "negin", phone: "09125648978", email: "nsouri@" ,id:"2"},
  //   { name: "sara", phone: "09125648978", email: "zahra@" ,id:"3"},
  //   { name: "negin", phone: "09125648978", email: "nsouri@",id:"4" },
  // ];

  // Load contacts from local storage
  const loadContacts = () => JSON.parse(localStorage.getItem("contacts")) || [];

  // Add a new contact
  const addContact = (contacts, newContact) => {
    const updatedContacts = [...contacts, newContact];
    saveContacts(updatedContacts);
    return updatedContacts;
  };

  // Update a contact
  const updateContact = (contacts, updatedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    saveContacts(updatedContacts);
    return updatedContacts;
  };

  // Save contacts to local storage
  const saveContacts = (contacts) => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  // start logical function
  const renderContacts = (contacts) => {
    contactListElement.innerHTML = "";
    contactListElement.innerHTML = contacts
      .map(
        (contact) => `  
       <tr>  
         <td class="border px-4 py-2 text-gray-100">${contact.name}</td>  
         <td class="border px-4 py-2 text-gray-100">${contact.phone}</td>  
         <td class="border px-4 py-2 text-gray-100">${contact.email}</td>  
         <td class="border px-4 py-2">  
           <button class=" bg-blue-800 text-white p-3 rounded-md" onclick="openEditModal('${contact.id}')">Edit</button>  
           <button class="bg-red-700 text-white p-3 rounded-md" onclick="deleteContact('${contact.id}')">Delete</button>  
         </td>  
       </tr>  
     `
      )
      .join("");
  };

  // function Search contacts
  const searchContacts = (contacts, searchValue) => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchValue) ||
        contact.phone.toLowerCase().includes(searchValue) ||
        contact.email.toLowerCase().includes(searchValue)
    );
  };

  // Delete a contact
  const deleteContact = (contacts, id) => {
    const updatedDeleteContacts = contacts.filter(
      (contact) => contact.id !== id
    );
    saveContacts(updatedDeleteContacts);
    return updatedDeleteContacts;
  };
  window.deleteContact = (id) => {
    contacts = deleteContact(contacts, id);
    renderContacts(contacts);
  };
  // Close modal
  const closeModal = () => {
    contactModal.classList.add("hidden");
  };

  // adeventListener
  // btn of form that submit
  addContactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newContact = {
      name: NameInput.value,
      phone: PhoneInput.value,
      email: EmailInput.value,
      id: new Date().getTime().toString(),
    };
    // contacts=[...contacts,newContact];
    contacts.push(newContact);
    renderContacts(contacts);
    contactForm.reset();
  });

  // btn of search
  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase().trim();
    const filteredSearchContacts = searchContacts(contacts, searchValue);
    renderContacts(filteredSearchContacts);
  });
  // modal btn
  closeModalBtn.addEventListener("click", closeModal);

  // Open modal to edit a contact
  window.openEditModal = (id) => {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      modalTitle.innerText = "Edit Contact";
      contactModal.classList.remove("hidden");
    }
  };
  //
  let contacts = loadContacts();
  renderContacts(contacts);
});
