import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DashboardUser = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost/backend/FetcheData.php')
            .then((response) => setUserData(response.data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1 className="text-xl font-bold">All Users</h1>
            <div className="mt-[10px] overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="px-4 py-2 text-left">Full Name</th>
                            <th className="px-4 py-2 text-left">Faculty</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData && userData.item1 ? (
                            userData.item1.map((user, index) => (
                                <tr key={index} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2">{user.fullname}</td>
                                    <td className="px-4 py-2">{user.faculty}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.contact}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-2 text-center">Loading users...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardUser;
