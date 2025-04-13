<template>
  <form @submit.prevent="addName">
    <section id="routerNames">
      <h2>Add names to the Wheel of Names</h2>
      <input type="text" v-model="enteredName"/>
      <div>
        <label for="colorDropdown">Select a color:</label>
        <select v-model="selectedColor" id="colorDropdown">
          <option
              v-for="color in colors"
              :key="color"
              :value="color"
          >{{ color }}
          </option>
        </select>
      </div>
      <button :disabled="isButtonDisabled"
              :class="{'disabled-button': isButtonDisabled}"
      >Add to the list
      </button>
      <p v-if="names.length === 0">No Names will be added to the wheel.</p>
      <ul v-else>
        <li
            v-for="(name, index) in names"
            :key="index"
            @click="removeName(index)"
            :style="name.color ? { backgroundColor: name.color.toLowerCase() } : {}"
        >{{ name.name }}
        </li>
      </ul>
    </section>
  </form>
  <div class="generateButton">
    <button @click="generateWheel"
            :disabled="isGenerateWheelDisabled"
            :class="{'disabled-button': isGenerateWheelDisabled}"
    >Generate Wheel
    </button>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();

const names = ref<{ name: string; color: string | null }[]>([]);
const enteredName = ref('');

const colors = ["Red", "Green", "Blue", "Yellow", "Purple"];
const selectedColor = ref<string | null>(null);

const isButtonDisabled = computed(() => {
  return !enteredName.value || !selectedColor.value;
});

const isGenerateWheelDisabled = computed(() => {
  return names.value.length < 2;
});


function addName(): void {
  names.value.push({
    name: enteredName.value,
    color: selectedColor.value
  });

  enteredName.value = '';
  selectedColor.value = null;
}

function removeName(index: number): void {
  names.value.splice(index, 1);
}

function generateWheel(): void {
  router.push({
    name: 'wheelPage',
    query: {data: JSON.stringify(names.value)},
  });

}
</script>

<style scoped>

#routerNames {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
}

#routerNames h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #1b995e;
  margin: 0 0 1rem 0;
}

#routerNames ul {
  list-style: none;
  margin: 1rem 0;
  padding: 0;
}

#routerNames li {
  margin: 1rem 0;
  font-size: 1.25rem;
  font-weight: bold;
  background-color: #8ddba4;
  padding: 0.5rem;
  color: #1f1f1f;
  border-radius: 25px;
}

#routerNames input {
  font: inherit;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

#routerNames input:focus {
  outline: none;
  border-color: #1b995e;
  background-color: #d7fdeb;
}

.generateButton {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:disabled {
  background-color: #cfcfcf;
  color: #888;
}

.disabled-button {
  background-color: #cfcfcf;
  color: #888;
}
</style>
