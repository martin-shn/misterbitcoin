<template>
  <div class="contact-preview flex align-center" @click="onContact">
    <div class="avatar"><img :src="contact.imgUrl" /></div>
    <div class="contact-details">
      {{ contact.n }}
    </div>
  </div>
</template>

<script>
export default {
  name: "contact-preview",
  props: ["contact"],
  methods: {
    onContact() {
      this.$router.push(`/contacts/${this.contact._id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.contact-preview {
  gap: 10px;
  width: 300px;
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 25px 5px 5px 25px;
  transition: 0.2s;
  &:hover {
    transition: 0.2s;
    background-color: rgb(35, 148, 148);
  }
  .avatar {
    min-width: 50px;
    width: 50px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid rgb(25, 125, 150);
      box-sizing: border-box;
      box-shadow: 1px 0px 3px 0px #8fc6c6;
    }
  }
  .contact-details {
    flex-grow: 1;
  }
}
</style>
