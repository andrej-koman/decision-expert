export interface Tree {
    label: string;
    children?: Tree[];
    expanded?: boolean;
}