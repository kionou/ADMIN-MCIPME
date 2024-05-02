

const pieChart = {
    series: [44, 55, 41, 17, 15],
    chartOptions: {
        labels: ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"],
        colors: ["#34c38f", "#556ee6", "#f46a6a", "#50a5f1", "#f1b44c"],
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            verticalAlign: 'middle',
            floating: false,
            fontSize: '14px',
            offsetX: 0
        },
        responsive: [{
            breakpoint: 600,
            options: {
                chart: {
                    height: 240
                },
                legend: {
                    show: false
                },
            }
        }]
    }
};



 const apexChartData = [
   
   
    // {
    //     title: "Bar Chart",
    //     height: 350,
    //     type: "bar",
    //     chart: barChart
    // },
    {
        title: "Pie Chart",
        height: 460,
        type: "pie",
        chart: pieChart
    },
   
]

export{ apexChartData }

