import axios from "axios";

const CRM_API_URL = "https://vcrm-backend.vasifytech.com/api/website-leads";
const CRM_API_KEY = "jxVHKz901wHPfYp6I3PGm61WcV9hjc";

export const sendLeadToCRM = async ({
  name,
  phone,
  email,
  source,
  tags,
}: {
  name: string;
  phone: string;
  email?: string;
  source: string;
  tags: string[];
}) => {
  try {
    const payload = {
      name,
      phone,
      email: email || "",
      source,
      status: "New",
      follow_up_date: null,
      tags,
    };

    const response = await axios.post(CRM_API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CRM_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("CRM lead push failed:", error);
    return null; // don't break frontend flow
  }
};