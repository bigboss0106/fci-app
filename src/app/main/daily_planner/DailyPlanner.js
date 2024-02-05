import React, { useRef, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { showMessage } from 'app/store/fuse/messageSlice';
import { useAppDispatch } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import UploadIcon from '@mui/icons-material/Upload';


import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  MenuItem,
  Button,
  Select,
  Switch,
  Paper,
} from "@mui/material";

function DailyPlanner() {

  const ProjectIp = "http://207.180.218.55:5000"
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

      const response = await fetch(ProjectIp + "/uploadDailyFile", {
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

  const handleUploadConfig1 = async () => {
    if (Scenerio == "Scenerio 2") {
    }
    if (!fileSelected) {
      alert("Please Select The File First");
      return;
    }

    try {
      const files = document.getElementById("uploadFile").files;
      const formData = new FormData();
      formData.append("uploadFile", files[0]);

      const response = await fetch(ProjectIp + "/uploadDailyFile1", {
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
  // const [r_s, setr_s] = useState("");
  // const [r_d, setr_d] = useState("");
  const [selectedOption, setSelectedOption] = useState("default");
  const [subOptions, setSubOptions] = useState([]);
  const [selectedOption2, setSelectedOption2] = useState("default");
  const [subOptions2, setSubOptions2] = useState([]);
  const [subOption1, setSubOption1] = useState("");
  const [subOption2, setSubOption2] = useState("");
  // const [org_rhcode, set_org_rhcode] = useState(null);
  // const [dest_rhcode, set_dest_rhcode] = useState(null);
  const [TEFD, set_TEFD] = useState("");
  const [Scenerio, set_Scenerio] = useState("");
  const buttonRef = useRef(null);
  // const buttonRef1 = useRef(null);
  const [solutionSolved, setSolutionSolved] = useState(false);
  const [scn, setscn] = useState(false);
  const [uploadst, setuploadst] = useState(false);

  const handleSelectChange = (e) => {
    const selectedScenerio = e.target.value;

    // Update Scenerio state
    set_Scenerio(selectedScenerio);


    // Set the value of setupload based on the selectedScenerio
    if (selectedScenerio === "Scenerio 1") {
      setuploadst(false);
      setscn(false);
    } else if (selectedScenerio === "Scenerio 2") {
      setuploadst(true);
      setscn(true);
    }
  };

  const handleSolve = async () => {
    document.getElementById('toggle').checked = true;
    alert("This action will take time, click OK to continue.");
    // buttonRef.current.innerText = "Solving..";
    // console.log(document.getElementById('toggle').value);
    if (Scenerio == "Scenerio 2") {
      setscn(true);
    }

    const payload = {
      // r_s: r_s,
      // r_d: r_d,
      // org_rhcode: org_rhcode,
      // dest_rhcode,
      TEFD: TEFD,
      origin_state: selectedOption,
      org_rhcode: subOption1,
      destination_state: selectedOption2,
      dest_rhcode: subOption2,
      block_data: block_data,
      Scenerio: Scenerio,
    };
    try {
      const response = await fetch(ProjectIp + "/Daily_Planner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // buttonRef.current.innerText = "Solved";
        document.getElementById('toggle').checked = false;
        alert("Solution Done!, Now you can download results");
        setSolutionSolved(true);
        
      } else {
        console.error("Failed to send inputs. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error sending inputs:", error);
    }
    document.getElementById('toggle').checked = false;
  };

  // const Solve_Daily_Scheduler = async () => {
  //   buttonRef1.current.innerText = "Solving for Dialy Scheduler..";
  //   const payload = {};

  //   try {
  //     const response = await fetch(ProjectIp+"/Daily_Scheduler", {
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

  // const [cost, setCost] = useState(null);
  const [Total_result, set_Total_Result] = useState(null);
  const [Relevant_result, set_Relevant_Result] = useState(null);
  // const [Daily_Scheduler_result, set_Daily_Scheduler_Result] = useState(null);

  // const fetchReservationId_Daily_Scheduler_result = () => {
  //   var form = new FormData();
  //   fetch(ProjectIp + "/read_Daily_Scheduler", {
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

  // const fetchReservationId_cost = () => {
  //   var form = new FormData();

  //   fetch(ProjectIp + "/readPickle", {
  //     method: "POST",
  //     credentials: "include",
  //     body: form,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const fetchedCost = data["Minimum Cost of Transportation"];
  //       const formattedCost = parseFloat(fetchedCost).toFixed(1);
  //       setCost(formattedCost);
  //       console.log(formattedCost);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };
  const fetchReservationId_Total_result = () => {
    var form = new FormData();
    fetch(ProjectIp + "/read_Daily_Planner1", {
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
    fetch(ProjectIp + "/read_Daily_Planner", {
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
      console.log(block_data);
      // setSelectedOption('');
      setSelectedOption('default');
      setSelectedOption2('default');
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
      saveAs(excelBlob, "Daily_Movement_Scenerio1.xlsx");
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
      saveAs(excelBlob, "Daily_Movement_results_Scenerio2.xlsx");
    }
  };
  // fetchReservationId_cost();

  return (
    <Card
      sx={{
        p: 0,
      }}
    >
    
      <div className="page-container form-group app-container body">
      
        <div
          className="page-content view-container body"
          style={{ 
            // backgroundImage: "url('/assets/images/fci/bg8.jpg') ",
            // backgroundSize: 'cover',
            // backgroundPosition: 'center',
            backgroundColor: "#f1f5f9"
         }}
        >
          <ul
            className="x-navigation x-navigation-horizontal x-navigation-panel p-16"
            // style={{ backgroundColor: "rgba(235, 171, 68, 0.69)" }}
          >
            <li className="xn-icon-button">
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
              {/* <span style={{ color: "black", fontSize: "32px" }}>
              Optimized Daily Plan
            </span> */}
              <Box>
              <Typography className="text-3xl font-semibold tracking-tight leading-8">
                  Optimized Daily Plan
                </Typography>
                <Typography className="font-medium tracking-tight" color="text.secondary">
                  Daily Plan
                </Typography>
                
              </Box>
              
              <a className="x-navigation-control"></a>
            </li>
          </ul>
        
          <div className="page-content-wrap">
            <div className="row">
              <CardContent
                sx={{
                  padding: "16px",
                }}
              >
                <Paper elevation={3} className="w-full h-full my-12">
                <div className=" form-group col-md-12 p-16">
                <Typography fontWeight="300" variant="h4">
                  Select Scenario.
                </Typography>
                  <div className=" col-md-2">
                    {/* </strong> */}
                    <Select
                      value={Scenerio != "" ? Scenerio : "Scenerio 1"}
                      defaultValue="Scenerio 1"
                      style={{width:200}}
                      onChange={handleSelectChange}
                    //  style={{ marginLeft: "600px" }}
                    >
                      <MenuItem value="Scenerio 1">Scenario 1</MenuItem>
                      <MenuItem value="Scenerio 2">Scenario 2</MenuItem>
                    </Select>
                  </div>
                </div>
                </Paper>
                {/* </label> */}
                {/* </Box> */}

                <div className="col-md-12">

                  <Paper elevation={3} className="w-full h-full my-12">
                  <div className="row p-16" style={{ marginLeft: "15px" }}>
                    {/* <div style={{ fontSize: '20px', fontWeight: '700' }}><i className="fa fa-file-excel-o" aria-hidden="true"></i> Template</div> */}
                    <Box>
                      <Typography fontWeight="250" variant="h4">
                        {/* <i className="fa fa-file-excel-o" aria-hidden="true"></i>{" "} */}
                        Template
                      </Typography>
                    </Box>
                    {/* <Box>
                      <Box className="inputRow"> */}
                    <form
                      action=""
                      encType="multipart/form-data"
                      id="uploadForm"
                      className="form-horizontal"
                    >
                      <Box>
                        <Box className="inputRow">
                          <div className="form-group">
                            <div className="col-md-5 info">
                              <div className="input-group">
                                <span
                                  className="input-group-addon"
                                  style={{
                                    //backgroundColor: "rgba(235, 171, 68, 0.69)",

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
                                  onChange={handleFileChange}
                                  id="uploadFile"
                                  name="uploadFile"
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
                              
                            </div>
                            {/* </div> */}
                            {/* </div> */}
                            <div className="col-md-2"
                            //  style={{ marginRight: '120px' }}
                            >
                              {uploadst && (
                                <div>
                                  <Button variant="outlined" startIcon={<UploadIcon />} 
                                    src="/assets/images/fci/upload1.jpg"
                                    id="uploadConfig"
                                    onClick={handleUploadConfig}
                                    style={{margin:25}}
                                    disabled={!fileSelected}>
                                    Upload
                                  </Button>
                                </div>
                              )}
                              {!uploadst && (
                                <div>
                                  <Button variant="outlined" startIcon={<UploadIcon />} 
                                    src="/assets/images/fci/upload1.jpg"
                                    id="uploadConfig1"
                                    onClick={handleUploadConfig}
                                    style={{margin:25}}
                                    disabled={!fileSelected}>
                                    Upload
                                  </Button>
                                </div>
                              )}
                              {/* <div style={{ marginTop: "-25px" }}>Click here</div> */}
                              </div>
                            {/* <input
                      style={{ marginLeft: "60px" }}
                      type="button"
                      // className="btn btn-primary"
                      className='upload_btn'
                      defaultValue="Upload Data Template"
                      id="uploadConfig"
                    /> */}
                          </div>
                        </Box>
                      </Box>
                    </form>
                    {/* </Box>
                    </Box> */}
                  </div>
                  </Paper>
                  
                  <div>
                  <Paper elevation={3} className="w-full h-full my-12">  
                    <Box className="p-16">
                      <Typography fontWeight="250" variant="h4">
                        {/* <i className="fa fa-file-excel-o" aria-hidden="true"></i>{" "} */}
                        Configurations
                      </Typography>
                    </Box>
                    <br />
                    <form className="p-16" style={{ marginLeft: '20px' }}>
                      {/* <label>
                       
                         <Box>
                         <div className="form-group">
                            <div className="col-md-8">
                       
                        Select Matrix System
                        </div>
                        <div className="col-md-2">

                       
                        <select
                          value={TEFD}
                          onChange={(e) => set_TEFD(e.target.value)}
                        //  style={{ marginLeft: "547px" }}
                        >
                          <option value="NON-TEFD">Non-TEFD</option>
                          <option value="TEFD">TEFD</option>
                        </select>
                        </div>
                        </div>
                        </Box>
                      </label> */}
                      <label>
                        <Box>
                          <div className="form-group">
                            <div className="col-md-7">
                              {/* <strong style={{ fontSize: "20px", marginLeft: "15px", color: "#9d0921" }}> */}
                              Select Matrix System
                              {/* </strong> */}
                            </div>
                            <div className="col-md-5">

                              <RadioGroup
                                aria-label="matrix-system"
                                name="matrix-system"
                                value={TEFD}
                                onChange={(e) => set_TEFD(e.target.value)}
                              >
                                <div className="form-group">
                                  <div className="col-md-12">
                                    <div className="col-md-10">

                                      <FormControlLabel
                                        value="NON-TEFD"
                                        control={<Radio color="primary" />}
                                        label="Non-TEFD"
                                      />
                                    </div>
                                    <div className="col-md-2">
                                      <FormControlLabel
                                        value="TEFD"
                                        control={<Radio color="primary" />}
                                        label="TEFD"
                                      />
                                    </div>
                                  </div></div>
                              </RadioGroup>
                            </div>
                          </div>
                        </Box>
                      </label>


                      {/* <p style={{ margin: 0, padding: 0 }}>
                    <strong
                      style={{
                        color: "#9d0921",
                        fontSize: "20px",
                        marginLeft: "15px",
                        fontFamily: "Segoe UI"
                      }}
                    >
                      For Maximum Number of Rakes
                    </strong>
                  </p>
                  <label style={{marginTop:'10px'}}>
                    <strong style={{ fontSize: "16px", marginLeft: "15px" }}>
                      Max number of rakes per railhead to be allowed from
                      surplus states (Default Value is 25)
                    </strong>
                    <input
                      type="text"
                      value={r_s}
                      onChange={(e) => setr_s(e.target.value)}
                      style={{ marginLeft: "40px" }}
                    />
                  </label>
                  <br />
                  <label>
                    <strong style={{ fontSize: "16px", marginLeft: "15px" }}>
                      Max number of rakes per railhead to be allowed into
                      deficit states (Default Value is 25)
                    </strong>
                    <input
                      type="text"
                      value={r_d}
                      onChange={(e) => setr_d(e.target.value)}
                      style={{ marginLeft: "53px" }}
                    />
                  </label>
                  <br />
                  <br /> */}
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
                      {/* <p style={{ margin: 0, padding: 0 }}> */}
                      {/*  <strong
                          style={{
                            color: "#9d0921",
                            fontSize: "20px",
                            marginLeft: "15px"
                          }}
                        > */}
                      <Box style={{ marginLeft: "15px" }}>
                        For Route Blocking:
                      </Box>
                      {/* </strong> */}
                      {/* </p> */}
                      <br />

                      {/* <Box> */}
                      <div className="form-group">
                        <div className="col-md-12 flex">
                          <div className="col-md-3" style={{width: 100, marginTop:15}}>
                            Select Origin State
                          </div>
                          <div className="col-md-3" style={{width: 200, marginTop:-15}}>
                            <Select
                              style={{ width: "250px", margin:20, padding: "5px" }}
                              id="origin_state"
                              onChange={handleDropdownChange}
                              value={selectedOption}
                            >
                              <MenuItem value="default">Select Origin State</MenuItem>
                              <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                              <MenuItem value="Bihar">Bihar</MenuItem>
                              <MenuItem value="Chattisgarh">Chattisgarh</MenuItem>
                              <MenuItem value="Goa">Goa</MenuItem>
                              <MenuItem value="Gujarat">Gujarat</MenuItem>
                              <MenuItem value="Haryana">Haryana</MenuItem>
                              <MenuItem value="Jammu & Kashmir">Jammu & Kashmir</MenuItem>
                              <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                              <MenuItem value="Karnataka">Karnataka</MenuItem>
                              <MenuItem value="Kerala">Kerala</MenuItem>
                              <MenuItem value="MP">Madhya Pradesh</MenuItem>
                              <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                              <MenuItem value="NE">North East</MenuItem>
                              <MenuItem value="Odisha">Odisha</MenuItem>
                              <MenuItem value="Punjab">Punjab</MenuItem>
                              <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                              <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                              <MenuItem value="Telangana">Telangana</MenuItem>
                              <MenuItem value="UP">Uttar Pradesh</MenuItem>
                              <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                              <MenuItem value="West Bengal">West Bengal</MenuItem>
                            </Select>
                          </div>
                          <div className="col-md-3"
                            style={{width: 100, marginTop:15, marginLeft:100}}>
                            Select Origin Railhead
                          </div>
                          <div className="col-md-3" style={{width: 200, marginTop:-15}}>

                            <Select
                              id="origin_railhead"
                              style={{ width: "250px", margin:20, padding: "5px" }}
                              onChange={handleSubDropdownChange1}
                              value={subOption1}
                            >
                              {subOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </div>
                        </div>
                      </div>

                      <br />
                      <div className="form-group">
                        <div className="col-md-12 flex">

                          {/* <label htmlFor="deficit_state"> */}
                          {/* <strong style={{ fontSize: "16px", padding: "5px" }}> */}
                          <div className="col-md-3" style={{width: 100, marginTop:15}}> Select Destination State</div>
                          {/* </strong> */}
                          <div className="col-md-3" style={{width: 200, marginTop:-15}}>
                            <Select
                            
                            style={{ width: "250px", margin:20, padding: "5px" }}
                              id="deficit_state"
                              onChange={handleDropdownChange2}
                              value={selectedOption2}
                            >
                              <MenuItem value="default">
                                Select Destination State
                              </MenuItem>
                              <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                              <MenuItem value="Bihar">Bihar</MenuItem>
                              <MenuItem value="Chattisgarh">Chattisgarh</MenuItem>
                              <MenuItem value="Goa">Goa</MenuItem>
                              <MenuItem value="Gujarat">Gujarat</MenuItem>
                              <MenuItem value="Haryana">Haryana</MenuItem>
                              <MenuItem value="Jammu & Kashmir">Jammu & Kashmir</MenuItem>
                              <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                              <MenuItem value="Karnataka">Karnataka</MenuItem>
                              <MenuItem value="Kerala">Kerala</MenuItem>
                              <MenuItem value="MP">Madhya Pradesh</MenuItem>
                              <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                              <MenuItem value="NE">North East</MenuItem>
                              <MenuItem value="Odisha">Odisha</MenuItem>
                              <MenuItem value="Punjab">Punjab</MenuItem>
                              <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                              <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                              <MenuItem value="Telangana">Telangana</MenuItem>
                              <MenuItem value="UP">Uttar Pradesh</MenuItem>
                              <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                              <MenuItem value="West Bengal">West Bengal</MenuItem>
                            </Select>
                          </div>
                          <div className="col-md-3" style={{width: 100, marginTop:15, marginLeft:100}}>
                            {/* <strong style={{ fontSize: "16px", padding: "5px" }}> */}
                            Select Destination Railhead
                            {/* </strong> */}
                          </div>
                          <div className="col-md-2" style={{width: 200, marginTop:-15}}>
                            <Select
                              id="deficit_railhead"
                              style={{ width: "250px", margin:20, padding: "5px" }}
                              onChange={handleSubDropdownChange2}
                              value={subOption2}
                            >
                              {subOptions2.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </div>
                          <div className="col-md-1" style={{ marginLeft:100 , martinTop:20}}>
                            <Button
                              style={{
                                padding: "5px",
                                margin: "2px",
                                float: "right",
                                width: "80px",
                                background: "lightblue",
                                padding: "auto",
                              }}
                              onClick={addConstraint}
                            >
                              Add
                            </Button>
                          </div>
                        </div></div>
                      {/* </label> */}
                      {/* <label htmlFor="deficit_railhead"> */}


                      {/* </div> */}
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
                        <p style={{ textAlign: "center", marginTop: "20px" }}>
                          Add
                        </p>
                      </div> */}

                      <br />
                      <br />
                    </form>
                  </Paper>
                  <Paper elevation={3} className="w-full h-full my-12">
                    <Box className="p-16">
                      <Typography fontWeight="250" variant="h4">
                        {/* <i className="fa fa-file-excel-o" aria-hidden="true"></i>{" "} */}
                        <i className="fa fa-list-alt" aria-hidden="true"></i> Optimal Plan
                      </Typography>
                    </Box>
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
                    {solutionSolved && (
                      <Box className="inputRow justify-center" style={{ display: "inline", marginTop: "60px" , marginLeft: "100px" }}>
                        {scn && (
                          <div>
                            <center><Button
                              style={{ color: "white", backgroundColor: "darkcyan"}}
                              className="btn btn-danger dropdown-toggle"
                              onClick={() => exportToExcel2()}
                            >
                              <i className="fa fa-bars"></i> Download Railhead-Railhead
                              Detailed Plan
                            </Button></center>
                          </div>)}
                        {!scn && (
                          <div>
                            <center><Button
                              style={{ color: "white", backgroundColor: "darkcyan"}}
                              className="btn btn-danger dropdown-toggle"
                              onClick={() => exportToExcel1()}
                            >
                              <i className="fa fa-bars"></i> Download Railhead-Railhead
                              Detailed Plan
                            </Button></center>
                          </div>)}
                      </Box>
                    )}
                    <br />
                    <br />
                    {!solutionSolved && (
                      <div>
                        <div style={{ fontSize: '20px', fontWeight: '700', textAlign: 'center' }}>Route Block</div>
                        <table>
                          <thead>
                            <tr style={{ margin: "auto" }}>
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
                            </tr>
                            {/* <tr  style={{ padding: "10px", width: "100%" , textAlign:'center'}}>
                      <div style={{textAlign:'center', width:'100%'}}>Routes Block</div></tr> */}
                          </thead>
                          <tbody>
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
                            {block_data.map((item) => (
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
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    </Paper>
                  </div>
                </div> </CardContent>
            </div>
            {/* {solutionSolved && (
            <div>
              <p style={{ display: "inline", marginLeft: "25px" }}>
                <strong style={{ fontSize: "16px" }}>
                  Optimal Cost of Transportation is INR{" "}
                  <span style={{ color: "#FF0509" }}>{cost}</span> Lakhs
                </strong>
              </p>
            </div>
          )} */}

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
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

          </div>

        </div>
      </div>

    </Card>
  );
}

export default DailyPlanner;
