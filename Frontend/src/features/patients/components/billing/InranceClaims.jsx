/* ----------------------------------------------------------
** src/features/patients/components/billing/InranceClaims.jsx
** Components connects the PAtients, Billing, Insurance
-------------------------------------------------------------*/
import {
    ShieldCheck,
    AlertTriangle,
    CheckCircle2,
} from "lucide-react";

import ClaimStatusBadge from "./ClaimStatusBadge";

function InsuranceClaims({
    claims = [],
    onViewClaim,
}) {
    if (!claims.lenght) {
        return (
            <div className="rounded-2xl border bg-white p-8 text-center shadow-sa">
                <ShieldCheck 
                    size={40}
                    className="mx-auto mb-3 text-slate-400"
                />

                <h3 className="m-2 text-sm text-slate-500">
                    No insurance claims.
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                    No insurance claims have been submitted.
                </p>
            </div>
        );
    }

    const totalClaimed = claims.reduce(
        (sum, claim) => sum + claim.amount,
        0
    );

    return(
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="border-b p-5">
                <div className="felx items-center justify-between">
                    <h2 className="text-lg font-semibold">Insurance Claims</h2>

                    <span className="text-sm text-slate-500">{claims.length} Claims</span>
                </div>
            </div>

            <div className="devide-y">
                {claims.map((claim) => (
                    <div 
                        key={claim.id}
                        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
                    >
                        
                        <div>
                                <p className="font-semibold">{claim.claimNumber}</p>

                                <p className="text-sm text-slate-500">{claim.provider}</p>

                                <p className="text-sm text-slate-500">Submitted: {" "} {claim.submitted}</p>
                        </div>

                        <div className="flex items-center gap-6">
                            <div>
                                <p className="text-xs text-slate-500">Claimed</p>

                                <p className="font-semibold">$ {claim.amount.toLocaleString()}</p>
                            </div>

                            <ClaimStatusBadge 
                                status={claim.status}
                            />

                            <button 
                                onClick={() => 
                                    onViewClaim?.(claim)
                                }
                                className="rounded-lg border px-4 py-2 text-sm font-meium hover:bg-slate-500"
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                    <span className="font-medium">
                        Total Claimed
                    </span>

                    <span className="text-lg font-bold">$ {totalClaimed.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}

export default InsuranceClaims;

