import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useToast } from '@/components/ui/use-toast';
import { GET_CONSTITUENTS, CREATE_CONSTITUENT } from '@/graphql/queries/constituents';

// Initial form state for a new constituent
const initialFormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  county: "",
  partyAffiliation: "",
  isActive: true,
  isVoter: true,
};

export function useConstituents() {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialFormState);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Query constituents data
  const {
    data,
    loading: queryLoading,
    error: queryError,
    refetch,
  } = useQuery(GET_CONSTITUENTS, {
    fetchPolicy: "network-only",
    context: {
      headers: {
        authorization:
          typeof window !== "undefined"
            ? `Bearer ${localStorage.getItem("token")}`
            : "",
      },
    },
  });

  // Mutation for creating a new constituent
  const [createConstituent, { loading: mutationLoading }] = useMutation(
    CREATE_CONSTITUENT,
    {
      onCompleted: () => {
        toast({
          title: "Success",
          description: "Constituent added successfully",
        });
        setDialogOpen(false);
        refetch();
        resetForm();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
      context: {
        headers: {
          authorization:
            typeof window !== "undefined"
              ? `Bearer ${localStorage.getItem("token")}`
              : "",
        },
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooleanChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value === "true" }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createConstituent({
        variables: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address || undefined,
          city: formData.city || undefined,
          state: formData.state || undefined,
          zip: formData.zip || undefined,
          county: formData.county || undefined,
          partyAffiliation: formData.partyAffiliation || undefined,
          isActive: formData.isActive,
          isVoter: formData.isVoter,
        },
      });
    } catch (err) {
      // Error handled in onError callback
    }
  };

  // Get the constituents from data or return empty array
  const constituents = data?.me?.constituents || [];

  return {
    constituents,
    formData,
    dialogOpen,
    setDialogOpen,
    queryLoading,
    queryError,
    mutationLoading,
    handleChange,
    handleSelectChange,
    handleBooleanChange,
    handleSubmit,
    resetForm,
  };
} 