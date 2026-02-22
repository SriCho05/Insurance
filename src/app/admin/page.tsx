import { getLeads } from '@/lib/db';
import { LeadTable } from '@/components/admin/lead-table';
import { StatsCard } from '@/components/admin/stats-card';
import { LeadsByProductChart } from '@/components/admin/leads-by-product-chart';
import { LeadsOverTimeChart } from '@/components/admin/leads-over-time-chart';
import { Users, TrendingUp, BarChart3, Star } from 'lucide-react';
import { format, subDays, startOfDay } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const leads = await getLeads();

  // --- Data Analysis ---
  const totalLeads = leads.length;
  
  const highPriorityLeads = leads.filter(lead => lead.priority === 'High').length;
  
  const leadsByProduct = leads.reduce((acc, lead) => {
    acc[lead.selectedProduct] = (acc[lead.selectedProduct] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const leadsByProductChartData = Object.entries(leadsByProduct)
    .map(([name, leads]) => ({ name, leads }))
    .sort((a, b) => b.leads - a.leads);

  const mostPopularProduct = leadsByProductChartData[0]?.name || 'N/A';

  // Leads over the last 30 days
  const thirtyDaysAgo = startOfDay(subDays(new Date(), 29));
  const recentLeads = leads.filter(lead => lead.timestamp >= thirtyDaysAgo);

  const leadsOverTime = recentLeads.reduce((acc, lead) => {
    const date = format(lead.timestamp, 'yyyy-MM-dd');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const leadsOverTimeChartData = Array.from({ length: 30 }).map((_, i) => {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    return { date, leads: leadsOverTime[date] || 0 };
  }).reverse();

  // Today's leads
  const leadsToday = leadsOverTime[format(new Date(), 'yyyy-MM-dd')] || 0;
  
  // Leads from yesterday
  const leadsYesterday = leadsOverTime[format(subDays(new Date(), 1), 'yyyy-MM-dd')] || 0;
  
  const percentageChange = leadsYesterday > 0
    ? (((leadsToday - leadsYesterday) / leadsYesterday) * 100).toFixed(0)
    : leadsToday > 0 ? '100' : '0';
  
  const changeDescription = () => {
    if (leadsYesterday === 0 && leadsToday === 0) return "No change from yesterday";
    const change = parseFloat(percentageChange);
    if (change > 0) return `+${change}% from yesterday`;
    if (change < 0) return `${change}% from yesterday`;
    return "No change from yesterday";
  };


  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">An overview of your customer leads and performance.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Leads"
          value={totalLeads.toString()}
          icon={Users}
        />
        <StatsCard
          title="High-Priority Leads"
          value={highPriorityLeads.toString()}
          icon={Star}
        />
        <StatsCard
          title="Most Popular Product"
          value={mostPopularProduct}
          icon={BarChart3}
        />
        <StatsCard
          title="Leads Today"
          value={leadsToday.toString()}
          icon={TrendingUp}
          description={changeDescription()}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <LeadsByProductChart data={leadsByProductChartData} />
        <LeadsOverTimeChart data={leadsOverTimeChartData} />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Recent Leads</h2>
        <LeadTable data={leads} />
      </div>
    </div>
  );
}
