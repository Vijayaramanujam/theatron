export interface Contact {
  name: string;
  phone: string;
}

export interface AdditionalField {
  type: 'text' | 'url' | 'file' | 'select' | 'team-size';
  id?: string;
  name?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  accept?: string;
  instruction?: string;
  options?: { label: string; value: string | number }[];
  min?: number;
  max?: number;
}

export interface RegistrationConfig {
  commonFields: boolean;
  teamBased?: boolean;
  teamSize?: {
    min: number;
    max: number;
    fixed?: number[];
  };
  additionalFields?: AdditionalField[];
}

export interface EventData {
  id: string;
  name: string;
  category: 'competition' | 'workshop';
  mode?: 'online' | 'offline';
  description: string;
  contacts: Contact[];
  registration: RegistrationConfig;
  image?: string;
  icon?: string;
  gradient?: string;
}
