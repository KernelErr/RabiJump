import React from 'react';
import { ColumnProps } from './interface';
/**
 * Convert jsx children into object columns
 * @param {Node} children
 * @returns
 */
export default function getColumns(children: React.ReactNode): ColumnProps<any>[];
