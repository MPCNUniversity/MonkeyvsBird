<template>
  <div>
    <Artifact left="50px" top="80px" tooltip="Arcane Ashra" image="ashra.png" />
    <Artifact left="200px" top="180px" tooltip="Sefa Bubbels" image="sefabubbels.png" />
    <Artifact left="350px" top="280px" tooltip="Orakel Lena" image="Lena.png" />
    <Artifact left="350px" top="300px" tooltip="Librarian Michael" image="teacher.png" />
  </div>
</template>

<script>
import Artifact from '~/components/Artifact.vue'

export default {
  components: { Artifact }
}
</script>
