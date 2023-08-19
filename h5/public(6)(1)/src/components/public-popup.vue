<template>
  <!-- <van-popup v-model="show" position="bottom" :style="{ height: '50%' }"> -->
  <van-picker
    show-toolbar
    value-key="name"
    :title="title"
    :columns="columns"
    @cancel="close"
    @confirm="onConfirm"
  ></van-picker>
  <!-- </van-popup> -->
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    columns: {
      type: Array,
      default: () => {},
    },
    selKey: {
      type: String,
      default: "",
    },
    colName: {
      type: String,
      default: "",
    },
  },
  methods: {
    onConfirm(value) {
      let mySent = {
        selKey: this.selKey,
        selCol: this.colName,
        selVal: value.value,
      };
      this.$emit("sel", mySent);
    },
    close() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style>
</style>