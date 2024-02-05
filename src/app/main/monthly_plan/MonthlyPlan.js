import React, { useRef, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import UploadIcon from '@mui/icons-material/Upload';
import { motion } from 'framer-motion';
// import background1 from "./../../assets/upload1_.png";
import { useAppDispatch } from "react";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  MenuItem,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  TextField,
  Switch,
  Paper,
} from "@mui/material";

function MonthlyPlan() {
  const ProjectIp = "http://207.180.218.55:5000"
  //const ProjectIp = "http://localhost:5000";
  const [fileSelected, setFileSelected] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleFileChange = (event) => {
    setFileSelected(event.target.files.length > 0);
    const file = event.target.files[0];
    setSelectedFileName(file.name);
  };

  const handleUploadConfig = async () => {
    if (!fileSelected) {
      alert("Please Select The File First");
      return;
    }

    try {
      const files = document.getElementById("uploadFile").files;
      const formData = new FormData();
      formData.append("uploadFile", files[0]);

      const response = await fetch(ProjectIp + "/uploadConfigFile", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonResponse = await response.json();

      if (jsonResponse.status === 1) {
        alert("File Uploaded");
      } else {
        console.log(jsonResponse);
        alert("Error uploading file");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      alert("An error occurred during file upload. Please try again later.");
    }
  };

  const [block_data, setBlockdata] = useState([]);
  const [r_s, setr_s] = useState("");
  const [r_d, setr_d] = useState("");
  const [selectedOption, setSelectedOption] = useState("default");
  const [subOptions, setSubOptions] = useState([]);
  const [selectedOption2, setSelectedOption2] = useState("default");
  const [subOptions2, setSubOptions2] = useState([]);
  const [subOption1, setSubOption1] = useState("");
  const [subOption2, setSubOption2] = useState("");
  // const [org_rhcode, set_org_rhcode] = useState(null);
  // const [dest_rhcode, set_dest_rhcode] = useState(null);
  const [TEFD, set_TEFD] = useState("");
  const buttonRef = useRef(null);
  // const buttonRef1 = useRef(null);
  const [solutionSolved, setSolutionSolved] = useState(false);

  const handleSolve = async () => {
    document.getElementById("toggle").checked = true;
    alert("This action will take time, click OK to continue.");
    // buttonRef.current.innerText = "Solving..";
    // console.log(document.getElementById('toggle').value);

    const payload = {
      r_s: r_s,
      r_d: r_d,
      // org_rhcode: org_rhcode,
      // dest_rhcode,
      TEFD: TEFD,
      origin_state: selectedOption,
      org_rhcode: subOption1,
      destination_state: selectedOption2,
      dest_rhcode: subOption2,
      block_data: block_data,
    };
    console.log(block_data);
    try {
      const response = await fetch(ProjectIp + "/Monthly_Solution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // buttonRef.current.innerText = "Solved";
        alert("Solution Done!, Now you can download results");
        setSolutionSolved(true);
      } else {
        console.error("Failed to send inputs. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error sending inputs:", error);
    }
    document.getElementById("toggle").checked = false;
  };

  // const Solve_Daily_Scheduler = async () => {
  //   buttonRef1.current.innerText = "Solving for Dialy Scheduler..";
  //   const payload = {};

  //   try {
  //     const response = await fetch(ProjectIp+":5000/Daily_Scheduler", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (response.ok) {
  //       buttonRef1.current.innerText = "Solve for Daily Scheduler";
  //       alert("Solution Done!, Now you can download results");
  //     } else {
  //       console.error("Failed to send inputs. Status code:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error sending inputs:", error);
  //   }
  // };

  const [cost, setCost] = useState(null);
  const [Total_result, set_Total_Result] = useState(null);
  const [Relevant_result, set_Relevant_Result] = useState(null);
  // const [Daily_Scheduler_result, set_Daily_Scheduler_Result] = useState(null);

  // const fetchReservationId_Daily_Scheduler_result = () => {
  //   var form = new FormData();
  //   fetch(projectIp + "/read_Daily_Scheduler", {
  //     method: "POST",
  //     credentials: "include",
  //     body: form,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const fetched_Daily_Scheduler_Result = data;
  //       set_Daily_Scheduler_Result(fetched_Daily_Scheduler_Result);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };

  const fetchReservationId_cost = () => {
    // const dispatch = useAppDispatch();
    var form = new FormData();
    fetch(ProjectIp + "/readPickle", {
      method: "POST",
      credentials: "include",
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        const fetchedCost = data["Minimum Cost of Transportation"];
        const formattedCost = parseFloat(fetchedCost).toFixed(1);
        setCost(formattedCost);
        console.log(formattedCost);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const fetchReservationId_Total_result = () => {
    var form = new FormData();
    fetch(ProjectIp + "/read_Total_Result", {
      method: "POST",
      credentials: "include",
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        const fetched_Total_Result = data;
        set_Total_Result(fetched_Total_Result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const fetchReservationId_Revelant_result = () => {
    var form = new FormData();
    fetch(ProjectIp + "/read_Relevant_Result", {
      method: "POST",
      credentials: "include",
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        const fetched_Relevant_Result = data;
        set_Relevant_Result(fetched_Relevant_Result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDropdownChange = async (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    const response = await fetch("/data/Updated_railhead_list.xlsx");
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    const workbook = XLSX.read(data, { type: "array" });

    // Assuming the Excel file has only one sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Parse the sheet data into JSON format
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    let dropdownOptions = [{ value: "", label: "Please select Railhead" }];
    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i][1] == selectedValue) {
        dropdownOptions.push({ value: jsonData[i][0], label: jsonData[i][0] });
      }
    }
    dropdownOptions.sort((a, b) => a.label.localeCompare(b.label));

    setSubOptions(dropdownOptions);
    console.log(jsonData[1][1], dropdownOptions, selectedValue);
    setSubOptions(dropdownOptions);
  };

  const handleDropdownChange2 = async (e) => {
    const selectedValue = e.target.value;
    setSelectedOption2(selectedValue);
    const response = await fetch("/data/Updated_railhead_list.xlsx");
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    const workbook = XLSX.read(data, { type: "array" });

    // Assuming the Excel file has only one sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Parse the sheet data into JSON format
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    let dropdownOptions = [{ value: "", label: "Please select Railhead" }];
    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i][1] == selectedValue) {
        dropdownOptions.push({ value: jsonData[i][0], label: jsonData[i][0] });
      }
    }
    dropdownOptions.sort((a, b) => a.label.localeCompare(b.label));

    setSubOptions2(dropdownOptions);
    console.log(jsonData[1][1], dropdownOptions, selectedValue);
    setSubOptions2(dropdownOptions);
  };

  const handleSubDropdownChange1 = (e) => {
    setSubOption1(e.target.value);
  };

  const handleSubDropdownChange2 = (e) => {
    setSubOption2(e.target.value);
  };

  const handleDeleteRow = (e) => {
    console.log(e);
    let block_data_ = block_data.filter((item) => item["id"] !== e);
    setBlockdata(block_data_);
  };

  // const exportToExcel = () => {
  //   fetchReservationId_Daily_Scheduler_result();
  //   if (Daily_Scheduler_result == null) {
  //     window.alert("Fetching Result, Please Wait");
  //   } else {
  //     const workbook = XLSX.utils.book_new();
  //     Object.entries(Daily_Scheduler_result).forEach(([column, data]) => {
  //       const parsedData = JSON.parse(data);
  //       const worksheet = XLSX.utils.json_to_sheet(parsedData);
  //       XLSX.utils.book_append_sheet(workbook, worksheet, column);
  //     });
  //     const excelBuffer = XLSX.write(workbook, {
  //       type: "array",
  //       bookType: "xlsx",
  //     });
  //     const excelBlob = new Blob([excelBuffer], {
  //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //     });
  //     saveAs(excelBlob, "Daily_Scheduler.xlsx");
  //   }
  // };

  const addConstraint = () => {
    // console.log(selectedOption, subOption1, selectedOption2, subOption2);
    if (selectedOption && subOption1 && selectedOption2 && subOption2) {
      setBlockdata((data) => [
        ...data,
        {
          origin_state: selectedOption,
          origin_railhead: subOption1,
          destination_state: selectedOption2,
          destination_railhead: subOption2,
          id: Date.now(),
        },
      ]);
      // setSelectedOption('');
      setSelectedOption("default");
      setSelectedOption2("default");
      setSubOptions([]);
      setSubOptions2([]);
    }
  };

  const exportToExcel1 = () => {
    fetchReservationId_Total_result();
    if (Total_result == null) {
      window.alert("Fetching Result, Please Wait");
    } else {
      const workbook = XLSX.utils.book_new();
      Object.entries(Total_result).forEach(([column, data]) => {
        const parsedData = JSON.parse(data);
        const worksheet = XLSX.utils.json_to_sheet(parsedData);
        XLSX.utils.book_append_sheet(workbook, worksheet, column);
      });
      const excelBuffer = XLSX.write(workbook, {
        type: "array",
        bookType: "xlsx",
      });
      const excelBlob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(excelBlob, "All_results.xlsx");
    }
  };

  const exportToExcel2 = () => {
    fetchReservationId_Revelant_result();
    if (Relevant_result == null) {
      window.alert("Fetching Result, Please Wait");
    } else {
      const workbook = XLSX.utils.book_new();
      Object.entries(Relevant_result).forEach(([column, data]) => {
        const parsedData = JSON.parse(data);
        const worksheet = XLSX.utils.json_to_sheet(parsedData);
        XLSX.utils.book_append_sheet(workbook, worksheet, column);
      });
      const excelBuffer = XLSX.write(workbook, {
        type: "array",
        bookType: "xlsx",
      });
      const excelBlob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(excelBlob, "Monthly_Movement_results.xlsx");
    }
  };
  fetchReservationId_cost();
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <React.Fragment>
    <Card
      sx={{
        p: 0,
      }}
    >


      <div className="page-container form-group app-container body"
        
      >
        <div
          className="page-content view-container body"
          style={{ 
            // backgroundImage: "url('/assets/images/fci/bg8.jpg')",
            // backgroundSize: 'cover',
            // backgroundPosition: 'center',
            //padding: 40
            backgroundColor: "#f1f5f9"
         }}
        >
         {/* <Paper elevation={3} className="w-full h-full my-12"> */}
          <ul
            className="x-navigation x-navigation-horizontal x-navigation-panel p-16"
            //  style={{ backgroundColor: "rgba(235, 171, 68, 0.69)" }}
          >
            <li className="xn-icon-button body">
              <a href="#" className="x-navigation-minimize">
                <span className="fa fa-dedent" />
              </a>
            </li>

            <li
              className="xn-logo body"
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
                width: "90%",
              }}
            >
              
              <Box>
                <Typography className="text-3xl font-semibold tracking-tight leading-8">
                  Optimized Monthly Plan
                </Typography>
                <Typography className="font-medium tracking-tight" color="text.secondary">
                  Monthly Plan
                </Typography>
              </Box>
              <a className="x-navigation-control"></a>
            </li>
          </ul>
          {/* </Paper> */}
          <CardContent
            sx={{
              padding: "16px",
            }}
          >
            <div className="page-content-wrap app-container ">
              <div className="row">
                <div className="col-md-12">
                  <Paper elevation={3} className="w-full h-full  my-12">
                  <div className="row p-16" style={{ marginLeft: "15px" }}>
                    <div style={{ fontSize: "20px", fontWeight: "700" }}>
                      <Box>
                        <Typography fontWeight="250" variant="h4">
                          {/* <i className="fa fa-file-excel-o" aria-hidden="true"></i>{" "} */}
                          Template
                        </Typography>
                      </Box>
                    </div>
                    <form
                      action=""
                      encType="multipart/form-data"
                      id="uploadForm"
                      className="form-horizontal"
                    >
                    <Box>
                      <Box className="inputRow">
                        <div
                          className="col-md-6"
                          style={{ marginTop: "15px",
                        //   marginLeft: "50px"
                           }}
                        >
                          <div className="form-group">
                            <div className="col-md-8 info">

                              <div className="input-group">
                                <span
                                  className="input-group-addon"
                                  style={{
                                    backgroundColor: "rgba(235, 171, 68, 0.69)",
                                  }}
                                >

                                  <span className="fa fa-info" />
                                </span>
                                <span className="help-block"
                              // style={{ color: "black" }}
                              >
                                Choose Data Template
                              </span>
                                <label htmlFor="uploadFile">
                                
                                  <input
                                    type="file"
                                    className="form-control"
                                    id="uploadFile"
                                    name="uploadFile"
                                    onChange={handleFileChange}
                                    defaultValue=""
                                    required=""
                                    hidden
                                  />
                                  <Button variant="contained" component="span" style={{margin:25}}>
                                    Choose File...
                                  </Button>
                                  <p>Selected File: {selectedFileName ? selectedFileName : "No File Selected."}</p>
                                  </label>
                              </div>



                              {/* </div> */}
                              {/* </div> */}
                            </div>
                            {/* <div className="col-md-3"> */}
                            <dt>
                              {/* <img
                                className="upload_class"
                                src="/assets/images/fci/upload1.jpg"
                                id="uploadConfig"
                                onClick={handleUploadConfig}
                                disabled={!fileSelected}
                              /> */}
                              <Button variant="outlined" startIcon={<UploadIcon />} 
                                src="/assets/images/fci/upload1.jpg"
                                id="uploadConfig"
                                onClick={handleUploadConfig}
                                style={{margin:25}}
                                disabled={!fileSelected}>
                                Upload
                              </Button>
                            </dt>
                            {/* <button>click here</button> */}
                            {/* <Button
                            //  style={{ background: "lightgreen" }}
                              className="upload_class"
                              src={background1}
                              id="uploadConfig"
                              onClick={handleUploadConfig}
                              disabled={!fileSelected}
                            >
                              Upload</Button> */}
                            {/* <input
                      style={{ marginLeft: "60px" }}
                      type="button"
                      // className="btn btn-primary"
                      className='upload_btn'
                      defaultValue="Upload Data Template"
                      id="uploadConfig"
                    /> */}
                          </div>
                        </div>
                      </Box>
                    </Box>
                    </form>
                  </div>
                  </Paper>
                  
                  <div className=" form-group col-md-12"
                  //  style={{ marginLeft: "15px" }}
                  >
                    {/* <div style={{ fontSize: "20px", fontWeight: "700" }}>
                    <i className="fa fa-info-circle" aria-hidden="true"></i>{" "}
                    Configurations
                  </div> */}
                  <Paper elevation={3} className="w-full h-full">
                    <Box className="p-16" style={{marginLeft:25}}>
                      <Typography fontWeight="250" variant="h4">
                        {/* <i className="fa fa-file-excel-o" aria-hidden="true"></i>{" "} */}
                        Configurations
                      </Typography>
                    </Box>
                    <br />

                    {/* <form
                  //  style={{ marginLeft: "30px" }}
                  > */}
                    <Box className="p-16">
                      <Box className="inputRow">
                        <div className=" form-group col-md-12">
                          <div className=" col-md-2">
                            {/* <strong
                              style={{
                                //  fontSize: "20px",
                                // marginLeft: "12px",
                                // color: "crimson",
                              }}
                            > */}

                            {/* </strong> */}
                          </div>
                          <FormControl  style={{marginLeft:25}}>
                            <FormLabel id="demo-radio-buttons-group-label">Select Matrix System</FormLabel>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue="female"
                              name="radio-buttons-group"
                              
                            >
                              <FormControlLabel id="nonTefd" name="matrixSystem" value="NON-TEFD" control={<Radio />} label="NON-TEFD" onChange={(e) => set_TEFD(e.target.value)} />
                              <FormControlLabel id="tefd" name="matrixSystem" value="TEFD" control={<Radio />} label="TEFD" onChange={(e) => set_TEFD(e.target.value)}/>
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </Box>


                      <br />
                      {/*   <br /> */}
                      <div className="form-group">
                        <div className="form-group">
                          <Box className="inputRow">
                            <div className="col-md-8">
                              <p style={{ margin: 0, padding: 0 }}>
                                {/* <strong
                                style={{
                                  //  color: "crimson",
                                  //  fontSize: "20px",
                                  marginLeft: "15px",
                                  fontFamily: "Segoe UI",
                                }}
                              > */}
                              
                                <span
                                  className="help-block"

                                  style={{ color: "black", margin: "20px" }}>
                                  For Maximum Number of Rakes:
                                </span>
                                {/* </strong> */}
                              </p>

                            </div>
                          </Box>
                        </div>
                        <br />
                        <br />
                        <Box className="inputRow">
                          {/* <label style={{ marginTop: "10px" }}> */}

                          <div className="form-group">
                            <div className="col-md-8">
                              {/* <strong style={{ fontSize: "16px", marginLeft: "15px" }}> */}
                              <span
                                // className="help-block" 
                                style={{ color: "black", marginLeft: "50px" }}>
                                Max number of rakes per railhead to be allowed from
                                surplus states (Default Value is 25)
                                {/* </strong> */}
                              </span>
                            </div>
                            <div className="col-md-3">
                              <TextField
                                required
                                id="r_s-required"
                                label="Required"
                                style={{marginLeft: "250px",marginTop:"30px"}}
                                value={r_s}
                                onChange={(e) => setr_s(e.target.value)}
                                defaultValue="25"
                              />
                              {/* <input
                                type="text"
                                value={r_s}
                                onChange={(e) => setr_s(e.target.value)}
                              // style={{ marginLeft: "40px" }}
                              /> */}
                            </div></div>

                          {/* </label> */}
                        </Box>
                        <br /><br />
                        <Box className="inputRow">
                          <div className="form-group">
                            <div className="col-md-8">
                              <span
                                // className="help-block" 
                                style={{ color: "black", marginLeft: "50px" }}>
                                Max number of rakes per railhead to be allowed into
                                deficit states (Default Value is 25)
                              </span>
                            </div>
                            <div className="col-md-3" style={{ color: "black", marginRight: "20px" }}>
                              <TextField
                                required
                                id="r_d-required"
                                label="Required"
                                style={{marginLeft: "250px",marginTop:"30px"}}
                                value={r_d}
                                onChange={(e) => setr_d(e.target.value)}
                                defaultValue="25"
                              />
                              {/* <input
                                type="text"
                                value={r_d}
                                onChange={(e) => setr_d(e.target.value)}
                              //  style={{ marginLeft: "53px" }}
                              /> */}
                            </div></div>
                        </Box>
                      </div>
                      {/* </Box> */}
                      <br />
                      <br />

                      {/* <p style={{ margin: 0, padding: 0 }}>
                    <strong
                      style={{
                        color: "blue",
                        fontSize: "20px",
                        marginLeft: "15px",
                      }}
                    >
                      For Route Blocking:
                    </strong>
                  </p>
                  <label htmlFor="origin_state">
                    <strong style={{ fontSize: "16px", marginLeft: "15px" }}>
                      Select Origin State:
                    </strong>
                    <select
                      style={{ marginLeft: "568px", width: "200px" }}
                      id="origin_state"
                      onChange={handleDropdownChange}
                      value={selectedOption}
                    >
                      <option value="default">Select Origin State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chattisgarh">Chattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="MP">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="NE">North East</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="UP">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                  </label>
                  <br />
                  <label htmlFor="origin_railhead">
                    <strong style={{ fontSize: "16px", marginLeft: "15px" }}>
                      Select Origin Railhead:
                    </strong>
                    <select
                      id="origin_railhead"
                      style={{ marginLeft: "540px", width: "200px" }}
                      onChange={handleSubDropdownChange1}
                      value={subOption1}
                    >
                      {subOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <br />

                  <label htmlFor="deficit_state">
                    <strong style={{ fontSize: "16px", marginLeft: "15px" }}>
                      Select Destination State:
                    </strong>
                    <select
                      style={{ marginLeft: "528px", width: "200px" }}
                      id="deficit_state"
                      onChange={handleDropdownChange2}
                      value={selectedOption2}
                    >
                      <option value="default">Select Origin State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chattisgarh">Chattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="MP">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="NE">North East</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="UP">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                  </label>
                  <br />

                  <label htmlFor="deficit_railhead">
                    <strong style={{ fontSize: "16px", marginLeft: "15px" }}>
                      Select Destination Railhead:
                    </strong>
                    <select
                      id="deficit_railhead"
                      style={{ marginLeft: "500px", width: "200px" }}
                      onChange={handleSubDropdownChange2}
                      value={subOption2}
                    >
                      {subOptions2.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <br />
                  <br /> */}
                      {/* <p style={{ margin: 0, padding: 0 }}>
                    <strong
                      style={{
                        color: "#9d0921",
                        fontSize: "20px",
                        marginLeft: "15px"
                      }}
                    >
                      For Route Blocking
                    </strong>
                  </p> */}
                      <br />
                      {/* <div style={{ display: "flex", marginLeft: "20px" }}> */}
                      {/* <label htmlFor="origin_state"> */}
                      {/* <div>
                      <strong style={{ fontSize: "16px", padding: "5px" }}>
                        Select Origin State
                      </strong>
                      <select
                        style={{ width: "200px", padding: "5px"}}
                        id="origin_state"
                        onChange={handleDropdownChange}
                        value={selectedOption}
                      >
                        <option value="default">Select Origin State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chattisgarh">Chattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="MP">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="NE">North East</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="UP">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div> */}
                      {/* </label> */}
                      {/* <label htmlFor="origin_railhead"> */}
                      {/* <div>
                      <strong style={{ fontSize: "16px", padding: "5px" }}>
                        Select Origin Railhead
                      </strong>
                      <select
                        id="origin_railhead"
                        style={{ width: "200px", padding: "5px" }}
                        onChange={handleSubDropdownChange1}
                        value={subOption1}
                      >
                        {subOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div> */}
                      {/* </label> */}
                      {/* <div>
                      {/* <label htmlFor="deficit_state"> */}
                      {/* <strong style={{ fontSize: "16px", padding: "5px" }}>
                        Select Destination State
                      </strong>
                      <select
                        style={{ width: "200px", padding: "5px" }}
                        id="deficit_state"
                        onChange={handleDropdownChange2}
                        value={selectedOption2}
                      >
                        <option value="default">
                          Select Destination State
                        </option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chattisgarh">Chattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="MP">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="NE">North East</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="UP">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div> */}
                      {/* </label> */}
                      {/* <label htmlFor="deficit_railhead"> */}
                      {/* <div>
                      <strong style={{ fontSize: "16px", padding: "5px" }}>
                        Select Destination Railhead
                      </strong>
                      <select
                        id="deficit_railhead"
                        style={{ width: "200px", padding: "5px" }}
                        onChange={handleSubDropdownChange2}
                        value={subOption2}
                      >
                        {subOptions2.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div> */}
                      {/* </label> */}
                      {/* <div
                      style={{
                        padding: "5px",
                        margin: "2px",
                        float: "right",
                        width: "100px",
                        background: "orange",
                        padding: "auto",
                      }}
                      onClick={addConstraint}
                    >
                      <p style={{ textAlign: "center", marginTop: "20px"}}>
                        Add
                      </p>
                    </div> */}
                      {/* </div> */}
                      {/* <br />
                    <br /> */}
                      {/* </form> */}
                    </Box>
                    </Paper>
                    {/* <button
                  style={{
                    color: "white",
                    backgroundColor: "blue",
                    fontSize: "20px",
                    // width: "8%",
                    marginLeft: "728px",
                  }}
                  onClick={handleSolve}
                  ref={buttonRef}
                >
                  Generate Optimized Plan
                </button> */}
                <Paper elevation={3} className="w-full h-full my-12">
                    <div className="form-group p-16">
                      <Box>
                        <Typography fontWeight="250" variant="h4">
                          {/* <i className="fa fa-file-excel-o" aria-hidden="true"></i>{" "} */}
                          Optimal Plan
                        </Typography>
                      </Box>
                      {/* <div style={{ fontSize: "20px", fontWeight: "700" }}>
                      <i className="fa fa-list-alt" aria-hidden="true"></i> Optimal
                      Plan
                    </div> */}
                      <br />
                      {/* <div className="form-group">
                 <div className="col-md-3"><label>Generate Optimized Plan</label> </div>
                 <div className="col-md-3"><button>Generate Optimized Plan</butt> </div> 


                 </div>*/}
                      {/* <div className="form-group col-md-12">
                    <div 
                    className="
                  //  wrap__toggle--bluetooth
                     col-md-2"
                    >
                      <span style={{ textAlign: "center", fontWeight: "bold" }}>
                        Generate Optimized Plan
                      </span>
                    </div>
                    <div
                      className="wrap__toggle1 col-md-1"
                      style={{
                        display: "flex", // Display the radio buttons side by side
                        alignItems: "center", // Vertically align the content
                        borderStyle: "solid",
                        borderColor: "#ebab44b0",
                      }}
                    >
                      <div
                      // className="wrap__toggle--toggler"\
                      >
                        <label htmlFor="toggleOn" style={{ marginRight: "10px" }}>
                          <input
                            type="radio"
                            className="radioButton"
                            id="toggleOn"
                            name="planToggle"
                            value="on"
                            onChange={handleSolve}
                          />
                          <span>On</span>
                        </label>
                        <label htmlFor="toggleOff">
                          <input
                            type="radio"
                            className="radioButton"
                            id="toggleOff"
                            name="planToggle"
                            value="off"
                            onChange={handleSolve}
                          />
                          <span>Off</span>
                        </label>
                      </div>
                    </div>
                  </div> */}
                      {/* <div className="form-group col-md-12">
                    <div className="col-md-2">
                      <span style={{ fontWeight: "bold" }}>Generate Optimized Plan</span>
                    </div>
                    <div className="col-md-1">
                      <label>
                        <input
                          type="radio"
                          name="optimizedPlan"
                          value="on"
                        //  checked={isOptimizedPlanEnabled}
                          onChange={handleSolve}
                        />
                        On
                      </label>
                      <label style={{ marginLeft: "10px" }}>
                        <input
                          type="radio"
                          name="optimizedPlan"
                          value="off"
                       //   checked={!isOptimizedPlanEnabled}
                          onChange={handleSolve}
                        />
                        Off
                      </label>
                    </div>
                  </div> */}
                      <Box className="inputRow">
                        <div className="wrap__toggle" style={{ textAlign: 'center', borderStyle: 'solid', borderColor: '#ebab44b0' }} onClick={handleSolve}>
                      <div className="wrap__toggle--bluetooth">
                        <span style={{ textAlign: 'center', fontWeight: 'bold' }}>Generate Optimized Plan</span>
                      </div>
                      {/* <div className="wrap__toggle--toggler">
                        <label htmlFor="toggle">
                        </label>
                      </div> */}
                      <Switch
                        id="toggle"
                        onChange={handleSolve}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                      
                    </div>
                        {/* </div> */}
                      </Box>
                    </div>
                    <br />
                    <br />
                    {/*    <div>
               <br/>
                    <DynamicTable/>
                  </div> */}
                    <br />
                    <div className="form-group p-16 flex justify-center">
                      {solutionSolved && (
                        <div className="w-full flex justify-center">
                          {/* <p style={{ display: "inline", marginLeft: "80px" }}> */}
                          {/* <strong style={{ fontSize: "16px" }}> */}
                          <Box className="inputRow w-full justify-center" style={{ display: "contents", marginLeft: "80px" }}>
                            Optimal Cost of Transportation is INR{" "}
                            <span style={{ textAlign:"center", color: "crimson" }}>{cost}</span> Lakhs
                          </Box>{/* </strong> */}
                          {/* </p> */}
                        </div>
                      )}
                    </div>
                    <br />
                    <div className="form-group p-16 flex justify-center">
                      {solutionSolved && (
                        <div>
                          <Box className="inputRow w-full justify-center" style={{ display: "inline" }}>
                            <Button
                              style={{ color: "white",  backgroundColor: "darkcyan"}}
                              className="btn btn-danger dropdown-toggle"
                              onClick={() => exportToExcel2()}
                            >
                              <i className="fa fa-bars"></i> Download Railhead To Railhead Detailed Plan
                            </Button>

                            {/* <center><a
                              href="#"
                              style={{ 
                                marginLeft: "100px" ,
                                borderRadius: "20px",
                                borderWidth: "2px",
                                padding: "10px",
                                borderColor: "black"
                              }}
                              className="btn btn-info dropdown-toggle"
                              onClick={(event) => {
                                event.preventDefault();
                                exportToExcel2();
                              }}
                            >
                              {/* <i className="fa fa-bars"></i> }
                              Download Railhead To Railhead Detailed Plan
                            </a></center> */}
                            {/* <button
                            style={{ color: "white", marginLeft: "100px" }}
                            className="btn btn-success dropdown-toggle"
                            onClick={() => exportToExcel2()}
                          >
                             <i className="fa fa-bars"></i>  
                            Download Railhead To Railhead Detailed Plan
                          </button> */}
                          </Box>
                          <br />
                          <Box className="inputRow w-full flex justify-center" style={{ display: "inline", marginTop: "60px" }}>
                            {/* <button
                              style={{ color: "white", marginLeft: "100px" }}
                              className="btn btn-success dropdown-toggle"
                              onClick={() => exportToExcel1()}
                            > */}
                            {/* <i className="fa fa-bars"></i> */}

                            {/* </button> */}
                            {/* <center><a
                              href="#"
                              style={{ 
                                marginLeft: "100px" ,
                                borderRadius: "20px",
                                borderWidth: "2px",
                                padding: "10px",
                                borderColor: "black"
                              }}
                              className="btn btn-info dropdown-toggle"
                              onClick={(event) => {
                                event.preventDefault();
                                exportToExcel1();
                              }}
                            >
                              Download State to State Detailed Plan
                            </a></center> */}

                            <Button
                              style={{ color: "white", marginLeft: "15px" , marginTop:"15px", backgroundColor: "darkcyan"}}
                              className="btn btn-danger dropdown-toggle"
                              onClick={() => exportToExcel1()}
                            >
                              <i className="fa fa-bars"></i> Download State to State Detailed Plan
                            </Button>

                          </Box>
                        </div>
                      )}
                    </div>
                </Paper>
                    <br />
                    <br />
                    {/* {!solutionSolved && (
                  <div>
              <div style={{fontSize:'20px', fontWeight:'700', textAlign:'center'}}>Route Block</div>
                <table> */}
                    {/* <thead> */}
                    {/* <tr style={{ margin: "auto" }}>
                      <th style={{ padding: "10px", width: "15%" }}>
                        Origin State
                      </th>
                      <th style={{ padding: "10px", width: "15%" }}>
                        Origin Railhead
                      </th>
                      <th style={{ padding: "10px", width: "15%" }}>
                        Destination State
                      </th>
                      <th style={{ padding: "10px", width: "15%" }}>
                        Destination Railhead
                      </th>
                      <th style={{ padding: "10px", width: "15%" }}>Delete</th>
                    </tr> */}
                    {/* <tr  style={{ padding: "10px", width: "100%" , textAlign:'center'}}>
                      <div style={{textAlign:'center', width:'100%'}}>Routes Block</div></tr> */}
                    {/* </thead> */}
                    {/* <tbody> */}
                    {/* <tr style={{ margin: "auto" }}>
                      <th style={{ padding: "10px", width: "15%" }}>
                        Origin State
                      </th>
                      <th style={{ padding: "10px", width: "15%" }}>
                        Origin Railhead
                      </th>
                      <th style={{ padding: "10px", width: "15%" }}>
                        Destination State
                      </th>
                      <th style={{ padding: "10px", width: "15%" }}>
                        Destination Railhead
                      </th>
                      <th style={{ padding: "10px", width: "15%" }}>Delete</th>
                    </tr> */}
                    {/* {block_data.map((item) => (
                      <tr>
                        <td>{item.origin_state}</td>
                        <td>{item.origin_railhead}</td>
                        <td>{item.destination_state}</td>
                        <td>{item.destination_railhead}</td>
                        <td>
                          <span
                            style={{
                              cursor: "pointer",
                              color: "#ff0000",
                              fontSize: "1.2rem",
                            }}
                            onClick={() => handleDeleteRow(item.id)}
                            title="Delete"
                          >
                            &times;
                          </span>
                        </td>
                      </tr>
                    ))} */}
                    {/* </tbody> */}
                    {/* </table>
              </div>
                )} */}
                  </div>
                  
                </div>
              </div>

              <br />
              <div className="panel-heading">
                <h3 className="panel-title"></h3>
                <div className="btn-group pull-left">
                  {/* <button
                style={{ color: "white", marginLeft: "15px" }}
                className="btn btn-danger dropdown-toggle"
                onClick={() => exportToExcel1()}
              >
                <i className="fa fa-bars"></i> Download Movement Matrix
              </button> */}
                  <br />
                  <br />
                  {/* </div>
          </div>
          <div className="panel-heading">
            <h3 className="panel-title"></h3>
            <div className="btn-group pull-left"> */}
                </div>
              </div>
              <br />
              <br />
              {/* <p style={{ margin: 0, padding: 0 }}>
            <strong
              style={{
                color: "blue",
                fontSize: "20px",
                marginLeft: "15px",
              }}
            >
              Daily Scheduler
            </strong>
          </p>

          <div className="panel-heading">
            <h3 className="panel-title"></h3>
            <div className="btn-group pull-left">
              <button
                style={{ color: "white", marginLeft: "5px" }}
                className="btn btn-danger dropdown-toggle"
                onClick={() => Solve_Daily_Scheduler()}
                ref={buttonRef1}
              >
                <i className="fa fa-bars"></i> Solve for Daily Scheduler
              </button>
              <button
                style={{ color: "white", marginLeft: "170px" }}
                className="btn btn-danger dropdown-toggle"
                onClick={() => exportToExcel()}
              >
                <i className="fa fa-bars"></i> Download Result of Daily
                Scheduler
              </button>
              <br />
              <br />
              <br />
              <br />
              <br />
            </div> */}
              {/* </div> */}
              {/* <br />
          <br /> */}
              {/* <br />
          <br />
          <br />
          <br /> */}
            </div>
          </CardContent>
        </div>
      </div >
    </Card >
    </React.Fragment>
  );
}

export default MonthlyPlan;
