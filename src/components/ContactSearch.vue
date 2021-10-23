<template>
  <form class="search flex align-center justify-center">
    <input type="search" v-model="filterBy" @search.prevent="search" />
    <button @click.prevent="search">Search</button>
  </form>
</template>

<script>
export default {
  name: "ContactSearch",
  data() {
    return {
      filterBy: "",
    };
  },
  methods: {
    search() {
      console.log("sending filterBy : ", this.filterBy);

      this.$emit("search", this.filterBy);
    },
  },
};
</script>

<style scoped lang="scss">
.search {
  gap: 10px;
  width: 300px;
  margin: auto;
  input {
    flex-grow: 1;
    outline: 1px solid #333;
    border: 0;
    padding: 10px;
    height: 33px;
    border-radius: 3px;
  }
  button {
    color: snow;
    background-color: lightslategray;
    &:hover {
      background-color: slategray;
    }
  }
}
</style>
