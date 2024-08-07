import { FieldType, parseChecklistData } from '@/application/database-yjs';
import { CellProps, ChecklistCell as ChecklistCellType } from '@/application/database-yjs/cell.type';
import LinearProgressWithLabel from '@/components/_shared/progress/LinearProgressWithLabel';
import { isNaN } from 'lodash-es';
import React, { useMemo } from 'react';

export function ChecklistCell({ cell, style, placeholder }: CellProps<ChecklistCellType>) {
  const data = useMemo(() => {
    return parseChecklistData(cell?.data ?? '');
  }, [cell?.data]);

  const options = data?.options;
  const selectedOptions = data?.selectedOptionIds;

  if (cell?.fieldType !== FieldType.Checklist) return null;

  if (!data || !options || !selectedOptions)
    return placeholder ? (
      <div style={style} className={'text-text-placeholder'}>
        {placeholder}
      </div>
    ) : null;

  if (isNaN(data?.percentage)) return null;
  return (
    <div style={style} className={'w-full'}>
      <LinearProgressWithLabel value={data?.percentage} count={options.length} selectedCount={selectedOptions.length} />
    </div>
  );
}
