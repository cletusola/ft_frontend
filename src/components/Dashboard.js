import React,{useState, useEffect, useContext}  from "react";
import { Link } from "react-router-dom";
import axois from 'axios';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";
import AuthContext from "../context/AuthContext";




const Dashboard = () => {

    const { authTokens } = useContext(AuthContext)


    let {user, logoutUser} = useContext(AuthContext)

    // use state const for all data to be displayed 
    const [profile, setProfile] = useState([]);
    const [trade, setTrade] = useState([])
    const [time, setTime] = useState([])

    // func to fetch profile details from backend 
    const getProfile = async() => {

        const response = await axios ({
            url:`${process.env.REACT_APP_BACKEND_URL}/api/trade/dashboard/`,
            method: 'GET',
            headers: {
                'Content-Type':'Application/Json',
                'Authorization': 'Bearer '+ String(authTokens.access)
            }

        });
        setProfile(response.data['profile'])
        setTrade(response.data['profit_or_loss'])
        setTime(response.data['trade_time'])
    }

    // get profile data with use effect from profile function 
    useEffect(() => {
        getProfile();
    }, []);

    const [users, setUsers] = useState([])

    // func to fetch profile details from backend 
    const getUsers = async() => {

        const response = await axios ({
            url:`${process.env.REACT_APP_BACKEND_URL}/api/trade/admin/users/`,
            method: 'GET',
            headers: {
                'Content-Type':'Application/Json',
                'Authorization': 'Bearer '+ String(authTokens.access)
            }

        });
        setUsers(response.data)
        console.log(response.data)
    }

    // get profile data with use effect from profile function 
    useEffect(() => {
        getUsers();
    }, []);

    const data = {

        labels : time.map((t) => t ),

        datasets : [
            {
                label:"My Trade Data",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: trade.map((d) => d),
            },
        ],
    }

    return (
        <React.Fragment>
            <div className="top-div">
            <h2 className="dashboard-h2">Dashboard</h2>

            <p className="dashboard-logout" onClick={logoutUser}>logout</p> 
            </div>
            <div className="dashboard-info">
            { profile && profile.length > 0 ? profile.map((p) => (
                <div>
                    <p><b>Name</b>: {p.firstname}, {p.lastname}</p>
                    <p><b>Username</b>: {p.username}</p>
                    <p><b>Email</b>: {p.email}</p>

                    {p.username == "admin" ? 
                    <div className="user-div">
                        <p>select user to view trade data</p>
                        <h4>Active Users:</h4>
                        { users && users.length > 0 ? users.map((user) => (
                            <p><Link className="user-link" to={`/dashboard/${user.username}`}>{user.username}</Link></p>
                        )): <h1></h1>}

                    </div>
                    :<h1></h1>}
                    
                </div>
                )):<h3>No Chart to display</h3>}
            </div>
            <div className="chart-info">
            { profile && profile.length > 0 ? profile.map((p) => (
                <div>
                    {p.username == "admin" ? 
                    <div></div>
                    :<Line data={data} />}
                    
                </div>
                )):<h3>No Chart to display</h3>}
            </div>


        </React.Fragment>
    )
     
}

export default Dashboard;

