import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
  LineChart, Line,
  ResponsiveContainer 
} from 'recharts';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import styles from '../css/StatsPage.module.css';

const StatsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedChart, setSelectedChart] = useState('registrationTrend');
  const [isLoading, setIsLoading] = useState(false);

  const feedbackData = [
    { month: 'Jan', rating: 4.5, responses: 120, satisfaction: 85 },
    { month: 'Feb', rating: 4.2, responses: 150, satisfaction: 82 },
    { month: 'Mar', rating: 4.7, responses: 180, satisfaction: 88 },
    { month: 'Apr', rating: 4.4, responses: 160, satisfaction: 84 }
  ];

  const registrationData = [
    { month: 'Jan', newUsers: 250, completedProfiles: 200 },
    { month: 'Feb', newUsers: 300, completedProfiles: 260 },
    { month: 'Mar', newUsers: 280, completedProfiles: 250 },
    { month: 'Apr', newUsers: 320, completedProfiles: 290 }
  ];

  const chartOptions = [
    { id: 'registrationTrend', title: 'Registration Trend', icon: '📈' },
    { id: 'feedbackRatings', title: 'Feedback Ratings', icon: '⭐' },
    { id: 'satisfactionPie', title: 'Satisfaction Distribution', icon: '🔄' },
    { id: 'responseRate', title: 'Monthly Response Rate', icon: '📊' }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handleChartChange = (chartId) => {
    setIsLoading(true);
    setSelectedChart(chartId);
    setTimeout(() => setIsLoading(false), 500);
  };

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner} />
        </div>
      );
    }

    switch(selectedChart) {
      case 'registrationTrend':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={registrationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="newUsers" stroke="#8884d8" name="New Users" />
              <Line type="monotone" dataKey="completedProfiles" stroke="#82ca9d" name="Completed Profiles" />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'feedbackRatings':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={feedbackData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rating" fill="#8884d8" name="Average Rating" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'satisfactionPie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={feedbackData}
                dataKey="satisfaction"
                nameKey="month"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {feedbackData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'responseRate':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={feedbackData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="responses" fill="#82ca9d" name="Total Responses" />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={styles.toggleButton}
        >
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
        
        <div className={styles.chartList}>
          {chartOptions.map((chart) => (
            <button
              key={chart.id}
              onClick={() => handleChartChange(chart.id)}
              className={`${styles.chartButton} ${
                selectedChart === chart.id ? styles.chartButtonActive : ''
              }`}
            >
              <span className={styles.chartIcon}>{chart.icon}</span>
              {sidebarOpen && <span>{chart.title}</span>}
            </button>
          ))}
        </div>

        <div className={styles.downloadSection}>
          <a
            href="/assets/feedback.csv"
            download
            className={styles.downloadLink}
          >
            <span className={styles.downloadIcon}>📥</span>
            {sidebarOpen && <span>Download Feedback Data</span>}
          </a>
          <a
            href="/assets/registration.xlsx"
            download
            className={styles.downloadLink}
          >
            <span className={styles.downloadIcon}>📥</span>
            {sidebarOpen && <span>Download Registration Data</span>}
          </a>
        </div>
      </div>

      <main className={styles.mainContent}>
        <div className={styles.chartContainer}>
          <h1 className={styles.chartTitle}>
            {chartOptions.find(c => c.id === selectedChart)?.title}
          </h1>
          <div className={styles.chartWrapper}>
            {renderChart()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StatsPage;