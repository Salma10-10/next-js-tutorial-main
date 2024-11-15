import { useEffect, useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import CardWrapper from '@/app/ui/dashboard/cards';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';

export default function Page() {
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [latestInvoicesData, setLatestInvoicesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch revenue data
        const revenueResponse = await fetch('/api/revenue');
        if (!revenueResponse.ok) throw new Error('Failed to fetch revenue data');
        const revenue = await revenueResponse.json();
        setRevenueData(revenue);

        // Fetch latest invoices data
        const invoicesResponse = await fetch('/api/latestInvoices');
        if (!invoicesResponse.ok) throw new Error('Failed to fetch invoices data');
        const invoices = await invoicesResponse.json();
        setLatestInvoicesData(invoices);

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CardsSkeleton />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <RevenueChartSkeleton />
          <LatestInvoicesSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenueData} />
        <LatestInvoices latestInvoices={latestInvoicesData} />
      </div>
    </main>
  );
}
