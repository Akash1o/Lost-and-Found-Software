import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardUser from '../component/DashboardUser';
import DashboardLost from '../component/DashboardLost';
import DashboardFound from '../component/DashboardFound';
import axios from 'axios';

const Dashboard = () => {
    const [selectedItem, setSelectedItem] = useState('user')
    const[lostData,setLostData]=useState([])
    const [rowCount, setRowCount] = useState({
        found: 0,
        lost: 0,
        user: 0
    })
    const navigate = useNavigate('');

    const handleDash = (status) => {
        setSelectedItem(status);
        if (status === "home") {
            navigate('/')
        }
    }
    const updateLostCount=(newCount)=>{
        setRowCount((prevCount)=>({
            ...prevCount,
            lost:newCount
        }))
    }
    const updateFoundCount=(newCount)=>{
        setRowCount((prevCount)=>({
            ...prevCount,
            found:newCount
        }))
    }
    useEffect(() => {
        axios.get(`http://localhost/backend/totalCount.php`)
            .then((res) => setRowCount({
                found: res.data.found,
                lost: res.data.lost,
                user: res.data.user
            }))
    }, [])
    const getItemClass = (item) => {
        return item === selectedItem ? ' text-white bg-blue-500 p-2 rounded-lg' : null
    }
    return (

        <div className='dashboard'>
            <div className="sidebar bg-white border border-blue-400 rounded-lg p-2  flex flex-col gap-5 h-auto seven:h-[100vh]">
                <h1 className='font-bold text-2xl px-3 pt-[10px] text-blue-500'>Dashboard</h1>
                <p className={`cursor-pointer p-2  ${getItemClass('lost')}`} onClick={() => handleDash('lost')}>Lost Items</p>
                <p className={`cursor-pointer  p-2 ${getItemClass('found')}`} onClick={() => handleDash('found')}>Found Items</p>
                <p className={`cursor-pointer  p-2  ${getItemClass('user')}`} onClick={() => handleDash('user')}>Users</p>
                <p className={`cursor-pointer  p-2 ${getItemClass('home')}`} onClick={() => handleDash('home')}>Home</p>
            </div>

            <div className="content">
            <h1 className='pt-[10px] font-bold text-3xl p-3 rounded-xl text-blue-500 '>Hello Admin,</h1>
                <div className='itemOne '>
                    <div className='flex justify-start five:justify-around bg-white  flex-col gap-4 five:flex-row mt-[10px] w-[90%] mx-auto p-4 border border-gray-300 rounded-lg'>
                        <div className='flex flex-col items-center'>
                            <h1 className='bg-blue-400 font-xl px-4 py-2 rounded-md text-white'>Lost Items</h1>
                            <p className='text-xl font-bold'>{rowCount.lost}</p>
                        </div>

                        <div className='flex flex-col items-center'>
                            <h1 className='bg-blue-400 font-xl px-4 py-2 rounded-md text-white'>Found Items</h1>
                            <p className='text-xl font-bold'>{rowCount.found}</p>
                        </div>

                        <div className='flex flex-col items-center'>
                            <h1 className='bg-blue-400 font-xl px-4 py-2 rounded-md text-white'>Total Users</h1>
                            <p className='text-xl font-bold'>{rowCount.user}</p>
                        </div>
                    </div>
                </div>

                <div className='itemTwo mt-[10px] bg-white w-[98%] five:w-[90%] mx-auto p-0 five:p-4 border border-gray-300 rounded-lg '>

                    {
                        selectedItem === 'lost' ? <DashboardLost lostData={lostData} setLostData={setLostData} updateLostCount={updateLostCount} /> : ''
                    }
                    {
                        selectedItem === 'found' ? <DashboardFound updateFoundCount={updateFoundCount} /> : ''
                    }
                    {
                        selectedItem === 'user' ? <DashboardUser /> : ''
                    }
                </div>
            </div>

        </div>
        

    )
}

export default Dashboard
