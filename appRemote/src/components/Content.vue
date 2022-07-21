<template>
  <div class="remote-component text-center bg-green-400 text-white">
    <div class="p-3 italic text-xl"># [REMOTE]</div>
    <!-- Loading -->
    <div v-if="isLoading" class="flex w-full justify-center items-center pt-6">
      <div class="meetup">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-else class="flex flex-col flex-wrap md:flex-row">
      <!-- Search -->
      <div
        class="md:border-double border-purple-400 md:border-r md:border-b-0 border-b p-2 w-full md:w-1/4 pb-3 md:pb-0"
      >
        <h1 class="mb-2 font-bold text-2xl">Name</h1>
        <input
          v-model="searchText"
          type="text"
          class="focus:outline-none focus:ring focus:border-blue-300 px-4 py-3 leading-5 border rounded-md w-full text-purple-600 font-medium"
        />
        <h1 class="mb-2 font-bold text-2xl">Alcohol</h1>
        <input
          type="range"
          v-model="alcoholLimit"
          min="0"
          max="15"
          class="w-full"
        />
      </div>
      <!-- Computed List -->
      <div class="w-full flex-1 md:w-3/4 md:pl-3 md:pt-0 pl-0 pt-3">
        <div
          v-for="tap in computedList"
          :key="tap.beverageName"
          style="grid-template-columns: 1fr 5fr"
          class="grid grid-gap-3 mb-4 p-3 rounded-lg border border-gray-300"
        >
          <img :src="tap.logo" class="w-24 h-24 rounded-3xl mx-auto" />
          <div>
            <p class="text-2xl">
              <span class="font-bold">{{ tap.producerName }}</span>
              {{ tap.beverageName }}
            </p>
            <p class="text-lg">
              {{ tap.beverageStyle }} - {{ tap.abv }}% {{ tap.ibu }} IBU
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const list = ref([]);
    const searchText = ref("");
    const alcoholLimit = ref(10);
    const isLoading = ref(true);

    const sleep = (ms) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };

    const getList = async (url) => {
      await sleep(1500);
      list.value = await (await fetch(url)).json();
      isLoading.value = false;
    };

    const filter = () => {
      const searchRE = new RegExp(searchText.value, "i");
      return list.value
        .filter(
          ({ beverageName, abv }) =>
            beverageName.match(searchRE) && abv < alcoholLimit.value
        )
        .slice(0, 15);
    };

    getList(`${process.env.URL_APP_REMOTE}/dummy-list.json`);

    const computedList = computed(() => filter());

    return { isLoading, searchText, alcoholLimit, computedList };
  },
};
</script>

<style lang="scss">
.remote-component {
  min-height: 150px;
  border: 1px solid blue;
  padding: 10px;
}
@keyframes meetup {
  0%,
  100% {
    transform: rotate(calc(var(--rotation) * 1deg)) translateY(0);
  }
  50% {
    transform: rotate(calc(var(--rotation) * 1deg)) translateY(300%);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.meetup {
  animation: spin 1s infinite linear;
  height: 10px;
  width: 10px;
}
.meetup div {
  height: 100%;
  position: absolute;
  width: 100%;
  animation: meetup 1.25s infinite ease;
  background: #fff;
  border-radius: 100%;
}
.meetup div:nth-child(1) {
  --rotation: 90;
  background-color: #2af5d6;
}
.meetup div:nth-child(2) {
  --rotation: 180;
}
.meetup div:nth-child(3) {
  --rotation: 270;
}
.meetup div:nth-child(4) {
  --rotation: 360;
}
</style>
