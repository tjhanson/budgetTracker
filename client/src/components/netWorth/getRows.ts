

import { Row } from "@silevis/reactgrid";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import {
  emptyTextCell,
  nonEditable,
  textCell,
  monthHeaderCell,
  bottomLine,
  numberCell,
  showZero,
  noSideBorders
} from "./cells.ts";
import { months } from "../helper";

const ROW_HEIGHT = 32;
const HEADING_ROW_HEIGHT = 40;


const CASH_CATEGORIES = [
    'Partners Checking',
    'Partners Savings',
    'High Interest Savings',
    'I Bonds',
    'Debts Owed Me'
]

const INVESTMENT_CATEGORIES = [
    'Vanguard Index',
    'Yotta',
    'Kucoin',
    'Binance'
]

const RETIREMENT_CATEGORIES = [
    'Roth IRA',
    '401k',
    'ESOP'
]




export function getHeaderRow(): Row {
    return {
        rowId: "header",
        height: ROW_HEIGHT,
        cells: [
            nonEditable(emptyTextCell),
            nonEditable(monthHeaderCell("Jan", "justify-content-center")),
            nonEditable(monthHeaderCell("Feb", "justify-content-center")),
            nonEditable(monthHeaderCell("Mar", "justify-content-center")),
            nonEditable(monthHeaderCell("Apr", "justify-content-center")),
            nonEditable(monthHeaderCell("May", "justify-content-center")),
            nonEditable(monthHeaderCell("Jun", "justify-content-center")),
            nonEditable(monthHeaderCell("Jul", "justify-content-center")),
            nonEditable(monthHeaderCell("Aug", "justify-content-center")),
            nonEditable(monthHeaderCell("Sep", "justify-content-center")),
            nonEditable(monthHeaderCell("Oct", "justify-content-center")),
            nonEditable(monthHeaderCell("Nov", "justify-content-center")),
            nonEditable(monthHeaderCell("Dec", "justify-content-center")),
        ]
        };
    }

    function getMonthsTotalRow(
        title: string,
        data: {},

        ): Row {
        const monthsTotalCell = (value: number) =>
            bottomLine(
            nonEditable(showZero(numberCell(value, "text-md disabled font-bold text-green")))
            );
        return {
            rowId: "monthsTotal",
            height: HEADING_ROW_HEIGHT,
            cells: [
            bottomLine(nonEditable(textCell(title, "text-lg font-bold text-green"))),
            ...months.map((m, idx) =>

            monthsTotalCell(
                        data[m]?.netWorthData !== undefined? Object.keys(data[m].netWorthData).reduce((partialSum, a) => partialSum + (isNaN(data[m].netWorthData[a]) ? 0 : data[m].netWorthData[a]), 0) : 0
                        
                    )

                ),

            ]
        };
    }


    function getGroupRows(
        title: string,
        categories: string[],
        data: {}
        ): Row[] {
            
        return [
            {
            rowId: `${title}Header`,
            height: HEADING_ROW_HEIGHT,
            cells: [
                bottomLine(
                nonEditable(
                    textCell(
                    title,
                    `align-items-end text-lg font-bold text-blue`
                    )
                )
                ),
                ...months.map((_) =>
                noSideBorders(bottomLine(nonEditable(emptyTextCell)))
                ),
                
            ]
            },
            ...categories.map((cat) => ({
            rowId: cat,
            height: ROW_HEIGHT,
            cells: [
                nonEditable(textCell(cat, "padding-left-lg")),
                ...months.map((m, idx) => numberCell(data[m]?.netWorthData?.[cat])),

            ]
            })),
            {
            rowId: `${title}Summary`,
            height: ROW_HEIGHT,
            cells: [
                nonEditable(textCell("Total", "padding-left-lg font-bold")),
                ...months.map((m, idx) =>
                nonEditable(
                    showZero(
                    numberCell(
                        data[m]?.netWorthData !== undefined? Object.keys(data[m].netWorthData).filter(k => categories.includes(k)).reduce((partialSum, a) => partialSum + (isNaN(data[m].netWorthData[a]) ? 0 : data[m].netWorthData[a]), 0) : 0,
                        `font-bold disabled `
                    )
                    )
                )
                ),

            ]
            }
        ];
        }


    export function getRows(yearData: {}): Row[] {
        //console.log('netWorthData' in yearData['January'])
    return [
        getHeaderRow(),

        ...getGroupRows(
        "Cash",
        CASH_CATEGORIES,
        yearData
        ),
        ...getGroupRows(
        "Investments",
        INVESTMENT_CATEGORIES,
        yearData
        ),
        ...getGroupRows(
        "Retirement",
        RETIREMENT_CATEGORIES,
        yearData
        ),
        getMonthsTotalRow(
        "Totals",
        yearData
        ),

    ];
    }