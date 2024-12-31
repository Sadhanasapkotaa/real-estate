'use client';
import { useState, useEffect } from "react";

const NotificationPage = () => {
    const notifications = [
        { message: "Rent Paid", link: "/rent" },
        { message: "Rental Space Approved", link: "/approval" },
        { message: "Maintenance Request Submitted", link: "/maintenance" },
        { message: "Lease Agreement Signed", link: "/lease" },
    ];

    const [readNotifications, setReadNotifications] = useState<number[]>([]);

    useEffect(() => {
        // Load read notifications from localStorage when the component mounts
        const savedReadNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]');
        setReadNotifications(savedReadNotifications);
    }, []);

    const markAsRead = (index: number) => {
        if (!readNotifications.includes(index)) {
            const updatedReadNotifications = [...readNotifications, index];
            setReadNotifications(updatedReadNotifications);
            localStorage.setItem('readNotifications', JSON.stringify(updatedReadNotifications));
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            {notifications.length > 0 ? (
                <ul className="space-y-3">
                    {notifications.map((notification, index) => {
                        const isRead = readNotifications.includes(index);
                        return (
                            <li
                                key={`notification-${index}`}
                                className={`flex items-center p-3 border rounded-lg shadow-sm ${isRead ? "bg-gray-100 border-gray-200" : "bg-blue-50 border-blue-200"
                                    }`}
                            >
                                <i className="fa-solid fa-circle-info text-blue-500 mr-3" />
                                <a
                                    href={notification.link}
                                    className="flex-1"
                                    onClick={() => markAsRead(index)}
                                >
                                    {notification.message}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>No notifications available.</p>
            )}
        </div>
    );
};

export default NotificationPage;
