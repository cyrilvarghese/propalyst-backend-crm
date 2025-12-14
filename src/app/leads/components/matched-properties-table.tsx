'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MatchedProperty } from '@/types/lead';
import { ArrowUpCircleIcon, Icon, RefreshCcw, Search } from 'lucide-react';
import { formatRelativeDate } from '@/utils/date';

interface MatchedPropertiesTableProps {
  properties: MatchedProperty[];
}

export function MatchedPropertiesTable({ properties }: MatchedPropertiesTableProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedProperties, setSelectedProperties] = useState<Set<string>>(new Set());
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

  // Categorize properties by source
  const brokerInBlue = properties.filter((p) => p.source?.toLowerCase().includes('broker-in-blue'));
  const rbListings = properties.filter((p) => p.source?.toLowerCase().includes('rb-listings'));
  const others = properties.filter(
    (p) => !p.source ||
      (!p.source.toLowerCase().includes('broker-in-blue') &&
        !p.source.toLowerCase().includes('rb-listings'))
  );

  const tabs = [
    { id: 'all', label: 'All', count: properties.length },
    { id: 'broker-in-blue', label: 'Broker in Blue', count: brokerInBlue.length },
    { id: 'rb-listings', label: 'Real Broker', count: rbListings.length },
    { id: 'others', label: 'Others', count: others.length },
  ];

  const getFilteredProperties = () => {
    switch (selectedTab) {
      case 'broker-in-blue':
        return brokerInBlue;
      case 'rb-listings':
        return rbListings;
      case 'others':
        return others;
      default:
        return properties;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredProperties = getFilteredProperties();

  const handleSelectProperty = (propertyId: string) => {
    setSelectedProperties((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(propertyId)) {
        newSet.delete(propertyId);
      } else {
        newSet.add(propertyId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allPropertyIds = new Set(filteredProperties.map((p) => p.id));
      setSelectedProperties(allPropertyIds);
    } else {
      setSelectedProperties(new Set());
    }
  };

  const allPropertiesSelected = filteredProperties.length > 0 && filteredProperties.every((p) => selectedProperties.has(p.id));
  const somePropertiesSelected = filteredProperties.some((p) => selectedProperties.has(p.id)) && !allPropertiesSelected;

  // Update indeterminate state on checkbox ref
  useEffect(() => {
    if (selectAllCheckboxRef.current) {
      selectAllCheckboxRef.current.indeterminate = somePropertiesSelected;
    }
  }, [somePropertiesSelected]);

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className='flex '>
            <h2 className="text-lg font-semibold">Matched Properties</h2>
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              variant="ghost"
              size="sm"

            >
              <RefreshCcw />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
          <div className="flex gap-2">
            {selectedProperties.size > 0 && (
              <Button
                variant="default"
                size="sm"
              >
                Add Matches
              </Button>
            )}

            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              variant="outline"
              size="sm"
            >
              <Search />
              Search
            </Button>

          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="flex flex-row gap-2 justify-start bg-muted p-1 h-auto flex-wrap">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="px-3 py-1.5">
                <span className="text-sm">{tab.label}</span>
                <span className="text-xs text-muted-foreground ml-1">
                  ({tab.count})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          ref={selectAllCheckboxRef}
                          checked={allPropertiesSelected}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Posted On</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Price & Area</TableHead>
                      <TableHead>Agent Name & Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="w-12">
                          <Checkbox
                            checked={selectedProperties.has(property.id)}
                            onCheckedChange={() => handleSelectProperty(property.id)}
                          />
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap">
                          <span className="text-xs text-muted-foreground">
                            {formatRelativeDate(property.message_date)}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-md">
                          <p className="text-sm line-clamp-2">{property.raw_message}</p>
                        </TableCell>
                        <TableCell className="text-sm">
                          <div className="space-y-0.5">
                            <p className="font-medium">{property.price_text}</p>
                            <p className="text-xs text-muted-foreground">{property.area_sqft} sq.ft</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          <div className="space-y-0.5">
                            {property.agent_name && (
                              <p className="font-medium">{property.agent_name}</p>
                            )}
                            {property.agent_contact && (
                              <p className="text-xs text-muted-foreground">{property.agent_contact}</p>
                            )}
                            {!property.agent_name && !property.agent_contact && (
                              <p className="text-muted-foreground">-</p>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
