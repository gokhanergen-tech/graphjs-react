<a name="readme-top"></a>
<br />
<div align="center">
  <h3 align="center">GraphJS-React</h3>

  <p align="center">
    GraphJS-React provides you create graphs for your data.
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>CONTENTS</summary>
  <ol>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#show-your-grap">Show Your Data On Graphs</a></li>
        <li><a href="#properties">Properties</a></li>
      </ul>
    </li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

### Installation

Follow the instructions to install GraphJS-React

```
$ npm install graphjs-react
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Add GraphJS-React CSS file to your index.js.
```jsx
import 'graphjs-react/index.css'
```

### Built With

[![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DOCUMANTATION -->
## Documantation
<h4>Bar Chart</h4>
<table class="docblock-argstable sb-unstyled css-v2ifgj">
<thead class="docblock-argstable-head"><tr><th><span>Name</span></th><th><span>Description</span></th><th><span>Default</span></th></tr></thead><tbody class="docblock-argstable-body"><tr><td class="css-4lbn0a"><span class="css-in3yi3">data</span><span title="Required" class="css-1ywjlcj">*</span></td><td><div class="css-1f9domv"><span class="css-o1d7ko">BarChartColumn[]</span></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">width</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">number</span></div></div></td><td><div class="css-13nzt7e"><span class="css-o1d7ko">500</span></div></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">height</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">number</span></div></div></td><td><div class="css-13nzt7e"><span class="css-o1d7ko">1200</span></div></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">onBarClick</span></td><td><div class="css-1f9domv"><span class="css-o1d7ko">(e: MouseEvent, item: BarChartColumn) =&gt; void</span></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">title</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">TitleProps</span></div></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">containerStyle</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">CSSProperties</span></div></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">labelStyle</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">CSSProperties</span></div></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">roundValue</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">number</span></div></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">range</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">number</span><span class="css-o1d7ko">null</span></div></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">grid</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">boolean</span></div></div></td><td><div class="css-13nzt7e"><span class="css-o1d7ko">true</span></div></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">rootStyle</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">CSSProperties</span></div></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">graphStyle</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">CSSProperties</span></div></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">backgroundColor</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">string</span><span class="css-o1d7ko">null</span></div></div></td><td><div class="css-13nzt7e"><span class="css-o1d7ko">white</span></div></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">legend</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">boolean</span></div></div></td><td><div class="css-13nzt7e"><span class="css-o1d7ko">true</span></div></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">labels</span></td><td><div class="css-1f9domv"><span class="css-o1d7ko">Omit&lt;LegendItemProps, "size"&gt;[]</span></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">titles</span></td><td><div class="css-1f9domv"><span class="css-o1d7ko">{ x: string; y: string; } | null</span></div></td><td><span>-</span></td></tr></tbody></table>
<img src="./images/barchar-example.jpg">
<details>
  <summary>Show Code</summary>
  
  ```typescript
 <BarChart
  height={400}
  onBarClick={() => {}}
  data={[
    {
      color: 'rgb(110,221,234)',
      x: 'Ocak',
      y: -68
    },
    {
      color: 'rgb(106,226,126)',
      x: 'Şubat',
      y: -54
    },
    {
      color: 'rgb(154,222,111)',
      x: 'Mart',
      y: -37
    },
    {
      color: 'rgb(126,187,225)',
      x: 'Nisan',
      y: 56
    },
    {
      color: 'rgb(156,206,128)',
      x: 'Mayıs',
      y: 83
    },
    {
      color: 'rgb(116,245,247)',
      x: 'Haziran',
      y: -78
    },
    {
      color: 'rgb(235,196,136)',
      x: 'Temmuz',
      y: 30
    },
    {
      color: 'rgb(186,117,243)',
      x: 'Ağustos',
      y: 75
    },
    {
      color: 'rgb(221,157,208)',
      x: 'Eylül',
      y: -63
    },
    {
      color: 'rgb(252,122,106)',
      x: 'Ekim',
      y: 10
    },
    {
      color: 'rgb(193,139,193)',
      x: 'Kasım',
      y: 27
    },
    {
      color: 'rgb(254,173,150)',
      x: 'Aralık',
      y: -52
    }
  ]}
  width={400}
    />
  ```
</details>
<h4>Funnel Chart</h4>
<table class="docblock-argstable sb-unstyled css-v2ifgj"><thead class="docblock-argstable-head"><tr><th><span>Name</span></th><th><span>Description</span></th><th><span>Default</span></th></tr></thead><tbody class="docblock-argstable-body"><tr><td class="css-4lbn0a"><span class="css-in3yi3">data</span><span title="Required" class="css-1ywjlcj">*</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">FunnelChartData</span></div></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">width</span><span title="Required" class="css-1ywjlcj">*</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">number</span></div></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">height</span><span title="Required" class="css-1ywjlcj">*</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">number</span></div></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">options</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">FunnelChartOptions</span></div></div></td><td><div class="css-c3junj"><div class="sbdocs-expandable css-dxn7z0"><span>object</span><svg viewBox="0 0 14 14" width="14px" height="14px" class="css-18fo1wt"><path d="m1.15 5.6 5.5 5.5c.2.2.5.2.7 0l5.5-5.5a.5.5 0 0 0-.7-.7L7 10.04 1.85 4.9a.5.5 0 1 0-.7.7Z"></path></svg></div></div></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">rootStyle</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">CSSProperties</span></div></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">graphStyle</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">CSSProperties</span></div></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">title</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">TitleProps</span></div></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">backgroundColor</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">string</span><span class="css-o1d7ko">null</span></div></div></td><td><div class="css-13nzt7e"><span class="css-o1d7ko">white</span></div></td></tr></tbody></table>

<img src="./images/funnel-chart.jpg">
<details>
  <summary>Show Code</summary>
  
  ```typescript
<FunnelChart
  data={[
    {
      backgroundColor: 'lightgreen',
      name: 'Agdfgggggggggggggggggggggggg',
      value: 999
    },
    {
      backgroundColor: 'green',
      name: 'B',
      value: 168
    },
    {
      backgroundColor: 'yellow',
      name: 'E',
      value: 114
    },
    {
      backgroundColor: 'red',
      name: 'C',
      value: 93
    },
    {
      backgroundColor: 'black',
      name: 'D',
      value: 32
    }
  ]}
  height={500}
  width={500}
/>
  ```
</details>

<h4>Pie Char</h4>
<table class="docblock-argstable sb-unstyled css-v2ifgj"><thead class="docblock-argstable-head"><tr><th><span>Name</span></th><th><span>Description</span></th><th><span>Default</span></th></tr></thead><tbody class="docblock-argstable-body"><tr><td class="css-4lbn0a"><span class="css-in3yi3">data</span><span title="Required" class="css-1ywjlcj">*</span></td><td><div class="css-1f9domv"><span class="css-o1d7ko">ItemProps[]</span></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">onMouseClickPiece</span></td><td><div class="css-18q7sb7"><span class="css-o1d7ko">((e: MouseEvent, data: MouseEventData) =&gt; void)</span></div><table class="css-3nr4py"><tbody><tr><td><code>e</code></td><td>Mouseevent object</td></tr><tr><td><code>data</code></td><td>Clicked data which contains {
    root: ItemProps,
    name: string,
    angle: number,
    bgColor: string
}</td></tr></tbody></table></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">legend</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">boolean</span></div></div></td><td><div class="css-13nzt7e"><span class="css-o1d7ko">false</span></div></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">radius</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">number</span></div></div></td><td><div class="css-13nzt7e"><span class="css-o1d7ko">120</span></div></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">scaled</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">boolean</span></div></div></td><td><div class="css-13nzt7e"><span class="css-o1d7ko">false</span></div></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">textToCenter</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">boolean</span></div></div></td><td><div class="css-13nzt7e"><span class="css-o1d7ko">false</span></div></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">rootStyle</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">CSSProperties</span></div></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">graphStyle</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">CSSProperties</span></div></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">title</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">TitleProps</span></div></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">backgroundColor</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">string</span><span class="css-o1d7ko">null</span></div></div></td><td><div class="css-13nzt7e"><span class="css-o1d7ko">white</span></div></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">labels</span></td><td><div class="css-1f9domv"><span class="css-o1d7ko">Omit&lt;LegendItemProps, "size"&gt;[]</span></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">titles</span></td><td><div class="css-1f9domv"><span class="css-o1d7ko">{ x: string; y: string; } | null</span></div></td><td><span>-</span></td></tr><tr><td class="css-4lbn0a"><span class="css-in3yi3">doughnut</span></td><td><div class="css-1f9domv"><div class="css-13nzt7e"><span class="css-o1d7ko">boolean</span></div></div></td><td><div class="css-13nzt7e"><span class="css-o1d7ko">false</span></div></td></tr></tbody></table>
<img src="./images/pie-chart.jpg">
<details>
<summary>Show Code</summary>
  
```typescript
  <Pie
  data={[
    {
      backgroundColor: 'lightgreen',
      name: 'K',
      textColor: 'white',
      value: 136
    },
    {
      backgroundColor: 'green',
      name: 'B',
      textColor: 'yellow',
      value: 85
    },
    {
      backgroundColor: 'red',
      name: 'C',
      textColor: 'white',
      value: 53
    },
    {
      backgroundColor: 'black',
      name: 'D',
      textColor: 'white',
      value: 22
    },
    {
      backgroundColor: 'yellow',
      name: 'E',
      textColor: 'black',
      value: 30
    }
  ]}
  legend
  onMouseClickPiece={() => {}}
/>
```

</details>
  
<!-- INTERFACES -->

## Interfaces

```typescript
interface BarChartColumn {
    y: string | number;
    x: string | number;
    color: string;
}
```

```typescript
interface TitleProps{
    label:string,
    style?:CSSProperties
}
```

```typescript
interface ContextChartXY {
  context: CanvasRenderingContext2D | null
  maxItemWidth: number
}
```

```typescript
interface LegendItemProps {
    name: string,
    color: string,
    /**
     * @description Excluded for Pie graph
    */
    size?: number
}
```

```typescript
interface ItemProps {
    /**
     * @description The value of item
     */
    value: number,
    /**
     * @description item name
     */
    name: string,
    /**
     * @description specify a color for background
     */
    backgroundColor: string,
    /**
     * @description text color, It was excluded from Funnel Chart
     */
    textColor?: string
}
```

```typescript
interface FunnelChartOptions{
    /**
     * @description high value bg gradient color
     * @default #00308F
     */
    highBarColor:string,
     /**
     * @description low value bg gradient color
     * @default gray
     */
    lowBarColor:string,
     /**
     * @description inline text color
     * @default lightgray
     */
    barInlineTextColor:string,
     /**
     * @description label text color
     * @default black
     */
    labelTextColor:string
}
```
