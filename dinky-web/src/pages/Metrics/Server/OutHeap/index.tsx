/*
 *
 *   Licensed to the Apache Software Foundation (ASF) under one or more
 *   contributor license agreements.  See the NOTICE file distributed with
 *   this work for additional information regarding copyright ownership.
 *   The ASF licenses this file to You under the Apache License, Version 2.0
 *   (the "License"); you may not use this file except in compliance with
 *   the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

import React, {useEffect, useState} from "react";
import {Area, AreaConfig} from "@ant-design/plots";
import {MetricsDataType} from "@/pages/Metrics/Server/data";
import {Datum} from "@antv/g2plot";

type NonHeapProps = {
    data: MetricsDataType[];
    max: number;
}
type NonHeap = {
    time: Date;
    value: string | number;
}
const NonHeap: React.FC<NonHeapProps> = (props) => {
    const {data, max} = props;
    const dataList: NonHeap[] = data.map(x => {
        return {time: x.heartTime, value: Number((x.content.jvm.nonHeapMax / (1024 * 1024)).toFixed(0))};
    })


    const config: AreaConfig = {
        data: dataList,
        animation: false,
        height: 150,
        yField: 'value',
        xField: 'time',
        xAxis: {
            type: 'time',
            mask: 'HH:mm:ss',
        },
        yAxis: {
            min: 0,
            max: max
        },
        tooltip: {
            formatter: (datum: Datum) => {
                return {name: "NonHeap Memory", value: datum.value + ' MB'};
            },
        }
    };

    return <Area {...config} />;
}

export default NonHeap;
