import { client } from "@/app/client";
import Link from "next/link";
import { getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";
import { useMemo } from "react";

type CampaignCardProps = {
    campaignAddress: string;
};

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaignAddress }) => {
    const contract = getContract({
        client: client,
        chain: baseSepolia,
        address: campaignAddress,
    });
    
    // Get Campaign Name
    const {data: campaignName} = useReadContract({
        contract: contract,
        method: "function name() view returns (string)",
        params: []
    });
    
    // Get Campaign Description
    const {data: campaignDescription} = useReadContract({
        contract: contract,
        method: "function description() view returns (string)",
        params: []
    });
    
    // Goal amount of the campaign
    const { data: goal, isLoading: isLoadingGoal } = useReadContract({
        contract: contract,
        method: "function goal() view returns (uint256)",
        params: [],
    });
    
    // Total funded balance of the campaign
    const { data: balance, isLoading: isLoadingBalance } = useReadContract({
        contract: contract,
        method: "function getContractBalance() view returns (uint256)",
        params: [],
    });
    
    // Calculate the percentage of funding reached
    const balancePercentage = useMemo(() => {
        if (!balance || !goal || Number(goal) === 0) return 0;
        const percentage = (Number(balance) / Number(goal)) * 100;
        return Math.min(percentage, 100); // Cap at 100%
    }, [balance, goal]);
    
    // If campaign is fully funded, don't render the component
    if (balancePercentage >= 100) {
        return null;
    }
    
    return (
        <div className="flex flex-col justify-between max-w-sm p-6 bg-white border border-slate-200 rounded-lg shadow">
            <div>
                {!isLoadingBalance && !isLoadingGoal && (
                    <div className="mb-4">
                        <div className="relative w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                            <div 
                                className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-right" 
                                style={{ width: `${balancePercentage}%`}}
                            >
                                <p className="text-white dark:text-white text-xs p-1">${balance?.toString()}</p>
                            </div>
                            <p className="absolute top-0 right-0 text-white dark:text-white text-xs p-1">
                                {`${balancePercentage.toFixed(0)}%`}
                            </p>
                        </div>
                    </div>
                )}
                <h5 className="mb-2 text-2xl font-bold tracking-tight">{campaignName}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{campaignDescription}</p>
            </div>
            
            <Link
                href={`/campaign/${campaignAddress}`}
                passHref={true}
            >
                <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    View Campaign
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </p>
            </Link>
        </div>
    );
};