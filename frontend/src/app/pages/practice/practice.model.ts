export interface GenerateTurnRequest {
    scenarioId: number;
    messages: Message[];
}

export interface Message {
    role: "user" | "model";
    content: string;
    audioUrl?: string;
}

export interface GenerateTurnResponse {
    responseText: string;
    audioUrl: string;
    endScenario: boolean;
}