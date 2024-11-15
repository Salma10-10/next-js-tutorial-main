import { Suspense, useEffect, useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import CardWrapper from '@/app/ui/dashboard/cards';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';

export default function Page() {
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [latestInvoicesData, setLatestInvoicesData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch revenue data
    fetch('/api/revenue')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch revenue data');
        return res.json();
      })
      .then((data) => setRevenueData(data))
      .catch((error) => console.error(error));

    // Fetch latest invoices data
    fetch('/api/latestInvoices')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch invoices data');
        return res.json();
      })
      .then((data) => setLatestInvoicesData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* No need to wrap this in Suspense unless it's a lazy-loaded component */}
        <CardWrapper />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart revenue={revenueData} />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices latestInvoices={latestInvoicesData} />
        </Suspense>
      </div>
    </main>
  );
}
