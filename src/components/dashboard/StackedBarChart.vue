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
import { ref, computed, onMounted } from "vue";
import { ContainerCard } from '@/components/ui'
import Chart from "primevue/chart";
import { useTheme } from "@/composables/useTheme";

const { darkMode } = useTheme()

onMounted(() => {
    chartData.value = setChartData();
});

const chartData = ref();

const getColor = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(`--color-${name}`)

const setChartData = () =>  {
    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                type: 'bar',
                label: 'Krypto',
                backgroundColor: getColor('green-500'),
                data: [600, 0, 300, 300, 0, 0, 0]
            },
            {
                type: 'bar',
                label: 'Akcie',
                backgroundColor: getColor('blue-500'),
                data: [8500, 4200, 12400, 8000, 0, 3500, 4000]
            },
            {
                type: 'bar',
                label: 'Zlato',
                backgroundColor: getColor('yellow-500'),
                data: [1200, 0, 0, 1800, 0, 600, 0]
            },
            {
                type: 'bar',
                label: 'Fiat',
                backgroundColor: getColor('purple-500'),
                data: [250, 0, 150, 350, 0, 0, 100]
            }
        ]
    };
};

const chartOptions = computed(() => {
    const textColor = darkMode.value ? getColor('gray-100') : getColor('gray-900')
    const bgColor = darkMode.value ? getColor('gray-600') : getColor('gray-300')
    const fontPreset = {
        size: 16 ,
        weight: '600',
        family: 'ui-sans-serif, system-ui, sans-serif'
    }

    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Portfolio',
                align: 'start',
                padding: 0,
                color: textColor,
                font: fontPreset
            },
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    color: textColor,
                    boxWidth: 10,
                    boxHeight: 10,
                    padding: 5,
                    usePointStyle: true,
                    font: fontPreset
                }
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: true,
            }
        },
        scales: {
            x: {
                stacked: true,
                grid: { color: 'transparent' },
                ticks: {
                    color: textColor,
                }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                grid: { 
                    color: bgColor 
                },
                ticks: {
                    color: textColor,
                    callback: function(value, index, ticks) {
                        return `$ ${value}`;
                    }
                }
            }
        }
    }
})
</script>