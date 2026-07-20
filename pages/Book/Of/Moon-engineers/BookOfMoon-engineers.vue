<template>
  <div
      class="absolute inset-0 bg-cover bg-center brightness-75"
      :style="{ backgroundImage: `url(${mapUrl})` }"
  ></div>
  <ButtonsArtifact left="50px" top="180px" tooltip="Map" image="hn_map3.png" />
  <ButtonsArtifact left="60px" top="170px" tooltip="HallDeskMap" image="hn_map.png" />
  <ButtonsArtifact left="70px" top="160px" tooltip="HallDesk" image="pionbord.png" />
  <ButtonsArtifact left="80px" top="150px" tooltip="Ranger" image="rangeronlineocean.gif" />
  <ButtonsArtifact left="90px" top="140px" tooltip="Steven Strickter" image="Steven2.png" />
  <ButtonsArtifact left="250px" top="180px" tooltip="Maan-engineer" image="wordmaanengineer.png" />
  <ButtonsArtifact left="260px" top="170px" tooltip="Maan-engineer" image="wordmaanengineer.png" />
  <ButtonsArtifact left="270px" top="160px" tooltip="Maan-engineer" image="wordmaanengineer.png" />
  <ButtonsArtifact left="280px" top="150px" tooltip="Maan-engineer" image="wordmaanengineer.gif" />
  <ButtonsArtifact left="290px" top="140px" tooltip="Maan-engineer" image="wordmaanengineer.png" />
  <ButtonsArtifact left="450px" top="180px" tooltip="moon robot control" image="moonrobotcontrol.png" />
  <ButtonsArtifact left="460px" top="170px" tooltip="moon robot control" image="moonrobotcontrol.png" />
  <ButtonsArtifact left="470px" top="160px" tooltip="moon robot control" image="moonrobotcontrol.png" />
  <ButtonsArtifact left="480px" top="150px" tooltip="moon robot control" image="moonrobotcontrol.png" />
  <ButtonsArtifact left="490px" top="140px" tooltip="moon robot control" image="moonrobotcontrol.png" />
  <ButtonsArtifact left="690px" top="180px" tooltip="the crew" image="longhaulers.png" />
  <ButtonsArtifact left="890px" top="180px" tooltip="space commander" image="spacecommander.png" />

  <div>

    <h1 class="title">Book of Moon-engineers</h1>

  </div>


</template>

<script setup>
import ButtonsArtifact from '~/components/Buttons/ButtonsArtifact.vue'
const mapUrl =
    "/images/moonrobotcontrol.png"
</script>
