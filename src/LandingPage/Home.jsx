import styles from "./Home.module.css"
import Card from "../Components/Card/card";
import PieChart from "../Components/PieChart/pieChart";
import TransactionList from "../Components/TransactionList/transactionList";
import BarChart from "../Components/BarChart/barChart";
import Modal from "../Components/Modal/modal";
import ExpenseForm from "../Components/Forms/ExpenseForm/expenseForm";
import AddBalanceForm from "../Components/Forms/AddBalanceForm/addBalanceForm";
import { useState, useEffect } from "react";

const Home = () => {
    const [balance, setBalance] = useState(0)
    const [expense, setExpense] = useState(0)
    
    const [ expenseList, setExpenseList ] = useState([]);

    const [isMounted, setIsMounted] = useState(false);


    const [isOpenExpense, setIsOpenExpense] = useState(false);
    const [isOpenBalance, setIsOpenBalance] = useState(false);
    

    const [ categorySpends, setCategorySpends ] = useState({
        food: 0,
        entertainment: 0,
        travel: 0
    })

    const [categoryCount, setCategoryCount] = useState({
        food: 0,
        entertainment: 0,
        travel: 0,
      });

    useEffect(() => {
        
        const localBalance = localStorage.getItem("balance");
    
        if (localBalance) {
          setBalance(Number(localBalance));
        } else {
          setBalance(5000);
          localStorage.setItem("balance", 5000);
        }
    
        const items = JSON.parse(localStorage.getItem("expenses"));
    
        setExpenseList(items || []);
        setIsMounted(true);
      }, []);

      useEffect(() => {
        if (expenseList.length > 0 || isMounted) {
          localStorage.setItem("expenses", JSON.stringify(expenseList));
        }
    
        if (expenseList.length > 0) {
          setExpense(
            expenseList.reduce(
              (accumulator, currentValue) =>
                accumulator + Number(currentValue.price),
              0
            )
          );
        } else {
          setExpense(0);
        }
    
        let foodSpends = 0,
          entertainmentSpends = 0,
          travelSpends = 0;
        let foodCount = 0,
          entertainmentCount = 0,
          travelCount = 0;
    
        expenseList.forEach((item) => {
          if (item.category === "food") {
            foodSpends += Number(item.price);
            foodCount++;
          } else if (item.category === "entertainment") {
            entertainmentSpends += Number(item.price);
            entertainmentCount++;
          } else if (item.category === "travel") {
            travelSpends += Number(item.price);
            travelCount++;
          }
        });
    
        setCategorySpends({
          food: foodSpends,
          travel: travelSpends,
          entertainment: entertainmentSpends,
        });
    
        setCategoryCount({
          food: foodCount,
          travel: travelCount,
          entertainment: entertainmentCount,
        });
      }, [expenseList]);

      useEffect(() => {
        if (isMounted) {
          localStorage.setItem("balance", balance);
        }
      }, [balance]);

    return (
        <div className={styles.container}>
            <h1>Expense Tracker</h1>

            <div className={styles.cardsWrapper}>
                <Card 
                    title="Wallet Balance"
                    money={balance}
                    buttonText="+ Add Income"
                    buttonType="success"
                    handleClick={() => {
                        setIsOpenBalance(true)
                    }}

                />

                <Card 
                    title="Expense"
                    money={expense}
                    buttonText="+ Add Expense"
                    buttonType="failure"
                    success={false}
                    handleClick={() => {
                        setIsOpenExpense(true)
                    }}

                />

                <PieChart 
                data={[
                    { name: "Food", value: categorySpends.food},   
                    { name: "Entertainment", value: categorySpends.entertainment},
                    { name: "Travel", value: categorySpends.travel}     
                ]} />
                
            </div>
            
            <div className={ styles.transactionWrapper }>
                <TransactionList
                    transactions = {expenseList}
                    editTransactions = {setExpenseList}
                    title = "Recent Transactions"
                    balance = {balance}
                    setBalance = {setBalance}
                />

                <BarChart
                    data={[
                        { name: "Food", value: categorySpends.food },
                        { name: "Entertainment", value: categorySpends.entertainment },
                        { name: "Travel", value: categorySpends.travel },
                    ]}
                />
            </div>

            <Modal isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
                <ExpenseForm
                setIsOpen={setIsOpenExpense}
                expenseList={expenseList}
                setExpenseList={setExpenseList}
                setBalance={setBalance}
                balance={balance}
                />
            </Modal>

            <Modal isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
                <AddBalanceForm setIsOpen={setIsOpenBalance} setBalance={setBalance} />
            </Modal>
        </div>
    )
}

export default Home;