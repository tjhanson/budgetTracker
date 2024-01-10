import React, {useState,useEffect} from 'react';
import { useSelector,useDispatch  } from 'react-redux'
import { Container,Row,Col,Stack, Navbar} from 'react-bootstrap';
import { CellChange,ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { Chart } from "react-google-charts";


import { getHeaderRow, getRows } from './getRows.ts';
import { getColumns } from './getColumns.ts';
import boardService from '../../services/board.service.js';
import './nwStyle.css';
import { months } from '../helper.js';
import { updateBoardData } from '../../slices/boardSlice.js';



function NetWorth({}) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('');
    const [netWorthData,setNetWorthData] = useState({})
    const userData = useSelector((state) => state.userData)
    
    useEffect(() => {
        setTitle(userData.Overview)
        boardService.getBoardsByYear(userData.Overview).then(
            (response) => {
                let d = {}
                response.forEach(board => {
                    
                    d[board.name.split('_')[0]] = board
                });
                setNetWorthData(d)
                //setBoardData(response)
            })
    },[])

    const calcChartData = () => {
        let temp =  [["month","$"],...months.map(m => (
            [m,
            netWorthData[m]?.netWorthData !== undefined? Object.keys(netWorthData[m].netWorthData).reduce((partialSum, a) => partialSum + (isNaN(netWorthData[m].netWorthData[a]) ? 0 : netWorthData[m].netWorthData[a]), 0) : 0]
        ))]
        return temp.filter(t => t[1] !== 0)
    }

    const handleChanges = (changes) => {
        console.log(netWorthData)
        changes.forEach((change) => {
            console.log(change)
            let m = months[change.columnId-1]
            let updateData = {netWorthData:{...netWorthData[m]?.netWorthData,[change.rowId]:change.newCell.value}}
            setNetWorthData(prev =>({...prev,[m]:{...netWorthData[m],...updateData}}))
            dispatch(updateBoardData(netWorthData[m]._id,updateData))
        });
      };


    const rows = getRows(netWorthData);
    const columns = getColumns();
    

    return(
        <Container fluid className='flex-fill flex-column d-flex min-vh-100'>
                <Row className='flex-shrink-0'>
                    <h1 className='text-center'>{title} Net Worth</h1>
                </Row>
                <div className='flex-grow-1 flex-column d-flex'>
                    <Row className='flex-fill m-0 mb-2 border border-dark'>
                    <div  className="liquidity-planner-app">
                    <ReactGrid
                        rows={rows}
                        columns={columns}
                        onCellsChanged={handleChanges}
                        />
                    </div>
                    <Chart 
                        chartType="Line"
                        width="100%"
                        height="100%"
                        data={calcChartData()}
                        options={{legend:'none'}}
                    />
                    </Row>
                </div>
                </Container>
    )
}

export default NetWorth;