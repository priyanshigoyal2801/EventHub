import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import styles from "../css/Submit.module.css";
import Navbar from "../components/Navbar/Navbar";

const SubmitApplication = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    orgName: "",
    eventDescription: "",
    tentativeVenue: "",
    dateFrom: "",
    dateTill: "",
    timeFrom: "",
    timeTill: "",
    socials: "",
    proposal: null,
    logo: null,
    footfall: "",
    pocNumber: "",
    registrationForm: "Coming Soon",
    feedbackForm: "Coming Soon",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle file uploads
  const handleFileChange = (acceptedFiles, type) => {
    const file = acceptedFiles[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setFormData((prev) => ({ ...prev, [type]: file }));
    } else {
      setErrorMessage("File size exceeds 5MB limit.");
    }
  };

  const dropzoneProps = {
    accept: ".pdf, .jpg, .jpeg, .png",
    maxSize: 5 * 1024 * 1024,
  };

  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } = useDropzone({
    onDrop: (files) => handleFileChange(files, "logo"),
    ...dropzoneProps,
  });

  const { getRootProps: getProposalRootProps, getInputProps: getProposalInputProps } = useDropzone({
    onDrop: (files) => handleFileChange(files, "proposal"),
    ...dropzoneProps,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("eventName", formData.eventName);
      formDataToSend.append("orgName", formData.orgName);
      formDataToSend.append("dateFrom", formData.dateFrom);
      formDataToSend.append("dateTill", formData.dateTill);
      formDataToSend.append("venue", formData.tentativeVenue);
      formDataToSend.append("timeFrom", formData.timeFrom);
      formDataToSend.append("timeTill", formData.timeTill);
      formDataToSend.append("registrationformlink", formData.registrationForm);
      formDataToSend.append("feedbackformlink", formData.feedbackForm);
      formDataToSend.append("pocNumber", formData.pocNumber);
      formDataToSend.append("socials", JSON.stringify(formData.socials));
      formDataToSend.append("description", formData.eventDescription);
      if (formData.logo) formDataToSend.append("logo", formData.logo);
      if (formData.proposal) formDataToSend.append("proposal", formData.proposal);

      const response = await axios.post("http://localhost:3000/table", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Event application submitted successfully!");
      setFormData({
        eventName: "",
        orgName: "",
        eventDescription: "",
        tentativeVenue: "",
        dateFrom: "",
        dateTill: "",
        timeFrom: "",
        timeTill: "",
        socials: "",
        proposal: null,
        logo: null,
        footfall: "",
        pocNumber: "",
        registrationForm: "Coming Soon",
        feedbackForm: "Coming Soon",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(error.response?.data?.error || "Error submitting application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.bg}>
      
      </div>
      <Navbar />
      <Box sx={{ maxWidth: 600, margin: "auto", mt: 5, p: 4, boxShadow: 3, borderRadius: 2, backgroundColor: "#fff" }}>
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: "bold" }}>
          Submit Event Application
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField label="Event Name" name="eventName" fullWidth required onChange={handleChange} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Organization Name" name="orgName" fullWidth required onChange={handleChange} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Event Description" name="eventDescription" fullWidth required onChange={handleChange} variant="outlined" multiline rows={4} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Tentative Venue" name="tentativeVenue" fullWidth required onChange={handleChange} variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Date From" name="dateFrom" type="date" fullWidth required InputLabelProps={{ shrink: true }} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Date Till" name="dateTill" type="date" fullWidth required InputLabelProps={{ shrink: true }} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Time From" name="timeFrom" type="time" fullWidth required InputLabelProps={{ shrink: true }} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Time Till" name="timeTill" type="time" fullWidth required InputLabelProps={{ shrink: true }} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <Box {...getLogoRootProps()} sx={{ border: "2px dashed #1976d2", padding: "16px", textAlign: "center", cursor: "pointer", borderRadius: "4px" }}>
                <input {...getLogoInputProps()} />
                <Typography variant="body1" sx={{ color: "#1976d2" }}>
                  {formData.logo ? `Logo: ${formData.logo.name}` : "Upload Event Logo (JPG/PNG, Max: 5MB)"}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box {...getProposalRootProps()} sx={{ border: "2px dashed #1976d2", padding: "16px", textAlign: "center", cursor: "pointer", borderRadius: "4px" }}>
                <input {...getProposalInputProps()} />
                <Typography variant="body1" sx={{ color: "#1976d2" }}>
                  {formData.proposal ? `Proposal: ${formData.proposal.name}` : "Upload Proposal (PDF, Max: 5MB)"}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField label="POC Number" name="pocNumber" type="tel" fullWidth required onChange={handleChange} variant="outlined" />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ borderRadius: 2, padding: "10px 20px" }} disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default SubmitApplication;
