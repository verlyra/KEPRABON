import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const chartConfig = {
    value: { label: "Total Penjualan", color: "url(#splitColor)" },
    actual: { label: "Aktual", color: "hsl(142.1 76.2% 36.3%)" },
    forecast: { label: "Prediksi", color: "hsl(32 95% 44%)" },
} satisfies ChartConfig;

interface Props {
    data: any[];
    splitOffset: number;
    mape?: number;
    alpha?: number;
}

export function MainSalesChart({ data, splitOffset, mape, alpha }: Props) {
    return (
        <Card className="col-span-1 lg:col-span-2"> {/* Full width di desktop */}
            <CardHeader>
                <CardTitle>Analisis & Prediksi Penjualan</CardTitle>
                <CardDescription>
                    Data omset aktual dan prediksi penjualan {alpha ? `(Alpha: ${alpha})` : ''} kedepan.
                    {mape ? ` Tingkat Akurasi (MAPE): ${(100 - (mape > 100 ? 100 : mape)).toFixed(1)}%` : ''}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[300px] max-h-[400px] w-full">
                    <AreaChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="splitColor" x1="0" y1="0" x2="1" y2="0">
                                <stop offset={splitOffset} stopColor="hsl(142.1 76.2% 36.3%)" stopOpacity={1} />
                                <stop offset={splitOffset} stopColor="hsl(32 95% 44%)" stopOpacity={1} />
                            </linearGradient>

                            <linearGradient id="splitFill" x1="0" y1="0" x2="1" y2="0">
                                <stop offset={splitOffset} stopColor="hsl(142.1 76.2% 36.3%)" stopOpacity={0.3} />
                                <stop offset={splitOffset} stopColor="hsl(32 95% 44%)" stopOpacity={0.3} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        
                        <XAxis 
                            dataKey="date" 
                            tickLine={false} 
                            axisLine={false} 
                            tickMargin={8} 
                            tickFormatter={(val) => val.slice(8, 10)} // DD
                            interval="preserveStartEnd"
                        />
                        
                        <YAxis 
                            tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`} 
                            axisLine={false}
                            tickLine={false}
                        />

                        <ChartTooltip 
                            cursor={{ stroke: 'hsl(var(--muted-foreground))' }}
                            content={
                                <ChartTooltipContent 
                                    labelFormatter={(val) => new Date(val).toLocaleDateString("id-ID", { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })} 
                                />
                            } 
                        />

                        <ChartLegend content={<ChartLegendContent />} />

                        <Area 
                            dataKey="value" 
                            type="monotone" 
                            stroke="url(#splitColor)" 
                            fill="url(#splitFill)" 
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}