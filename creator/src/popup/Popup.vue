<template>
  <div>
    <form v-if="tab">
      <div class="row">
        <div class="title col c12"><h1>Add a new channel</h1></div>
      </div>
      <div class="row">
        <div class="col c12">
          <input
            type="text"
            class="smooth"
            :value="tab.url"
          />
        </div>
      </div>
      <div class="row">
        <div class="col c12">
          <input
            type="text"
            class="smooth"
            :value="tab.title"
          />
        </div>
      </div>
      <div class="row">
        <div class="col c12">
          <button
            @click="addChannel"
            class="btn btn-b btn-sm smooth"
          >Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import browser from 'webextension-polyfill';

export default {
  name: 'Popup',

  data() {
    return {
      tab: null,
    };
  },

  mounted() {
    browser.tabs.query({ active: true, currentWindow: true })
      .then(tabs => {
        this.tab = tabs[0];
      })
  },

  methods: {
    addChannel() {

    },
  },
}
</script>

<style scoped>
h1 {
  white-space: nowrap;
}

.title {
  text-align: center;
}
</style>
