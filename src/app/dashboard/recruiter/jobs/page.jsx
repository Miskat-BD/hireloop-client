import { getCompanyJobs } from '@/lib/api/jobs';
import React from 'react';
import { Chip, Table, Button } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";

const RecruiterJobs = async () => {
    const companyId = 'comp_12345';
    // const jobs = await getCompanyJobs(companyId);
    // console.log('jobs by company:',jobs);
    const jobs = await getCompanyJobs(companyId) || [];
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">Manage All Jobs</h2>
                <p className="text-neutral-400 text-sm mt-1">Review, edit, and track your active job listings.</p>
            </div>

            <Table aria-label="Company jobs management table">
                <Table.ResizableContainer>
                    <Table.Content className="min-w-[800px] bg-[#111113] border border-neutral-800 rounded-xl">
                        <Table.Header>
                            <Table.Column isRowHeader defaultWidth="2fr" id="title" minWidth={200}>
                                Job Title
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="type" minWidth={120}>
                                Type
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1.2fr" id="salary" minWidth={150}>
                                Salary Range
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1.2fr" id="deadline" minWidth={130}>
                                Deadline
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="status" minWidth={110}>
                                Status
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="actions" minWidth={130}>
                                Actions
                            </Table.Column>
                        </Table.Header>

                        <Table.Body emptyContent={"No jobs found for this company."}>
                            {jobs.map((job) => {
                                // MongoDB Object ID স্ট্রিং এ কনভার্ট করা (যদি $oid ফরম্যাটে থাকে)
                                const jobId = job._id?.$oid || job._id;

                                return (
                                    <Table.Row key={jobId} className="border-b border-neutral-800/50 hover:bg-neutral-900/40 transition">
                                        {/* Job Title & Location (Remote info badge সহ) */}
                                        <Table.Cell>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-white">{job.jobTitle}</span>
                                                <span className="text-xs text-neutral-400 mt-0.5 flex items-center gap-1">
                                                    {job.location} {job.isRemote && <span className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded-md font-mono">Remote</span>}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        {/* Job Type */}
                                        <Table.Cell>
                                            <span className="text-sm text-neutral-300 capitalize">
                                                {job.jobType}
                                            </span>
                                        </Table.Cell>

                                        {/* Salary Range */}
                                        <Table.Cell>
                                            <span className="text-sm font-medium text-neutral-300">
                                                {job.minSalary && job.maxSalary 
                                                    ? `${Number(job.minSalary).toLocaleString()} - ${Number(job.maxSalary).toLocaleString()} ${job.currency}`
                                                    : "Negotiable"
                                                }
                                            </span>
                                        </Table.Cell>

                                        {/* Application Deadline */}
                                        <Table.Cell>
                                            <span className="text-sm text-neutral-400 font-mono">
                                                {job.deadline}
                                            </span>
                                        </Table.Cell>

                                        {/* Operational Status Dynamic Chip */}
                                        <Table.Cell>
                                            <Chip 
                                                color={job.status === "active" ? "success" : "danger"} 
                                                size="sm" 
                                                variant="soft"
                                                className="capitalize font-medium"
                                            >
                                                {job.status || "Inactive"}
                                            </Chip>
                                        </Table.Cell>

                                        {/* Action Icon Buttons */}
                                        <Table.Cell>
                                            <div className="flex items-center gap-2">
                                                <Button 
                                                    isIconOnly 
                                                    size="sm" 
                                                    variant="flat" 
                                                    className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                                                    aria-label="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button 
                                                    isIconOnly 
                                                    size="sm" 
                                                    variant="flat" 
                                                    className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                                                    aria-label="Edit Job"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button 
                                                    isIconOnly 
                                                    size="sm" 
                                                    variant="flat" 
                                                    className="bg-danger-500/10 text-danger hover:bg-danger-500/20"
                                                    aria-label="Delete Job"
                                                >
                                                    <TrashBin className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ResizableContainer>
            </Table>
        </div>
    );
};

export default RecruiterJobs;