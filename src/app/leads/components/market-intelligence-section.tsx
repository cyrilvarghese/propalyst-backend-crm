'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { MarketIntelligenceChart } from './market-intelligence-chart';
import { LeadResponse, NearbyLocality } from '@/types/lead';
import DistributionService from '@/services/distribution.service';
import { Button } from '@/components/ui/button';
interface MarketIntelligenceSectionProps {
  lead: LeadResponse;
}

// Format property type names for display (e.g., "independent_house" -> "Independent")
const formatPropertyType = (type: string): string => {
  if (!type) {
    return ""
  }
  const typeMap: { [key: string]: string } = {
    'independent_house': 'Independent',
    'Independent House': 'Independent',
    'apartment': 'Apartment',
    'villa': 'Villa',
    'other': 'Other',
  };
  return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
};

export function MarketIntelligenceSection({ lead }: MarketIntelligenceSectionProps) {
  const [distributions, setDistributions] = useState<{ [key: string]: any }>({});
  const [distributionCounts, setDistributionCounts] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [selectedLocality, setSelectedLocality] = useState<string>(lead.extracted_criteria.property.location);

  // Initialize counts for all localities on mount
  useEffect(() => {
    const fetchAllCounts = async () => {
      const allLocalities = [
        lead.extracted_criteria.property.location,
        ...lead.nearby_localities.map((l) => l.name),
      ];

      const counts: { [key: string]: number } = {};

      for (const locality of allLocalities) {
        try {
          const response = await DistributionService.getAllDistributions(locality);
          counts[locality] = response?.count || 0;
        } catch (error) {
          console.error(`Error fetching count for ${locality}:`, error);
          counts[locality] = 0;
        }
      }

      setDistributionCounts(counts);
    };

    fetchAllCounts();
  }, [lead]);

  // Fetch distributions for selected locality
  useEffect(() => {
    const fetchDistributions = async () => {
      try {
        setLoading(true);
        const response = await DistributionService.getAllDistributions(selectedLocality);

        if (response) {
          setDistributions(response.distributions);
        } else {
          console.error('Failed to fetch distributions');
        }
      } catch (error) {
        console.error('Error fetching distributions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributions();
  }, [selectedLocality]);

  // Get all localities (current + nearby)
  const getAllLocalities = (): NearbyLocality[] => {
    const localities = [{ name: lead.extracted_criteria.property.location, distance_km: 0 }];
    localities.push(...lead.nearby_localities);
    return localities;
  };

  // Filter properties by locality
  const getPropertiesByLocality = (locality: string) => {
    return lead.matched_properties.filter((prop) =>
      prop.location.toLowerCase().includes(locality.toLowerCase())
    );
  };

  // Helper function to add highlighted flag based on lead criteria
  const addHighlighting = (data: any[], criteria?: any, matcher?: (item: any, criteria: any) => boolean) => {
    // If criteria is explicitly undefined/not provided, highlight all
    // If criteria is provided (even if null/0), use the matcher
    const hasCriteria = criteria !== undefined;

    return data.map((item) => ({
      ...item,
      highlighted: hasCriteria && matcher ? matcher(item, criteria) : true,
    }));
  };

  // Get price distribution from API data with highlighting
  const getPriceDistribution = (leadBudgetMax?: number) => {
    const distributionData = distributions.All;

    if (!distributionData || !distributionData.price) {
      return [];
    }

    const priceMatcher = (item: any, budget: number | null) => {
      if (budget === null || budget === undefined) return false;

      // Determine which bracket the budget falls into
      let expectedBracket = '';
      if (budget < 5) {
        expectedBracket = '2-5Cr';
      } else if (budget < 8) {
        expectedBracket = '5-8Cr';
      } else if (budget < 10) {
        expectedBracket = '8-10Cr';
      } else if (budget < 12) {
        expectedBracket = '10-12Cr';
      } else if (budget < 15) {
        expectedBracket = '12-15Cr';
      } else {
        expectedBracket = '15Cr+';
      }

      return item.name === expectedBracket;
    };

    return addHighlighting([...distributionData.price], leadBudgetMax, priceMatcher);
  };

  // Get area distribution from API data with highlighting
  const getAreaDistribution = (leadAreaMax?: number) => {
    const distributionData = distributions.All;

    if (!distributionData || !distributionData.area) {
      return [];
    }

    const areaMatcher = (item: any, area: number) => {
      const areaMap: { [key: string]: boolean } = {
        '0-500': area < 500,
        '500-1000': area >= 500 && area < 1000,
        '1000-1500': area >= 1000 && area < 1500,
        '1500-2000': area >= 1500 && area < 2000,
        '2000-3000': area >= 2000 && area < 3000,
        '3000-4000': area >= 3000 && area < 4000,
        '4000-5000': area >= 4000 && area < 5000,
        '5000+': area >= 5000,
      };
      return areaMap[item.name] ?? false;
    };

    return addHighlighting([...distributionData.area], leadAreaMax, areaMatcher);
  };

  // Get property type distribution from API data with highlighting
  const getPropertyTypeDistribution = (leadPropertyType?: string) => {
    const distributionData = distributions.All;

    if (!distributionData || !distributionData.propertyType) {
      return [];
    }

    const typeMatcher = (item: any, type: string) => {
      return item.name === formatPropertyType(type);
    };

    return addHighlighting([...distributionData.propertyType], leadPropertyType, typeMatcher);
  };

  // Get bedroom distribution from API data with highlighting
  const getBedroomDistribution = (leadBhk?: number) => {
    const distributionData = distributions.All;

    if (!distributionData || !distributionData.bedroom) {
      return [];
    }

    const bhkMatcher = (item: any, bhk: number) => {
      return parseInt(item.name) === bhk;
    };

    return addHighlighting([...distributionData.bedroom], leadBhk, bhkMatcher);
  };

  const allLocalities = getAllLocalities();
  const currentLocality = lead.extracted_criteria.property.location;

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Market Intelligence</h2>
          <Button

            variant="outline"
            size="sm"
          >
            Search
          </Button>
        </div>



        <Tabs defaultValue={currentLocality} onValueChange={(value) => setSelectedLocality(value)}>
          <TabsList className="flex flex-row gap-2 justify-start mb-6 bg-muted p-1 h-auto flex-wrap">
            <TabsTrigger value={currentLocality} className="px-3 py-1.5">
              <span className="text-sm">{currentLocality}</span>
              <span className="text-xs text-muted-foreground ml-1">
                ({distributionCounts[currentLocality] || 0})
              </span>
            </TabsTrigger>
            {lead.nearby_localities.map((locality) => (
              <TabsTrigger key={locality.name} value={locality.name} className="px-3 py-1.5">
                <span className="text-sm">{locality.name}</span>
                <span className="text-xs text-muted-foreground ml-1">
                  ({distributionCounts[locality.name] > 0 ? distributionCounts[locality.name] : 0})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Render content for each locality */}
          {allLocalities.map((locality) => (
            <TabsContent key={locality.name} value={locality.name} className="space-y-6">
              {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="h-6 w-40" />
                      <Skeleton className="h-64 w-full" />
                    </div>
                  ))}
                </div>
              ) : !distributions.All || Object.keys(distributions).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="text-center space-y-3">
                    <h3 className="text-lg font-semibold text-muted-foreground">No Data Available</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Distribution data is not available for {locality.name} yet. Check back soon or try another locality.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <MarketIntelligenceChart
                    title="Price Distribution"
                    data={getPriceDistribution(lead.extracted_criteria.property.budget_max)}
                    color="#3b82f6"
                  />
                  <MarketIntelligenceChart
                    title="Area Distribution (sq.ft)"
                    data={getAreaDistribution(lead.extracted_criteria.property.area_sqft_max)}
                    color="#10b981"
                  />
                  <MarketIntelligenceChart
                    title="Property Type"
                    data={getPropertyTypeDistribution(lead.extracted_criteria.property.property_type)}
                    color="#f59e0b"
                  />
                  <MarketIntelligenceChart
                    title="Bedroom Distribution"
                    data={getBedroomDistribution(lead.extracted_criteria.property.bhk)}
                    color="#ec4899"
                  />
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
