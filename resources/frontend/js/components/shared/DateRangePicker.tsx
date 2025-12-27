import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { id as idLocale } from "date-fns/locale";

interface DateRangePickerProps {
    date: DateRange | undefined;
    setDate: (date: DateRange | undefined) => void;
    className?: string;
}

export function DateRangePicker({
    date,
    setDate,
    className,
}: DateRangePickerProps) {
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                        date.to ? (
                            <>
                            {format(date.from, "dd MMM yyyy", { locale: idLocale })} -{" "}
                            {format(date.to, "dd MMM yyyy", { locale: idLocale })}
                            </>
                        ) : (
                            format(date.from, "dd MMM yyyy", { locale: idLocale })
                        )
                        ) : (
                        <span>Pilih Tanggal</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div style={{
                        // @ts-ignore
                        "--primary": "142.1 76.2% 36.3%",
                        "--primary-foreground": "0 0% 100%",
                        "--accent": "142 72% 95%",
                        "--accent-foreground": "142 76% 36%"
                    }}>
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                            locale={idLocale}
                            classNames={{
                                day_range_middle: "aria-selected:bg-accent aria-selected:text-[var(--accent-foreground)]",
                                day_today: "!bg-transparent !border-0 text-foreground"
                            }}
                            modifiersClassNames={{
                                today: "bg-transparent border-none font-normal"
                            }}
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}