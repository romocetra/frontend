export interface Step1Data {
  fullName: string;
  country: string;
  age: number; // Nuovo campo numerico
}

export interface Step2Data {
  bio: string;
  contactMethod: 'email' | 'phone' | 'none'; // Nuovo campo radio
  acceptTerms: boolean;
}

export interface WizardPayload {
  step1: Step1Data;
  step2: Step2Data;
}