export interface TaskProgress {
    taskId: string;
    userId: string;
    actionsTotal: number;
    actionsCompleted: number;
    isCompleted: boolean;
}
