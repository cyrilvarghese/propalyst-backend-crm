// Distribution Service for fetching market intelligence data from API

interface DistributionData {
  price: Array<{ name: string; count: number }>;
  area: Array<{ name: string; count: number }>;
  propertyType: Array<{ name: string; count: number }>;
  bedroom: Array<{ name: string; count: number }>;
}

interface DistributionResponse {
  success: boolean;
  count?: number;
  data: {

    distributions: {
      [key: string]: DistributionData;
    };
  };
  message: string;
}

interface AllDistributionsResponse {
  distributions: {
    [key: string]: DistributionData;
  };
  count?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

class DistributionService {
  /**
   * Fetch distribution data for a specific locality
   * Returns the "All" (aggregated) distribution data
   */
  static async getDistributionsByLocality(
    location: string
  ): Promise<DistributionData | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/distributions/localities?location=${encodeURIComponent(
          location
        )}`
      );

      if (!response.ok) {
        console.error(`Failed to fetch distributions: ${response.status}`);
        return null;
      }

      const data: DistributionResponse = await response.json();

      // Return the "All" key which contains aggregated data for the location
      return data.data.distributions.All || null;
    } catch (error) {
      console.error('Error fetching distributions:', error);
      return null;
    }
  }

  /**
   * Fetch all distributions for a locality (both "All" and specific sub-localities)
   */
  static async getAllDistributions(
    location: string
  ): Promise<AllDistributionsResponse | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/distributions/localities?location=${encodeURIComponent(
          location
        )}`
      );

      if (!response.ok) {
        console.error(`Failed to fetch distributions: ${response.status}`);
        return null;
      }

      const data: DistributionResponse = await response.json();
      return {
        distributions: data.data.distributions,
        count: data.count,
      };
    } catch (error) {
      console.error('Error fetching distributions:', error);
      return null;
    }
  }
}

export default DistributionService;
