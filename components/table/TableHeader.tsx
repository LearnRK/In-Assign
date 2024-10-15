// components/table/TableHeader.tsx
import React from 'react';
import { TableRow, TableCell, Checkbox } from '@mui/material';

interface TableHeaderProps {
  selectAll: boolean;
  onSelectAll: () => void;
  handleColumnClick: (column: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ selectAll, onSelectAll, handleColumnClick }) => {
  return (
    <TableRow sx={{ backgroundColor: "#F1F3F4" }}>
      <TableCell padding="checkbox" sx={{ minWidth: 40 }}>
        <Checkbox
          color="primary"
          checked={selectAll}
          onChange={onSelectAll}
        />
      </TableCell>
      <TableCell onClick={() => handleColumnClick('tripId')} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Trip id</TableCell>
      <TableCell onClick={() => handleColumnClick('transporter')} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Transporter</TableCell>
      <TableCell onClick={() => handleColumnClick('source')} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Source</TableCell>
      <TableCell onClick={() => handleColumnClick('dest')} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Destination</TableCell>
      <TableCell onClick={() => handleColumnClick('phoneNumber')} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Phone</TableCell>
      <TableCell onClick={() => handleColumnClick('etaDays')} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>ETA</TableCell>
      <TableCell onClick={() => handleColumnClick('distanceRemaining')} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Distance remaining</TableCell>
      <TableCell onClick={() => handleColumnClick('tripStatus')} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>Trip status</TableCell>
      <TableCell onClick={() => handleColumnClick('tatStatus')} sx={{ cursor: 'pointer', fontWeight: 'bold' }}>TAT status</TableCell>
    </TableRow>
  );
};

export default TableHeader;
