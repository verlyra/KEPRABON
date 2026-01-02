import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
    qty: { label: "Terjual", color: "hsl(142.1 60% 30%)" },
} satisfies ChartConfig;

export function TopProductsChart({ data }: { data: any[] }) {
    return (
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>5 Produk Terlaris</CardTitle>
                <CardDescription>Berdasarkan kuantitas penjualan</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                    <BarChart accessibilityLayer data={data} layout="vertical" margin={{ left: 0 }}>
                        <CartesianGrid horizontal={false} />
                        <YAxis 
                            dataKey="name" 
                            type="category" 
                            tickLine={false} 
                            axisLine={false} 
                            width={150} 
                            tick={{fontSize: 12}}
                        />
                        <XAxis type="number" hide />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="qty" fill="var(--color-qty)" radius={4}>
                            <LabelList dataKey="qty" position="right" fontSize={12} />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}