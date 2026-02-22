'use client';

import * as React from 'react';
import { DataTable } from '@/components/admin/data-table';
import { columns } from '@/components/admin/columns';
import type { Lead } from '@/lib/db';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { downloadCsv } from '@/app/admin/actions';

export function LeadTable({ data }: { data: Lead[] }) {
  const [filter, setFilter] = React.useState('');

  const filteredData = React.useMemo(() => {
    if (!filter) return data;
    return data.filter(lead => 
      lead.fullName.toLowerCase().includes(filter.toLowerCase()) ||
      lead.selectedProduct.toLowerCase().includes(filter.toLowerCase()) ||
      lead.priority.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter by name, product, or priority..."
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="max-w-sm"
        />
        <form action={downloadCsv}>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </form>
      </div>
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}
