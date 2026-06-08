'use client'
import { DashboardStats } from "@/app/components/dashboard/DashboardStats";
import { useSession } from "@/lib/auth-client";
import { Briefcase, Persons, Thunderbolt, CircleCheck } from '@gravity-ui/icons';

const RecruiterDashboardHomePage = () => {
    const {data: session, isPending} = useSession();
    if(isPending){
        return <div>Loading...</div>
    }
        const recruiterStats = [
        { title: "Total Job Posts", value: "48", icon: Briefcase },
        { title: "Total Applicants", value: "1,284", icon: Persons },
        { title: "Active Jobs", value: "18", icon: Thunderbolt },
        { title: "Jobs Closed", value: "32", icon: CircleCheck },
    ];
    const user = session?.user;
    console.log(user, 'user');
    return (
        <div>
            <h1 className="font-bold text-4xl">Welcome Back, {user?.name}</h1>
            <DashboardStats statsData={recruiterStats} />
        </div>
    );
};

export default RecruiterDashboardHomePage;