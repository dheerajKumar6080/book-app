export interface Task {
    id: string;    
    title: string;             // Title of the task
    assignedTo: { email: string };  // Assigned person (email)
    status: "Open" | "In-Progress" | "Under-review" | "Done";  // Status of the task
    priority: "Low" | "Medium" | "High";  // Priority level of the task
    startDate: string;        // Start date in DDMMMYYYY format (e.g. 01Jan2024)
    endDate: string;          // End date in DDMMMYYYY format, empty if task is not done
  }