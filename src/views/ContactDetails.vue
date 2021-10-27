<template>
  <div v-if="contact" class="contact-details flex column align-center">
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
      >{{ contact.n }}</h4>
    </div>
    <div class="flex align-center">
      <label>Phone:</label>
      <h4 contenteditable id="p" @keydown="onKeyDown" @blur="onBlur">{{ contact.p }}</h4>
    </div>
    <div class="flex align-center">
      <label>Email:</label>
      <h4 contenteditable id="e" @keydown="onKeyDown" @blur="onBlur">{{ contact.e }}</h4>
    </div>

    <div class="actions flex justify-center">
      <button v-if="isChanged" @click="onSave">Save</button>
      <button @click="onBack">Back</button>
      <button v-if="!isNew" @click="onDelete">Delete</button>
    </div>
    <div v-if="isSaved" :class="`msg ${this.msg.type}`">{{ this.msg.txt }}</div>
    <transfer-fund v-if="isShow && !isNew && contact._id" :user="contact" />
    <move-list v-if="contact && !isNew" :contact="contact" :loggedInUser="loggedInUser" />
  </div>
</template>


<script>
import contactService from '@/services/contacts.service';
import TransferFund from '@/components/TransferFund.vue';
import userService from '@/services/user.service.js';
import MoveList from '../components/MoveList.vue';
import { showMsg } from '@/services/eventBus.service';

export default {
  name: 'ContactDetails',
  async mounted() {
    const { contactId } = this.$route.params;
    if (contactId !== 'new') {
      const contact = await contactService.getById(contactId);
      this.contact = contact[0];
    } else {
      this.contact = {
        n: '',
        e: '',
        p: '',
        imgUrl: '',
        balance: 100,
      };
      this.isNew = true;
      this.focusInput();
    }
  },
  data() {
    return {
      contact: null,
      isChanged: false,
      isSaved: false,
      isNew: false,
      msg: {},
    };
  },

  computed: {
    isShow() {
      return this.loggedInUser.balance > 0;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    newContact() {
      return this.isNew;
    },
  },
  watch: {
    newContact() {
      setTimeout(async () => {
        const { contactId } = this.$route.params;
        if (contactId !== 'new') {
          const contact = await contactService.getById(contactId);
          this.contact = contact[0];
        }
      }, 0);
    },
  },
  methods: {
    focusInput() {
      setTimeout(() => {
        this.$refs.input.focus();
      }, 0);
    },
    onBack() {
      this.$router.push('/contacts');
    },
    async onDelete() {
      if (!this.contact._id) {
        var id = this.$route.params.contactId;
      }
      await this.$store.dispatch({ type: 'remove', id: this.contact._id || id });
      showMsg('Contact removed', 'error');
      this.$router.push('/contacts');
    },
    async onSave() {
      this.isSaved = false;
      if (!this.contact.n || !this.contact.e || !this.contact.p)
        this.msg = { txt: 'All fields are mandatory', type: 'error' };
      else {
        var savedContact;
        if (!this.contact._id) {
          this.contact.imgUrl = `https://robohash.org/${this.contact.e}?set=set5`;
          await this.$store.dispatch({ type: 'save', contact: this.contact });
          savedContact = this.$store.getters.currContact;
          showMsg('Contact added', 'ok');
          this.$router.push(`/contacts/${savedContact._id}`);
        } else {
          await this.$store.dispatch({ type: 'save', contact: this.contact });
          savedContact = this.contact;
          showMsg('Contact updated', 'ok');
        }
        this.isChanged = false;
        this.isNew = false;
      }

      this.isSaved = true;
      setTimeout(() => {
        this.isSaved = false;
      }, 5000);
    },
    onBlur({ target }) {
      this.isChanged = this.contact[target.id] !== target.innerText;
      this.contact = { ...this.contact, [target.id]: target.innerText };
    },
    onKeyDown(ev) {
      if (ev.key === 'Enter') {
        ev.preventDefault();
      }
    },
  },
  components: {
    TransferFund,
    MoveList,
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
