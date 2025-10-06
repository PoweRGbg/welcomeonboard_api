import { Action } from "./action.interface";

export interface Task {
    id: string;
    name: string;
    description?: string;
    category: string;
    url?: string;
    actions?: Action[];
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    completionCount: number;
    lastCompletedAt?: Date;
}
