<template>
    <ContainerCard>
        <Chart 
            type="bar" 
            :data="chartData" 
            :options="chartOptions" 
            class="h-full" 
        />
    </ContainerCard>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ContainerCard } from '@/components/ui'
import Chart from "primevue/chart";

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () =>  {
    // const documentStyle = getComputedStyle(document.documentElement);
    
    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                type: 'bar',
                label: 'Krypto',
                backgroundColor: '#34d399',
                data: [600, 0, 300, 300, 0, 0, 0]
            },
            {
                type: 'bar',
                label: 'Akcie',
                backgroundColor: '#60a5fa',
                data: [8500, 4200, 12400, 8000, 0, 3500, 4000]
            },
            {
                type: 'bar',
                label: 'Zlato',
                backgroundColor: '#fbbf24',
                data: [1200, 0, 0, 1800, 0, 600, 0]
            },
            {
                type: 'bar',
                label: 'Fiat',
                backgroundColor: '#c084fc',
                data: [250, 0, 150, 350, 0, 0, 100]
            }
        ]
    };
};
const setChartOptions = () =>  {
    const documentStyle = getComputedStyle(document.documentElement);
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');
    // https://www.chartjs.org/docs/latest
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: true
            },
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    boxWidth: 8,
                    boxHeight: 8,
                    padding: 5,
                    usePointStyle: true,
                    font: {
                        size: 11
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                },
                grid: {
                    color: 'rgba(0,0,0,0)'
                }
            },
            y: {
                stacked: true,
                ticks: {
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>