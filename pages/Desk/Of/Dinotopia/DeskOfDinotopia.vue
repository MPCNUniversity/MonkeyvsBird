<template>
  <div
      class="absolute inset-0 bg-cover bg-center brightness-75"
      :style="{ backgroundImage: `url(${mapUrl})` }"
  ></div>
  <!-- --------------------------------------------------------------
       Outer wrapper that creates the “rug” background with concentric
       circles. The pattern is drawn with pure CSS, so no extra image
       files are needed.
       -------------------------------------------------------------- -->
  <div class="artifact-container">

    <!-- --------------------------------------------------------------
         Header – a tiny “one‑pager” title that feels luxurious.
         -------------------------------------------------------------- -->
    <div class="header">
      <h1 class="title">Desk of Dinotopia</h1>
    </div>

    <!-- --------------------------------------------------------------
         All Of your ButtonsArtifact components stay exactly where you
         put them.  The container only adds spacing/padding so the
         whole thing looks aligned on the “rug”.
         -------------------------------------------------------------- -->
    <div class="buttons-wrapper">
      <!-- Row 1 – Jesus -->
      <ButtonsArtifact left="50px"  top="180px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="60px"  top="170px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="70px"  top="160px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="80px"  top="150px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />

      <!-- Row 2 – Librarian Michael -->
      <ButtonsArtifact left="200px" top="180px" tooltip="Librarian Michael"
                       image="teacher.png" />
      <ButtonsArtifact left="210px" top="170px" tooltip="Librarian Michael"
                       image="teacher.png" />
      <ButtonsArtifact left="220px" top="160px" tooltip="Librarian Michael"
                       image="teacher.png" />
      <ButtonsArtifact left="230px" top="150px" tooltip="Librarian Michael"
                       image="teacher.png" />

      <!-- Row 3 – Jesus (bigger vertical column) -->
      <ButtonsArtifact left="350px" top="180px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="360px" top="170px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="370px" top="160px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="380px" top="150px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="390px" top="140px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />

      <!-- Row 4 – Librarian Michael (right side) -->
      <ButtonsArtifact left="510px" top="180px" tooltip="Librarian Michael"
                       image="teacher.png" />
      <ButtonsArtifact left="520px" top="170px" tooltip="Librarian Michael"
                       image="teacher.png" />
      <ButtonsArtifact left="530px" top="160px" tooltip="Librarian Michael"
                       image="teacher.png" />
      <ButtonsArtifact left="540px" top="150px" tooltip="Librarian Michael"
                       image="teacher.png" />

      <!-- Row 5 – Long vertical column Of Jesus -->
      <ButtonsArtifact left="420px" top="410px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="430px" top="400px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="440px" top="390px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="450px" top="380px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="460px" top="370px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="470px" top="360px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="480px" top="350px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="490px" top="340px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="500px" top="330px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="510px" top="320px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="520px" top="310px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="530px" top="300px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="540px" top="290px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="550px" top="280px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="560px" top="270px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="570px" top="260px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="580px" top="250px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="590px" top="240px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="600px" top="230px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="610px" top="220px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="620px" top="210px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="630px" top="200px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="640px" top="190px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="650px" top="180px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="660px" top="170px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="670px" top="160px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="680px" top="150px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="690px" top="140px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="700px" top="130px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="710px" top="120px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
      <ButtonsArtifact left="720px" top="110px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />

      <!-- Two tiny “corner” buttons -->
      <ButtonsArtifact left="185px" top="380px" tooltip="Librarian Michael"
                       image="teacher.png" />
      <ButtonsArtifact left="25px"  top="380px" tooltip="Dinotopia"
                       image="DinotopiaJungleCabin.png" />
    </div>

    <!-- --------------------------------------------------- -->
    <!--  The *actual* page title – a nice, luxurious heading  -->
    <!-- --------------------------------------------------- -->
    <div class="page-header">
      <h1 class="title">Desk Of Dinotopia</h1>
    </div>
  </div>

  <div class="artifact-container">
    <!-- All the ButtonsArtifact instances are already placed
         in the markup above, so we just render them here. -->
    <slot />
  </div>
</template>

<!-- --------------------------------------------------- -->
<!--  Styles – everything is scoped so it won’t leak out   -->
<!-- --------------------------------------------------- -->
<style scoped>
/* --------------------------------------------------- */
/*  1️⃣  Page background – a subtle “tapestry” feel   */
/* --------------------------------------------------- */
body {
  margin: 0;
  min-height: 100vh;
  background: #f5f1e9;                     /* warm parchment */
  background-image:
      radial-gradient(circle at 20% 30%, rgba(200,180,140,.15) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(200,180,140,.15) 0%, transparent 40%);
  background-size: 200px 200px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333;
}

/* --------------------------------------------------- */
/*  2️⃣  The container that holds all the ButtonsArtifact */
/* --------------------------------------------------- */
.artifact-container {
  position: relative;               /* needed for absolute children */
  width: 100%;
  height: 100%;
  /* The “tapestry” pattern – concentric circles that look like a rug */
  background:
    /* outer ring */
      conic-gradient(from 0deg at 50% 50%,
      rgba(255,255,255,.0) 0%,
      rgba(255,255,255,.0) 45%,
      rgba(0,0,0,.03) 45%,
      rgba(0,0,0,.03) 55%,
      rgba(255,255,255,.0) 55%,
      rgba(255,255,255,.0) 100%),
        /* inner rings – repeat to fill the whole area */
      repeating-conic-gradient(
          from 0deg at 50% 50%,
          rgba(0,0,0,.02) 0%,
          rgba(0,0,0,.02) 10%,
          transparent 10%,
          transparent 20%
      );
  background-size: 250px 250px;
  background-position: center;
}

/* --------------------------------------------------- */
/*  3️⃣  Positioning helpers – we keep everything   */
/*      absolutely positioned inside the container   */
/* --------------------------------------------------- */
.artifact-container > * {
  position: absolute;
}

/* --------------------------------------------------- */
/*  4️⃣  The page header – luxurious typography       */
/* --------------------------------------------------- */
.page-header {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -5%);
  text-align: center;
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #2c1e10;
  text-shadow: 0 2px 4px rgba(0,0,0,.15);
}

.title {
  margin: 0;
  font-family: 'Playfair Display', serif;
  color: #8b5e3c;
}

/* --------------------------------------------------- */
/*  5️⃣  Small utility – keep the pattern from       */
/*      overlapping the edge Of the viewport         */
/* --------------------------------------------------- */
.artifact-container {
  overflow: hidden;
}
</style>

<!-- --------------------------------------------------- -->
<!--  Register the component so Vue can render it        -->
<!-- --------------------------------------------------- -->
<script setup>
const mapUrl =
    "/images/Dinotopiacliffside.png"
</script>

<!-- --------------------------------------------------- -->
<!--  Make the container a real element that Vue can     -->
<!--  render the children into                         -->
<!-- --------------------------------------------------- -->

