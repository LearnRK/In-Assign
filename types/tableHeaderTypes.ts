// types/tableHeaderTypes.ts
export interface TableHeaderProps {
    selectAll: boolean;
    onSelectAll: () => void;
    handleColumnClick: (column: string) => void;
}
