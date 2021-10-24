<template>
  <div class="contact-details flex column align-center">
    <h1>Contact Details</h1>
    <img :src="contact.imgUrl" />
    <div class="flex align-center">
      <label>Name:</label>
      <h4
        contenteditable
        id="n"
        :class="isNew ? 'new' : ''"
        :autofocus="isNew"
        ref="input"
        @keydown="onKeyDown"
        @blur="onBlur"
      >
        {{ contact.n }}
      </h4>
    </div>
    <div class="flex align-center">
      <label>Phone:</label>
      <h4 contenteditable id="p" @keydown="onKeyDown" @blur="onBlur">
        {{ contact.p }}
      </h4>
    </div>
    <div class="flex align-center">
      <label>Email:</label>
      <h4 contenteditable id="e" @keydown="onKeyDown" @blur="onBlur">
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
        n: "",
        e: "",
        p: "",
        imgUrl: "",
        balance: 100,
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
      this.$refs.input.focus();
    },
    onBack() {
      this.$router.push("/contacts");
    },
    async onDelete() {
      if (!this.contact._id) {
        var id = this.$route.params.contactId;
        }
      
      await contactService.remove(this.contact._id || id);
      this.$router.push("/contacts");
    },
    async onSave() {
      if (!this.contact.n || !this.contact.e || !this.contact.p)
        this.msg = { txt: "All fields are mandatory", type: "error" };
      else {
        console.log(this.contact);
        var savedContact;
        if (!this.contact._id) {
          this.contact.imgUrl = `https://robohash.org/${this.contact.e}?set=set5`;
          savedContact = await contactService.save(this.contact);
        } else {
          savedContact = await contactService.update(this.contact);
        }
        this.msg = { txt: "Saved successfully", type: "ok" };
        this.isChanged = false;
        this.isNew = false;
      }
      this.isSaved = true;
      setTimeout(() => {
        this.isSaved = false;
        this.$router.push(`/contacts/${savedContact._id}`);
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
  watch: {
    isNew: function (isNew) {
      if (isNew) this.focusInput();
    },
  },
};
</script>

<style scoped lang="scss">
.contact-details {
  row-gap: 10px;
  .new {
    flex-grow: unset;
    width: 100%;
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
