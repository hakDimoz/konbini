export interface Scenario {
    id: number;
    title: string;
    description: string;
    level: "easy" | "medium" | "hard";
    imageSrc: string;
    systemPrompt: string;
}
