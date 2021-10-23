<template>
  <div class="contact-details flex column align-center">
    <h1>Contact Details</h1>
    <img :src="contact.imgUrl" />
    <div class="flex align-center">
      <label>Name:</label>
      <h4
        contenteditable
        id="f"
        :class="isNew?'new':''"
        :autofocus="isNew"
        ref="input"
        @keydown="onKeyDown"
        @blur="onBlur"
        style="text-align: right"
      >
        {{ contact.f }}
      </h4>
      <h4
        contenteditable
        id="l"
        :class="isNew?'new':''"
        @keydown="onKeyDown"
        @blur="onBlur"
        style="text-align: left"
      >
        {{ contact.l }}
      </h4>
    </div>
    <div class="flex align-center">
      <label>Phone:</label>
      <h4
        contenteditable
        id="p"
        @keydown="onKeyDown"
        @blur="onBlur"
      >
        {{ contact.p }}
      </h4>
    </div>
    <div class="flex align-center">
      <label>Email:</label>
      <h4
        contenteditable
        id="e"
        @keydown="onKeyDown"
        @blur="onBlur"
      >
        {{ contact.e }}
      </h4>
    </div>

    <div class="actions flex justify-center">
      <button v-if="isChanged" @click="onSave">Save</button>
      <button @click="onBack">Back</button>
      <button @click="onDelete">Delete</button>
    </div>
    <div v-if="isSaved" :class="`msg ${this.msg.type}`">{{ this.msg.txt }}</div>
  </div>
</template>


<script>
import contactService from "@/services/contacts.service";

export default {
  name: "ContactDetails",
  async created() {
    const { contactId } = this.$route.params;
    if (contactId !== "new") {
      const contact = await contactService.getById(contactId);
      this.contact = contact[0];
    } else {
      this.contact = {
        f: "",
        l: "",
        e: "",
        p: "",
        imgUrl: "",
      };
      this.isNew = true;
    }
    // if (!contact) this.$router.push("/");
  },
  data() {
    return {
      contact: {},
      isChanged: false,
      isSaved: false,
      isNew: false,
      msg: {},
    };
  },
  methods: {
    focusInput() {
      this.$refs.input.focus()
    },
    onBack() {
      this.$router.push("/contacts");
    },
    async onDelete(){
      await contactService.remove(this.contact._id)
      this.$router.push('/contacts')
    },
    async onSave() {
      console.log(this.contact);
      if (!this.contact._id) {
        if (
          this.contact.f &&
          this.contact.l &&
          this.contact.e &&
          this.contact.p
        ) {
          this.contact.imgUrl = `https://robohash.org/${this.contact.e}?set=set5`;
          const savedContact = await contactService.save(this.contact);
          this.msg = { txt: "Saved successfully", type: "ok" };
        } else {
          this.msg = { txt: "All fields are mandatory", type: "error" };
        }
      } else {
        const savedContact = await contactService.update(this.contact);
        this.msg = { txt: "Saved successfully", type: "ok" };
      }
      this.isChanged = false;
      this.isSaved = true;
      this.isNew = false;
      setTimeout(() => {
        this.isSaved = false;
      }, 2000);
    },
    onBlur({ target }) {
      this.isChanged = this.contact[target.id] !== target.innerText;
      this.contact = { ...this.contact, [target.id]: target.innerText };
    },
    onKeyDown(ev) {
      if (ev.key === "Enter") {
        ev.preventDefault();
      }
    },
  },
  watch:{
    isNew: function(isNew){
      if (isNew) this.focusInput()
    }
  }
};
</script>

<style scoped lang="scss">
.contact-details {
  row-gap: 10px;
  .new{
    text-align: left!important;
    flex-grow: unset;
    min-width: 50%;
  }
  h4,
  label {
    margin-right: 1ch;
  }
  h4 {
    padding: 5px;
    margin: 0;
    flex-grow: 1;
    text-align: center;
    cursor: text;
    &:hover {
      outline: 1px solid #dad9d9;
    }
  }
  img {
    width: 80%;
    max-width: 300px;
  }
  & > div {
    display: flex;
    width: 300px;
    & > label {
      min-width: 50px;
    }
  }
  .actions {
    margin-top: 15px;
    gap: 20px;
    button {
      color: snow;
      background-color: lightslategray;
      min-width: 50px;
      &:hover {
        background-color: slategray;
      }
    }
  }
  .msg {
    font-weight: 600;
    display: flex;
    justify-content: center;
    &.ok {
      color: springgreen;
    }
    &.error {
      color: rgb(252, 108, 52);
    }
  }
}
</style>
