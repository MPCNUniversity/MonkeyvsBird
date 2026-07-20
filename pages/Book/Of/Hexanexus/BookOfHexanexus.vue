<template>
  <div
      class="absolute inset-0 bg-cover bg-center brightness-75"
      :style="{ backgroundImage: `url(${mapUrl})` }"
  ></div>

    <div>

<h1 class="title">Book of Hexanexus</h1>

    </div>

  <FullContentDial />
  <radialDial />

  <ButtonsArtifact left="50px" top="380px" tooltip="Map" image="hn_map3.png" />
  <ButtonsArtifact left="60px" top="370px" tooltip="HallDeskMap" image="hn_map.png" />
  <ButtonsArtifact left="70px" top="360px" tooltip="HallDesk" image="pionbord.png" />
  <ButtonsArtifact left="80px" top="350px" tooltip="Ranger" image="rangeronlineocean.gif" />
  <ButtonsArtifact left="90px" top="340px" tooltip="Steven Strickter" image="Steven2.png" />



</template>

<script setup>


 import ButtonsArtifact from '~/components/Buttons/ButtonsArtifact.vue'
 import FullContentDial from '~/components/FullContentDial.vue'
 import radialDial from '~/components/radialDial.vue'

 const mapUrl =
     "/Website/images/hexanexustable.png"
</script>
