import React, { useState } from 'react'; 
import { TextField, Button, Box, Typography, Grid, Divider, CircularProgress, Input } from "@mui/material"; 
import { useDropzone } from 'react-dropzone'; // Importing dropzone functionality
import styles from '../css/Submit.module.css';

const SubmitApplication = () => { 
  const [formData, setFormData] = useState({ 
    eventName: "", 
    eventDescription: "", 
    tentativeVenue: "", 
    dateFrom: "", 
    dateTill: "", 
    timeFrom: "", 
    timeTill: "", 
    socials: "", 
    proposal: null, // Store uploaded file here
    footfall: "", 
    pocNumber: "", 
    registrationForm: "Coming Soon", 
    feedbackForm: "Coming Soon", 
  }); 
  
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submit button loading
  
  // Handle file change
  const handleFileChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setFormData({ ...formData, proposal: file });
    } else {
      alert("File size exceeds 5MB limit. Please upload a smaller file.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
    accept: ".pdf", // Only accept PDF files
    maxSize: 5 * 1024 * 1024, // Limit file size to 5MB
  });

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  }; 
  
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    setIsSubmitting(true); // Show loading spinner
    setTimeout(() => {
      console.log("Form Submitted", formData);
      setIsSubmitting(false); // Reset loading state
      alert("Your event application has been submitted!");
    }, 2000); 
  };

  return ( 
    <>
    <div className={styles.bg}></div> {/* Fixed background */}
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 5, p: 4, boxShadow: 3, borderRadius: 2, backgroundColor: "#fff" }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold' }}>
        Submit Event Application
      </Typography> 
      
      <Divider sx={{ mb: 3 }} />
      
      <form onSubmit={handleSubmit}> 
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField 
              label="Event Name" 
              name="eventName" 
              fullWidth 
              required 
              onChange={handleChange} 
              variant="outlined" 
              sx={{ borderRadius: 2 }} 
            /> 
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Event Description" 
              name="eventDescription" 
              fullWidth 
              required 
              onChange={handleChange} 
              variant="outlined" 
              multiline 
              rows={4} 
              sx={{ borderRadius: 2 }} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Tentative Venue" 
              name="tentativeVenue" 
              fullWidth 
              required 
              onChange={handleChange} 
              variant="outlined" 
              sx={{ borderRadius: 2 }} 
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              label="Date From" 
              name="dateFrom" 
              type="date" 
              fullWidth 
              required 
              InputLabelProps={{ shrink: true }} 
              onChange={handleChange} 
              sx={{ borderRadius: 2 }} 
            />
          </Grid>         
          <Grid item xs={6}>
            <TextField 
              label="Date Till" 
              name="dateTill" 
              type="date" 
              fullWidth 
              required 
              InputLabelProps={{ shrink: true }} 
              onChange={handleChange} 
              sx={{ borderRadius: 2 }} 
            />
          </Grid>         
          <Grid item xs={6}>
            <TextField 
              label="Time From" 
              name="timeFrom" 
              type="time" 
              fullWidth 
              required 
              InputLabelProps={{ shrink: true }} 
              onChange={handleChange} 
              sx={{ borderRadius: 2 }} 
            />
          </Grid>        
          <Grid item xs={6}>
            <TextField 
              label="Time Till" 
              name="timeTill" 
              type="time" 
              fullWidth 
              required 
              InputLabelProps={{ shrink: true }} 
              onChange={handleChange} 
              sx={{ borderRadius: 2 }} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Socials (Links)" 
              name="socials" 
              fullWidth 
              onChange={handleChange} 
              variant="outlined" 
              sx={{ borderRadius: 2 }} 
            />
          </Grid>
          <Grid item xs={12}>
            <Box {...getRootProps()} sx={{ 
              border: '2px dashed #1976d2', 
              padding: '16px', 
              textAlign: 'center', 
              cursor: 'pointer',
              borderRadius: '4px' 
            }}>
              <input {...getInputProps()} />
              <Typography variant="body1" sx={{ color: '#1976d2' }}>
                {formData.proposal ? `File: ${formData.proposal.name}` : "Drag and drop your Proposal here or select a PDF file (Max: 5MB)"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Expected Footfall" 
              name="footfall" 
              type="number" 
              fullWidth 
              onChange={handleChange} 
              variant="outlined" 
              sx={{ borderRadius: 2 }} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="POC Number" 
              name="pocNumber" 
              type="tel" 
              fullWidth 
              required 
              onChange={handleChange} 
              variant="outlined" 
              sx={{ borderRadius: 2 }} 
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              label="Registration Form" 
              name="registrationForm" 
              fullWidth 
              value="Coming Soon" 
              disabled 
              variant="outlined" 
              sx={{ borderRadius: 2 }} 
            />
          </Grid>    
          <Grid item xs={6}>
            <TextField 
              label="Feedback Form" 
              name="feedbackForm" 
              fullWidth 
              value="Coming Soon" 
              disabled 
              variant="outlined" 
              sx={{ borderRadius: 2 }} 
            />
          </Grid>
        </Grid>
        
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ borderRadius: 2, padding: "10px 20px" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
      </form> 
    </Box>
    </>
  ); 
};

export default SubmitApplication;
