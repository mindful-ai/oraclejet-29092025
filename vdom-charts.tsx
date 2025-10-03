import { h } from "preact";

import "ojs/ojlabel";
import "ojs/ojselectsingle";
import { ojSelectSingle } from "ojs/ojselectsingle";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

import "ojs/ojchart";
import { ojChart } from "ojs/ojchart";

import { useState, useCallback } from "preact/hooks";

const chartTypeData = [
  {value: "bar", label: "Bar"},
  {value: "pie", label: "Pie"}
]

const chartTypeDP = new MutableArrayDataProvider(chartTypeData, {keyAttributes: "value"});

const chartData = [
  { id: 0, series: "Baseball", group: "Group A", value: 42 },
  { id: 1, series: "Baseball", group: "Group B", value: 34 },
  { id: 2, series: "Bicycling", group: "Group A", value: 55 },
  { id: 3, series: "Bicycling", group: "Group B", value: 30 },
  { id: 4, series: "Skiing", group: "Group A", value: 36 },
  { id: 5, series: "Skiing", group: "Group B", value: 50 },
  { id: 6, series: "Soccer", group: "Group A", value: 22 },
  { id: 7, series: "Soccer", group: "Group B", value: 46 },
];

const chartDP = new MutableArrayDataProvider(chartData, {keyAttributes: "value"});

export function Content() {

    const [val, setVal] = useState("bar" as ojChart.ChartType);

    const valChangedHandler = useCallback( (event: ojSelectSingle.valueChanged<any, any>) => {
        setVal(event.detail.value)
    }, [val, setVal]);


    const chartItem = (item: ojChart.ItemTemplateContext) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}></oj-chart-item>
    }

    return(

        <div style="border: 2px solid black; border-radiuns: 10px; padding: 10px; margin: 10px">
            <h2>Chart Example</h2>
            <oj-select-single id="basicChartSelector" data={chartTypeDP} value={val} onvalueChanged={valChangedHandler}></oj-select-single>
            <oj-chart id="" type={val} data={chartDP} class="chartStyle" animationOnDisplay="auto">
                <template slot="itemTemplate" render={chartItem}></template>
            </oj-chart>
        </div>
    )
}
