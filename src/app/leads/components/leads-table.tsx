'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { LeadResponse } from '@/types/lead';
import { RefreshCcw, Search, MoreVertical, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, formatRelativeDate } from '@/utils/date';

interface LeadsTableProps {
  leads: LeadResponse[];
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function LeadsTable({ leads, onRefresh, isRefreshing = false }: LeadsTableProps) {
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

  // Ensure leads is an array
  const leadsArray = Array.isArray(leads) ? leads : [];

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(leadId)) {
        newSet.delete(leadId);
      } else {
        newSet.add(leadId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allLeadIds = new Set(leadsArray.map((l) => l.id));
      setSelectedLeads(allLeadIds);
    } else {
      setSelectedLeads(new Set());
    }
  };

  const allLeadsSelected = leadsArray.length > 0 && leadsArray.every((l) => selectedLeads.has(l.id));
  const someLeadsSelected = leadsArray.some((l) => selectedLeads.has(l.id)) && !allLeadsSelected;

  // Update indeterminate state on checkbox ref
  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      selectAllCheckboxRef.current.indeterminate = someLeadsSelected;
    }
  }, [someLeadsSelected]);

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className='flex'>
            <h2 className="text-lg font-semibold">All Leads</h2>
            <Button
              onClick={onRefresh}
              disabled={isRefreshing}
              variant="ghost"
              size="sm"
            >
              <RefreshCcw />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
          <div className="flex gap-2">
            {selectedLeads.size > 0 && (
              <Button
                variant="default"
                size="sm"
              >
                Export ({selectedLeads.size})
              </Button>
            )}

            <Button
              onClick={onRefresh}
              disabled={isRefreshing}
              variant="outline"
              size="sm"
            >
              <Search />
              Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    ref={selectAllCheckboxRef}
                    checked={allLeadsSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Requirement</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Matches</TableHead>
                <TableHead>Assign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leadsArray.map((lead) => (
                <TableRowContent key={lead.id} lead={lead} selectedLeads={selectedLeads} onSelectLead={handleSelectLead} />
              ))}
            </TableBody>
          </Table>
        </div>

        {leadsArray.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No leads found</p>
          </div>
        )}
      </div>
    </div>
  );
}

const AGENT_NAMES = ['Naresh Shetty', 'Murali', 'Chandana'];
const STATUS_OPTIONS = ['new', 'in_progress', 'matched', 'contacted', 'closed'];

const STATUS_COLORS: Record<string, string> = {
  'new': 'bg-blue-50 text-blue-700 border-blue-200',
  'in_progress': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'matched': 'bg-green-50 text-green-700 border-green-200',
  'contacted': 'bg-purple-50 text-purple-700 border-purple-200',
  'closed': 'bg-gray-50 text-gray-700 border-gray-200',
};

interface TableRowContentProps {
  lead: LeadResponse;
  selectedLeads: Set<string>;
  onSelectLead: (leadId: string) => void;
}

function TableRowContent({ lead, selectedLeads, onSelectLead }: TableRowContentProps) {
  const [assignedAgent, setAssignedAgent] = useState<string>('');
  const [status, setStatus] = useState<string>('new');
  const prop = lead.extracted_criteria.property;
  const reqType = prop.req_type === 'demand_buy' ? 'Buy' :
    prop.req_type === 'demand_rent' ? 'Rent' : 'Supply';

  // Combine requirement info: ₹5Cr 3000sqft 3BHK
  const requirementText = `₹${prop.budget_max || '?'}Cr ${prop.area_sqft_max ? prop.area_sqft_max + 'sqft' : 'Flexible'} ${prop.bhk}-BHK`;

  return (
    <TableRow>
      <TableCell className="w-12">
        <Checkbox
          checked={selectedLeads.has(lead.id)}
          onCheckedChange={() => onSelectLead(lead.id)}
        />
      </TableCell>
      <TableCell className="text-sm">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            {formatRelativeDate(lead.created_at)}
          </p>
          <Link href={`/leads/${lead.id}`}>
            <p className="font-medium text-primary hover:underline cursor-pointer">
              {requirementText}
            </p>
          </Link>
        </div>
      </TableCell>
      <TableCell className="text-sm">
        <Badge variant="outline" className="text-xs w-fit">
          {reqType}
        </Badge>
      </TableCell>
      <TableCell className="text-sm">
        <p className="text-primary font-medium">
          📍 {prop.location}
        </p>
      </TableCell>
      <TableCell className="text-sm font-medium">
        {lead.matched_properties.length} matches
      </TableCell>
      <TableCell className="text-sm">
        <Select value={assignedAgent} onValueChange={setAssignedAgent}>
          <SelectTrigger className="w-40 h-8">
            <SelectValue placeholder="Assign..." />
          </SelectTrigger>
          <SelectContent>
            {AGENT_NAMES.map((agent, idx) => (
              <SelectItem key={`agent-${idx}`} value={agent}>
                {agent}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="text-sm">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-36 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option, idx) => (
              <SelectItem key={`status-${idx}`} value={option}>
                <span className="capitalize">{option.replace('_', ' ')}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
