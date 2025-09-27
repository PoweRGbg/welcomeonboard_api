export interface Action {
    id: string;
    name: string;
    description?: string;
    url?: string;
    isCompleted: boolean;
    completedAt?: Date;
}
