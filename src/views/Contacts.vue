<template>
  <div class="about">
    <h1>Contacts</h1>
    <!-- <contact-list :contacts="contactsToShow" /> -->
    <ContactSearch @search="search" />
    <contact-list :contacts="contacts" />
    <div class="add-new-contact" @click="onAdd"></div>
    <div :class="`msg ${this.msg.type}`">{{this.msg.txt}}</div>
  </div>
</template>


<script>
import ContactList from "@/components/ContactList";
import contactService from "@/services/contacts.service.js";
import ContactSearch from "@/components/ContactSearch";

export default {
  async created() {
    this.contacts = await contactService.query();
  },
  data() {
    return {
      contacts: [],
      msg:{}
    };
  },
  methods: {
    showMsg(msg){
      console.log('msg',msg);
      this.msg=msg
      setTimeout(()=>{
        this.msg={}
      },5000)
    },
    async search(filterBy) {
      console.log("filterBy : ", filterBy);

      this.contacts = await contactService.query(filterBy);
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
    // contactsToShow() {
    // return this.contacts;
    // },
  },
  watch:{
    contacts: function(){
      this.showMsg({txt:'Contacts updated successfully', type:'ok'})
    }
  }
};
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
}
.msg{
  position: fixed;
  bottom: 20px;
  left: -240px;
  max-width:fit-content;
  min-width: fit-content;
  height: 50px;
  display: flex;
  padding: 0 15px;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: 1px solid slategray;
  transition: .5s;
  &.ok{
    transition: .5s;
    left: 10px;
    background-color: lightgreen;
  }
  &.error{
    transition: .5s;
    left: 10px;
    background-color: lightcoral;
  }
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
