export interface HandymanProps {
  first_name?: string | null;
  last_name?: string | null;
  title?: string | null;
  service?: string | null;
  phone_number?: string | null;
  year_of_experience?: string | null;
  location_attributes?: string | null;
  description?: string | null;
  handyman_skills?: string | null;
}

export interface HandymanType {
  id: number;
  first_name?: string;
  last_name?: string;
  location?: string;
  user_rating: number;
}