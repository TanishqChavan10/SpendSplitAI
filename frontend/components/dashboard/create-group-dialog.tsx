"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IconLoader2 } from "@tabler/icons-react";

interface CreateGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGroup: (
    name: string,
    type: string,
    description: string
  ) => Promise<void>;
  creating: boolean;
}

export function CreateGroupDialog({
  open,
  onOpenChange,
  onCreateGroup,
  creating,
}: CreateGroupDialogProps) {
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [newGroupType, setNewGroupType] = useState("SHORT");
  const [newGroupMemberLimit, setNewGroupMemberLimit] = useState("");

  const handleSubmit = async () => {
    try {
      await onCreateGroup(newGroupName, newGroupType, newGroupDescription);
      // Reset form
      setNewGroupName("");
      setNewGroupDescription("");
      setNewGroupType("SHORT");
      setNewGroupMemberLimit("");
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Group Name</label>
            <Input
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              value={newGroupDescription}
              onChange={(e) => setNewGroupDescription(e.target.value)}
              placeholder="Enter group description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <Select value={newGroupType} onValueChange={setNewGroupType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SHORT">Short Term</SelectItem>
                  <SelectItem value="LONG">Long Term</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Member Limit
              </label>
              <Select
                value={newGroupMemberLimit}
                onValueChange={setNewGroupMemberLimit}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select member limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5 members">5 members</SelectItem>
                  <SelectItem value="10 members">10 members</SelectItem>
                  <SelectItem value="20 members">20 members</SelectItem>
                  <SelectItem value="50 members">50 members</SelectItem>
                  <SelectItem value="100 members">100 members</SelectItem>
                  <SelectItem value="No Limit">No Limit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleSubmit} className="w-full" disabled={creating}>
            {creating ? (
              <>
                <IconLoader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Group"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
