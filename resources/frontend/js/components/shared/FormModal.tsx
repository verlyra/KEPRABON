import React from 'react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Loader2 } from 'lucide-react';

export interface FormFieldConfig<T> {
    name: keyof T;
    label: string;
    type?: 'text' | 'number' | 'email' | 'password' | 'select';
    placeholder?: string;
    required?: boolean;
    options?: { label: string; value: string }[]; 
}

interface FormModalProps<T> {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    onSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
    fields: FormFieldConfig<T>[];
    formData: T;
    onFieldChange: (key: keyof T, value: string) => void; 
    submitLabel?: string;
    cancelLabel?: string;
}

export function FormModal<T>({
    isOpen, onOpenChange, title, onSubmit, isSubmitting,
    fields, formData, onFieldChange,
    submitLabel = "Simpan", cancelLabel = "Batal"
}: FormModalProps<T>) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
                
                <form onSubmit={onSubmit} className="space-y-4 py-2">
                    {fields.map((field) => (
                        <div key={String(field.name)} className="grid w-full items-center gap-1.5">
                            <Label htmlFor={String(field.name)} className="text-sm font-medium">
                                {field.label} {field.required && <span className="text-red-500">*</span>}
                            </Label>

                            {field.type === 'select' ? (
                                <Select 
                                    onValueChange={(val) => onFieldChange(field.name, val)}
                                    value={String(formData[field.name])}
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={field.placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.options?.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <Input
                                    id={String(field.name)}
                                    type={field.type || 'text'}
                                    value={String(formData[field.name] || '')}
                                    onChange={(e) => onFieldChange(field.name, e.target.value)}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    disabled={isSubmitting}
                                />
                            )}
                        </div>
                    ))}

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                            {cancelLabel}
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="bg-green-700 hover:bg-green-800">
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {submitLabel}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}