<template>
  <div class="contct-list">
      <!-- <pre>{{contacts}}</pre> -->
    <ul class="contacts-container clean-list flex align-center justify-center wrap">
      <li class="contact" v-for="(contact, idx) in contacts" :key="idx">
        <div>{{contact.f + " " + contact.l}}</div>
        <!-- <contact-preview :contact="contact" /> -->
        <!-- <div class="actions flex space-between align-center">
          <button @click="printCar(car, $event)">Print Log</button>
          <button @click="remove(car._id)">Remove</button>
        </div> -->
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "contact-list",
  props: ["contacts"],
  methods: {},
};
</script>
