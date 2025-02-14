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
  const [selectedChart, setSelectedChart] = useState('eventFootfall');
  const [isLoading, setIsLoading] = useState(false);

  const eventFootfallData = [
    { month: 'Jan', hackathon: 280, cpContest: 150, ideathon: 180 },
    { month: 'Feb', hackathon: 320, cpContest: 200, ideathon: 220 },
    { month: 'Mar', hackathon: 300, cpContest: 180, ideathon: 250 },
    { month: 'Apr', hackathon: 350, cpContest: 220, ideathon: 280 }
  ];

  const eventCountData = [
    { month: 'Jan', hackathon: 2, cpContest: 4, ideathon: 1 },
    { month: 'Feb', hackathon: 3, cpContest: 4, ideathon: 2 },
    { month: 'Mar', hackathon: 2, cpContest: 5, ideathon: 2 },
    { month: 'Apr', hackathon: 3, cpContest: 4, ideathon: 3 }
  ];

  const feedbackData = [
    { 
      event: 'Hackathon',
      rating: 4.5,
      responses: 120,
      satisfaction: 85 
    },
    { 
      event: 'CP Contest',
      rating: 4.7,
      responses: 150,
      satisfaction: 88 
    },
    { 
      event: 'Ideathon',
      rating: 4.4,
      responses: 130,
      satisfaction: 82 
    }
  ];

  const chartOptions = [
    { id: 'eventFootfall', title: 'Event Footfall', icon: '👥' },
    { id: 'eventCount', title: 'Events per Month', icon: '📊' },
    { id: 'feedbackRatings', title: 'Event Feedback', icon: '⭐' },
    { id: 'satisfactionPie', title: 'Event Satisfaction', icon: '🔄' }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

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
      case 'eventFootfall':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={eventFootfallData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hackathon" fill="#8884d8" name="Hackathon" />
              <Bar dataKey="cpContest" fill="#82ca9d" name="CP Contest" />
              <Bar dataKey="ideathon" fill="#ffc658" name="Ideathon" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'eventCount':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={eventCountData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hackathon" fill="#8884d8" name="Hackathon" />
              <Bar dataKey="cpContest" fill="#82ca9d" name="CP Contest" />
              <Bar dataKey="ideathon" fill="#ffc658" name="Ideathon" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'feedbackRatings':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={feedbackData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="event" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rating" fill="#8884d8" name="Average Rating" />
              <Bar dataKey="responses" fill="#82ca9d" name="Total Responses" />
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
                nameKey="event"
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
      </div>

      <main className={styles.mainContent}>
        <div className={styles.chartContainer}>
          <h1 className={styles.chartTitle}>
            Techsocity - {chartOptions.find(c => c.id === selectedChart)?.title}
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