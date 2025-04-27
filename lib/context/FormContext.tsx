'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

export interface FormData {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  issueType: string;
  location: {
    street: string;
    area: string;
    city: string;
    landmark?: string;
    ward: string;
    pinCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  photos: string[];
  status: 'Processing' | 'Pending' | 'Progress' | 'Resolved';
  postToCommunity: boolean;
  isPreview?: boolean;
}

interface FormContextType {
  forms: FormData[];
  addForm: (form: Omit<FormData, 'id' | 'timestamp' | 'status'>) => void;
  updateFormStatus: (id: string, status: FormData['status']) => void;
  getLatestForms: (limit?: number) => FormData[];
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [forms, setForms] = useState<FormData[]>([]);

  const value = useMemo(() => ({
    forms,
    addForm: (formData: Omit<FormData, 'id' | 'timestamp' | 'status'>) => {
      const newForm: FormData = {
        ...formData,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        status: 'Pending',
        isPreview: false,
      };
      setForms(prev => [newForm, ...prev]);
    },
    updateFormStatus: (id: string, status: FormData['status']) => {
      setForms(prev => prev.map(form => 
        form.id === id ? { ...form, status } : form
      ));
    },
    getLatestForms: (limit?: number) => {
      return forms.slice(0, limit);
    }
  }), [forms]);

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}