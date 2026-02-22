'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { Lead } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const PriorityBadge = ({ priority }: { priority: Lead['priority'] }) => {
  const variant: 'destructive' | 'secondary' | 'default' =
    priority === 'High' ? 'destructive' : priority === 'Medium' ? 'secondary' : 'default';
  
  return <Badge variant={variant}>{priority}</Badge>;
};

export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: 'fullName',
    header: 'Full Name',
  },
  {
    accessorKey: 'selectedProduct',
    header: 'Product',
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => <PriorityBadge priority={row.original.priority} />,
  },
  {
    accessorKey: 'reasoning',
    header: 'AI Reasoning',
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="truncate max-w-xs cursor-help">{row.original.reasoning}</p>
          </TooltipTrigger>
          <TooltipContent className="max-w-md">
            <p>{row.original.reasoning}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
  {
    accessorKey: 'contactNumber',
    header: 'Contact',
  },
  {
    accessorKey: 'timestamp',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date Submitted
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => new Date(row.original.timestamp).toLocaleString(),
  },
];
