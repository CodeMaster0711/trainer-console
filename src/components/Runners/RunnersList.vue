<template>
  <ul class="runners-list">
     <li class="runners-list__item" v-for="runner in runners" :key="runner.id">
      <div class="flex">
        <div class="user-image">
          <img src="https://randomuser.me/api/portraits/thumb/men/10.jpg">
        </div>
        <div class="user-infos">
          <h1 class="name">
             {{ runner.firstName }} {{ runner.lastName }}
          </h1>
          <div class="more-infos">
            <div class="flex flex--align-start">
              <span>{{ runner.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li class="runners-list__item runners-list__item--empty" v-if="runners.length === 0">
      <h1>Don't have runners</h1>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'runners-list',
  props: {
    runners: {
      type: Array,
      required: true
    }
  }
}
</script>
