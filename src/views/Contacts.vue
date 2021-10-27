<template>
  <section class="contacts">
    <h1>Contacts</h1>
    <contact-search @search="setFilter" />
    <contact-list :contacts="filteredContacts" />
    <div class="add-new-contact" @click="onAdd"></div>
  </section>
</template>


<script>
import ContactList from '@/components/ContactList';
import ContactSearch from '@/components/ContactSearch';

export default {
  components: {
    ContactList,
    ContactSearch,
  },
  data() {
    return {
      filterBy: null,
    };
  },
  methods: {
    onAdd() {
      this.$router.push('/contacts/new');
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
  },
  computed: {
    filteredContacts() {
      const contacts = this.$store.getters.contacts;
      if (!this.filterBy) return contacts;
      const regex = new RegExp(this.filterBy, 'i');
      return contacts.filter((contact) => regex.test(contact.n));
    },
  },
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
    content: '+';
    height: 100%;
    line-height: 40px;
    font-size: 50px;
    text-shadow: 0 0 9px #cccaca;
  }
  &:hover {
    transition: 2s;
    box-shadow: inset 0 0 5px 2px #373737;
    &::before {
      text-shadow: 0 0 3px #b4b4b4;
    }
  }
}
</style>
