/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "'top' as const",
        },
        title: {
            display: true,
            text: 'Callibration Data',
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Rows'
            }
        },
        y: {
            title: {
                display: true,
                text: 'Columns',
                fontSize:'200'
            },

        }
    }
};


const LineChart = ({label1,label2,data1,data2,}) => {
    
    return (
        <Line style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize:"2rem"

        }}
            data={{
                labels: ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9','R10','R11','R12','R13','R14','R15'],
                datasets: [
                    {
                        label:label1,
                        data: data1[0]?.value,
                        backgroundColor: "#fe5678",
                        borderColor: "black"
                    },
                    {
                        label: label2,
                        data: data2[0]?.value,
                        backgroundColor: "#fe5678",
                        borderColor: "red"
                    },
                ],
            }}
            options={options} />
    )
}

export default LineChart