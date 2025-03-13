"use client";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Import custom hooks
import { useAuth } from "@/hooks/useAuth";
import { useConstituents } from "@/hooks/useConstituents";

// Import components
import { ConstituentFormDialog } from "@/components/constituents/ConstituentFormDialog";
import { ConstituentsTable } from "@/components/constituents/ConstituentsTable";

// Import utilities
import { exportConstituentsToCSV } from "@/utils/exports";

export default function DashboardPage() {
  const { toast } = useToast();
  const { handleLogout } = useAuth();
  
  const {
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
  } = useConstituents();

  // Handle CSV export
  const handleExportCSV = () => {
    const result = exportConstituentsToCSV(constituents);
    
    if (!result.success) {
      toast({
        title: "No data to export",
        description: result.message,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Export successful",
      description: result.message,
    });
  };

  // If there's a query error
  if (queryError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>
              There was an error loading your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{queryError.message}</p>
            <Button
              onClick={handleLogout}
              className="mt-4"
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Constituent Dashboard</h1>
        <div className="flex gap-4">
          <ConstituentFormDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleBooleanChange={handleBooleanChange}
            handleSubmit={handleSubmit}
            isLoading={mutationLoading}
          />
          <Button
            variant="outline"
            onClick={handleExportCSV}
          >
            Export to CSV
          </Button>
          <Button
            variant="outline"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Constituents</CardTitle>
          <CardDescription>Manage your list of constituents</CardDescription>
        </CardHeader>
        <CardContent>
          <ConstituentsTable
            constituents={constituents}
            isLoading={queryLoading} 
            onAddFirstConstituent={() => setDialogOpen(true)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
