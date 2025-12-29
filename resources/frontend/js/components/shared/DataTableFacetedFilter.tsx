import * as React from "react";
import { Check, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface DataTableFacetedFilterProps<TData, TValue> {
    title?: string;
    options: {
        label: string;
        value: string;
        icon?: React.ComponentType<{ className?: string }>;
    }[];
    selectedValues: Set<string>;
    setSelectedValues: (values: Set<string>) => void;
}

export function DataTableFacetedFilter<TData, TValue>({
    title,
    options,
    selectedValues,
    setSelectedValues,
}: DataTableFacetedFilterProps<TData, TValue>) {
    
    return (
        <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 border-dashed">
            <PlusCircle className="mr-2 h-4 w-4" />
            {title}
            {selectedValues?.size > 0 && (
                <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal lg:hidden"
                >
                    {selectedValues.size}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                    {selectedValues.size > 2 ? (
                    <Badge
                        variant="secondary"
                        className="rounded-sm px-1 font-normal"
                    >
                        {selectedValues.size} terpilih
                    </Badge>
                    ) : (
                    options
                        .filter((option) => selectedValues.has(option.value))
                        .map((option) => (
                        <Badge
                            variant="secondary"
                            key={option.value}
                            className="rounded-sm px-1 font-normal"
                        >
                            {option.label}
                        </Badge>
                        ))
                    )}
                </div>
                </>
            )}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
            <CommandInput placeholder={title} />
            <CommandList>
                <CommandEmpty>Tidak ada hasil.</CommandEmpty>
                <CommandGroup>
                {options.map((option) => {
                    const isSelected = selectedValues.has(option.value);
                    return (
                    <CommandItem
                        key={option.value}
                        onSelect={() => {
                        const newSet = new Set(selectedValues);
                        if (isSelected) {
                            newSet.delete(option.value);
                        } else {
                            newSet.add(option.value);
                        }
                        setSelectedValues(newSet);
                        }}
                    >
                        <div
                        className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                        >
                        <Check className={cn("h-4 w-4")} />
                        </div>
                        {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{option.label}</span>
                    </CommandItem>
                    );
                })}
                </CommandGroup>
                {selectedValues.size > 0 && (
                <>
                    <CommandSeparator />
                    <CommandGroup>
                    <CommandItem
                        onSelect={() => setSelectedValues(new Set())}
                        className="justify-center text-center"
                    >
                        Reset Filter
                    </CommandItem>
                    </CommandGroup>
                </>
                )}
            </CommandList>
            </Command>
        </PopoverContent>
        </Popover>
    );
}