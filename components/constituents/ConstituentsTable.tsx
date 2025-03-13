import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Constituents } from "@prisma/client";

interface ConstituentsTableProps {
  constituents: Constituents[];
  isLoading: boolean;
  onAddFirstConstituent: () => void;
}

export function ConstituentsTable({
  constituents,
  isLoading,
  onAddFirstConstituent,
}: ConstituentsTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <p>Loading constituents...</p>
      </div>
    );
  }

  if (constituents.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500 mb-4">You don't have any constituents yet.</p>
        <Button onClick={onAddFirstConstituent}>
          Add Your First Constituent
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Party</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {constituents.map((constituent) => (
            <TableRow key={constituent.id}>
              <TableCell className="font-medium">
                {constituent.name}
              </TableCell>
              <TableCell>{constituent.email}</TableCell>
              <TableCell>{constituent.phone}</TableCell>
              <TableCell>
                {[constituent.city, constituent.state]
                  .filter(Boolean)
                  .join(", ")}
              </TableCell>
              <TableCell>
                {constituent.partyAffiliation
                  ? constituent.partyAffiliation.charAt(0) +
                    constituent.partyAffiliation
                      .slice(1)
                      .toLowerCase()
                      .replace("_", " ")
                  : "-"}
              </TableCell>
              <TableCell>
                {constituent.isActive ? (
                  <span className="text-green-600">Active</span>
                ) : (
                  <span className="text-red-600">Inactive</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 