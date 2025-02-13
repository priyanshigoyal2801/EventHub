import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import styles from "../css/StatsPage.module.css";

const StatsPage = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [registrationData, setRegistrationData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [orgEventsData, setOrgEventsData] = useState([]);

    useEffect(() => {
        fetch("/assets/feedback.csv")
            .then((res) => res.text())
            .then((text) => {
                Papa.parse(text, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        console.log("Feedback Data:", result.data);
                        setFeedbackData(result.data);
                    },
                });
            });

        
        fetch("/assets/registration.xlsx")
            .then((res) => res.arrayBuffer())
            .then((buffer) => {
                const workbook = XLSX.read(buffer, { type: "array" });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const data = XLSX.utils.sheet_to_json(sheet);
                console.log("Registration Data:", data);

                
                const footfallData = data.map((entry) => ({
                    Event: entry.EventName,
                    Footfall: entry.Footfall,
                }));

                const orgEventCounts = {};
                data.forEach((entry) => {
                    if (orgEventCounts[entry.Organization]) {
                        orgEventCounts[entry.Organization]++;
                    } else {
                        orgEventCounts[entry.Organization] = 1;
                    }
                });

                setRegistrationData(data);
                setEventData(footfallData);
                setOrgEventsData(Object.keys(orgEventCounts).map(org => ({
                    Organization: org,
                    Events: orgEventCounts[org],
                })));
            });
    }, []);

    const pieColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

    return (
        <div className={styles.statsPage}>
            <h1>Event Statistics</h1>

            {/* Feedback Bar Chart */}
            <div className={styles.chartContainer}>
                <h2>Feedback Ratings</h2>
                <ResponsiveContainer width="95%" height={350}>
                    <BarChart data={feedbackData.length ? feedbackData : [{ Category: "No Data", Rating: 0 }]}>
                        <XAxis dataKey="Category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Rating" fill="#4CAF50" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Gender Pie Chart */}
            <div className={styles.chartContainer}>
                <h2>Gender Distribution</h2>
                <ResponsiveContainer width="95%" height={350}>
                    <PieChart>
                        <Pie
                            data={registrationData.length ? registrationData : [{ Gender: "No Data", Count: 0 }]}
                            dataKey="Count"
                            nameKey="Gender"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {registrationData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Event Footfall Bar Chart */}
            <div className={styles.chartContainer}>
                <h2>Event Footfall</h2>
                <ResponsiveContainer width="95%" height={350}>
                    <BarChart data={eventData.length ? eventData : [{ Event: "No Data", Footfall: 0 }]}>
                        <XAxis dataKey="Event" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Footfall" fill="#FF5733" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Organization vs. Events Bar Chart */}
            <div className={styles.chartContainer}>
                <h2>Number of Events per Organization</h2>
                <ResponsiveContainer width="95%" height={350}>
                    <BarChart data={orgEventsData.length ? orgEventsData : [{ Organization: "No Data", Events: 0 }]}>
                        <XAxis dataKey="Organization" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Events" fill="#3498DB" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StatsPage;
