import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from 'react-router-dom';
import axois from 'axios';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";
import AuthContext from "../context/AuthContext";




const AdminUserDashboard = () => {

    const { authTokens } = useContext(AuthContext)

    let {user, logoutUser} = useContext(AuthContext)
    // useParams to get blogs by username 
    const { username } = useParams();

    const [dashboard, setDashboard] = useState([]);
    const [trade, setTrade] = useState([])
    const [time, setTime] = useState([])

    const getDashboard = async() => {
        const response = await axios ({
            url:`${process.env.REACT_APP_BACKEND_URL}/api/trade/admin/user/dashboard/`,
            method: 'POST',
            data: {"username":username},
            headers: {
                'Content-Type':'Application/Json',
                'Authorization': 'Bearer '+ String(authTokens.access)
            }

        });
        setDashboard(response.data['profile'])
        setTrade(response.data['profit_or_loss'])
        setTime(response.data['trade_time'])

        console.log(response.data['profit_or_loss'])
    }
    useEffect(() => {
        getDashboard();
    }, []);

    const data = {

        labels : time.map((t) => t ),

        datasets : [
            {
                label:"Trade Data",
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
            { dashboard && dashboard.length > 0 ? dashboard.map((d) => (
                <div>
                    <p><b>Name</b>: {d.firstname}, {d.lastname}</p>
                    <p><b>Username</b>: {d.username}</p>
                    <p><b>Email</b>: {d.email}</p>
                    
                </div>
                )):<h3>No Chart to display</h3>}
            </div>
            <div>
            {/* { trade && trade.length > 0 ? trade.map((t) => (
                <Line data={data} />
                )):<h3 className="no-data">You have no personal trade data to be displayed</h3>} */}
                <Line data={data} />
            </div>
        </React.Fragment>
    )
}

export default AdminUserDashboard;