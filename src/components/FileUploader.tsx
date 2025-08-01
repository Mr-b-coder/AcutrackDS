// FILE: components/FileUploader.tsx
// This component provides a drag-and-drop interface for file uploads.

import React, { useState, useRef } from 'react';
import { Icon } from './icons.tsx';
import { Button } from './Button.tsx';

export const FileUploader: React.FC<{ label: string, id: string, files: File[], onFilesChange: (f: File[])=> void, multiple?: boolean }> = ({label, id, files, onFilesChange, multiple = true}) => {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
        else if (e.type === 'dragleave') setIsDragging(false);
    };
    
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newFiles = Array.from(e.dataTransfer.files);
            onFilesChange(multiple ? [...files, ...newFiles] : [newFiles[0]]);
        }
    };
    
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            onFilesChange(multiple ? [...files, ...newFiles] : [newFiles[0]]);
        }
    };
    
    const removeFile = (index: number) => {
        onFilesChange(files.filter((_, i) => i !== index));
    };
    
    return (
        <div className="w-full">
            <label className="block text-sm font-semibold text-text-primary dark:text-dark-text-primary mb-2">{label}</label>
            <div 
                className={`relative p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center transition-colors ${isDragging ? 'border-brand-orange bg-brand-orange/10' : 'border-border-color dark:border-dark-border-color'}`}
                onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                <Icon className="!text-5xl text-text-secondary/70 dark:text-dark-text-secondary/70">cloud_upload</Icon>
                <p className="font-semibold text-text-primary dark:text-dark-text-primary mt-4">Drag & drop files here</p>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">or <span className="font-bold text-brand-orange">browse files</span></p>
                <input ref={inputRef} type="file" id={id} multiple={multiple} className="hidden" onChange={handleFileSelect} />
            </div>
            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-semibold">Selected Files:</h4>
                    <ul className="divide-y divide-border-color dark:divide-dark-border-color border border-border-color dark:border-dark-border-color rounded-lg">
                        {files.map((file, i) => (
                            <li key={i} className="flex items-center justify-between p-3 text-sm">
                                <span className="truncate">{file.name}</span>
                                <Button variant="text" size="xs" className="!p-1" onClick={() => removeFile(i)}><Icon>close</Icon></Button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
