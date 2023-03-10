/// <reference types="react-scripts" />

interface WorkItem {
    id: number;
    title: string;
    completed: boolean;
}

interface LoadWorkItems {
    success: boolean;
    data: Array<WorkItem>;
    error: string | null;
}
interface LoadWorkItem {
    success: boolean;
    data: WorkItem | null;
    error: string | null;
}
