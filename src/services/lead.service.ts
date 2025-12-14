import { LeadResponse, CreateLeadRequest } from "@/types/lead";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export class LeadService {
  /**
   * Create a new lead by sending a requirement text to the backend
   * @param request - The lead creation request with requirement text
   * @returns Promise containing the lead response with matched properties
   * @throws Error if the API request fails
   */
  static async createLead(request: CreateLeadRequest): Promise<LeadResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leads/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `Failed to create lead: ${response.statusText}`
        );
      }

      const data: LeadResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating lead:", error);
      throw error;
    }
  }

  /**
   * Fetch a lead by ID
   * @param leadId - The ID of the lead to fetch
   * @returns Promise containing the lead details
   * @throws Error if the API request fails
   */
  static async getLead(leadId: string): Promise<LeadResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leads/${leadId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `Failed to fetch lead: ${response.statusText}`
        );
      }

      const data: LeadResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching lead:", error);
      throw error;
    }
  }

  /**
   * Get all leads
   * @returns Promise containing an array of leads
   * @throws Error if the API request fails
   */
  static async getAllLeads(): Promise<LeadResponse[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leads`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `Failed to fetch leads: ${response.statusText}`
        );
      }

      const data = await response.json();

      // Handle both response structures:
      // 1. Direct array: [{ lead_id, ... }, ...]
      // 2. Object with leads property: { leads: [...], total_count: N }
      let leadsArray: any[] = [];

      if (Array.isArray(data)) {
        leadsArray = data;
      } else if (data.leads && Array.isArray(data.leads)) {
        leadsArray = data.leads;
      } else {
        return [];
      }

      // Map lead_id to id for consistency
      return leadsArray.map((lead) => ({
        ...lead,
        id: lead.id || lead.lead_id,
      }));
    } catch (error) {
      console.error("Error fetching leads:", error);
      throw error;
    }
  }
}
