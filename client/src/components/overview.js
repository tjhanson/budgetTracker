import React, {useState,useEffect} from 'react';
import { useSelector,useDispatch  } from 'react-redux'
import { Button, Row,Col, Container, Table } from 'react-bootstrap';

import boardService from '../services/board.service';



function Overview({}) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [monthDataIncome, setMonthDataIncome] = useState({});
    const [monthDataExpense, setMonthDataExpense] = useState({});
    const userData = useSelector((state) => state.userData)

    var titleArray = ['Monthly','Food','Hobbies','Other']
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December']


    useEffect(() => {
        console.log(userData)
        setTitle(userData.Overview)
        calcCategoryData()
    },[userData.Overview])

    const calcCategoryData = () => {
        
        months.forEach(month => {
            boardService.getBoardsByName(month+'_2023').then(
                (response) => {
                    boardService.getListsById(response[0]._id).then(
                        (response) => {
                            if (response.length > 0){
                                console.log(month)
                                calcIncome(response.filter(li => li.name === 'Income')[0],month)
                                calcExpenses(response.filter(li => li.name !== 'Income'),month)
                            }
                            
                            
                                
                            ;
                        })
                })
        });
    }

    const calcIncome = (list,month) => {
        boardService.getCardsById(list._id).then(
            (response) => {
                var result = reduceByName(response)
                var sum = 0
                console.log(month)
                result.forEach(i => {
                    sum+=i.amount
                })
                console.log(sum)
                setIncomeData(reduceByName([...incomeData,...result]))
                setMonthDataIncome({...monthDataIncome, [month]:sum})
            })
    }
    const calcExpenses = (lists,month) => {
        var data = {}
        const promises = [];
        lists.forEach(li => {
            data[li._id] = {name:li.name,amount:0,colNum:li.colNum}
            const promise = boardService.getCardsById(li._id).then(
                (response) => {
                    data[li._id].amount = addCards(response)
                })
            promises.push(promise)
        });

        Promise.all(promises)
        .then(()=>{
            var sum = 0
            Object.values(data).forEach(i => {
                sum+=i.amount
            })
            setExpenseData(reduceByName([...expenseData,...Object.values(data)]))
            setMonthDataExpense({...monthDataExpense, [month]:sum})
            
        })
        
    }

    const addCards = (cards) =>{
        //console.log(cards)
        var sum = 0
        cards.forEach(c => {
            sum+= c.amount
        });
        return sum
    }

    const reduceByName = (arr) => {

        return arr.reduce((acc, d) => {
            const found = acc.find(a => a.name === d.name);
            //const value = { name: d.name, val: d.value };
            if (!found) {
              //acc.push(...value);
              acc.push({name:d.name, colNum:d.colNum, amount: d.amount}) // not found, so need to add data property
            }
            else {
              //acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] });
              found.amount = found.amount + d.amount // if found, that means data property exists, so just push new element to found.data.
            }
            return acc;
        }, []);
    }

    const formatMoney = (a) => {
        if (a)
        return '$'+a.toFixed(2).toString()    
        else return '$0'
    }

    const calcExpenseCatTotal = idx => {
        let sum = 0
        expenseData.filter(item => item.colNum === idx).forEach(item =>{sum+=item.amount})
        return formatMoney(sum)
    }

    const calcOverUnder = month => {
        let val = monthDataIncome[month] - monthDataExpense[month]
        return(<td className={`${val > 0 ? 'bg-success': val < 0 ?'bg-danger': null}`}> {formatMoney(val)}</td>)
    }

    return(
        <Container fluid className='flex-fill flex-column d-flex min-vh-100'>
                <Row className='flex-shrink-0'>
                    <h1 className='text-center'>{title} Overview</h1>
                </Row>
                <div className='flex-grow-1 flex-column d-flex'>
                    <Row className='flex-fill m-0 mb-2 border border-dark'>
                        <Col md={4}>
                            <Table size='sm'  bordered  className='mt-2'>
                                    <thead className='border-dark'>
                                    <tr> 
                                        <th colSpan={2} className='text-center'>Income</th>
                                    </tr> 
                                    </thead>
                                    <tbody>
                                        {incomeData.sort((a, b) => (a.colNum > b.colNum) ? 1 : -1).map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{item.name}</td>
                                                <td className='w-25'>{formatMoney(item.amount)}</td>
                                            </tr>
                                        ))}
                                        
                                    </tbody>
                            </Table>    
                            <Table size='sm'  bordered  className=''>
                                <thead className='border-dark mt-2'>
                                <tr> 
                                    <th colSpan={2} className='text-center'>Expenses</th>
                                </tr>

                                </thead>
                                <tbody>
                                {titleArray.map((name,idx) => (
                                    <>
                                    <tr key={idx}>
                                        <th className='bg-light'>{name}</th>
                                        <th className='bg-light'>{calcExpenseCatTotal(idx)}</th>
                                    </tr>
                                    {expenseData.filter(item => item.colNum === idx).map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{item.name}</td>
                                            <td className='w-25'>{formatMoney(item.amount)}</td>
                                        </tr>
                                    ))}
                                    </>
                                ))}
                                </tbody>
                            </Table>
                        </Col>
                        <Col md={3}>
                            <Table size='sm'  bordered  className='mt-2'>
                                <thead className='border-dark mt-2'>
                                    <tr> 
                                        <th>Month</th>
                                        <th>Income</th>
                                        <th>Expense</th>
                                        <th>OverUnder</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {months.map((m,idx) => (
                                    <tr key={idx}>
                                        <td>{m}</td>
                                        <td>{formatMoney(monthDataIncome[m])}</td>
                                        <td>{formatMoney(monthDataExpense[m])}</td>
                                        {calcOverUnder(m)}
                                    </tr>
                                    ))}
                                </tbody>
                            </Table>
                            
                        </Col>         
                    </Row>
                </div>
                </Container>
    )
}

export default Overview;