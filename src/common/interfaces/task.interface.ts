import { Action } from "./action.interface";

export interface Task {
    id: string;
    name: string;
    description?: string;
    department?: string;
    url?: string;
    actions?: Action[];
    createdBy: string;
    createdAt: Date;
    updatedBy?: string;
    updatedAt: Date;
    isActive: boolean;
    completionCount: number;
    completed?: { userId: string; date: Date }[];
}
