import React, {useState,useEffect} from 'react';
import { useSelector,useDispatch  } from 'react-redux'
import { Button, Row,Col, Container, Table } from 'react-bootstrap';
import { Chart } from "react-google-charts";

import boardService from '../services/board.service';
import { formatMoneyUS } from './formatMoney';



function Overview({}) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [boardData, setBoardData] = useState([]);
    const [listData, setListData] = useState([]);
    const [cardData, setCardData] = useState([]);
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [monthDataIncome, setMonthDataIncome] = useState({});
    const [monthDataExpense, setMonthDataExpense] = useState({});
    const userData = useSelector((state) => state.userData)

    var titleArray = ['Non-Discretionary','Food','Hobbies','Other']
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December']


    useEffect(() => {
        
        setTitle(userData.Overview)
        boardService.getBoardsByYear(userData.Overview).then(
            (response) => {
                setBoardData(response)
            })
        //getAllData()

    },[userData.Overview])

    useEffect(() => {
        if (boardData.length > 0) {
            calcCategoryData()
        }
    },[boardData])

    useEffect(() => {
        if (listData.length > 0 && cardData.length > 0) {
            console.log('yeet')
            setAllData()
        }
    },[listData,cardData])



    const  calcCategoryData = () => {
        var data = []
        const promises = [];
            boardData.forEach(element => {
            var month = element.name.split('_')[0]
            const promise = boardService.getListsById(element._id).then(
                (response) => {
                    if (response.length > 0){
                        response.forEach(r =>{
                            data.push({ ...r,'month':month})        
                        })
                    }
                })
                promises.push(promise)
            });

        Promise.all(promises)
        .then(()=>{
            setListData(data)
            getCardData(data)
        })
    }

    const getCardData =  (lists) => {
        var data = []
        const promises = [];
            lists.forEach(element => {
            const promise = boardService.getCardsById(element._id).then(
                (response) => {
                    if (response.length > 0){
                        response.forEach(r =>{
                            data.push({ ...r,'listId':element._id})        
                        })              
                    }
                })
                promises.push(promise)
            });

        Promise.all(promises)
        .then(()=>{
            setCardData(data)
            
        })
    }

    const setAllData = () => {
        var income = {}
        var monthIncome = {}
        var monthExpenses = {}
        var expenses = []
        months.forEach(m => {
            var monthLists = listData.filter(li => li.month === m)
            
            var tempIncome = calcIncome(monthLists.filter(li => li.name === "Income")[0])
            income[m] = tempIncome
            monthIncome[m] = tempIncome.amount;
            var temp = calcExpenses(monthLists.filter(li => li.name !== "Income"))
            monthExpenses[m] = temp.map(e => e.amount).reduce((partialSum, a) => partialSum + a, 0)
            temp.forEach(e => expenses.push(e))
        })
        setMonthDataIncome(monthIncome)
        setMonthDataExpense(monthExpenses)
        setIncomeData(reduceByName(Object.values(income)))
        setExpenseData(reduceByName(Object.values(expenses)))

    }

    const calcIncome = (list) => {
        let sum = addCards(cardData.filter(c => c.listId === list._id))
        list.amount = sum
        return list
        //setIncomeData(reduceByName([...incomeData,list]))
        //setMonthDataIncome({...monthDataIncome, [list.month]:sum})

    }
    const calcExpenses = (lists) => {
        var res = []
        lists.forEach(li => {
            let sum = addCards(cardData.filter(c => c.listId === li._id))
            li.amount = sum
            res.push(li)
        });
        return res


            //setExpenseData(reduceByName([...expenseData,...Object.values(data)]))
            //setMonthDataExpense({...monthDataExpense, [month]:sum})

        
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
              acc.push({name:d.name, colNum:d.colNum, amount: d.amount,month:d.month}) // not found, so need to add data property
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
        return formatMoneyUS(a)    
        else return '$0'
    }

    const calcExpenseCatTotal = (idx,shouldFormat) => {
        let sum = 0
        expenseData.filter(item => item.colNum === idx).forEach(item =>{sum+=item.amount})
        if (shouldFormat) return formatMoney(sum)
        return sum
        
    }

    const calcOverUnder = month => {
        let val = monthDataIncome[month] - monthDataExpense[month]
        return(<td className={`${val > 0 ? 'bg-profit': val < 0 ?'bg-loss': null}`}> {formatMoney(val)}</td>)
    }

    const calcTotalMonths = () => {
        let val = Object.values(monthDataIncome).reduce((partialSum, a) => partialSum + a, 0)-Object.values(monthDataExpense).reduce((partialSum, a) => partialSum + a, 0)
        return(<td className={`${val > 0 ? 'bg-profit': val < 0 ?'bg-loss': null}`}> {formatMoney(val)}</td>)
    }

    const pieChartOptions = {
        //title: "Expenses",
        is3D: true,
        legend: "none",
        pieSliceText: "label",

      };

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
                                        <th className='bg-light'>{calcExpenseCatTotal(idx,true)}</th>
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
                                    <tr>
                                    <td>Total</td>
                                        <td>{formatMoney(Object.values(monthDataIncome).reduce((partialSum, a) => partialSum + a, 0))}</td>
                                        <td>{formatMoney(Object.values(monthDataExpense).reduce((partialSum, a) => partialSum + a, 0))}</td>
                                        {calcTotalMonths()}
                                    </tr>
                                </tbody>
                            </Table>
                            
                        </Col>    
                        <Col md={5}>
                            <Chart
                                chartType="PieChart"
                                data={[["Category","Amount"],["Savings",Object.keys(monthDataIncome).map(m =>(
                                    monthDataIncome[m]-monthDataExpense[m]
                                )).reduce((partialSum, a) => partialSum + a, 0)],
                                ...titleArray.map((d,idx) => (
                                    [d,calcExpenseCatTotal(idx,false)]
                                ))]}
                                options={pieChartOptions}
                                width={"100%"}
                                height={"100%"}
                            />
                            </Col>     
                    </Row>
                </div>
                </Container>
    )
}

export default Overview;