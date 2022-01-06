import {TableCell, TableHead, TableRow, TableSortLabel} from "@material-ui/core";
import React from "react";
import {useTranslation} from "react-i18next";

export default function EnhancedTableHead(props) {
    const {headCells, classes, order, orderBy, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const {t} = useTranslation();

    return (
            <TableHead>
                <TableRow>
                    {headCells.map(headCell => (
                            <TableCell
                                    key={headCell.id}
                                    align={headCell.numeric ? 'right' : 'left'}
                                    padding={headCell.disablePadding ? 'none' : 'default'}
                                    sortDirection={orderBy === headCell.id ? order : false}>
                                <TableSortLabel
                                        active={orderBy === headCell.id}
                                        direction={orderBy === headCell.id ? order : 'asc'}
                                        onClick={createSortHandler(headCell.id)}>
                                    {t(headCell.label)}
                                    {orderBy === headCell.id ? (
                                            <span className={classes.visuallyHidden}>
                                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                    ))}
                    <TableCell>{t('action')}</TableCell>
                </TableRow>
            </TableHead>
    );
}