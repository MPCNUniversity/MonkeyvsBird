<template>
    <div style="min-height: 1200px; position: relative;">
        <h1 class="title" style="position:fixed; top:20px; left:20px; z-index:1000; color: #ff66aa; text-shadow: 2px 2px 0px #000;">Book of Lena</h1>
         <div style="position:fixed; top:60px; left:20px; font-size:1.2em; color:#ff99cc; z-index:1000; max-width: 300px; transform: rotate(-2deg);">
            Subject: Lena<br>
            Class: Oracle TechnoWitch<br>
            Stats: Luck [MAX], Org [0]<br>
            Warning: Unstable geometry
        </div>

      <div
          class="absolute inset-0 bg-cover bg-center brightness-75"
          :style="{ backgroundImage: `url(${mapUrl})` }"
      ></div>

    <ButtonsArtifact left="884.1px" top="500.0px" tooltip="Unstable Rune 0" image="Lena2.png" />
    <ButtonsArtifact left="886.8px" top="545.4px" tooltip="Unstable Rune 1" image="Lena2.png" />
    <ButtonsArtifact left="917.7px" top="603.2px" tooltip="Unstable Rune 2" image="Lena.png" />
    <ButtonsArtifact left="844.1px" top="624.4px" tooltip="Unstable Rune 3" image="Lena.png" />
    <ButtonsArtifact left="843.3px" top="676.7px" tooltip="Unstable Rune 4" image="Lena2.png" />
    <ButtonsArtifact left="821.2px" top="721.2px" tooltip="Unstable Rune 5" image="Lena2.png" />
    <ButtonsArtifact left="799.1px" top="774.0px" tooltip="Unstable Rune 6" image="Lena2.png" />
    <ButtonsArtifact left="757.2px" top="808.5px" tooltip="Unstable Rune 7" image="Lena.png" />
    <ButtonsArtifact left="699.3px" top="805.8px" tooltip="Unstable Rune 8" image="Lena2.png" />
    <ButtonsArtifact left="640.0px" top="752.3px" tooltip="Unstable Rune 9" image="Lena.png" />
    <ButtonsArtifact left="600.0px" top="813.2px" tooltip="Unstable Rune 10" image="Lena.png" />
    <ButtonsArtifact left="549.0px" top="821.8px" tooltip="Unstable Rune 11" image="Lena2.png" />
    <ButtonsArtifact left="510.9px" top="774.2px" tooltip="Unstable Rune 12" image="Lena2.png" />
    <ButtonsArtifact left="455.1px" top="784.4px" tooltip="Unstable Rune 13" image="Lena.png" />
    <ButtonsArtifact left="443.6px" top="715.3px" tooltip="Unstable Rune 14" image="Lena2.png" />
    <ButtonsArtifact left="390.6px" top="709.4px" tooltip="Unstable Rune 15" image="Lena2.png" />
    <ButtonsArtifact left="375.7px" top="663.0px" tooltip="Unstable Rune 16" image="Lena2.png" />
    <ButtonsArtifact left="337.4px" top="633.8px" tooltip="Unstable Rune 17" image="Lena.png" />
    <ButtonsArtifact left="293.4px" top="599.6px" tooltip="Unstable Rune 18" image="Lena.png" />
    <ButtonsArtifact left="338.3px" top="541.5px" tooltip="Unstable Rune 19" image="Lena2.png" />
    <ButtonsArtifact left="253.1px" top="500.0px" tooltip="Unstable Rune 20" image="Lena.png" />
    <ButtonsArtifact left="317.3px" top="455.2px" tooltip="Unstable Rune 21" image="Lena.png" />
    <ButtonsArtifact left="342.5px" top="416.3px" tooltip="Unstable Rune 22" image="Lena2.png" />
    <ButtonsArtifact left="297.9px" top="346.1px" tooltip="Unstable Rune 23" image="Lena.png" />
    <ButtonsArtifact left="370.6px" top="333.3px" tooltip="Unstable Rune 24" image="Lena.png" />
    <ButtonsArtifact left="359.3px" top="259.3px" tooltip="Unstable Rune 25" image="Lena.png" />
    <ButtonsArtifact left="431.3px" top="267.8px" tooltip="Unstable Rune 26" image="Lena2.png" />
    <ButtonsArtifact left="446.0px" top="197.8px" tooltip="Unstable Rune 27" image="Lena.png" />
    <ButtonsArtifact left="500.0px" top="192.2px" tooltip="Unstable Rune 28" image="Lena2.png" />
    <ButtonsArtifact left="546.7px" top="163.3px" tooltip="Unstable Rune 29" image="Lena.png" />
    <ButtonsArtifact left="600.0px" top="233.1px" tooltip="Unstable Rune 30" image="Lena2.png" />
    <ButtonsArtifact left="648.8px" top="192.2px" tooltip="Unstable Rune 31" image="Lena2.png" />
    <ButtonsArtifact left="685.0px" top="238.2px" tooltip="Unstable Rune 32" image="Lena.png" />
    <ButtonsArtifact left="730.5px" top="243.8px" tooltip="Unstable Rune 33" image="Lena.png" />
    <ButtonsArtifact left="758.2px" top="282.3px" tooltip="Unstable Rune 34" image="Lena.png" />
    <ButtonsArtifact left="816.2px" top="283.8px" tooltip="Unstable Rune 35" image="Lena2.png" />
    <ButtonsArtifact left="877.3px" top="298.5px" tooltip="Unstable Rune 36" image="Lena.png" />
    <ButtonsArtifact left="909.0px" top="342.5px" tooltip="Unstable Rune 37" image="Lena2.png" />
    <ButtonsArtifact left="879.7px" top="409.1px" tooltip="Unstable Rune 38" image="Lena.png" />
    <ButtonsArtifact left="877.5px" top="456.0px" tooltip="Unstable Rune 39" image="Lena.png" />
    <ButtonsArtifact left="202.5px" top="212.0px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="150.5px" top="239.0px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="210.4px" top="247.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="163.3px" top="197.3px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="275.8px" top="224.0px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="197.7px" top="292.8px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="289.3px" top="217.8px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="279.8px" top="239.0px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="259.1px" top="269.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="247.2px" top="231.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="197.5px" top="180.5px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="1101.7px" top="739.0px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="1091.5px" top="817.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="1014.6px" top="796.4px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="1097.7px" top="784.2px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="1124.6px" top="786.7px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="1118.8px" top="818.8px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="1003.8px" top="760.7px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="174.8px" top="804.9px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="168.5px" top="798.8px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="193.9px" top="789.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="205.4px" top="763.0px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="215.5px" top="793.9px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="194.4px" top="779.4px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="183.1px" top="749.0px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="212.9px" top="864.7px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="143.1px" top="756.5px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="882.0px" top="534.2px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="925.7px" top="490.5px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="857.4px" top="496.5px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="935.2px" top="543.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="860.3px" top="554.2px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="853.5px" top="516.3px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="862.4px" top="477.5px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="944.5px" top="538.2px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="916.3px" top="498.7px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="864.3px" top="565.6px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="793.1px" top="555.3px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="890.5px" top="525.6px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="875.3px" top="586.3px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="864.6px" top="521.4px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="579.9px" top="320.6px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="610.6px" top="308.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="646.1px" top="289.6px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="663.0px" top="332.3px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="621.8px" top="299.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="635.5px" top="282.2px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="578.0px" top="337.0px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="681.0px" top="259.5px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="694.6px" top="357.1px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="654.6px" top="295.3px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="592.9px" top="379.3px" tooltip="Pure Luck" image="broomstick.png" />
    <ButtonsArtifact left="616.9px" top="396.6px" tooltip="Pure Luck" image="Lena2.png" />
    <ButtonsArtifact left="791.7px" top="101.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="844.8px" top="103.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="960.1px" top="86.4px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1005.4px" top="92.4px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1056.0px" top="111.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="790.8px" top="160.0px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="837.5px" top="143.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="891.5px" top="164.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="938.7px" top="147.9px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="988.6px" top="147.7px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="798.1px" top="185.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="843.3px" top="211.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="903.4px" top="201.1px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="945.8px" top="198.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="991.5px" top="192.1px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1052.6px" top="201.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="796.7px" top="249.7px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="860.1px" top="239.8px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="905.2px" top="257.8px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="946.7px" top="247.6px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1014.4px" top="240.4px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1045.6px" top="245.1px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="813.8px" top="292.6px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="855.4px" top="297.3px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="998.7px" top="293.4px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1039.6px" top="297.1px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="814.9px" top="341.3px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="851.5px" top="344.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="893.1px" top="352.1px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="960.1px" top="360.4px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1062.8px" top="349.7px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="808.9px" top="386.8px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="847.1px" top="398.6px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="894.8px" top="396.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="961.7px" top="390.7px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="988.8px" top="414.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1037.7px" top="389.7px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="788.6px" top="456.8px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="863.8px" top="461.7px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="909.3px" top="448.1px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="951.7px" top="451.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1002.6px" top="452.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1049.8px" top="451.9px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="808.6px" top="487.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="843.6px" top="512.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="911.3px" top="496.4px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="964.6px" top="503.1px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1013.9px" top="505.3px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1054.7px" top="506.6px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="855.7px" top="538.4px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="914.8px" top="535.2px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="956.9px" top="560.7px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="997.8px" top="561.6px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="1049.6px" top="548.5px" tooltip="Messy Inventory" image="Lena.png" />
    <ButtonsArtifact left="0.0px" top="900.0px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="20.0px" top="925.2px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="40.0px" top="927.3px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="60.0px" top="904.2px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="80.0px" top="877.3px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="100.0px" top="871.2px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="120.0px" top="891.6px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="140.0px" top="919.7px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="160.0px" top="929.7px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="180.0px" top="912.4px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="200.0px" top="883.7px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="220.0px" top="882.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="240.0px" top="883.9px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="260.0px" top="912.6px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="280.0px" top="929.7px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="300.0px" top="919.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="320.0px" top="891.4px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="340.0px" top="781.9px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="360.0px" top="877.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="380.0px" top="904.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="400.0px" top="927.4px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="600.0px" top="870.4px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="620.0px" top="887.9px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="640.0px" top="916.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="660.0px" top="930.0px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="680.0px" top="915.9px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="700.0px" top="887.2px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="720.0px" top="870.2px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="740.0px" top="888.3px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="760.0px" top="908.9px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="780.0px" top="928.9px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="800.0px" top="922.4px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="820.0px" top="835.4px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="840.0px" top="872.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="860.0px" top="875.0px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="880.0px" top="900.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="900.0px" top="925.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="920.0px" top="927.1px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="940.0px" top="903.7px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="960.0px" top="877.0px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="980.0px" top="787.0px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1000.0px" top="892.1px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1020.0px" top="920.1px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1040.0px" top="929.6px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1060.0px" top="911.9px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1080.0px" top="979.5px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1100.0px" top="870.0px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1120.0px" top="884.4px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1140.0px" top="913.1px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1160.0px" top="929.8px" tooltip="GlitchWave" image="hexie.gif" />
    <ButtonsArtifact left="1180.0px" top="919.1px" tooltip="GlitchWave" image="hexie.gif" />

    </div>
</template>

<script setup>
const mapUrl =
    "/images/LenaCard.png"
</script>
