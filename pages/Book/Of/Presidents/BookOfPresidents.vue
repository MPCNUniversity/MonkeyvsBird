<template>

  <div
      class="absolute inset-0 bg-cover bg-center brightness-75"
      :style="{ backgroundImage: `url(${mapUrl})` }"
  ></div>

  <ButtonsArtifact left="50px" top="280px" tooltip="George Washington" image="USpresidents/Gilbert_Stuart_-_Portrait_of_George_Washington_-_Walters_37171.jpg" />
  <ButtonsArtifact left="60px" top="270px" tooltip="George Washington" image="USpresidents/Gilbert_Stuart_-_Portrait_of_George_Washington_-_Walters_37171.jpg" />

  <ButtonsArtifact left="150px" top="280px" tooltip="John Adams" image="USpresidents/John_Adams_A18236.jpg" />

  <ButtonsArtifact left="250px" top="280px" tooltip="Thomas Jefferson" image="USpresidents/02_Thomas_Jefferson_3x4.jpg" />
  <ButtonsArtifact left="260px" top="270px" tooltip="Thomas Jefferson" image="USpresidents/02_Thomas_Jefferson_3x4.jpg" />

  <ButtonsArtifact left="350px" top="280px" tooltip="James Madison" image="USpresidents/James_Madison_(cropped_3x4_close).jpg" />
  <ButtonsArtifact left="360px" top="270px" tooltip="James Madison" image="USpresidents/James_Madison_(cropped_3x4_close).jpg" />

  <ButtonsArtifact left="450px" top="280px" tooltip="James Monroe" image="USpresidents/James_Monroe_White_House_portrait_1819_(cropped_3x4_close).jpg" />
  <ButtonsArtifact left="460px" top="270px" tooltip="James Monroe" image="USpresidents/James_Monroe_White_House_portrait_1819_(cropped_3x4_close).jpg" />

  <ButtonsArtifact left="500px" top="270px" tooltip="John Q. Adams" image="USpresidents/John_Q._Adams.jpg" />

  <ButtonsArtifact left="550px" top="280px" tooltip="Andrew Jackson" image="USpresidents/Andrew_Jackson_Daguerrotype-crop.jpg" />
  <ButtonsArtifact left="560px" top="270px" tooltip="Andrew Jackson" image="USpresidents/Andrew_Jackson_Daguerrotype-crop.jpg" />

  <ButtonsArtifact left="650px" top="280px" tooltip="Martin Van Buren" image="USpresidents/Martin_Van_Buren_by_Mathew_Brady_c1855-58_(cropped).jpg" />
  <ButtonsArtifact left="750px" top="280px" tooltip="William Henry Harrisson" image="USpresidents/William_Henry_Harrison_daguerreotype_edit_(cropped).jpg" />
  <ButtonsArtifact left="850px" top="280px" tooltip="John Tyler" image="USpresidents/John_Tyler_(cropped_3x4).png" />
  <ButtonsArtifact left="950px" top="280px" tooltip="James K. Polk" image="USpresidents/James_K_Polk_(3x4_cropped).jpg" />
  <ButtonsArtifact left="1050px" top="280px" tooltip="Zachary Taylor" image="USpresidents/Zachary_Taylor_restored_and_cropped_(cropped).jpg" />
  <ButtonsArtifact left="1150px" top="280px" tooltip="Millard Fillmore" image="USpresidents/Fillmore.jpg" />
  <ButtonsArtifact left="1250px" top="280px" tooltip="Franklin Pierce" image="USpresidents/Mathew_Brady_-_Franklin_Pierce_(cropped).jpg" />
  <ButtonsArtifact left="1350px" top="280px" tooltip="James Buchanan" image="USpresidents/Hon._James_Buchanan_-_NARA_-_528318-crop.jpg" />

  <ButtonsArtifact left="1450px" top="280px" tooltip="Abraham Lincoln" image="USpresidents/Abraham_Lincoln_O-77_matte_collodion_print.jpg" />
  <ButtonsArtifact left="1460px" top="270px" tooltip="Abraham Lincoln" image="USpresidents/Abraham_Lincoln_O-77_matte_collodion_print.jpg" />

  <ButtonsArtifact left="1550px" top="280px" tooltip="Andrew Johnson" image="USpresidents/President_Andrew_Johnson.jpg" />

  <ButtonsArtifact left="1650px" top="280px" tooltip="Ulysses S. Grant" image="USpresidents/Ulysses_S_Grant_by_Brady_c1870-restored_(3x4_crop).jpg" />
  <ButtonsArtifact left="1660px" top="270px" tooltip="Ulysses S. Grant" image="USpresidents/Ulysses_S_Grant_by_Brady_c1870-restored_(3x4_crop).jpg" />

  <ButtonsArtifact left="1750px" top="280px" tooltip="Rutherford Hayes" image="USpresidents/President_Rutherford_Hayes_1870_-_1880_Restored_(cropped).jpg" />
  <ButtonsArtifact left="1850px" top="280px" tooltip="James Abram Garfield" image="USpresidents/James_Abram_Garfield,_photo_portrait_seated_(cropped).jpg" />
  <ButtonsArtifact left="1950px" top="280px" tooltip="Chester A. Arthur" image="USpresidents/Chester_A._Arthur.jpg" />
  <ButtonsArtifact left="2050px" top="280px" tooltip="Grover Cleveland" image="USpresidents/StephenGroverCleveland.jpg" />
  <ButtonsArtifact left="2150px" top="280px" tooltip="Benjamin Harrison" image="USpresidents/Benjamin_Harrison_-_NARA_-_535777.jpg" />
  <ButtonsArtifact left="2250px" top="280px" tooltip="Grover Cleveland" image="USpresidents/Grover_Cleveland_-_NARA_-_518139_(cropped).jpg" />

  <ButtonsArtifact left="2350px" top="280px" tooltip="William McKinley" image="USpresidents/Mckinley_(cropped).jpg" />
  <ButtonsArtifact left="2360px" top="270px" tooltip="William McKinley" image="USpresidents/Mckinley_(cropped).jpg" />

  <ButtonsArtifact left="2450px" top="280px" tooltip="Theodore Roosevelt" image="USpresidents/President_Roosevelt_-_Pach_Bros_black_and_white_-_tight_crop.jpg" />
  <ButtonsArtifact left="2460px" top="270px" tooltip="Theodore Roosevelt" image="USpresidents/President_Roosevelt_-_Pach_Bros_black_and_white_-_tight_crop.jpg" />

  <ButtonsArtifact left="2550px" top="280px" tooltip="William Howard Taft" image="USpresidents/William_Howard_Taft_Portrait_(3x4_cropped).jpg" />

  <ButtonsArtifact left="2650px" top="280px" tooltip="Woodrow Wilson" image="USpresidents/President_Woodrow_Wilson_Harris_&_Ewing_(3x4_cropped_c).jpg" />
  <ButtonsArtifact left="2660px" top="270px" tooltip="Woodrow Wilson" image="USpresidents/President_Woodrow_Wilson_Harris_&_Ewing_(3x4_cropped_c).jpg" />

  <ButtonsArtifact left="2750px" top="280px" tooltip="Warren G. Harding" image="USpresidents/Warren_G_Harding-Harris_&_Ewing-crop.jpg" />

  <ButtonsArtifact left="2850px" top="280px" tooltip="Calvin Coolidge" image="USpresidents/President_Calvin_Coolidge,_1924_portrait_photograph_(3x4_cropped).jpeg" />
  <ButtonsArtifact left="2860px" top="270px" tooltip="Calvin Coolidge" image="USpresidents/President_Calvin_Coolidge,_1924_portrait_photograph_(3x4_cropped).jpeg" />

  <ButtonsArtifact left="2950px" top="280px" tooltip="Herbert Hoover" image="USpresidents/Herber_Hover_C._LCCN2016859622_(cropped).jpg" />

  <ButtonsArtifact left="3050px" top="280px" tooltip="Franklin D. Roosevelt" image="USpresidents/FDR_1944_Color_Portrait_(3x4_cropped).jpg" />
  <ButtonsArtifact left="3060px" top="270px" tooltip="Franklin D. Roosevelt" image="USpresidents/FDR_1944_Color_Portrait_(3x4_cropped).jpg" />
  <ButtonsArtifact left="3070px" top="260px" tooltip="Franklin D. Roosevelt" image="USpresidents/FDR_1944_Color_Portrait_(3x4_cropped).jpg" />
  <ButtonsArtifact left="3080px" top="250px" tooltip="Franklin D. Roosevelt" image="USpresidents/FDR_1944_Color_Portrait_(3x4_cropped).jpg" />

  <ButtonsArtifact left="3150px" top="280px" tooltip="Harry S. Truman" image="USpresidents/TRUMAN_58-766-06_CROPPED.jpg" />
  <ButtonsArtifact left="3160px" top="270px" tooltip="Harry S. Truman" image="USpresidents/TRUMAN_58-766-06_CROPPED.jpg" />

  <ButtonsArtifact left="3250px" top="280px" tooltip="Dwight D. Eisenhower" image="USpresidents/Dwight_D._Eisenhower,_official_photo_portrait,_May_29,_1959_(cropped).jpg" />
  <ButtonsArtifact left="3260px" top="270px" tooltip="Dwight D. Eisenhower" image="USpresidents/Dwight_D._Eisenhower,_official_photo_portrait,_May_29,_1959_(cropped).jpg" />

  <ButtonsArtifact left="3350px" top="280px" tooltip="John F. Kennedy" image="USpresidents/John_F._Kennedy,_White_House_color_photo_portrait_(cropped).jpg" />

  <ButtonsArtifact left="3450px" top="280px" tooltip="Lyndon Johnson" image="USpresidents/37_Lyndon_Johnson_3x4.jpg" />
  <ButtonsArtifact left="3460px" top="270px" tooltip="Lyndon Johnson" image="USpresidents/37_Lyndon_Johnson_3x4.jpg" />

  <ButtonsArtifact left="3550px" top="280px" tooltip="Richard Nixon" image="USpresidents/Richard_Nixon_presidential_portrait_(cropped).jpg" />
  <ButtonsArtifact left="3560px" top="270px" tooltip="Richard Nixon" image="USpresidents/Richard_Nixon_presidential_portrait_(cropped).jpg" />

  <ButtonsArtifact left="3650px" top="280px" tooltip="Gerald Ford" image="USpresidents/Gerald_Ford,_official_Presidential_photo.jpg" />
  <ButtonsArtifact left="3750px" top="280px" tooltip="Jimmy Carter" image="USpresidents/JimmyCarterPortrait2_(cropped).jpg" />

  <ButtonsArtifact left="3850px" top="280px" tooltip="Ronald Reagan" image="USpresidents/Official_Portrait_of_President_Reagan_1981-cropped.jpg" />
  <ButtonsArtifact left="3860px" top="270px" tooltip="Ronald Reagan" image="USpresidents/Official_Portrait_of_President_Reagan_1981-cropped.jpg" />

  <ButtonsArtifact left="3950px" top="280px" tooltip="George H. W. Bush" image="USpresidents/George_H._W._Bush_presidential_portrait_(cropped_2).jpg" />

  <ButtonsArtifact left="4050px" top="280px" tooltip="Bill Clinton" image="USpresidents/44_Bill_Clinton_3x4_(cropped).jpg" />
  <ButtonsArtifact left="4060px" top="270px" tooltip="Bill Clinton" image="USpresidents/44_Bill_Clinton_3x4_(cropped).jpg" />

  <ButtonsArtifact left="4150px" top="280px" tooltip="George W. Bush" image="USpresidents/George-W-Bush_(cropped).jpeg" />
  <ButtonsArtifact left="4160px" top="270px" tooltip="George W. Bush" image="USpresidents/George-W-Bush_(cropped).jpeg" />

  <ButtonsArtifact left="4250px" top="280px" tooltip="Barack Obama" image="USpresidents/President_Barack_Obama,_2012_portrait_crop.jpg" />
  <ButtonsArtifact left="4260px" top="270px" tooltip="Barack Obama" image="USpresidents/President_Barack_Obama,_2012_portrait_crop.jpg" />

  <ButtonsArtifact left="4350px" top="280px" tooltip="Donald J. Trump" image="USpresidents/Donald_Trump_official_portrait_(cropped).jpg" />
  <ButtonsArtifact left="4450px" top="280px" tooltip="Joe Biden" image="USpresidents/Joe_Biden_presidential_portrait_(cropped).jpg" />
  <ButtonsArtifact left="4550px" top="280px" tooltip="Donald J. Trump" image="USpresidents/Official_Presidential_Portrait_of_President_Donald_J._Trump_(2025).jpg" />


  <div>

    <h1 class="title">Book of Presidents</h1>

  </div>

</template>

<script setup>
import ButtonsArtifact from '~/components/Buttons/ButtonsArtifact.vue'
const mapUrl =
    "/images/250yearsamerica.png"

</script>
