"use client"

import styles from "./page.module.css";
import TextField from '@mui/material/TextField';
import { Button, Snackbar } from "@mui/material";
import { useState, useEffect } from 'react';
import { setKeyValue, getKey } from "@/api/lru_cache_api";


export default function Home() {

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [expiration, setExpiration] = useState("");
  const [open, setOpen] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const onHandleChange = (event) => {
    if (event.target.id === "key")
      setKey(event.target.value);
    else if (event.target.id === "value")
      setValue(event.target.value);
    else if (event.target.id === "expiration")
      setExpiration(event.target.value);
  }

  const checkFields = () => {
    if (key === "" || value === "")
      return true;
    return false;
  }

  const clickedSet = () => {
    const body = {
      key,
      value
    }
    if(expiration !== "")
    body.expiration = expiration;

    setKeyValue(body)
      .then(response => {
        setApiMessage(response.message);
        handleClick();
        setKey("");
        setValue("");
        setExpiration("");
      })
      .catch(error => {
        setApiMessage(error.message);
        handleClick();
      })
  }

  const clickedGet = () => {
    getKey(key)
      .then(response => {
        setKey(response.key);
        setValue(response.value !== null ?response.value: "");
        setExpiration("");
      })
      .catch(error => {
        console.log(error.message);
      })
  }


  return (
    <>
      <div>
        <TextField className={styles.textFieldSizes}
          id="key"
          label="Key*"
          value={key}
          variant="outlined"
          onChange={event => onHandleChange(event)}
        />
        <TextField
          className={styles.textFieldSizes}
          id="value"
          value={value}
          label="Value*"
          variant="outlined"
          onChange={event => onHandleChange(event)}
        />
        <TextField
          className={styles.textFieldSizes}
          id="expiration"
          value={expiration}
          label="Expiration"
          variant="outlined"
          onChange={event => onHandleChange(event)} />

        <Button
          className={styles.textFieldSizes}
          variant="contained"
          onClick={clickedGet}>GET</Button>
        <Button
          className={styles.textFieldSizes}
          variant="outlined"
          disabled={checkFields()}
          onClick={clickedSet}
        >SET</Button>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={apiMessage}
      />
    </>
  );
}
