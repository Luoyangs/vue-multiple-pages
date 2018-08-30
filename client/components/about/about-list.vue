<template>
  <div class="about-list">
    <ul>
      <li v-for="(item, index) in list" :key="index">{{index}} {{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'this is list item 1',
        'this is list item 2',
        'this is list item 3',
        'this is list item 4',
        'this is list item 5',
        'this is list item 6'
      ]
    }
  }
}
</script>
