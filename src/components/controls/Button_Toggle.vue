<template>
  <label class="checkbox-container">
    <input type="checkbox" name="button">
    <span class="checkmark">HIGH</span>
  </label>
</template>

<script>
import {ref,defineComponent} from "vue";

export default defineComponent({
  name: "Button_Toggle"

})

</script>

<style >
:root{
  --border-color: rgb(57, 56, 56);
  --btn-color: rgb(30, 30, 30);
  --btn-color-off: rgb(35, 37, 39);
  --shadow-color: rgb(0, 0, 0);
  --text-color-off: rgb(105, 105, 105);
  --text-color-on: rgb(232, 232, 232);
}






.checkbox-container {
  text-transform: uppercase;
  font-family: 'Courier Prime', monospace;
  display: flex;
  letter-spacing: 4px;
  justify-content: flex-start; /* aligns content to the left */
  align-items: center;
  position: relative;
  margin-bottom: 0;
  cursor: pointer;
  font-size: 22px;
  user-select: none;
  pointer-events: none;
}

/* Hide the browser's default checkbox */
.checkbox-container input {
  position: relative ;
  opacity: 0;
  cursor: pointer;
  background-color: black;
  pointer-events: none;
}


.checkmark {
  position: relative;
  pointer-events: auto;
  height: 20px;
  width: 40px;
  margin: 2px;
  border-radius: 5%;
  background:
    radial-gradient(circle, rgba(255, 255, 255, 0.15),rgba(0, 0, 0, 0.349)),
    var(--btn-color-off);
  border: 1px solid rgba(26, 26, 26, 0.524);
  box-shadow: inset 0 0 3px 1px var(--shadow-color);
  /* Text */
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-color-off);
}

/*.checkbox-container:hover .checkmark::before {
  background:
    radial-gradient(circle, rgba(255, 255, 255, 0.15),rgba(0, 0, 0, 0.15)),
    var(--selected-color);

}/*

/* On mouse-over, add a grey background color */
.checkmark:active {
  box-shadow: inset 0 0 13px 4px var(--shadow-color);
  background:
    radial-gradient(circle, rgba(255, 255, 255, 0.15),rgba(0, 0, 0, 0.431)),
    var(--btn-color);
}

.checkmark:hover {
  border-color: rgba(255, 255, 255, 0.047);
}


.checkbox-container input:checked ~ .checkmark {
  color: var(--text-color-on);
  background:
    radial-gradient(circle, rgba(255, 255, 255, 0.342),rgba(0, 0, 0, 0.15)),
    var(--btn-color);
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.458), /* top shadow */
    0 0px 2px 0px rgba(0, 0, 0, 0.467);
  z-index: 1;
}








/* Create the checkmark/indicator (hidden when not checked) */


/* Show the checkmark when checked */


/* Style the checkmark/indicator */
.checkbox-container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid black;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

</style>
