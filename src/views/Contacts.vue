<template>
  <div class="about">
    <h1>Contacts</h1>
    <!-- <contact-list :contacts="contactsToShow" /> -->
    <contact-search @search="search" />
    <contact-list :contacts="filteredContacts" />
    <div class="add-new-contact" @click="onAdd"></div>
  </div>
</template>


<script>
import ContactList from "@/components/ContactList";
import contactService from "@/services/contacts.service.js";
import ContactSearch from "@/components/ContactSearch";
import eventBus from "@/services/eventBus.service";

export default {
  async created() {
    await this.$store.dispatch({type:'setContacts'})
    this.filteredContacts=this.contacts
    
  },
  data() {
    return {
      filteredContacts:null
    };
  },
  methods: {
    search(filterBy) {
      const regex = new RegExp(filterBy, 'i');
      this.filteredContacts = this.contacts.filter(contact=>regex.test(contact.n))
    },
    onAdd(){
      this.$router.push('/contacts/new');
    }
  },
  components: {
    ContactList,
    ContactSearch,
  },
  computed: {
    contacts(){
      return this.$store.getters.getContacts;
    }
  },
  watch:{
  }
};
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
}

.add-new-contact {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #333;
  background-color: steelblue;
  box-shadow: inset 0 0 7px 0px #373737;
  padding: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
  &::before {
    content: "+";
    height: 100%;
    line-height: 40px;
    font-size: 50px;
    text-shadow: 0 0 9px #cccaca;
  }
  &:hover{
    transition: 2s;
    box-shadow: inset 0 0 5px 2px #373737;
    &::before{
      text-shadow: 0 0 3px #b4b4b4;
    }
  }
}
</style>
