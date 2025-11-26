export interface Group {
  id: number;
  name: string;
  type: string;
  totalTransactions: number;
  approvedTransactions: number;
  pendingTransactions: number;
  netAmount: number;
  memberCount: number;
  lastActivity: string;
}

export interface GroupCreate {
  name: string;
  type: string;
}

const API_URL = "http://localhost:8000/api";

// Helper function to get auth headers with Clerk token
async function getAuthHeaders(token: string | null): Promise<HeadersInit> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// Helper function to handle API errors
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    if (response.status === 401) {
      // Unauthorized - token expired or invalid
      window.location.href = "/sign-in";
      throw new Error("Authentication required. Please sign in again.");
    }

    if (response.status === 403) {
      throw new Error("You don't have permission to access this resource.");
    }

    // Try to get error message from response
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.error || "Request failed");
    } catch {
      throw new Error(`Request failed with status ${response.status}`);
    }
  }

  return response.json();
}

export async function fetchGroups(token: string | null): Promise<Group[]> {
  const response = await fetch(`${API_URL}/groups`, {
    headers: await getAuthHeaders(token),
  });
  return handleResponse<Group[]>(response);
}

export async function createGroup(
  groupData: GroupCreate,
  token: string | null
): Promise<Group> {
  const response = await fetch(`${API_URL}/groups`, {
    method: "POST",
    headers: await getAuthHeaders(token),
    body: JSON.stringify(groupData),
  });
  return handleResponse<Group>(response);
}

export async function fetchGroup(
  id: number,
  token: string | null
): Promise<Group> {
  const response = await fetch(`${API_URL}/groups/${id}`, {
    headers: await getAuthHeaders(token),
  });
  return handleResponse<Group>(response);
}

export async function fetchGroupAnalysis(
  id: number,
  token: string | null
): Promise<any> {
  const response = await fetch(`${API_URL}/groups/${id}/analysis`, {
    headers: await getAuthHeaders(token),
  });
  return handleResponse<any>(response);
}
