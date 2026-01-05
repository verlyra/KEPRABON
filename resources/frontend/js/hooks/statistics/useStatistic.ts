import { useMemo } from 'react';
import { useGetStatistics } from '@/api/statistic/hooks';
import { ChartConfig } from '@/components/ui/chart';

export const useStatistic = () => {
    const { data, isLoading, isError } = useGetStatistics();

    const topProductsData = useMemo(() => {
        if (!data) return [];
        return data.produk_terlaris.slice(0, 5).map(item => ({
            name: item.label,
            qty: parseFloat(item.value.toString())
        }));
    }, [data]);

    const branchInfo = useMemo(() => {
        if (!data) return { chartData: [], chartConfig: {} as ChartConfig };

        const chartData: any[] = [];
        const chartConfig: ChartConfig = {
            omset: { label: "Omset" }
        };

        data.performa_cabang.forEach((item, index) => {
            const slug = `branch_${index}`;
            const colorVar = `hsl(var(--chart-${(index % 5) + 1}))`;

            chartData.push({
                browser: slug,
                value: parseFloat(item.value.toString()),
                fill: colorVar,
                realLabel: item.label
            });

            chartConfig[slug] = {
                label: item.label,
                color: colorVar,
            };
        });

        return { chartData, chartConfig };
    }, [data]);

    const mainChartData = useMemo(() => {
        if (!data) return [];

        const actualData = data.omset_penjualan.map(item => ({
            date: item.label,
            value: parseFloat(item.value.toString()),
            isForecast: false
        })).reverse();

        const forecastData = data.forecasting_penjualan.forecast.map(item => ({
            date: item.label,
            value: parseFloat(item.value.toString()),
            isForecast: true
        }));

        // if (actualData.length > 0 && forecastData.length > 0) {
        //     const lastActual = actualData[actualData.length - 1];
        //     forecastData.unshift({
        //         date: lastActual.date,
        //         value: lastActual.value,
        //         isForecast: true
        //     });
        // }

        return [...actualData, ...forecastData];
    }, [data]);

    const splitOffset = useMemo(() => {
        if (!mainChartData || mainChartData.length === 0) return 0;
        const splitIndex = mainChartData.findIndex(d => d.isForecast === true);
        
        if (splitIndex === -1) return 1;
        return splitIndex / (mainChartData.length - 1);
    }, [mainChartData]);

    return {
        data,
        isLoading,
        isError,
        topProductsData,
        branchData: branchInfo.chartData,
        branchConfig: branchInfo.chartConfig,
        splitOffset, mainChartData
    };
};