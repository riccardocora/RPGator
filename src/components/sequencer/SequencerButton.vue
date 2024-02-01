<template>
  <q-btn
      padding="xs lg"
      :class="{ active: isActive }"
      @click="toggleState"
  />
</template>

<script>
  import {ref} from "vue";

  export default{
    name : "SequencerButton",
    props : {
      isActive : Boolean,
    },

    mounted(){
    },
    data() {
      return {
        localIsActive: this.isActive,
      };
    },
   methods : {
     toggleState() {
       this.localIsActive = !this.localIsActive;
       this.$emit('toggle-state', this.localIsActive);
     },

    }
  }
</script>

<style>
.active {
  background-color: green; /* Change this to your desired active color */
  color: white;
}
</style>
