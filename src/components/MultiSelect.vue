<template>
  <div>
    <label class="typo__label">{{ label }}</label>
    <multiselect
      v-model="val"
      :placeholder="placeholder"
      label="name"
      track-by="code"
      :options="options"
      @input="onSelect"
      :multiple="true"
      :taggable="true"
    ></multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  name: "MultiSelect",
  components: { Multiselect },
  props: {
    options: {
      type: Array,
    },
    value: {
      type: Array,
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  data() {
    return {
      val: this.value,
    };
  },
  methods: {
    onSelect() {
      this.$emit("handlerSelect", this.val);
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
