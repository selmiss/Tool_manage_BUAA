<template>
  <div class="message">
    <!-- <template v-for="(item, index) in $store.state.message.msgPool">
      <div
        class="d-flex justify-center"
        transition="slide-y-transition"
        :key="index"
      >
        <template v-if="item.light == false">
          <v-alert :type="item.type" transition="scale-transition">{{
            item.message
          }}</v-alert>
        </template>
        <template v-else>
          <v-alert :type="item.type" outlined transition="scale-transition">{{
            item.message
          }}</v-alert>
        </template>
      </div>
    </template> -->
  </div>
</template>
<script>
export default {
  name: "Notifications",
};
</script>
<style>
.message {
  left: 50%;
  z-index: 9999;
  display: flex;
  position: fixed;
  min-width: 300px;
  flex-direction: column;
  transform: translateX(-50%);
  margin-top: 20px;
}
</style>
