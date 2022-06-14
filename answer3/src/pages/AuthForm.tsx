import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, TextField, InputAdornment, Button, Alert } from "@mui/material";
import {
  AccountCircle,
  Visibility as VisibilityIcon
} from "@mui/icons-material";
import AuthService from "../services/authService";
import "./AuthForm.css";

export function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await AuthService.login(username, password);
      if (res.ok) {
        navigate("/product");
      } else {
        setMessage(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="auth-form-container">
      <div className="auth-title">Juvo Plus Product Management</div>

      <TextField
        className="auth-input"
        placeholder="test123"
        value={username}
        onChange={onUsernameChange}
        label="Username"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          )
        }}
      />

      <TextField
        className="auth-input"
        placeholder="test123"
        variant="outlined"
        value={password}
        onChange={onPasswordChange}
        type="password"
        label="Password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <VisibilityIcon />
            </InputAdornment>
          )
        }}
      />

      <Button
        className="login-button"
        variant="contained"
        color="primary"
        onClick={handleLogin}
      >
        Login
      </Button>

      {!loading && message && (
        <Alert sx={{ mt: 2, mb: 2 }} severity="error">
          {message}
        </Alert>
      )}
    </Card>
  );
}
