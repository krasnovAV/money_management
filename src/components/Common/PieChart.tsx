import React, {FC} from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import {CategoryType} from "../../Store/Redusers/shoppingListReducer";

ChartJS.register(ArcElement, Tooltip, Legend);


type PropsType = {
    list: CategoryType[]
}
const colorsCollection = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 10, 231, 1)',
    'rgba(10, 27, 255, 1)',
    'rgba(10, 255, 251, 1)',
    'rgba(27, 255, 10, 1)',
]
export const PieChart: FC<PropsType> = ({list}) => {
    let pieChartLabels = list.map(l => l.title);
    let pieChartValues = list.map(l => l.totalCategoryPrice);

    let endArr:number;
    if (colorsCollection.length >= list.length) {
        endArr = list.length;
    } else {
        alert("колличество цветов меньше количества категорй")
        endArr = colorsCollection.length;
    }

    let pieChartColors = colorsCollection.slice(0, endArr);

    const data = {
        labels: pieChartLabels,
        datasets: [
            {
                data: pieChartValues,
                backgroundColor: pieChartColors,
                borderColor: pieChartColors,
                borderWidth: 1,
            },
        ],
    };
    return <Pie data={data} />;
}