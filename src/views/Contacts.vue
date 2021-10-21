<template>
  <div class="about">
    <h1>Contacts</h1>
    <contact-list :contacts="contactsToShow" />
  </div>
</template>


<script>
import ContactList from "@/components/ContactList";
import contactService from "@/services/contacts.service.js";

export default {
  async created() {
    this.contacts = await contactService.query();
  },
  data() {
    return {
      contacts: [],
    };
  },

  components: {
    ContactList,
  },
  computed: {
    contactsToShow() {
      return this.contacts;
    },
  },
};
</script>