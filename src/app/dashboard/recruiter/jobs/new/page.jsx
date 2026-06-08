"use client";

import React, { useState } from "react";
import {
    Form,
    Fieldset,
    TextField,
    Input,
    TextArea,
    Select,
    Label,
    ListBox,
    FieldError,
    Button,
    toast
} from "@heroui/react";
import { Briefcase, MapPin, Calendar, Layers, Check, FileDollar } from "@gravity-ui/icons";
import { createJob } from "@/lib/actions/jobs";
import { redirect, useRouter } from "next/navigation";

// Mock Data Arrays matching v3 ListBox specs
const JOB_CATEGORIES = [
    { id: "technology", name: "Technology" },
    { id: "design", name: "Design & Creative" },
    { id: "marketing", name: "Marketing & Sales" },
    { id: "finance", name: "Finance & Accounting" },
    { id: "hr", name: "Human Resources" },
];

const JOB_TYPES = [
    { id: "full-time", name: "Full-time" },
    { id: "part-time", name: "Part-time" },
    { id: "contract", name: "Contract" },
    { id: "internship", name: "Internship" },
];

const CURRENCIES = [
    { id: "USD", name: "USD ($)" },
    { id: "EUR", name: "EUR (€)" },
    { id: "GBP", name: "GBP (£)" },
    { id: "BDT", name: "BDT (৳)" },
];

export default function PostJobPage() {
    const [isRemote, setIsRemote] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Fallback state context for the Recruiter's assigned corporate account
    const mockCompany = {
        id: "comp_12345",
        name: "Acme Corp",
        isApproved: true
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Validation Schema
        const newErrors = {};
        if (!data.jobTitle) newErrors.jobTitle = "Job title is required";
        if (!data.category) newErrors.category = "Please select a category";
        if (!data.jobType) newErrors.jobType = "Please select a job type";
        if (!isRemote && !data.location) newErrors.location = "Location is required for non-remote roles";
        if (!data.responsibilities) newErrors.responsibilities = "Responsibilities are required";
        if (!data.requirements) newErrors.requirements = "Requirements are required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        // Append standard operational status configurations
        const finalPayload = {
            ...data,
            isRemote,
            companyId: mockCompany.id,
            companyName: mockCompany.name,
            status: "active",
            createdAt: new Date().toISOString(),
        };

        // console.log("Publishing live listing payload:", finalPayload);
        const res = await createJob(finalPayload)
        console.log(res, 'res');
        if(res.insertedId){
            toast.warning("Job Posted Successfully")
            e.target.reset();
            setIsRemote(false)
            setIsLoading(false);
            router.push('/dashboard/recruiter/jobs')
        }
    };

    if (!mockCompany.isApproved) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 bg-[#111113]">
                <p className="text-danger text-lg font-semibold">Access Denied</p>
                <p className="text-neutral-400 max-w-md mt-2">
                    Your company platform profile is currently pending validation before listing privileges are authorized.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 my-10 bg-[#111113] border border-neutral-800 rounded-xl text-neutral-200 shadow-2xl">

            {/* Dark UI header matching platform reference style */}
            <div className="mb-8 border-b border-neutral-800 pb-5">
                <h1 className="text-2xl font-bold text-white tracking-tight">Post a New Job</h1>
                <p className="text-sm text-neutral-400 mt-1">
                    Deploying an active public index link for <span className="text-white font-medium">{mockCompany.name}</span>.
                </p>
            </div>

            <Form onSubmit={handleSubmit} validationErrors={errors} validationBehavior="aria" className="space-y-8">

                {/* SECTION 1: JOB INFO */}
                <Fieldset
                    legend="Job Information"
                    description="Crucial organizational details and tracking tags for the open position."
                    className={{
                        legend: "text-lg font-semibold text-white",
                        description: "text-neutral-400 text-xs mt-1"
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">

                        {/* Job Title */}
                        <TextField isInvalid={!!errors.jobTitle} className="w-full">
                            <Label className="text-sm text-neutral-300 mb-2 block">Job Title</Label>
                            <Input
                                name="jobTitle"
                                placeholder="e.g. Senior Full Stack Engineer"
                                className="dark w-full bg-[#18181b] border border-neutral-800 rounded-lg p-2 text-white"
                            />
                            {errors.jobTitle && <FieldError className="text-xs text-danger mt-1 block">{errors.jobTitle}</FieldError>}
                        </TextField>

                        {/* Job Category */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-neutral-300 flex items-center gap-1.5">
                                <Layers className="w-3.5 h-3.5 text-neutral-400" /> Job Category
                            </label>
                            <Select name="category" placeholder="Select a category" className="dark">
                                <Select.Trigger className="bg-[#18181b] border border-neutral-800 text-white rounded-lg p-2 flex justify-between items-center w-full">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover className="bg-[#18181b] border border-neutral-800 rounded-lg shadow-xl text-white">
                                    <ListBox className="p-1">
                                        {JOB_CATEGORIES.map((cat) => (
                                            <ListBox.Item id={cat.id} key={cat.id} textValue={cat.name} className="p-2 hover:bg-neutral-800 rounded cursor-pointer transition">
                                                {cat.name}
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                            {errors.category && <p className="text-xs text-danger mt-1">{errors.category}</p>}
                        </div>

                        {/* Job Type */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-neutral-300 flex items-center gap-1.5">
                                <Briefcase className="w-3.5 h-3.5 text-neutral-400" /> Job Type
                            </label>
                            <Select name="jobType" placeholder="Select arrangement structure" className="dark">
                                <Select.Trigger className="bg-[#18181b] border border-neutral-800 text-white rounded-lg p-2 flex justify-between items-center w-full">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover className="bg-[#18181b] border border-neutral-800 rounded-lg shadow-xl text-white">
                                    <ListBox className="p-1">
                                        {JOB_TYPES.map((type) => (
                                            <ListBox.Item id={type.id} key={type.id} textValue={type.name} className="p-2 hover:bg-neutral-800 rounded cursor-pointer transition">
                                                {type.name}
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                            {errors.jobType && <p className="text-xs text-danger mt-1">{errors.jobType}</p>}
                        </div>

                        {/* Application Deadline */}
                        <TextField className="w-full">
                            <Label className="text-sm text-neutral-300 mb-2 block">Application Deadline</Label>
                            <Input
                                name="deadline"
                                type="date"
                                className="dark w-full bg-[#18181b] border border-neutral-800 rounded-lg p-2 text-white"
                            />
                        </TextField>

                        {/* Salary Constraints Panel */}
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end bg-[#161619] p-4 rounded-xl border border-neutral-800">
                            <TextField className="w-full">
                                <Label className="text-sm text-neutral-300 mb-2 block">Minimum Salary</Label>
                                <Input
                                    name="salaryMin"
                                    type="number"
                                    placeholder="0"
                                    className="dark w-full bg-[#18181b] border border-neutral-800 rounded-lg p-2 text-white"
                                />
                            </TextField>

                            <TextField className="w-full">
                                <Label className="text-sm text-neutral-300 mb-2 block">Maximum Salary</Label>
                                <Input
                                    name="salaryMax"
                                    type="number"
                                    placeholder="0"
                                    className="dark w-full bg-[#18181b] border border-neutral-800 rounded-lg p-2 text-white"
                                />
                            </TextField>

                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-sm text-neutral-300 flex items-center gap-1.5">
                                    <FileDollar className="w-3.5 h-3.5 text-neutral-400" /> Currency
                                </label>
                                <Select name="currency" placeholder="USD ($)" className="dark">
                                    <Select.Trigger className="bg-[#18181b] border border-neutral-800 text-white rounded-lg p-2 flex justify-between items-center w-full">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>
                                    <Select.Popover className="bg-[#18181b] border border-neutral-800 rounded-lg shadow-xl text-white">
                                        <ListBox className="p-1">
                                            {CURRENCIES.map((curr) => (
                                                <ListBox.Item id={curr.id} key={curr.id} textValue={curr.name} className="p-2 hover:bg-neutral-800 rounded cursor-pointer transition">
                                                    {curr.name}
                                                </ListBox.Item>
                                            ))}
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>
                        </div>

                        {/* Location block with Custom Tailwind Working Switch */}
                        <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-[#161619] p-4 rounded-xl border border-neutral-800 w-full">
                            <div className="flex-1 w-full">
                                <TextField isInvalid={!isRemote && !!errors.location} className="w-full">
                                    <Label className="text-sm text-neutral-300 mb-2 block">Location</Label>
                                    <Input
                                        name="location"
                                        placeholder={isRemote ? "Remote / Global Workspace" : "e.g. San Francisco, CA"}
                                        disabled={isRemote}
                                        className="dark w-full bg-[#18181b] border border-neutral-800 rounded-lg p-2 text-white disabled:opacity-40"
                                    />
                                    {!isRemote && errors.location && <FieldError className="text-xs text-danger mt-1 block">{errors.location}</FieldError>}
                                </TextField>
                            </div>

                            {/* 100% WORKING CUSTOM TOGGLE PANEL */}
                            <div className="flex items-center gap-3 sm:pt-6 select-none cursor-pointer" onClick={() => setIsRemote(!isRemote)}>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={isRemote}
                                    className={`${isRemote ? "bg-white" : "bg-neutral-800"
                                        } relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`${isRemote ? "translate-x-5 bg-black" : "translate-x-0 bg-neutral-400"
                                            } pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out`}
                                    />
                                </button>
                                <span className="text-sm text-neutral-300">Fully Remote Position</span>
                            </div>
                        </div>

                    </div>
                </Fieldset>

                <hr className="border-neutral-800" />

                {/* SECTION 2: JOB DESCRIPTION */}
                <Fieldset
                    legend="Job Specifications"
                    description="In-depth breakdowns outlining operational performance paths and compensation perks."
                    className={{
                        legend: "text-lg font-semibold text-white",
                        description: "text-neutral-400 text-xs mt-1"
                    }}
                >
                    <div className="space-y-6 mt-4">

                        {/* Responsibilities */}
                        <TextField isInvalid={!!errors.responsibilities} className="w-full">
                            <Label className="text-sm text-neutral-300 mb-2 block">Core Responsibilities</Label>
                            <TextArea
                                name="responsibilities"
                                rows={4}
                                placeholder="What parameters or architectural ownership boundaries apply to this position?..."
                                className="dark w-full bg-[#18181b] border border-neutral-800 rounded-lg p-2 text-white"
                            />
                            {errors.responsibilities && <FieldError className="text-xs text-danger mt-1 block">{errors.responsibilities}</FieldError>}
                        </TextField>

                        {/* Requirements */}
                        <TextField isInvalid={!!errors.requirements} className="w-full">
                            <Label className="text-sm text-neutral-300 mb-2 flex items-center gap-1.5">
                                <Check className="w-4 h-4 text-neutral-400" /> Job Requirements & Qualifications
                            </Label>
                            <TextArea
                                name="requirements"
                                rows={4}
                                placeholder="Detail baseline framework knowledge, stack thresholds, or professional metrics..."
                                className="dark w-full bg-[#18181b] border border-neutral-800 rounded-lg p-2 text-white"
                            />
                            {errors.requirements && <FieldError className="text-xs text-danger mt-1 block">{errors.requirements}</FieldError>}
                        </TextField>

                        {/* Benefits */}
                        <TextField className="w-full">
                            <Label className="text-sm text-neutral-300 mb-2 block">Benefits & Perks (Optional)</Label>
                            <TextArea
                                name="benefits"
                                rows={3}
                                placeholder="Health insurance parameters, specialized equipment options, flexible schedules..."
                                className="dark w-full bg-[#18181b] border border-neutral-800 rounded-lg p-2 text-white"
                            />
                        </TextField>
                    </div>
                </Fieldset>

                {/* SECTION 3: ACTIONS */}
                <div className="flex justify-end items-center gap-3 pt-4 border-t border-neutral-800">
                    <Button
                        type="button"
                        variant="flat"
                        className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700 px-6 py-2 rounded-lg"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        className="bg-white text-black font-semibold hover:bg-neutral-200 px-6 py-2 rounded-lg transition"
                    >
                        Publish Job Listing
                    </Button>
                </div>

            </Form>
        </div>
    );
}