import { Suspense, useEffect, useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import CardWrapper from '@/app/ui/dashboard/cards';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';

export default function Page() {
  // Define the revenue data
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [latestInvoicesData, setLatestInvoicesData] = useState<any[]>([]);

  useEffect(() => {
    // Simulating data fetch for revenue
    fetch('/api/revenue') // replace with your actual API
      .then((res) => res.json())
      .then((data) => setRevenueData(data));

    // Simulating data fetch for latest invoices
    fetch('/api/latestInvoices') // replace with your actual API
      .then((res) => res.json())
      .then((data) => setLatestInvoicesData(data));
  }, []);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart revenue={revenueData} />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          {/* Pass the latestInvoicesData prop to LatestInvoices */}
          <LatestInvoices latestInvoices={latestInvoicesData} />
        </Suspense>
      </div>
    </main>
  );
}
