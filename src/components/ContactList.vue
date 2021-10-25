<template>
  <div class="contct-list">
    <ul class="contacts-container clean-list flex column align-center justify-center wrap">
      <li class="contact" v-for="(contact, idx) in contacts" :key="idx">
        <contact-preview :contact="contact" />
      </li>
    </ul>
  </div>
</template>


<script>
import ContactPreview from "@/components/ContactPreview";

export default {
  name: "contact-list",
  props: ["contacts"],
  methods: {},
  components:{
    ContactPreview
  }
};
</script>
