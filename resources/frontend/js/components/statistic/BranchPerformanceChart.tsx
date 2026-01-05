import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Pie, PieChart, LabelList } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { TrendingUp } from 'lucide-react';

interface Props {
    data: any[];
    config: ChartConfig;
}

const formatLargeNumber = (value: number) => {
    if (value === 0) return "";
    if (value >= 1e12) return `${(value / 1e12).toFixed(1).replace(/\.0$/, '')} T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(1).replace(/\.0$/, '')} M`; 
    if (value >= 1e6) return `${(value / 1e6).toFixed(1).replace(/\.0$/, '')} JT`; 
    return `${(value / 1e3).toFixed(0)}K`;
};

export function BranchPerformanceChart({ data, config }: Props) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Kontribusi Cabang</CardTitle>
                <CardDescription>Berdasarkan Omset</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                {data.length > 0 ? (
                    <ChartContainer config={config} className="mx-auto aspect-square">
                        <PieChart>
                            <ChartTooltip 
                                cursor={false}
                                content={<ChartTooltipContent nameKey="browser" hideLabel />} 
                            />
                            
                            <Pie 
                                data={data} 
                                dataKey="value" 
                                nameKey="browser"
                                innerRadius={0} 
                                outerRadius={90} 
                                paddingAngle={2}
                            >
                                <LabelList 
                                    dataKey="value" 
                                    position="inside" 
                                    formatter={formatLargeNumber}
                                    fill="black"
                                    stroke="none"
                                />
                            </Pie>

                            <ChartLegend 
                                content={<ChartLegendContent nameKey="browser" />} 
                                className="-translate-y-2 flex-wrap gap-4 justify-start"
                            />
                        </PieChart>
                    </ChartContainer>
                ) : (
                    <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                        Tidak ada data cabang.
                    </div>
                )}
            </CardContent>
            <CardContent className="flex-col gap-2 text-sm pt-4">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Analisis Omset <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Proporsi pendapatan antar cabang.
                </div>
            </CardContent>
        </Card>
    );
}