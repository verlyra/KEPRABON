import { createFileRoute } from '@tanstack/react-router';
import { Skeleton } from '@/components/ui/skeleton';
import { useStatistic } from '@/hooks/statistics/useStatistic';
import { TopProductsChart } from '@/components/statistic/TopProductsChart';
import { BranchPerformanceChart } from '@/components/statistic/BranchPerformanceChart';
import { MainSalesChart } from '@/components/statistic/MainSalesChart';

export const Route = createFileRoute('/_protected/dashboard/')({
  component: DashboardComponent,
});

function DashboardComponent() {
  const { 
        data,
        isLoading, 
        isError,
        topProductsData,
        branchData,
        mainChartData,
        splitOffset,
        branchConfig
    } = useStatistic();

  if (isLoading) {
      return (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-[300px] w-full rounded-xl" />
              <Skeleton className="h-[300px] w-full rounded-xl" />
              <Skeleton className="h-[300px] w-full rounded-xl" />
              <Skeleton className="h-[300px] w-full rounded-xl" />
          </div>
      );
  }

  if (isError) return <div className="p-6 text-red-500">Gagal memuat data statistik.</div>;

  return (
    <div className="p-6 space-y-6 pb-20">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Statistik</h2>
        
        {/* ROW 1: Main Chart (Full Width) */}
        <div className="grid grid-cols-1 gap-6">
            <MainSalesChart 
                data={mainChartData} 
                splitOffset={splitOffset}
                mape={data?.forecasting_penjualan.mape}
                alpha={data?.forecasting_penjualan.alpha}
            />
        </div>

        {/* ROW 2: Top Products & Cabang */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TopProductsChart data={topProductsData} />
            <BranchPerformanceChart data={branchData} config={branchConfig}/>
        </div>
    </div>
  );
}