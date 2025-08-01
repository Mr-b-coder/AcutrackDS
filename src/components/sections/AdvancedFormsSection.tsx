// FILE: components/sections/AdvancedFormsSection.tsx

import React, {useState} from 'react';
import {
    SectionContainer,
    ComponentPreview,
    SubSection,
    PropsTable,
    DatePicker,
    DateRangePicker,
    DateRange,
    Slider,
    FileUploader
} from '../Content.tsx';
import { Icon } from '../icons.tsx';
import CodeBlock from '../CodeBlock.tsx';
import { Breadcrumb } from '../Breadcrumb.tsx';
import { PropDef } from '../../../types.ts';

const datePickerProps: PropDef[] = [
    { name: 'label', type: 'string', default: 'N/A', description: 'The text label displayed above the picker.' },
    { name: 'id', type: 'string', default: 'N/A', description: 'A unique ID for the input, used to link the label.' },
    { name: 'value', type: 'Date | null', default: 'N/A', description: 'The currently selected date.' },
    { name: 'onChange', type: '(date: Date | null) => void', default: 'N/A', description: 'Callback function when a new date is selected.' },
    { name: 'error', type: 'string', default: 'undefined', description: 'If present, displays an error message below the picker.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the date picker.' },
];
const datePickerCode = `import { DatePicker } from './Content.tsx';

const [date, setDate] = useState(new Date());

<DatePicker 
    label="Shipping Date" 
    id="shipping-date" 
    value={date} 
    onChange={setDate} 
/>
`;

const dateRangePickerProps: PropDef[] = [
    { name: 'label', type: 'string', default: 'N/A', description: 'The text label displayed above the picker.' },
    { name: 'id', type: 'string', default: 'N/A', description: 'A unique ID for the input, used to link the label.' },
    { name: 'value', type: '{ start: Date | null; end: Date | null; }', default: 'N/A', description: 'The currently selected date range.' },
    { name: 'onChange', type: '(range: DateRange) => void', default: 'N/A', description: 'Callback function when the date range changes.' },
    { name: 'error', type: 'string', default: 'undefined', description: 'If present, displays an error message below the picker.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the date range picker.' },
];
const dateRangePickerCode = `import { DateRangePicker } from './Content.tsx';

const [range, setRange] = useState({
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 7))
});

<DateRangePicker 
    label="Booking Dates" 
    id="booking-dates" 
    value={range} 
    onChange={setRange} 
/>
`;

const sliderProps: PropDef[] = [
    { name: 'label', type: 'string', default: 'N/A', description: 'The text label displayed above the slider.' },
    { name: 'id', type: 'string', default: 'N/A', description: 'A unique ID for the input, used to link the label.' },
    { name: 'value', type: 'number', default: 'N/A', description: 'The current value of the slider.' },
    { name: 'onChange', type: '(e: ChangeEvent) => void', default: 'N/A', description: 'Standard input onChange callback.' },
];
const sliderCode = `import { Slider } from './Content.tsx';

const [volume, setVolume] = useState(50);

<Slider 
    label="Volume"
    id="volume-slider"
    value={volume}
    onChange={(e) => setVolume(Number(e.target.value))}
    min={0}
    max={100}
/>`;

const fileUploaderProps: PropDef[] = [
    { name: 'label', type: 'string', default: 'N/A', description: 'The text label displayed above the dropzone.' },
    { name: 'id', type: 'string', default: 'N/A', description: 'A unique ID for the hidden input.' },
    { name: 'files', type: 'File[]', default: '[]', description: 'An array of currently selected File objects.' },
    { name: 'onFilesChange', type: '(files: File[]) => void', default: 'N/A', description: 'Callback executed when files are added or removed.' },
    { name: 'multiple', type: 'boolean', default: 'true', description: 'Whether to allow multiple file selection.' },
];
const fileUploaderCode = `import { FileUploader } from './Content.tsx';

const [files, setFiles] = useState([]);

<FileUploader 
    label="Project Assets"
    id="project-assets"
    files={files}
    onFilesChange={setFiles}
/>
`;


export const AdvancedFormsSection: React.FC<{ groupTitle: string; sectionTitle:string; id: string; }> = ({ groupTitle, sectionTitle, id }) => {
    const [date, setDate] = useState<Date | null>(new Date());
    const [dateRange, setDateRange] = useState<DateRange>({
        start: new Date(),
        end: new Date(new Date().setDate(new Date().getDate() + 7)),
    });
    const [volume, setVolume] = useState(50);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    
    return (
        <SectionContainer id={id}>
            <Breadcrumb group={groupTitle} section={sectionTitle} />
            <h2 className="section-title">Advanced Inputs</h2>
            <p className="section-subtitle">
                Beyond basic inputs, modern applications require more complex controls. This section covers specialized components for date selection, range inputs, and file uploads.
            </p>
            
            <SubSection title="Date Picker">
              <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                A fully custom, theme-aware component for selecting a single date from a calendar view.
              </p>
              <ComponentPreview>
                <div className="w-full max-w-sm">
                    <DatePicker label="Shipping Date" id="shipping-date" value={date} onChange={setDate} />
                </div>
              </ComponentPreview>
              <CodeBlock code={datePickerCode} />
              <div className="mt-8"><PropsTable data={datePickerProps} /></div>
            </SubSection>

            <SubSection title="Date Range Picker">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    For selecting a start and end date from a single calendar view. It provides clear visual feedback for the selected range.
                </p>
                <ComponentPreview>
                    <div className="w-full max-w-sm">
                        <DateRangePicker
                            label="Booking Dates"
                            id="booking-dates"
                            value={dateRange}
                            onChange={setDateRange}
                        />
                    </div>
                </ComponentPreview>
                <CodeBlock code={dateRangePickerCode} />
                <div className="mt-8"><PropsTable data={dateRangePickerProps} /></div>
            </SubSection>


            <SubSection title="Slider">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    For selecting a numeric value from a given range. It's a styled `input[type="range"]` for broad compatibility.
                </p>
                <ComponentPreview>
                    <div className="w-full max-w-sm">
                        <Slider 
                            label="Volume" 
                            id="volume" 
                            value={volume} 
                            onChange={(e) => setVolume(Number(e.target.value))} 
                        />
                    </div>
                </ComponentPreview>
                <CodeBlock code={sliderCode} />
                <div className="mt-8"><PropsTable data={sliderProps} /></div>
            </SubSection>

            <SubSection title="File Uploader">
                <p className="text-text-secondary dark:text-dark-text-secondary -mt-4 mb-4 max-w-2xl">
                    A rich file input that supports both clicking to select and drag-and-drop. It displays a list of currently selected files.
                </p>
                <ComponentPreview>
                     <div className="w-full max-w-md">
                        <FileUploader 
                            label="Project Assets"
                            id="project-assets"
                            files={uploadedFiles}
                            onFilesChange={(newFiles) => {
                                setUploadedFiles(newFiles);
                                // This ensures the component correctly displays the placeholder
                                // when the last file is removed.
                                if (newFiles.length === 0) {
                                    const input = document.getElementById('project-assets') as HTMLInputElement;
                                    if (input) input.value = '';
                                }
                            }}
                        />
                    </div>
                </ComponentPreview>
                <CodeBlock code={fileUploaderCode} />
                <div className="mt-8"><PropsTable data={fileUploaderProps} /></div>
            </SubSection>

        </SectionContainer>
    );
}