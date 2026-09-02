import { useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

const initialForm = {
  model: "",
  bodyType: "",
  brand: "",
  stock: "",
  manufacturer: "",
  role: "",
};

function GuitarForm({ onAddGuitar }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (name === "model") {
      if (!value.trim()) {
        return "Guitar model is required.";
      }

      if (value.trim().length < 3) {
        return "Guitar model must be at least 3 characters.";
      }
    }

    if (name === "bodyType" && !value) {
      return "Body type is required.";
    }

    if (name === "brand" && !value.trim()) {
      return "Brand name is required.";
    }

    if (name === "stock") {
      if (!value) {
        return "Stock quantity is required.";
      }

      const stockValue = Number(value);

      if (stockValue < 1 || stockValue > 100) {
        return "Stock quantity must be between 1 and 100.";
      }
    }

    if (name === "manufacturer" && !value.trim()) {
      return "Manufacturer name is required.";
    }

    if (name === "role" && !value) {
      return "User role is required.";
    }

    return "";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);

      if (error) {
        newErrors[name] = error;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newGuitar = {
      id: Date.now(),
      ...formData,
      stock: Number(formData.stock),
    };

    onAddGuitar(newGuitar);

    setFormData(initialForm);
    setErrors({});
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        Register Guitar
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: 2,
        }}
      >
        <TextField
          label="Guitar Model"
          name="model"
          value={formData.model}
          onChange={handleChange}
          error={Boolean(errors.model)}
          helperText={errors.model}
          fullWidth
        />

        <TextField
          select
          label="Body Type"
          name="bodyType"
          value={formData.bodyType}
          onChange={handleChange}
          error={Boolean(errors.bodyType)}
          helperText={errors.bodyType}
          fullWidth
        >
          <MenuItem value="Electric">
            Electric
          </MenuItem>

          <MenuItem value="Acoustic">
            Acoustic
          </MenuItem>

          <MenuItem value="Bass">
            Bass
          </MenuItem>

          <MenuItem value="Classical">
            Classical
          </MenuItem>
        </TextField>

        <TextField
          label="Brand Name"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          error={Boolean(errors.brand)}
          helperText={errors.brand}
          fullWidth
        />

        <TextField
          label="Stock Quantity"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          error={Boolean(errors.stock)}
          helperText={errors.stock}
          slotProps={{
            htmlInput: {
              min: 1,
              max: 100,
            },
          }}
          fullWidth
        />

        <TextField
          label="Manufacturer Name"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          error={Boolean(errors.manufacturer)}
          helperText={errors.manufacturer}
          fullWidth
        />

        <FormControl error={Boolean(errors.role)}>
          <FormLabel>
            User Role
          </FormLabel>

          <RadioGroup
            row
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <FormControlLabel
              value="Merchant"
              control={<Radio />}
              label="Merchant"
            />

            <FormControlLabel
              value="Consumer"
              control={<Radio />}
              label="Consumer"
            />
          </RadioGroup>

          <FormHelperText>
            {errors.role}
          </FormHelperText>
        </FormControl>
      </Box>

      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ mt: 3 }}
      >
        Add Guitar
      </Button>
    </Box>
  );
}

export default GuitarForm;