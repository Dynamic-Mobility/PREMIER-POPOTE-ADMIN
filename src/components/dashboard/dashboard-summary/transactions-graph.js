import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts';
import {useEffect, useState} from "react";
import {useTheme} from "@mui/styles";

if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}



const TransactionsGraph = () =>{
    const theme = useTheme();
    const { functions, palette } = theme;
    const { linearGradient } = functions;
    const { gradients } = palette;
    const [options,setOptions] = useState({
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 25,
                depth: 70,
            },
        },
        title: {
            text: '',
            align: 'left'
        },
        credits: {
            enabled: false,
        },
        exporting: { enabled: false },
        xAxis: {
            categories: ['All Transactions', 'B2C', 'Pesalink', 'Bill Payments', 'Airtime Purchase']
        },
        yAxis: {
            title: {
                text: 'No of Transactions'
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        tooltip: {
            format: '<b>{key}</b><br/>{series.name}: {y}<br/>'
        },
        series: [
           // background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
            {
                name: 'Total Transactions',
                data: [10000, 3350, 4300, 1700, 650],
                stack:'Total',
                color: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        [0, gradients.primary.main],
                        [1, gradients.primary.state],
                    ],
                },
            },
            {
                name: 'Successful Transactions',
                data: [9000, 3000, 4000, 1500 , 500],
                stack:'Successful',
                color: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        [0, gradients.success.main],
                        [1, gradients.success.state],
                    ],
                },
            },
            {
                name: 'Failed Transactions',
                stack:'Failed',
                data: [1000, 350, 300, 200, 150],
                color: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        [0, gradients.error.main],
                        [1, gradients.error.state],
                    ],
                },
            },
        ],
    });

    useEffect(() =>{

    },[]);

    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps = {{
                    style:{
                        fontFamily: 'inherit'
                    }
                }}
            />
        </>
    )
}

export default TransactionsGraph;